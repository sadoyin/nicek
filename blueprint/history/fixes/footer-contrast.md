# Fix: Footer text contrast

**Type:** Fix
**Fixes:** F-11
**Status:** complete

## The problem

`text-zinc-400` is used for 5 separate pieces of real content in the
footer (`src/app/layout.tsx:136, 201, 212, 223, 237`: the company tagline,
all three office addresses, and the business hours labels) against the
`bg-zinc-900 dark:bg-zinc-950` footer background. Chrome Lighthouse
measured actual rendered contrast and flagged it as failing WCAG AA.

Widened while implementing, after reading the rest of the footer: two more
spots had the same or a worse problem, neither caught by the original
grep because neither sets its own color explicitly:
- The footer's own base color (`layout.tsx:118`) is `text-zinc-400` too,
  and the three "Important Links" (Privacy/Terms/Cookie) links
  (`layout.tsx:254-271`) have no color class of their own - they inherited
  this same failing value.
- The copyright bar (`layout.tsx:277`) explicitly used `text-zinc-500` -
  one step *darker* than the already-failing `zinc-400`, failing worse.

## The fix

Bumped all of the above to `text-zinc-300` - one real step lighter than
`zinc-400`, staying within the existing dark footer palette. Icons
(`text-zinc-500`) were left untouched - non-text UI components have a more
lenient 3:1 WCAG threshold, not the 4.5:1 required for text.

## Build steps

- [x] **Step 1 - Bump failing footer text colors to text-zinc-300** - update
  the footer's base color, the 5 originally-found instances, and the
  copyright bar's `text-zinc-500`, all to `text-zinc-300`, in `layout.tsx`.
  *Done when:* re-grepping `layout.tsx`'s footer section for
  `text-zinc-400` or `text-zinc-500` (on text, not icons) returns no
  matches, `npm run build` passes, and the compiled CSS confirms
  `.text-zinc-300` generates a real rule.

  Verified: re-grepped `layout.tsx`, zero remaining text-level
  `zinc-400`/`zinc-500`; build passed; compiled CSS confirms
  `.text-zinc-300` generates a real rule.

## Verify

1. `npm run build` passes clean.
2. Re-grep `layout.tsx` - confirm no `text-zinc-400` remains in the footer.
3. Visual spot-check that the footer still looks coherent (text is still
   clearly a muted/secondary tone, just lighter).

## Findings

### footer-contrast/F-11 [P2] closed - Footer text fails WCAG contrast against its dark background

**File:** src/app/layout.tsx:118, 136, 201, 212, 223, 237, 254-271, 277
(footer base color plus everything relying on it or its own explicit
`text-zinc-400`/`text-zinc-500`, all directly on the `bg-zinc-900
dark:bg-zinc-950` footer)
**Found:** 2026-09-03 by the user via a Chrome Lighthouse audit
(Accessibility: "Background and foreground colors do not have a sufficient
contrast ratio", flagged on footer `<p>` elements)
**Why it matters:** `text-zinc-400` is used for 5 separate pieces of real
content in the footer (the company tagline, all three office addresses, and
the business hours labels) against a near-black background, plus the
footer's own base text color (also `zinc-400`, inherited by the
Privacy/Terms/Cookie links which set no color of their own), plus the
copyright bar which is `text-zinc-500` - one step darker still, failing
worse. Lighthouse measured actual rendered contrast and flagged it as
failing WCAG - this text is hard to read for low-vision users and fails an
automated accessibility check that a real visitor (or Google's ranking
signals) can also detect.
**Suggested fix:** Bump all of the above to `text-zinc-300` - one real step
lighter than `zinc-400`, which clears AA contrast against this background
while staying within the existing dark footer palette (the `text-zinc-200`
labels/headings and `text-zinc-500` icons elsewhere are unaffected).
**Resolution:** Fixed via `/fix` (2026-09-03): widened scope during
implementation after reading the full footer - bumped the footer's base
color, the 5 originally-found body-text instances, and the copyright bar's
`text-zinc-500` all to `text-zinc-300`. Verified: re-grepped `layout.tsx`,
zero remaining text-level `zinc-400`/`zinc-500` (only icon uses of
`zinc-500` remain, which are non-text UI components under the more lenient
3:1 threshold, not 4.5:1); build passed; compiled CSS confirms
`.text-zinc-300` generates a real rule. Closed by `/audit` (2026-09-03,
scope: current branch fix/footer-contrast vs main; lens: all): reviewed the
diff - 8 pure color-value swaps, all icons correctly left untouched at
`zinc-500`. No new defect.
