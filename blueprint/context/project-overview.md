# Nicek Group Website - Project Overview

> Marketing/brochure site for Nicek Group, a diversified conglomerate operating
> across healthcare, exports, auto parts, investments, tech, and food &
> beverage in the US and Nigeria.

## Problem

Nicek Group needs a credible web presence that convinces prospective customers
and partners, across all six subsidiary sectors, to reach out. The prior site
had real, documented problems (`nicek-audit-report.md`): conflicting contact
info across pages and a contact form that silently drops submissions. This
project is the revamp - some of it already shipped, the rest tracked below.

## Users

- **Prospective customers/partners** researching one sector (healthcare,
  exports, autos, investments, tech, food) before reaching out.
- **Existing contacts** who just need office locations, phone numbers, or to
  submit an inquiry.

No access tiers - the entire site is public, anonymous browsing.

## Features

1. **Home page** - hero, subsidiary card grid (all 6 sectors), achievement
   stats. Shipped.
2. **About page** - mission/vision, company journey, values, client
   testimonials. Shipped.
3. **Services overview + subsidiary detail pages** - overview page plus one
   detail page per sector. Shipped.
4. **Contact page (UI only)** - office info cards and a contact form; the
   form isn't wired to actually deliver submissions yet. Shipped.
5. **Global navigation & footer** - services dropdown, mobile menu,
   light/dark theme toggle, footer with office/contact/social info. Shipped.
6. **Contact info consistency** - reconciled the email and hours shown in the
   footer and contact page. Shipped.
7. **Working contact form submission** - replace the `console.log` stub with
   real email delivery (via Resend) and a genuine success/error state.
   Next up. Headline feature of the remaining work - the form is the site's
   only conversion mechanism today and it currently does nothing.

## Data model

No database exists and none is required for what's shipped. All content is
hardcoded as typed arrays/objects directly in the page files:

- Subsidiary list (`src/app/page.tsx`) - name, sector, description, logo path,
  icon, color tokens.
- Service detail content (`src/app/services/*/page.tsx`) - title, description,
  bullets, image, per sector.
- Testimonials (`src/app/about/page.tsx`) - `id`, `clientName`, `designation?`,
  `company`, `quote`.
- Company values, achievement stats - inline arrays, no shared type.

Contact form submissions are emailed (via Resend, feature 7), not stored - no
database is planned.

## Tech stack

- **Next.js 16.2.10 (App Router)** - routing, server components, server
  actions, metadata API.
- **React 19.2.4 / TypeScript 5** - strict mode, functional components.
- **Tailwind CSS v4** - CSS-first config via `@theme` in `globals.css`, no
  `tailwind.config.js`.
- **shadcn/ui** (`radix-nova` style, neutral base) - `button` and `card`
  installed so far; extend by wrapping, not rewriting.
- **lucide-react** - icon set, plus 3 hand-built social icon components.
- **Resend** (planned, feature 7) - transactional email for contact form
  delivery. Needs `RESEND_API_KEY` and sender-domain DNS records at Namecheap.
- **npm** - package manager (`package-lock.json`).
- No database, no ORM, no auth provider, no test runner, no CI.

## Monetization

Not applicable in-app. The site drives leads to the underlying subsidiary
businesses (healthcare services, import/export deals, auto parts sales,
investment partnerships, IT contracts, food & beverage supply) - it doesn't
transact itself.

## UI/UX

Clean, modern corporate look: zinc neutral palette, light mode default with a
working dark toggle (persisted to `localStorage`), shadcn Card grids, gradient
hero banners with dark image overlays on interior pages.

- `/` - hero, subsidiary grid, stats.
- `/about` - mission/vision, journey, values, testimonials.
- `/services` - overview of all 6 sectors.
- `/services/healthcare`, `/services/exports`, `/services/autos`,
  `/services/investments`, `/services/tech`, `/services/food` - one detail
  page per sector.
- `/contact` - office cards + contact form.

## Deployment

> TODO: no deployment target decided yet. Repo has a GitHub remote
> (`Ritashsehu/nicek`) and is a standard Next.js app - would fit Vercel or
> Render with little extra config, but nothing is set up (no `vercel.json`,
> `render.yaml`, or env vars). Run `/release` once a target is chosen.
