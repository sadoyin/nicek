# Fix: Unique per-page SEO metadata

**Type:** Fix
**Fixes:** F-01
**Status:** complete

## The problem

Confirmed via grep: only `src/app/layout.tsx` exports `metadata` anywhere in
the project. All 10 routes (`/`, `/about`, `/services`, 6 service detail
pages, `/contact`) render the exact same `<title>`, meta description, and
Open Graph tags. Search engines see 10 pages with duplicate titles and
descriptions - a well-known, heavily-penalized SEO anti-pattern, and exactly
the "poor SEO" problem this revamp exists to fix.

## The fix

Switch `layout.tsx` to Next's `title.template` pattern, then give each of
the 9 non-home routes its own `title` (a short page name, auto-suffixed with
"| Nicek Group") and a unique `description` and `openGraph.{title,description}`
pulled from that page's own real on-page copy (not invented) - each page
already has distinct H1s and body copy to draw from.

`/` (`src/app/page.tsx`) needs no change: with `title.template`, a route
with no `title` of its own falls back to the layout's `default` title, and
the layout's current title/description is already written as ideal homepage
SEO copy. That's correct default behavior, not a gap.

Layout changes:

```tsx
title: {
  default: "Nicek Group | Diversified Conglomerate - Trade, Tech, Healthcare",
  template: "%s | Nicek Group",
},
```

Per-page title/description (source: each page's own existing copy):

| Route | Title | Description |
|---|---|---|
| `/about` | About Us | Learn about Nicek Group's mission, vision, and values - a diversified conglomerate delivering sustainable value across healthcare, trade, technology, and real estate in the US and Nigeria. |
| `/services` | Our Services | Explore Nicek Group's services across healthcare, international exports, auto spare parts, technology, real estate investments, and food & beverage production. |
| `/services/healthcare` | Healthcare Services | Nicek Healthcare Services delivers home healthcare, medical staffing, telemedicine, and corporate wellness programs for individuals, hospitals, and senior care facilities. |
| `/services/exports` | International Exports | Anchor American Exports connects global markets with premium shipping and procurement of agricultural produce, industrial materials, and consumer goods from the Americas. |
| `/services/autos` | Auto Spare Parts | Anchor Auto Spare Parts sources and ships premium automotive components, replacement parts, and engines for workshops and mechanics worldwide. |
| `/services/investments` | Investments & Real Estate | Nicek Investments delivers strategic real estate development, agricultural investments, and infrastructure funding partnerships across Nigeria and beyond. |
| `/services/tech` | Technology Solutions | Nicek Technologies delivers IT consulting, cloud solutions, cybersecurity, and custom software development to help businesses operate securely and efficiently. |
| `/services/food` | Food & Beverages | C&C Food and Beverages manufactures premium bottled water and consumable beverages using locally sourced, eco-friendly ingredients and packaging. |
| `/contact` | Contact Us | Get in touch with Nicek Group's offices in Wyoming, Boston, and Lagos for partnerships, supply requests, and consulting services. |

Must not change page content, layout, or any visible UI - metadata only.

## Build steps

- [x] **Step 1 - title.template in layout.tsx** - change `metadata.title` from
  a plain string to `{ default, template: "%s | Nicek Group" }`. *Done when:*
  `npm run build` passes and `/` still renders the same title as before
  (verified by fetching `/` and checking the `<title>` tag).

  Verified: build passed, `/` title unchanged.
- [x] **Step 2 - Add metadata to the 9 non-home pages** - add
  `import type { Metadata } from "next";` and `export const metadata: Metadata
  = { title, description, openGraph: { title, description } }` to each of the
  8 files in the table above. *Done when:* fetching each route and checking
  its `<title>` tag shows a unique, page-specific title (not the shared
  default), `npm run build` passes, and re-grepping confirms exactly 10
  distinct `<title>` values across the 10 routes (was 1 before).

  Verified: fetched all 10 routes live, confirmed 10 distinct `<title>`
  values.

## Verify

1. `npm run build` passes clean.
2. Fetch each of the 10 routes and extract the `<title>` tag - confirm 10
   distinct values (1 default for `/`, 9 unique page titles all ending
   "| Nicek Group").
3. Spot-check that `/` itself still shows the original homepage title
   unchanged.

## Findings

### per-page-metadata/F-01 [P1] closed - Every page shares one identical title/description/OG tag set

**File:** src/app/layout.tsx (only `export const metadata` in the whole project)
**Found:** 2026-09-01 by /audit (scope: full; lens: SEO/UI-UX)
**Why it matters:** Confirmed via grep: none of the 10 route pages
(`/`, `/about`, `/services`, `/services/*` x6, `/contact`) export their own
`metadata`. Every one of them renders the exact same title ("Nicek Group |
Diversified Conglomerate - Trade, Tech, Healthcare"), meta description, and
Open Graph tags inherited from the root layout. This is one of the most
common and heavily-penalized SEO anti-patterns: search engines see 10 pages
with duplicate titles/descriptions and can't tell them apart, which is
exactly the "poor SEO" problem this revamp exists to fix, still unresolved.
No page has its own targeted keywords (e.g. "Healthcare Services Nigeria",
"Auto Spare Parts Import USA") even though the content clearly supports them.
**Suggested fix:** Add a page-specific `export const metadata: Metadata`
(or `generateMetadata`) to each route, with a unique title, description, and
OG image/url per page. The service detail pages already have per-sector copy
(title, description) in their data arrays - reuse it directly.
**Resolution:** Fixed via `/fix` (2026-09-01): `layout.tsx` switched to
Next's `title.template` pattern (`default` + `"%s | Nicek Group"`); each of
the 9 non-home routes given its own `title`/`description`/`openGraph`,
sourced from that page's existing on-page copy. `/` unchanged (correctly
falls back to the layout default). Verified: fetched all 10 routes and
confirmed 10 distinct `<title>` values (was 1 shared value before). Closed
by `/audit` (2026-09-01, scope: current branch fix/per-page-metadata vs
main; lens: all): reviewed the full diff across all 8 changed source files -
every hunk is a purely additive metadata export (plus one harmless
whitespace-only import reformat in services/page.tsx), no structural or
unrelated changes. No new defect introduced by the repair.
