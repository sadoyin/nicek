# Fix: Add sitemap.xml and robots.txt

**Type:** Fix
**Fixes:** F-03
**Status:** complete

## The problem

Confirmed missing: `src/app/sitemap.ts`, `src/app/robots.ts`,
`public/sitemap.xml`, `public/robots.txt` - none exist. A 10-route
multi-page site with no sitemap makes search engines rely purely on crawl
discovery through internal links, slowing indexing of newer or
less-linked pages. No robots.txt means no explicit crawl guidance or
sitemap pointer either.

## The fix

Add Next's built-in App Router metadata routes:

- `src/app/sitemap.ts` exporting a `MetadataRoute.Sitemap` function listing
  all 10 routes with the site's base URL.
- `src/app/robots.ts` exporting a `MetadataRoute.Robots` function allowing
  all crawlers (the whole site is public) and pointing at the sitemap.

Both need the same base-URL resolution `layout.tsx` already has
(`NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → `localhost:3000`). That logic was
extracted to `src/lib/site-url.ts` so it isn't duplicated a third time, and
`layout.tsx` imports it too (pure refactor, no behavior change there).

## Build steps

- [x] **Step 1 - Extract the site-URL helper** - create
  `src/lib/site-url.ts` exporting `getSiteUrl()` with the existing
  `NEXT_PUBLIC_SITE_URL`/`VERCEL_URL`/localhost fallback logic; update
  `layout.tsx` to import and use it instead of its inline copy. *Done when:*
  `npm run build` passes and `/`'s metadataBase-derived URLs are unchanged
  (same behavior, just relocated).

  Verified: build passed, `/` title unchanged.
- [x] **Step 2 - Add sitemap.ts and robots.ts** - add `src/app/sitemap.ts`
  listing all 10 routes using `getSiteUrl()`, and `src/app/robots.ts`
  allowing all crawlers and referencing the sitemap. *Done when:* `npm run
  build` passes, `/sitemap.xml` and `/robots.txt` return valid content
  listing/referencing all 10 routes.

  Verified: fetched `/sitemap.xml` live (10 `<loc>` entries, valid XML) and
  `/robots.txt` (allows all, references the sitemap).

## Verify

1. `npm run build` passes clean.
2. Fetch `/sitemap.xml` - confirm it's valid XML listing all 10 routes with
   absolute URLs.
3. Fetch `/robots.txt` - confirm it allows crawling and references the
   sitemap URL.
4. Spot-check `/` still renders correctly (metadataBase refactor didn't
   break anything).

## Findings

### sitemap-robots/F-03 [P2] closed - No sitemap.xml or robots.txt

**File:** n/a (missing: `src/app/sitemap.ts`, `src/app/robots.ts`)
**Found:** 2026-09-01 by /audit (scope: full; lens: SEO)
**Why it matters:** Confirmed missing (checked `src/app/sitemap.ts`,
`src/app/robots.ts`, `public/sitemap.xml`, `public/robots.txt` - none exist).
A 10-route multi-page site with no sitemap makes search engines rely purely
on crawl discovery through internal links instead of an explicit page list,
slowing indexing of newer or less-linked pages (e.g. the individual service
detail pages). No robots.txt means no explicit crawl guidance or sitemap
pointer either.
**Suggested fix:** Add `src/app/sitemap.ts` (Next's built-in `MetadataRoute.Sitemap`
API) listing all 10 routes, and `src/app/robots.ts` pointing at it. Both are
small, standard Next.js App Router files.
**Resolution:** Fixed via `/fix` (2026-09-01): added `src/app/sitemap.ts`
listing all 10 routes and `src/app/robots.ts` allowing all crawlers and
referencing the sitemap; extracted the site-URL fallback logic out of
`layout.tsx` into `src/lib/site-url.ts` so both new files and the layout
share it. Verified: fetched `/sitemap.xml` (10 `<loc>` entries) and
`/robots.txt` (allows all, references the sitemap) live; `/` still renders
its original title unchanged. Closed by `/audit` (2026-09-01, scope: current
branch fix/sitemap-robots vs main; lens: all): reviewed the full diff across
4 files - `layout.tsx` change is a pure extraction (no logic change), the
two new route files and helper match the spec exactly. No new defect.
