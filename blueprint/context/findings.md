# Findings

> **Generated file.** The findings ledger: review findings raised by `/audit`
> against the work in progress, each with a durable ID, severity (P0-P3), and
> status. `/implement` marks repaired findings `fixed`, a later `/audit` pass
> moves them to `closed`, and `/complete` refuses to merge while any P0 or P1
> finding is `open` or `fixed`, then archives resolved findings with the work
> and resets this file.

### F-06 [P2] accepted - Footer legal links are dead placeholders

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
link. Revisit once that content is available.

### F-08 [P3] open - No explicit focus-visible styling on most interactive elements

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
**Resolution:**

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
