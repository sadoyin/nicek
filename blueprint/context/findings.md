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

