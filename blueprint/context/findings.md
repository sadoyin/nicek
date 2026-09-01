# Findings

> **Generated file.** The findings ledger: review findings raised by `/audit`
> against the work in progress, each with a durable ID, severity (P0-P3), and
> status. `/implement` marks repaired findings `fixed`, a later `/audit` pass
> moves them to `closed`, and `/complete` refuses to merge while any P0 or P1
> finding is `open` or `fixed`, then archives resolved findings with the work
> and resets this file.

### F-02 [P1] closed - 30 uses of non-existent Tailwind zinc shades produce no CSS

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

### F-03 [P2] open - No sitemap.xml or robots.txt

**File:** n/a (missing: `src/app/sitemap.ts`, `src/app/robots.ts`)
**Found:** 2026-09-01 by /audit (scope: full; lens: SEO)
**Why it matters:** Confirmed missing (checked `src/app/sitemap.ts`,
`src/app/robots.ts`, `public/sitemap.xml`, `public/robots.txt` - none exist).
A 10-route multi-page site with no sitemap makes search engines rely purely
on crawl discovery through internal links instead of an explicit page list,
slowing indexing of newer or less-linked pages (e.g. the individual service
detail pages). No robots.txt means no explicit crawl guidance or sitemap
pointer either.
**Suggested fix:** Add `src/app/sitemap.ts` (Next's built-in `MetadataRoute.Sitemap`
API) listing all 10 routes, and `src/app/robots.ts` pointing at it. Both are
small, standard Next.js App Router files.
**Resolution:**

### F-04 [P2] open - No structured data (JSON-LD) for the business

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
**Resolution:**

### F-05 [P2] open - Disclosure menus don't expose open/closed state to assistive tech

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
**Resolution:**

### F-06 [P2] open - Footer legal links are dead placeholders

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
**Resolution:**

### F-07 [P3] open - No custom 404 or error boundary page

**File:** n/a (missing: `src/app/not-found.tsx`, `src/app/error.tsx`)
**Found:** 2026-09-01 by /audit (scope: full; lens: UI-UX)
**Why it matters:** Confirmed missing. A visitor hitting a typo'd URL or a
dead external link sees Next.js's bare default 404 page - no branding, no
nav back into the site, no matching light/dark theme. Same for an unexpected
runtime error (Next's default error screen). Both are one-file, low-effort
additions expected on a "modern website."
**Suggested fix:** Add `src/app/not-found.tsx` and `src/app/error.tsx`
matching the site's existing banner/CTA visual pattern, with a link back to
`/` and `/contact`.
**Resolution:**

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
