# Fix: Replace non-existent Tailwind zinc shades with real ones

**Type:** Fix
**Fixes:** F-02
**Status:** complete

## The problem

30 uses across 10 files reference zinc color steps that don't exist in
Tailwind's scale (50-900 in steps of 100, then 950 - no 405/450/455/650/655/
850/855). Verified empirically against the compiled production CSS
(`.next/static/chunks/45c4_jlxeq202.css`): `.text-zinc-650` and
`.text-zinc-450` generate **zero** rules, while the real `.text-zinc-500`
correctly generates one. Tailwind silently drops unrecognized utilities, so
every element using one of these classes falls back to an inherited color
instead of the intended one - live on the deployed site right now.

## The fix

Replace each corrupted value with the real step it was clearly meant to be,
based on the correct pairing already used consistently elsewhere in the same
codebase:

| Corrupted | Real value | Evidence |
|---|---|---|
| `zinc-650`, `zinc-655` | `zinc-600` | Every corrupted use pairs with `dark:zinc-400` on the same line; `zinc-600 dark:zinc-400` is the exact, already-correct body-text pattern used elsewhere (e.g. `src/app/about/page.tsx:194`, `src/app/page.tsx`). |
| `zinc-450`, `zinc-455`, `zinc-405` | `zinc-400` | Same pairing logic - these are the dark-mode half of a `600`/`400` pair. |
| `zinc-850`, `zinc-855` | `zinc-800` | Used as dark-mode borders and subtle hover/gradient highlights against a `zinc-900` base. `border-zinc-800` (not 850) is the standard dark-mode border color used everywhere else in this codebase (e.g. every `Card` component's `dark:border-zinc-800/60`), and a one-step-lighter highlight over `bg-zinc-900` matches the existing CTA gradient pattern. |

This is a mechanical, one-for-one class replacement - no layout, spacing, or
structural changes. Must not change anything except which real color renders.

## Build steps

- [x] **Step 1 - Replace corrupted zinc shades** - across the 10 affected
  files (`src/components/navbar.tsx`, `src/app/about/page.tsx`,
  `src/app/contact/page.tsx`, `src/app/services/page.tsx`,
  `src/app/services/{autos,tech,food,exports,investments,healthcare}/page.tsx`),
  replace every `zinc-650`/`zinc-655` with `zinc-600`, every
  `zinc-450`/`zinc-455`/`zinc-405` with `zinc-400`, and every
  `zinc-850`/`zinc-855` with `zinc-800`. *Done when:* re-grepping
  `src/` for `zinc-(405|450|455|650|655|850|855|905|955)` returns no matches,
  `npm run build` passes, and re-checking the compiled CSS shows the affected
  selectors (e.g. `.text-zinc-600`, `.dark\:text-zinc-400`) now actually
  exist and are applied where the corrupted classes used to be.

  Verified: zero matches in source, build passed clean, compiled CSS
  confirmed to contain real rules for the replacement selectors.

## Verify

1. `Grep zinc-(405|450|455|650|655|850|855|905|955) src/` returns nothing.
2. `npm run build` passes clean.
3. Grep the compiled production CSS for a couple of the replaced selectors
   (e.g. `.text-zinc-600`) to confirm they now actually generate rules.
4. Visual spot-check of one service detail page (light + dark mode) to
   confirm text/borders still look coherent, not broken or invisible.

## Findings

### tailwind-zinc-shades/F-02 [P1] closed - 30 uses of non-existent Tailwind zinc shades produce no CSS

**File:** src/components/navbar.tsx (6), src/app/contact/page.tsx (1),
src/app/about/page.tsx (1), src/app/services/page.tsx (1),
src/app/services/{autos,tech,food}/page.tsx (4 each),
src/app/services/{exports,investments,healthcare}/page.tsx (3 each)
**Found:** 2026-09-01 by /audit (scope: full; lens: SEO/UI-UX)
**Why it matters:** Classes like `text-zinc-650`, `dark:text-zinc-450`,
`hover:bg-zinc-850`, `text-zinc-655`, `text-zinc-405`, `text-zinc-455` use
shade steps that don't exist in Tailwind's zinc scale (50-900 in steps of
100, then 950 - no 405/450/455/650/655/850/855). Verified empirically: grepped
the actual compiled production CSS
(`.next/static/chunks/45c4_jlxeq202.css`) and confirmed `.text-zinc-650`,
`.text-zinc-450`, and `.zinc-850` generate **zero** rules, while the control
`.text-zinc-500` correctly generates one. These 30 utility usages are dead -
Tailwind silently drops them, so the element falls back to whatever color it
inherits instead of the intended one. This is live on the deployed site right
now and affects text color consistency (and potentially contrast/legibility)
across nearly every page.
**Suggested fix:** Replace each with the nearest real step on the zinc scale
(650→600 or 700, 450→400 or 500, 850→800 or 900, etc., picking based on which
direction preserves the intended contrast). A single find-and-replace pass
across the 10 files, verified by re-grepping the compiled CSS afterward.
**Resolution:** Fixed via `/fix` (2026-09-01): replaced `zinc-650`/`zinc-655`
with `zinc-600`, `zinc-450`/`zinc-455`/`zinc-405` with `zinc-400`, and
`zinc-850`/`zinc-855` with `zinc-800` across all 10 files. Closed by `/audit`
(2026-09-01, scope: current branch fix/tailwind-zinc-shades vs main; lens:
all): reviewed the full diff across all 10 changed files - every hunk is a
pure class-value swap matching the stated mapping exactly, no structural,
logic, or unrelated changes. Re-confirmed zero matches for the corrupted
pattern in `src/`, build passes, and the compiled production CSS contains
real rules for `.text-zinc-600`, `text-zinc-400`, and `zinc-800` where the
dead classes used to be. No new defect introduced by the repair.
