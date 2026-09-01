# Fix: Expose navbar disclosure menu state to assistive tech

**Type:** Fix
**Fixes:** F-05
**Status:** complete

## The problem

`src/components/navbar.tsx` has two buttons that toggle a menu's visibility
(services dropdown at lines 104-111, mobile hamburger at lines 180-186) but
neither sets `aria-expanded` to reflect current state, and the dropdown
trigger has no `aria-haspopup`. A screen reader user has no way to know
these buttons open a submenu or whether it's currently open - only sighted
users get the chevron rotation / hamburger-to-X visual cues.

## The fix

Added `aria-expanded={servicesDropdownOpen}` and `aria-haspopup="true"` to
the services dropdown trigger button; added `aria-expanded={mobileMenuOpen}`
to the mobile hamburger button. Both booleans already existed as component
state.

## Build steps

- [x] **Step 1 - Add aria attributes to both toggle buttons** - update the
  two `<button>` elements in `navbar.tsx`. *Done when:* the rendered HTML
  for both buttons includes the correct `aria-expanded` value matching
  their current open/closed state, and the dropdown trigger includes
  `aria-haspopup="true"`; `npm run build` passes; no visual change.

  Verified: fetched `/` live, confirmed both attributes render correctly
  (`false` by default).

## Verify

1. `npm run build` passes clean.
2. Fetch a page and inspect the rendered navbar HTML - confirm
   `aria-expanded="false"` on both buttons by default, and
   `aria-haspopup="true"` on the dropdown trigger.
3. Visual spot-check that the navbar looks and behaves identically.

## Findings

### navbar-aria-expanded/F-05 [P2] closed - Disclosure menus don't expose open/closed state to assistive tech

**File:** src/components/navbar.tsx:104-111 (services dropdown trigger),
src/components/navbar.tsx:180-186 (mobile hamburger)
**Found:** 2026-09-01 by /audit (scope: full; lens: UI-UX)
**Why it matters:** Both buttons toggle a menu's visibility (`servicesDropdownOpen`,
`mobileMenuOpen`) but neither sets `aria-expanded` to reflect current state,
and the dropdown trigger has no `aria-haspopup`. A screen reader user tabbing
to "Services" or the hamburger icon has no way to know it opens a submenu or
whether it's currently open - the visual chevron rotation and X/hamburger
icon swap are sighted-only cues.
**Suggested fix:** Add `aria-expanded={servicesDropdownOpen}` and
`aria-haspopup="true"` to the dropdown trigger button; add
`aria-expanded={mobileMenuOpen}` to the hamburger button.
**Resolution:** Fixed via `/fix` (2026-09-01): added `aria-haspopup="true"`
and `aria-expanded={servicesDropdownOpen}` to the dropdown trigger, and
`aria-expanded={mobileMenuOpen}` to the hamburger button. Verified: fetched
`/` live, confirmed both attributes render correctly (`false` by default).
Closed by `/audit` (2026-09-01, scope: current branch
fix/navbar-aria-expanded vs main; lens: all): reviewed the diff - two
one-line attribute additions and one whitespace fix, exactly matching the
spec. No new defect.
