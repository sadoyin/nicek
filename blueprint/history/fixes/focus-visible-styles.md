# Fix: Add consistent focus-visible styling site-wide

**Type:** Fix
**Fixes:** F-08
**Status:** complete

## The problem

Custom-styled `<Link>`/`<button>` elements throughout the site (64 `hover:`
usages across 17 files) define hover states but no explicit
`focus-visible:` treatment, so keyboard-only visitors depend entirely on
each browser's inconsistent default outline. WCAG 2.4.7 (Focus Visible)
expects a clear, consistent focus indicator.

## The fix

Rather than manually annotating dozens of individual `className` strings
across 17 files (error-prone, easy to miss some, and duplicates the same
utility everywhere), added one global rule to `src/app/globals.css`'s
existing `@layer base` block that applies a consistent focus-visible
outline to every link and button site-wide:

```css
a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible {
  @apply outline-2 outline-offset-2 outline-zinc-900 dark:outline-zinc-100;
}
```

This covers every current and future interactive element automatically.

## Build steps

- [x] **Step 1 - Add the focus-visible base rule** - add the CSS above to
  `globals.css`'s `@layer base` block. *Done when:* `npm run build` passes;
  tabbing to a link or button in the browser shows a visible outline;
  mouse-clicking one does not.

  Verified: build passed, compiled CSS confirmed to contain the new
  `:focus-visible` rule. Live keyboard tab-through not performed (no
  working browser tool in this session).

## Verify

1. `npm run build` passes clean.
2. Inspect the compiled CSS for the new `:focus-visible` selectors.
3. Manual/visual check: tab through the navbar in a browser and confirm a
   visible ring appears on the focused link/button.

## Findings

### focus-visible-styles/F-06 [P2] accepted - Footer legal links are dead placeholders

**File:** src/app/layout.tsx:200-217 (Privacy Policy, Terms of Service, Cookie Policy)
**Found:** 2026-09-01 by /audit (scope: full; lens: UI-UX)
**Why it matters:** All three links use `href="#"` - clicking them does
nothing (or jumps to page top). This was fine as a placeholder during early
scaffolding, but the site now has a live contact form actively collecting
names, emails, and messages (feature 7) with no linked privacy policy
explaining what happens to that data - a real trust and UX gap for a
business site asking visitors to submit personal information.
**Suggested fix:** Either write and link real Privacy/Terms/Cookie pages, or
temporarily remove the links until that content exists, rather than shipping
dead links on every page (they're in the global footer).
**Resolution:** Accepted by the user (2026-09-01): legal documents (privacy
policy, terms, cookie policy) don't exist yet, so there's nothing real to
link. Revisit once that content is available. Archived here (2026-09-01)
having had no other pending fix to sweep it up - not resolved by this fix,
carried forward from the original 2026-09-01 full audit.

### focus-visible-styles/F-08 [P3] closed - No explicit focus-visible styling on most interactive elements

**File:** navbar links, hero/CTA buttons, subsidiary/service cards across
`src/app/page.tsx`, `src/app/services/**`, `src/components/navbar.tsx` (only
`src/app/contact/page.tsx` form inputs and the shadcn `button.tsx` primitive
have explicit `focus:`/`focus-visible:` styles)
**Found:** 2026-09-01 by /audit (scope: full; lens: UI-UX)
**Why it matters:** Custom-styled `<Link>`/`<button>` elements throughout the
site define `hover:` states but no explicit `focus-visible:` treatment, so
keyboard-only visitors tabbing through the site depend entirely on each
browser's inconsistent default outline (which some browsers suppress or
render faintly against these custom backgrounds). WCAG 2.4.7 (Focus Visible)
expects a clear, consistent focus indicator.
**Suggested fix:** Add a consistent `focus-visible:ring-2 focus-visible:ring-zinc-900
dark:focus-visible:ring-white` (or similar) utility to the shared interactive
element patterns.
**Resolution:** Fixed via `/fix` (2026-09-01): rather than annotating dozens
of individual className strings across 17 files, added one global
`a:focus-visible, button:focus-visible, [role="button"]:focus-visible` rule
to `globals.css`'s `@layer base`, covering every current and future
interactive element automatically. Verified: build passes, compiled CSS
confirmed to contain the new `:focus-visible` rule. Live keyboard tab-through
not performed (no working browser tool in this session). Closed by `/audit`
(2026-09-01, scope: current branch fix/focus-visible-styles vs main; lens:
all): reviewed the diff - a single, purely additive CSS block in
`globals.css`, no other files touched, no risk of missed coverage since it
applies globally by element type. No new defect.
