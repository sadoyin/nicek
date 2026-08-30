# Feature: Working contact form submission

**From build-plan:** feature 7
**Status:** complete

## Goal

Replace the `handleContactSubmit` server action's `console.log` stub with real
email delivery, so a contact form submission actually reaches the company
instead of vanishing. Add a genuine error state to match the success state
that already exists but is currently unreachable (nothing redirects to it
today). This is the site's only conversion mechanism, so it currently
converts nothing.

Decided with the user: email-only via Resend, no database, no stored
submissions (see `project-plan.md` §4/§5).

## In scope

- Add the `resend` package and the env vars it needs.
- Server-side validation of the form fields (required, trimmed, valid email
  format) - the current `required`/`type="email"` HTML attributes are the
  only validation today, and those are client-side only, so a no-JS or
  malicious submission currently reaches the stub unchecked.
- Keep the existing honeypot field (`website`) working as spam protection:
  if it's filled, silently succeed without sending (never tip off a bot that
  it was caught).
- Send the validated submission by email via Resend to the company inbox.
- Redirect to `/contact?success=true` (already has a working UI) on success,
  and to `/contact?error=true` on validation failure or a Resend send
  failure.
- Add the missing error-state UI on `/contact`, styled to match the existing
  success card.

## Out of scope

- Storing submissions anywhere (no database - see the confirmed decision
  above).
- Verifying `nicekgroup.com` as a Resend sending domain (a Resend
  dashboard + Namecheap DNS task, not code - see Notes). Until that's done,
  email sends from Resend's shared `onboarding@resend.dev` address; the
  company inbox still receives it correctly.
- CAPTCHA or rate limiting beyond the existing honeypot - only take this on
  later if spam actually becomes a problem.
- Any change to the navbar, footer, or other pages.

## Build steps

- [x] **Step 1 - Add Resend and env var scaffolding** - run `npm install
  resend`. Add `.env.example` documenting `RESEND_API_KEY`,
  `CONTACT_EMAIL_TO` (default `info@nicekgroup.com`), and
  `CONTACT_EMAIL_FROM` (default `onboarding@resend.dev` until the sending
  domain is verified). Add a `!.env.example` exception to `.gitignore` (it
  currently blanket-ignores `.env*`, which would also hide the example file).
  No behavior changes yet. *Done when:* `resend` is in `package.json`
  dependencies, `.env.example` exists and is tracked by git, and `npm run
  build` still passes.
- [x] **Step 2 - Implement real submission handling** - rewrite
  `handleContactSubmit` in `src/app/contact/page.tsx`: validate required
  fields and email format, short-circuit on a filled honeypot (redirect to
  success without sending), call the Resend API with the validated fields,
  and redirect to `/contact?success=true` or `/contact?error=true`
  accordingly. *Done when:* submitting the form with valid data redirects to
  the existing success screen and Resend's API is called with the submitted
  fields; submitting with a required field empty (bypassing client-side
  validation) redirects to `/contact?error=true` instead of silently
  discarding input.

  Verified with real HTTP POSTs directly against the rendered server
  action (multipart/form-data with the page's `$ACTION_ID_...` field,
  bypassing this session's inability to run a headless browser): honeypot
  filled -> 303 to `?success=true` without a send attempt; empty required
  field -> 303 to `?error=true`; invalid email format -> 303 to
  `?error=true`. This caught a real bug: `new Resend(...)` was called
  outside the `try/catch`, so a valid submission with no/invalid
  `RESEND_API_KEY` threw an unhandled error (raw 500) instead of the
  intended graceful error redirect. Fixed by moving the constructor call
  inside `try`; re-verified the same valid-submission POST now returns 303
  to `?error=true` instead of 500. Actual successful delivery through a
  real Resend API key was not exercised (none available in this session).
- [x] **Step 3 - Add the error state UI** - in `ContactPage`, read an
  `error` search param alongside the existing `success` one, and render an
  error message card when present, styled to mirror the existing success
  card (same layout, red/amber palette instead of emerald, a short apology
  plus the phone/email fallback so a frustrated visitor isn't stuck).
  *Done when:* visiting `/contact?error=true` shows the error card instead of
  the form; `/contact?success=true` still shows the success card unchanged;
  `/contact` with neither param still shows the form.

## Files / areas

- `package.json` / `package-lock.json` - new dependency.
- `.env.example` (new), `.gitignore` - env var documentation.
- `src/app/contact/page.tsx` - `handleContactSubmit` and the page component.

## Data / contracts

New env vars, load-bearing for `/release` later (they'll need to be set in
Vercel's project settings, not just locally):

- `RESEND_API_KEY` - required, no default, secret.
- `CONTACT_EMAIL_TO` - required, defaults to `info@nicekgroup.com`.
- `CONTACT_EMAIL_FROM` - required, defaults to `onboarding@resend.dev`.

No database, no stored schema.

## Testing

No test runner is configured. This feature does introduce real logic worth
unit-testing (field validation, honeypot short-circuit) - per
`coding-standards.md`'s testing section, this is exactly the kind of change
that's worth running `/tests` for. Not doing that as part of this spec (adding
a runner mid-feature isn't this feature's job); flagging it as a good next
move, your call. Verified via `npm run build` (clean, 13/13 pages) and real
HTTP POSTs against the running dev server exercising all four submission
paths (see Step 2 evidence above) plus a visual check of all three page
states (form, success, error).

## Notes for the AI

- `RESEND_API_KEY` requires a Resend account, which is an external step only
  the user can do (resend.com signup, API key generation). No key was
  available in this session, so actual email delivery through Resend was
  never exercised - only the surrounding validation/error-handling logic.
- Sending domain verification (so email shows `@nicekgroup.com` instead of
  `onboarding@resend.dev`) is a Resend dashboard + Namecheap DNS task,
  separate from this spec - out of scope per above.
- `/contact` is a server component (`export default async function
  ContactPage`) reading `searchParams` - keep that pattern for the new
  `error` param instead of introducing client-side state.
- Match the honest `{ success, data, error }` return-shape guidance in
  `coding-standards.md`'s Error Handling section for `handleContactSubmit`'s
  internal logic, even though the outward behavior is a redirect.
