# Feature: Applicant accounts

**From build-plan:** feature 8b
**Status:** complete

## Goal

Give job applicants a real account (email/password, via Supabase Auth) so
they can sign up, confirm their email, log in, and log out. This is the
site's first authentication system and the foundation 8c (the application
flow) builds on - 8c will gate the actual apply form behind a logged-in
session and change the careers pages' "Apply Now" CTA to point here instead
of `/contact`.

## In scope

- Supabase client/server helpers (`@supabase/ssr`, `@supabase/supabase-js`)
  and session-refresh middleware - the reusable plumbing 8c depends on.
- `/signup` - email/password form. On submit: validates input, calls
  Supabase `signUp`, shows a "check your email to confirm" state (Supabase's
  default requires email confirmation before a session is active).
- An email-confirmation callback route that verifies the link from the
  confirmation email and establishes a session.
- `/login` - email/password form. On submit: calls Supabase
  `signInWithPassword`, redirects to `/careers` on success, shows an inline
  error on failure. Redirects away to `/careers` if already logged in.
- `/logout` - a single "Log out" page/button that ends the session and
  redirects home.

## Out of scope

- The actual job application form, resume upload, or storing applications
  (feature 8c).
- Changing the careers pages' "Apply Now" CTA (still points to `/contact` -
  8c changes this, per 8a's spec).
- The admin review page (feature 8d).
- Password reset / "forgot password" - not requested, and not blocking
  since these are new accounts, not existing ones. Flagging as a likely
  near-term follow-up once real applicants start signing up.
- Carrying a `?next=` deep-link target through the signup -> email
  confirmation -> login round trip. Only `/login`'s `?next=` is built now
  (load-bearing for 8c below); a signup that starts from a specific role's
  apply link still lands the confirmed user on a generic `/login`, not back
  on that role. Revisit once 8c's actual apply-flow UX is designed - this
  is a real gap, not an oversight, and is cheap to add later since it's
  additive to the `next`-param convention already in place.
- Any navbar change - applicant accounts aren't a general-site-visitor
  feature yet; these pages are reachable by direct URL until 8c links them
  from the careers pages.
- A profile/account page - per `project-overview.md`'s data model decision,
  there's no separate profile table; applicant name/phone are captured per
  application in 8c, not on the account itself.

## Build steps

- [x] **Step 1 - Supabase client/server helpers** - `npm install
  @supabase/supabase-js @supabase/ssr`. Added `src/lib/supabase/client.ts`
  (browser client via `createBrowserClient`) and `src/lib/supabase/server.ts`
  (server client via `createServerClient`, wired to `next/headers` cookies).
- [x] **Step 2 - Session-refresh middleware** - Added
  `src/lib/supabase/middleware.ts` (the logic) and `src/proxy.ts` (the entry
  point) following Supabase's standard `@supabase/ssr` pattern: refresh the
  session cookie on every request, excluding static assets.
- [x] **Step 3 - Signup page** - Added `src/app/signup/page.tsx`: email,
  password, confirm-password fields via a Server Action. Redirects an
  already-logged-in visitor to `/careers`. Validates non-empty fields,
  matching passwords, minimum 6-character password, and email format, then
  calls `supabase.auth.signUp`. Success shows a "check your email to
  confirm" message; failure shows an inline error matching the site's
  existing success/error card pattern.
- [x] **Step 4 - Email confirmation callback** - Added
  `src/app/auth/confirm/route.ts`: verifies the confirmation link's token
  hash and type, establishes a session on success and redirects to
  `/login?confirmed=true`, or `/login?confirmError=true` on an invalid,
  expired, or reused link.
- [x] **Step 5 - Login page** - Added `src/app/login/page.tsx`:
  email/password form via a Server Action calling
  `supabase.auth.signInWithPassword`. Accepts an optional `next` search
  param (same-site path only, to avoid an open redirect); redirects there
  on success, defaulting to `/careers`. Redirects an already-logged-in
  visitor away without showing the form.
- [x] **Step 6 - Logout** - Added `src/app/logout/page.tsx`: a single "Log
  out" button wired to a Server Action calling `supabase.auth.signOut()`,
  then redirecting to `/`.

## Files / areas

- `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`,
  `src/lib/supabase/middleware.ts` (new)
- `src/proxy.ts` (new - not `middleware.ts`: Next.js 16 renamed the file
  convention from `middleware`/`middleware.ts` to `proxy`/`proxy.ts` mid-way
  through this feature; caught via a dev-server deprecation warning)
- `src/app/signup/page.tsx` (new)
- `src/app/auth/confirm/route.ts` (new)
- `src/app/login/page.tsx` (new)
- `src/app/logout/page.tsx` (new)
- `package.json` / `package-lock.json` - `@supabase/supabase-js`,
  `@supabase/ssr`

## Data / contracts

No custom tables - Supabase Auth's built-in `auth.users` is the only store,
per the data model already locked in `project-overview.md`. Env vars (set
in `.env.local` and Vercel, all three environments), load-bearing for 8c/8d:

- `NEXT_PUBLIC_SUPABASE_URL` - required.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - required (Supabase's current
  key format, replacing the legacy `anon` JWT key).
- `SUPABASE_SECRET_KEY` - required, server-only (replaces the legacy
  `service_role` JWT key). Never referenced from a Client Component.

`src/lib/supabase/server.ts`'s `createClient()` (server-side, cookie-aware)
is the load-bearing helper 8c and 8d will both reuse to check
`supabase.auth.getUser()` for route protection. `/login`'s `?next=` param
(validated as a same-site path) is the load-bearing convention 8c will use
to send an unauthenticated applicant to log in and land back on the apply
form afterward - e.g. `/login?next=/careers/qa-regulatory-officer`.

## Testing

No test runner configured - this feature does introduce real logic
(password confirmation matching, email format validation, open-redirect
guarding) worth unit testing per `coding-standards.md`'s testing section,
same call-out feature 7 made; not building a runner now, this is a good
candidate for `/tests`.

Verified against the **real** Supabase project throughout, `npm run build`
passing at every step. Two different verification depths, both genuine:

- **Login/logout: fully exercised end-to-end.** Used the admin API
  (`SUPABASE_SECRET_KEY`) to create a pre-confirmed test user, bypassing
  email entirely, then drove the real `/login` and `/logout` Server Actions
  via raw HTTP (multipart POST matching Next's no-JS form-post wire
  format). Confirmed: wrong password errors and stays on `/login`; correct
  password sets a real Supabase session cookie and redirects; an
  already-logged-in visitor is redirected away from `/login` without
  seeing the form; `?next=https://evil.example` is rejected in favor of
  the `/careers` default; logging out then hitting `/login` again shows
  the form (200), proving the session was actually ended server-side, not
  just redirected past. Test user deleted after verification.
- **Signup/email-confirmation: error paths and API contract verified, the
  clean-success path is not.** Real `signUp()` calls against the live
  project correctly surfaced an invalid-domain rejection and a "rate limit
  exceeded" error through the exact code path a user would see, and the
  admin API confirmed zero orphaned users from any failed attempt. The
  actual "user signs up, receives a real email, clicks it" path could not
  be exercised - Supabase's free-tier project has a very low built-in
  email send rate limit (a few per hour), which was hit immediately.
  Mirrors feature 7's Resend-key gap: the integration is implemented per
  Supabase's documented API and the surrounding logic is proven correct,
  but the literal "did a real email arrive and work" step needs a custom
  SMTP provider (Resend, already used elsewhere in this project) before
  it's fully exercised.

## Notes for the AI

- Follow the `@supabase/ssr` package's documented Next.js App Router
  pattern exactly (separate browser/server client factories, the
  middleware session-refresh snippet) - this is a well-defined integration
  with known pitfalls (using the wrong client in the wrong context breaks
  auth silently), not a place to improvise.
- All new pages are server components using Server Actions for the
  mutations, matching the existing `handleContactSubmit` convention - no
  `"use client"` needed for the forms themselves.
- Match the existing success/error card visual pattern from
  `contact/page.tsx` (`CheckCircle2`/`XCircle`, emerald/red palettes) so
  these new pages feel consistent with the rest of the site, not bolted on.
- Keep the banner + centered-card layout consistent with the site's visual
  system (zinc palette, light/dark mode) even though `/signup` and `/login`
  are simpler, single-purpose pages than the marketing pages.
- Discovered mid-feature: Next.js 16 deprecated the `middleware.ts` file
  convention in favor of `proxy.ts` (same behavior, renamed export). Caught
  via a dev-server warning, not by prior knowledge - worth remembering for
  any future work touching this area.
