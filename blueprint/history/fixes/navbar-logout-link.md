# Fix: Navbar logout link

**Type:** Fix
**Status:** complete

## The problem

There is no way to log out from anywhere in the site's navigation - `/logout`
exists as a page (`src/app/logout/page.tsx`) but nothing links to it. A
logged-in applicant has to know that URL and type it manually, or stay
logged in indefinitely, to end their session.

## The fix

Add a "Logout" link (icon + text) to `src/components/navbar.tsx`, shown only
when a user is logged in, in both the desktop nav and the mobile drawer.
Clicking it signs out immediately (no confirmation page) - the existing
`/logout` confirmation page stays as a direct-link fallback, not removed.

**Auth check: client-side, not in the root layout.** `Navbar` is rendered
from `src/app/layout.tsx`, which wraps every page, including the ones
currently static (`/`, `/about`, `/services/*`). Checking the session in the
root layout would call `cookies()` there, which forces Next.js to render
every page under it dynamically on every request - a real performance
regression for pages that have nothing to do with auth, just to support a
navbar link. Instead, `Navbar` (already a Client Component for its menu and
theme state) checks the session itself using the existing browser Supabase
client (`@/lib/supabase/client.ts`), the pattern Supabase's own docs
recommend for this exact case. Trade-off: the logout link appears a beat
after the page loads rather than being present in the initial HTML - normal
for a client-side auth check, and not worth avoiding at the cost of losing
static rendering sitewide.

**Shared sign-out action.** Extract the sign-out logic (previously inlined
as `handleLogout` in `src/app/logout/page.tsx`) into
`src/lib/auth-actions.ts` as an exported `"use server"` `logout()` function,
used from both the navbar's form and the `/logout` page, so the two call
sites can't drift.

This must not:
- Change `/logout`'s own page UI or its own done-when.
- Add a session check to `src/app/layout.tsx` or any currently-static page.
- Require a confirmation step for the navbar's logout link.

## Build steps

- [x] **Step 1 - shared logout action** - create `src/lib/auth-actions.ts`
  exporting `logout()` (`"use server"`, signs out via
  `createClient()` from `@/lib/supabase/server`, redirects to `/`). Update
  `src/app/logout/page.tsx` to import and use it instead of its local
  `handleLogout`. *Done when:* `npm run build` passes; `/logout` still works
  exactly as before (manual click-through, per its own existing behavior).

- [x] **Step 2 - navbar logout link** - in `src/components/navbar.tsx`, track
  the current user in state, populated on mount via the browser Supabase
  client's `auth.getUser()` and kept in sync via `auth.onAuthStateChange`
  (unsubscribe on unmount). When a user is present, render a `<form
  action={logout}>` wrapping a `SubmitButton` (icon: `LogOut` from
  `lucide-react`, label "Logout") in the desktop nav links and in the mobile
  drawer, styled to match their respective sibling links. Hidden entirely
  when logged out. *Done when:* `npm run build` passes; logged out, no
  Logout link appears anywhere in the navbar (desktop or mobile); logged in,
  clicking it in the desktop nav signs out and lands on `/`, and the same
  works from the mobile drawer.

## Verify

- `npm run build` (no test runner configured for this project).
- Manual, on `http://localhost:3000`: logged out, confirm the navbar (both
  desktop and mobile-menu-open states) shows no Logout link. Log in, confirm
  it appears in both, and clicking it from each ends the session and
  redirects home. Confirm `/logout` (direct link) still works unchanged.

Verified: `npm run build` passed after each step with the static/dynamic
route split unchanged (no page lost static rendering); user manually
confirmed both the logged-out (no link) and logged-in (link present in
desktop nav and mobile drawer, signs out correctly) states in the browser.
