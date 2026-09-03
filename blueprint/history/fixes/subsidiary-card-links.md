# Fix: Home page subsidiary cards link to the wrong page

**Type:** Fix
**Fixes:** F-10
**Status:** complete

## The problem

Confirmed in `src/app/page.tsx:285-291`: every one of the 6 subsidiary
cards on `/` renders `<Link href="/services">Learn More</Link>` - hardcoded
to the generic services overview instead of that subsidiary's own detail
page (e.g. the Healthcare card should link to `/services/healthcare`).
Clicking "Learn More" on any card sends the visitor to the same generic
page regardless of which one they clicked. Chrome Lighthouse also flagged
this as a Best Practices issue (identical "Learn More" text on 6 links,
non-descriptive out of context) - a symptom of the same root cause.

## The fix

Each subsidiary object already has a `sector` field ("Healthcare",
"Exports", "Autos", "Investments", "Tech", "Food") that maps 1:1 to the
existing route slugs. Used `` `/services/${sub.sector.toLowerCase()}` `` as
the link's `href`, and added an `sr-only` span with the subsidiary's name
after the visible "Learn More" text so the accessible name is descriptive.

## Build steps

- [x] **Step 1 - Fix the link href and accessible name** - update the
  `Link` in the `CardFooter` map to use the per-subsidiary href and add the
  `sr-only` descriptive span. *Done when:* fetching `/` and inspecting each
  card's link shows 6 distinct hrefs matching each subsidiary's real detail
  page, `npm run build` passes, and the visible card layout is unchanged.

  Verified: fetched `/` live, extracted all 6 hrefs - each points to its
  own distinct, correct route; confirmed all 6 sr-only spans present.

## Verify

1. `npm run build` passes clean.
2. Fetch `/` and extract all 6 subsidiary card links - confirm each `href`
   points to the correct `/services/<sector>` route (not all `/services`).
3. Visual spot-check that the cards look identical to before.

## Findings

### subsidiary-card-links/F-10 [P1] closed - Home page subsidiary cards all link to the wrong page

**File:** src/app/page.tsx:285-291 (all 6 subsidiary cards, `CardFooter`)
**Found:** 2026-09-03 by the user via a Chrome Lighthouse audit (Best
Practices: "Links do not have descriptive text - 6 links found")
**Why it matters:** Confirmed in code: every one of the 6 subsidiary cards
on `/` renders `<Link href="/services">Learn More</Link>` - hardcoded to the
generic services overview instead of that subsidiary's own detail page
(e.g. the Healthcare card should link to `/services/healthcare`). This is a
real navigation bug, not just an accessibility nitpick: clicking "Learn
More" on any card sends the visitor to the same generic overview page
regardless of which subsidiary they clicked, forcing an extra click to find
the page they actually wanted. Lighthouse's complaint (identical "Learn
More" text on 6 links, non-descriptive out of context) is a symptom of the
same root cause.
**Suggested fix:** Each subsidiary object already has a `sector` field
("Healthcare", "Exports", "Autos", "Investments", "Tech", "Food") that maps
1:1 to the existing route slugs - use `` `/services/${sub.sector.toLowerCase()}` ``
as the `href`. Add an `sr-only` span with the subsidiary's name after the
visible "Learn More" text so the accessible name is descriptive without
changing the compact visual design.
**Resolution:** Fixed via `/fix` (2026-09-03): each card's link now uses
`` `/services/${sub.sector.toLowerCase()}` `` and includes an `sr-only`
span naming the subsidiary. Verified: fetched `/` live, extracted all 6
hrefs - each points to its own distinct, correct route; confirmed all 6
sr-only spans present. Closed by `/audit` (2026-09-03, scope: current
branch fix/subsidiary-card-links vs main; lens: all): reviewed the diff - a
two-line change matching the spec exactly, correct for all 6 sector
values. No new defect.
