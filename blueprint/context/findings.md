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

### F-11 [P2] open - Footer text fails WCAG contrast against its dark background

**File:** src/app/layout.tsx:136, 201, 212, 223, 237 (all `text-zinc-400`
directly on the `bg-zinc-900 dark:bg-zinc-950` footer)
**Found:** 2026-09-03 by the user via a Chrome Lighthouse audit
(Accessibility: "Background and foreground colors do not have a sufficient
contrast ratio", flagged on footer `<p>` elements)
**Why it matters:** `text-zinc-400` is used for 5 separate pieces of real
content in the footer (the company tagline, all three office addresses, and
the business hours labels) against a near-black background. Lighthouse
measured actual rendered contrast and flagged it as failing WCAG - this
text is hard to read for low-vision users and fails an automated
accessibility check that a real visitor (or Google's ranking signals) can
also detect.
**Suggested fix:** Bump all 5 instances from `text-zinc-400` to
`text-zinc-300` - one real step lighter, which clears AA contrast against
this background while staying within the existing dark footer palette (the
`text-zinc-200` labels and headings already used nearby are unaffected).
**Resolution:**
