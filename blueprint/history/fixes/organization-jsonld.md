# Fix: Add Organization structured data (JSON-LD)

**Type:** Fix
**Fixes:** F-04
**Status:** complete

## The problem

Confirmed via grep: no `application/ld+json` structured data anywhere in
`src/`. For a company with multiple named physical offices, phone numbers,
and hours (already in the footer), adding `Organization` JSON-LD is standard
modern SEO practice - it's what lets Google show rich snippets (address,
hours, phone, logo) directly in search results instead of a plain link.

## The fix

Added a JSON-LD `<script type="application/ld+json">` block rendered in
`src/app/layout.tsx`, using data already present in the footer (not
invented): name, logo, url, sameAs (social links), and address for all
three offices.

## Build steps

- [x] **Step 1 - Add Organization JSON-LD to layout.tsx** - add the script
  tag with the `Organization` schema object. *Done when:* `npm run build`
  passes, the rendered HTML of `/` contains a
  `<script type="application/ld+json">` tag, and its content parses as
  valid JSON matching the schema.org `Organization` shape.

  Verified: fetched `/` live, extracted and parsed the script content as
  valid JSON - `@type: Organization`, correct name/logo/url, 3 addresses, 3
  social URLs, contactPoint with phone and email.

## Verify

1. `npm run build` passes clean.
2. Fetch `/` and extract the JSON-LD script content - confirm it parses as
   valid JSON with `@type: "Organization"`, the correct name/logo/url, all
   three addresses, and the three social URLs.
3. Visual spot-check that nothing on the page changed (the script renders
   nothing visible).

## Findings

### organization-jsonld/F-04 [P2] closed - No structured data (JSON-LD) for the business

**File:** n/a (no `application/ld+json` anywhere in `src/`)
**Found:** 2026-09-01 by /audit (scope: full; lens: SEO)
**Why it matters:** Confirmed via grep - no structured data anywhere. For a
company with multiple named physical offices, phone numbers, and hours
(already in the footer), adding `Organization`/`LocalBusiness` JSON-LD is
standard modern SEO practice - it's what enables Google to show rich
snippets (address, hours, phone, logo) directly in search results instead of
a plain blue link. This is exactly the kind of gap a revamp-for-SEO project
should close.
**Suggested fix:** Add a JSON-LD `<script type="application/ld+json">` block
in `layout.tsx` with `Organization` schema (name, logo, url, sameAs for the
social links, and `ContactPoint`/`PostalAddress` per office using the data
already in the footer).
**Resolution:** Fixed via `/fix` (2026-09-01): added an `Organization`
JSON-LD script to `layout.tsx` with name, logo, url, sameAs (3 social
links), a contactPoint, and all 3 office addresses, sourced from the
existing footer data. Verified: fetched `/` live, extracted and parsed the
script content as valid JSON, confirmed all fields correct. Closed by
`/audit` (2026-09-01, scope: current branch fix/organization-jsonld vs main;
lens: all): reviewed the diff - purely additive, one static const object
plus a script tag rendering it via `JSON.stringify` (no user input, no
injection risk), matches the spec and the footer's real data exactly. No
new defect.
