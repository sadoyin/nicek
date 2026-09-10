# Fix: Submit button feedback (spinner + cursor pointer)

**Type:** Fix
**Status:** complete

## The problem

The site's five form-submit buttons give no feedback that anything is
happening when clicked, and don't look clickable:

- `src/app/login/page.tsx` - "Log In" button
- `src/app/signup/page.tsx` - "Sign Up" button
- `src/app/careers/[role]/apply/page.tsx` - "Submit Application" button
- `src/app/logout/page.tsx` - "Log Out" button
- `src/app/contact/page.tsx` - the contact form's submit button

All five are plain `<button type="submit">` elements inside a Server Action
form (`action={handleX}`). Two issues:

1. **No cursor feedback.** Tailwind v4's preflight doesn't set
   `cursor: pointer` on `<button>` (browsers default it to the arrow cursor),
   and none of these buttons set it explicitly - they don't look clickable
   on hover.
2. **No pending state.** Submitting one of these forms can take a moment
   (a real network round-trip to Supabase, plus a resume upload on the apply
   form) with zero visual change in the meantime - no spinner, no disabled
   state - so a slow connection looks like the click did nothing, inviting a
   double-submit.

## The fix

Add one small reusable Client Component, `src/components/SubmitButton.tsx`,
using React's `useFormStatus()` (the standard way to read a parent form's
pending state without prop-drilling or new state) to render a spinning
`Loader2` icon and a pending label while its form is submitting, and disable
itself for that duration. Give it `cursor-pointer` by default and
`disabled:cursor-not-allowed disabled:opacity-70` for the pending/disabled
look.

Swap the five raw `<button type="submit">` elements above for this
component, passing each page's existing classes and label so nothing else
about their appearance changes.

This must not:
- Change any server action logic, redirects, or validation.
- Break the apply page's existing icon-plus-text button layout (`<Send />
  Submit Application`).
- Require a client component for the surrounding pages - only the button
  itself becomes a client component, same pattern already used for
  `PasswordInput`.

## Build steps

- [x] **Step 1 - add `SubmitButton` and use it on all five pages** - create
  `src/components/SubmitButton.tsx` (`"use client"`, `useFormStatus`,
  `Loader2` from `lucide-react`), then replace the submit `<button>` in
  `login/page.tsx`, `signup/page.tsx`, `careers/[role]/apply/page.tsx`,
  `logout/page.tsx`, and `contact/page.tsx` with it. *Done when:* `npm run
  build` passes; hovering each of the five buttons shows a pointer cursor;
  clicking each one (throttle the network to see it clearly) shows a spinner
  and disables the button until the action redirects or the contact form's
  success/error state renders.

## Verify

- `npm run build` (no test runner configured for this project).
- Manual: on each of the five pages, hover the submit button (pointer
  cursor) and submit the form with network throttled in devtools (spinner
  replaces the label, button is disabled, no double-submit possible) -
  confirm the page still redirects/behaves exactly as before afterward.

Verified: `npm run build` passed; rendered HTML confirmed to carry
`cursor-pointer`/`disabled:cursor-not-allowed`; user manually confirmed the
spinner and disabled state appear during submission across the forms.
