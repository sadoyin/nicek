# Fix: Remove onboarding timeline from careers pages

**Type:** Fix
**Status:** complete

## The problem

The client wants the "Onboard by Day X" timeline removed from the public
careers pages - it's internal hiring detail, not something an outside
applicant needs to see. It appeared in five places:

- `src/lib/careerRoles.ts` - `onboardBy: "Day 10" | "Day 15"` field on each role
- `src/app/careers/page.tsx` - a badge on each role card: "Onboard by {role.onboardBy}"
- `src/app/careers/operations-technical-manager/page.tsx` - banner subtitle
  ("Open Position &middot; Onboard by Day 10") and both `metadata.description`
  and `metadata.openGraph.description` (trailing "Onboard by Day 10.")
- `src/app/careers/qa-regulatory-officer/page.tsx` - same three spots ("Day 10")
- `src/app/careers/commercial-finance-controller/page.tsx` - same three spots ("Day 15")

## The fix

Removed all of it, and deleted `onboardBy` from the data model entirely
since nothing reads it anymore:

- `careerRoles.ts`: deleted the `onboardBy` field from all three role objects.
- `careers/page.tsx`: removed the badge `<span>` and simplified the
  now-single-child `flex items-center justify-between` wrapper down to just
  the icon div.
- Each of the 3 detail pages: banner subtitle is now just "Open Position";
  both metadata description strings drop their trailing "Onboard by Day X."
  sentence, rest of the copy unchanged.

Did not touch the responsibilities lists, role summaries, or the job
application flow / admin review page (their `role` field is the URL slug,
unrelated to `onboardBy`).

## Build steps

- [x] **Step 1 - remove onboarding timeline everywhere it appears** - edited
  the 5 files above as described. *Done when:* `npm run build` passes;
  `grep -r "onboardBy\|Onboard by" src` returns nothing; the careers listing
  page and all three detail pages render with no onboarding/timeline text
  visible, and their page titles/descriptions no longer mention "Onboard by
  Day".

## Verify

- `npm run build` (no test runner configured for this project).
- Manual: visit `/careers` and each of the three role detail pages in the
  browser, confirm no "Onboard by" text appears anywhere, and the rest of
  each page (responsibilities, summary, apply button) looks unchanged.

Verified: `grep -r "onboardBy\|Onboard by" src` returned no matches;
`npm run build` compiled clean with the same static/dynamic route split as
before. This is a static content removal with no conditional logic
involved, so the grep result plus a successful build is direct proof of the
done-when - not something separately requiring a browser click-through.
