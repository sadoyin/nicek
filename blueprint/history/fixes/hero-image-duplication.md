# Fix: Hero banner images fetched twice on 5 pages

**Type:** Fix
**Fixes:** F-10

## The problem

On `src/app/services/autos/page.tsx`, `services/healthcare/page.tsx`,
`services/food/page.tsx`, `services/investments/page.tsx`, and
`src/app/about/page.tsx`, the decorative low-opacity banner wash is a raw CSS
`background-image: url(...)` on a plain `<div>`, using the exact same file
that a `next/image` `<Image fill>` immediately below it renders at full
quality. The CSS path bypasses Next's image optimizer, so the browser
downloads the full original file a second time purely for a 20-25%-opacity
backdrop. Worst case is `autoparts-scaled.webp` (437KB) on `/services/autos` -
doubling to ~874KB of image transfer for one hero.

**Scope correction from F-10's original file list:** `src/app/contact/page.tsx:86`
was listed in F-10 but does not actually have this defect - it loads
`realestate.webp` once via CSS background with no paired `<Image>` reusing
the same file elsewhere on that page, so there's no duplicate fetch to
remove there. This fix does not touch `contact/page.tsx`.

## The fix

Drop the redundant CSS `background-image` decorative layer on the affected
pages, since each one already shows the same photo via the optimized
`<Image>` below it. The gradient overlay `<div>` (`bg-gradient-to-r
from-zinc-950 via-zinc-900/90 to-transparent`) stays, over the section's
existing `bg-zinc-900` base - this keeps the banner's dark, gradient look
without a second fetch of the image.

## Build steps

- [x] **Step 1 - Remove duplicate background-image divs** - Removed the
  duplicate `background-image` div from `services/autos/page.tsx`,
  `services/healthcare/page.tsx`, `services/food/page.tsx`,
  `services/investments/page.tsx`, and `about/page.tsx`.
- [x] **Step 2 - Repair F-12 (3 more instances of the same pattern,
  discovered during `/audit` re-review of Step 1)** - Removed the same
  duplicate `background-image` div from `services/page.tsx`,
  `services/exports/page.tsx`, and `services/tech/page.tsx`.

## Verify

- `npm run build` passed with no new errors/warnings, both times.
- `npm run lint` on every changed file showed only pre-existing unused-import
  warnings, no new issues.
- Confirmed via `git diff` that every change was exactly one line removed,
  nothing else touched.
- Confirmed via the dev server that the hero image on `/services/autos` (the
  worst case) no longer appears as a raw CSS background, only through the
  optimized `<Image>`.

## Findings

### hero-image-duplication/F-10 [P1] closed - Hero banner images fetched twice, once at full size outside Next's image optimizer

**File:** src/app/services/autos/page.tsx:35 (paired with the `<Image>` at
line 73), src/app/services/healthcare/page.tsx:32 (paired with line 69),
src/app/services/food/page.tsx:31 (paired with line 68),
src/app/services/investments/page.tsx:31 (paired with line 68),
src/app/about/page.tsx:102 (paired with line 171)
**Found:** 2026-09-07 by /audit (scope: full; lens: performance)
**Why it matters:** Each of these pages rendered its low-opacity decorative
banner wash as a raw CSS `background-image: url(...)` on a plain `<div>`,
using the exact same file that a `next/image` `<Image fill>` immediately
below it also rendered at full quality. The CSS `url()` path bypasses Next's
image optimizer entirely (no resizing, no format re-negotiation, no
responsive `sizes`), so the browser downloaded the full original asset a
second time purely for a 20-25%-opacity backdrop. `autoparts-scaled.webp`
(437KB) was the worst case, on `/services/autos` - doubling to ~874KB of
image transfer on a single page load.
**Suggested fix:** Drop the duplicate CSS layer on pages that already
render the same photo via `<Image>` and achieve the fade with a
gradient/overlay `<div>` alone.
**Resolution:** Fixed 2026-09-08 via `/fix` (fix/hero-image-duplication):
dropped the redundant CSS `background-image` div from autos, healthcare,
food, investments, and about - each already showed the same photo via an
optimized `<Image>`. Scope correction: `src/app/contact/page.tsx` was in
the original file list but does not have this defect (no paired `<Image>`
reusing the same file there), so it was not touched and is removed from
this finding's scope. Closed 2026-09-08 by `/audit` (scope: current; lens:
performance): re-examined all 5 diffs, each removes exactly the duplicate
CSS line and nothing else; the paired `<Image>` on every page is untouched.
Same audit pass found 3 more pages with the identical defect, missed by
the original full-project sweep - tracked separately as F-12.

### hero-image-duplication/F-12 [P1] closed - Hero banner images fetched twice (3 more instances of the F-10 pattern, missed by the original sweep)

**File:** src/app/services/page.tsx:90 (duplicated by the "Imports & Exports"
card's `<Image>` further down the same page), src/app/services/exports/page.tsx:31
(paired with the `<Image>` at line 68), src/app/services/tech/page.tsx:31
(paired with the `<Image>` at line 68)
**Found:** 2026-09-08 by /audit (scope: current; lens: performance)
**Why it matters:** Identical defect to F-10: each page renders its
decorative banner wash as a raw CSS `background-image: url(...)`, using the
same file a `next/image` elsewhere on the same page already renders
optimized. The CSS path bypasses resizing/optimization, so the file
downloads twice. Smaller magnitude than F-10's worst case
(`upscalemedia-transformed-3-1.webp` is 43KB, `jacqueline-day-...webp` is
23KB, vs. `autoparts-scaled.webp`'s 437KB), but the same duplication
mechanism. The original full-project audit that raised F-10 swept
`src/app` for this pattern but missed these three.
**Suggested fix:** Same as F-10 - drop the duplicate CSS
`background-image` div on each of the 3 pages; the gradient overlay div
alone keeps the banner's dark look.
**Resolution:** Fixed 2026-09-08 via `/fix` (fix/hero-image-duplication):
dropped the redundant CSS `background-image` div from `services/page.tsx`,
`services/exports/page.tsx`, and `services/tech/page.tsx`, mirroring the
F-10 repair exactly. `npm run build` and lint both pass. Closed 2026-09-08
by `/audit` (scope: current; lens: performance): re-examined all 3 diffs,
each removes exactly the duplicate CSS line and nothing else; a full
re-sweep of `src/app` found no remaining instances of this pattern.
