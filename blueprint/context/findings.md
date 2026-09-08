# Findings

> **Generated file.** The findings ledger: review findings raised by `/audit`
> against the work in progress, each with a durable ID, severity (P0-P3), and
> status. `/implement` marks repaired findings `fixed`, a later `/audit` pass
> moves them to `closed`, and `/complete` refuses to merge while any P0 or P1
> finding is `open` or `fixed`, then archives resolved findings with the work
> and resets this file.

### F-09 [P3] unverified - og:url hardcoded to a domain not yet live

**File:** src/app/layout.tsx:31 (`url: "https://nicekgroup.com"` in `openGraph`)
**Found:** 2026-09-01 by /audit (scope: full; lens: SEO)
**Why it matters:** The site is currently deployed at a `*.vercel.app` URL
(DNS cutover to nicekgroup.com not done yet, per project-plan.md). Sharing
the current live link would show a canonical OG URL pointing at a domain
that isn't serving this content yet. Low impact and self-resolving once DNS
is cut over - flagged as unverified/low-priority since it's a planned,
temporary state, not a code defect.
**Suggested fix:** No action needed before the domain cutover; revisit if
the Vercel URL is being shared/indexed in the meantime.
**Resolution:**

### F-11 [P2] open - `fill` images missing `sizes` default to full-viewport-width requests in a ~448px box

**File:** src/app/services/tech/page.tsx:68, src/app/services/investments/page.tsx:68,
src/app/services/food/page.tsx:68, src/app/services/exports/page.tsx:68,
src/app/services/healthcare/page.tsx:69
**Found:** 2026-09-07 by /audit (scope: full; lens: performance)
**Why it matters:** Each of these `<Image fill>` usages renders inside the
same `lg:col-span-5 relative aspect-square max-w-md` container used on
`/services/autos` (max ~448px wide), but omits the `sizes` prop that
`autos/page.tsx:76`, `about/page.tsx:174`, and `services/page.tsx:124` all
set correctly. Per Next.js's documented behavior, a `fill` image with no
`sizes` defaults to `sizes="100vw"`, so the browser's responsive `srcset`
picks a source sized for the full viewport instead of the ~448px box it
actually renders into - on a desktop viewport this requests an image several
times larger than what is displayed, for no visual benefit.
**Suggested fix:** Add the same `sizes="(max-width: 1024px) 100vw, 40vw"` (or
the exact container-appropriate equivalent) already used on the sibling
pages to each of these five `<Image>` elements.
**Resolution:**
