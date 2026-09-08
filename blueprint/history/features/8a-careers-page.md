# Feature: Careers page

**From build-plan:** feature 8a
**Status:** complete

## Goal

Give Nicek's Phase-1 hiring a public home on the site: a `/careers` page
listing the three open roles, one detail page per role with the client's full
description, and a footer link so it's reachable from anywhere. This is the
fast-shipping first slice of feature 8 - it needs no new infrastructure and
unblocks the client's Day 10/Day 15 hiring timeline immediately, ahead of
accounts (8b) and the application flow (8c).

## In scope

- `/careers` overview page - card grid listing the three roles, matching the
  visual pattern of `/services` (`src/app/services/page.tsx`).
- One static detail page per role, matching the existing per-sector pattern
  (`src/app/services/autos/page.tsx` etc.): full description, key
  responsibilities, and the onboarding-by-day note, sourced from the client's
  copy below.
- A "Careers" link in the footer's "Important Links" column
  (`src/app/layout.tsx`), next to Privacy Policy / Terms / Cookie Policy.
- An "Apply Now" call-to-action on each detail page, pointed at `/contact`
  for now (see Notes for the AI - this is a deliberate interim target).
- Metadata (`Metadata` export, Open Graph) on all four new pages, consistent
  with every other page in the site.

## Out of scope

- Accounts, login, or any auth (feature 8b).
- The actual application form, resume upload, or storing anything (feature
  8c).
- The admin review page (feature 8d).
- Changing the existing `/contact` page or its form.

## Role content (from the client)

1. **Operations & Technical Manager** - runs the factory: rehab, production,
   equipment, maintenance, daily supervision. Onboard by Day 10.
2. **QA / Regulatory Officer** - quality control and NAFDAC/SON compliance,
   with authority to stop production if standards aren't met. Kept
   independent from Operations on purpose. Onboard by Day 10.
3. **Commercial & Finance Controller** - sales, distribution, cash
   collection, and inventory, run under the cash/credit controls (same-day
   banking, 3-day collection cap, weekly external reconciliation). Onboard
   by Day 15.

## Build steps

- [x] **Step 1 - Careers overview page** - Added `src/app/careers/page.tsx`:
  a hardcoded array of the three roles rendered as a card grid, following the
  home page's card style (no dedicated per-role photography, so the
  photo-heavy `services/page.tsx` row layout didn't fit).
- [x] **Step 2 - Role detail pages** - Added
  `src/app/careers/operations-technical-manager/page.tsx`,
  `src/app/careers/qa-regulatory-officer/page.tsx`, and
  `src/app/careers/commercial-finance-controller/page.tsx`, each with the
  client's description broken into a responsibilities list, an onboard-by-day
  badge, and an "Apply Now" CTA to `/contact`.
- [x] **Step 3 - Footer link** - Added a "Careers" link to
  `src/app/layout.tsx`'s footer.

## Files / areas

- `src/app/careers/page.tsx` (new)
- `src/app/careers/operations-technical-manager/page.tsx` (new)
- `src/app/careers/qa-regulatory-officer/page.tsx` (new)
- `src/app/careers/commercial-finance-controller/page.tsx` (new)
- `src/app/layout.tsx` (footer link only)

## Data / contracts

None yet - role content is a hardcoded array/object per page, same pattern as
`subsidiaries` in `src/app/page.tsx`. No shape here is load-bearing for 8b/8c:
those features introduce their own `JobApplication` contract (already locked
in `project-overview.md`) independently of how this static content is
structured.

## Testing

No test runner configured - verified with the dev server, `npm run lint`, and
`npm run build` (this feature is entirely presentational, no logic to unit
test). All routes render correctly, footer link confirmed site-wide, and the
final post-merge build passed with all 19 routes static/dynamic as expected.

## Notes for the AI

- All four new pages are server components (no `"use client"`) - nothing
  here needs interactivity, matching the rest of the site.
- "Apply Now" targets `/contact` deliberately, not `/signup` - 8b/8c don't
  exist yet. 8c's spec is expected to change this CTA's target once the real
  apply flow exists.
- While this feature was in progress, a full-project performance audit found
  and fixed two related issues (F-10, F-12: duplicate/oversized hero images
  on other pages) via separate `/fix` passes, merged to `main` and pulled
  into this branch before completion.
