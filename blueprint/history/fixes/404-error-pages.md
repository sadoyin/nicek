# Fix: Add branded 404 and error pages

**Type:** Fix
**Fixes:** F-07
**Status:** complete

## The problem

Confirmed missing: `src/app/not-found.tsx`, `src/app/error.tsx`. A visitor
hitting a typo'd URL or dead link sees Next.js's bare default 404 page - no
branding, no nav back into the site, no matching light/dark theme. Same for
an unexpected runtime error (Next's default error screen).

## The fix

Added both as small pages matching the site's existing dark banner/CTA
visual pattern:

- `src/app/not-found.tsx` - server component. Heading "Page Not Found",
  short explanation, links to Home and Contact.
- `src/app/error.tsx` - client component per Next's error boundary contract
  (`"use client"`, `error`/`reset` props). Heading "Something Went Wrong",
  short apology, a "Try Again" button calling `reset()`, and a link back to
  Home.

## Build steps

- [x] **Step 1 - Add not-found.tsx and error.tsx** - create both files.
  *Done when:* `npm run build` passes; visiting a nonexistent route shows
  the branded 404 page instead of Next's default; the error page component
  renders correctly when manually triggered.

  Verified: fetched `/does-not-exist` live, confirmed 404 status with the
  branded heading. `error.tsx` verified by code review against Next's
  error-boundary contract.

## Verify

1. `npm run build` passes clean.
2. Fetch a nonexistent route (e.g. `/does-not-exist`) - confirm the response
   contains the branded 404 heading/copy, not Next's generic default.
3. Visual/code review of `error.tsx` confirms it's a valid client-component
   error boundary matching Next's contract (`"use client"`, `error`/`reset`
   props, calls `reset()` on retry).

## Findings

### 404-error-pages/F-07 [P3] closed - No custom 404 or error boundary page

**File:** n/a (missing: `src/app/not-found.tsx`, `src/app/error.tsx`)
**Found:** 2026-09-01 by /audit (scope: full; lens: UI-UX)
**Why it matters:** Confirmed missing. A visitor hitting a typo'd URL or a
dead external link sees Next.js's bare default 404 page - no branding, no
nav back into the site, no matching light/dark theme. Same for an unexpected
runtime error (Next's default error screen). Both are one-file, low-effort
additions expected on a "modern website."
**Suggested fix:** Add `src/app/not-found.tsx` and `src/app/error.tsx`
matching the site's existing banner/CTA visual pattern, with a link back to
`/` and `/contact`.
**Resolution:** Fixed via `/fix` (2026-09-01): added both files matching
the site's zinc palette and button styles, with Home/Contact links.
Verified: fetched `/does-not-exist` live, confirmed a 404 status with the
branded heading (not Next's default page). `error.tsx` verified by code
review against Next's error-boundary contract (forcing a real runtime error
isn't practical to script). Closed by `/audit` (2026-09-01, scope: current
branch fix/404-error-pages vs main; lens: all): reviewed both new files -
match the site's zinc palette/button patterns, `error.tsx` correctly
implements Next's client-component error-boundary contract. No new defect.
