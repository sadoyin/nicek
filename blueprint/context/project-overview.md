# Nicek Group Website - Project Overview

> Marketing/brochure site for Nicek Group, a diversified conglomerate operating
> across healthcare, exports, auto parts, investments, tech, and food &
> beverage in the US and Nigeria - now extending into a careers/hiring flow.

## Problem

Nicek Group needs a credible web presence that convinces prospective customers
and partners, across all six subsidiary sectors, to reach out. The prior site
had real, documented problems (`nicek-audit-report.md`): conflicting contact
info across pages and a contact form that silently dropped submissions - both
fixed (features 6, 7). The site is now also the hiring channel for the
company's Phase-1 leadership roles: it needs a careers page, applicant
accounts, and a way for the client to review who applied.

## Users

- **Prospective customers/partners** researching one sector (healthcare,
  exports, autos, investments, tech, food) before reaching out.
- **Existing contacts** who just need office locations, phone numbers, or to
  submit an inquiry.
- **Job applicants** browsing open Nicek roles and applying through a
  persistent account (feature 8).
- **The Nicek admin (client)** reviewing submitted applications through a
  client-only page (feature 8).

Public/anonymous browsing for everyone; applicants get a real account
(email/password via Supabase Auth); the admin page is gated to the client's
email only.

## Features

1. **Home page** - hero, subsidiary card grid (all 6 sectors), achievement
   stats. Shipped.
2. **About page** - mission/vision, company journey, values, client
   testimonials. Shipped.
3. **Services overview + subsidiary detail pages** - overview page plus one
   detail page per sector. Shipped.
4. **Contact page (UI only)** - office info cards and a contact form. Shipped.
5. **Global navigation & footer** - services dropdown, mobile menu,
   light/dark theme toggle, footer with office/contact/social info. Shipped.
6. **Contact info consistency** - reconciled the email and hours shown in the
   footer and contact page. Shipped.
7. **Working contact form submission** - real email delivery via Resend with
   a genuine success/error state. Shipped.
8. **Careers & job applications** - the site's first persisted data and its
   first user accounts. Split into four sub-features, each its own spec/branch:
   - **8a. Careers page** - lists the three open roles (Operations &
     Technical Manager, QA/Regulatory Officer, Commercial & Finance
     Controller), linked from the footer. No auth involved.
   - **8b. Applicant accounts** - email/password signup and login via
     Supabase Auth.
   - **8c. Job application flow** - authenticated apply form (name, phone,
     cover note, resume upload), stored in Supabase.
   - **8d. Admin review page** - client-only page listing applications per
     role, gated by an admin email allow-list.
   Headline feature of the remaining work - the client needs Phase-1 hires
   onboarded on a Day 10/Day 15 timeline, so 8a is prioritized to ship first
   since it needs no new infrastructure.

## Data model

No database exists for features 1-7 - that content stays hardcoded as typed
arrays/objects directly in the page files (unchanged):

- Subsidiary list (`src/app/page.tsx`) - name, sector, description, logo path,
  icon, color tokens.
- Service detail content (`src/app/services/*/page.tsx`) - title, description,
  bullets, image, per sector.
- Testimonials (`src/app/about/page.tsx`) - `id`, `clientName`, `designation?`,
  `company`, `quote`.
- Company values, achievement stats - inline arrays, no shared type.
- Job listings (feature 8a) - name, sector-style description, follow the same
  hardcoded-array pattern; the three roles are static content, not stored in
  Supabase.

Feature 8 introduces the site's first real persistence, in Supabase:

### Applicant account

Handled entirely by Supabase Auth (`auth.users`) - email, hashed password,
session. No separate profile table; applicant-specific details (name, phone)
are captured per-application instead of on a profile, since an applicant only
applies to one role at a time in v1.

### JobApplication

> Load-bearing shape - locked here for 8c to implement and 8d to read.

- `id` (uuid, PK)
- `user_id` (uuid) - FK to `auth.users.id`, the applicant's account
- `role` (text) - one of the three open positions (matches the 8a listing's
  identifier for that role)
- `name` (text)
- `phone` (text)
- `cover_note` (text)
- `resume_path` (text) - path to the uploaded file in Supabase Storage
- `created_at` (timestamptz)

Resume files live in a Supabase Storage bucket; `resume_path` points to the
object. Row-level security should restrict each applicant to their own rows;
the admin page (8d) reads via a server-side service-role key instead of RLS.

Admin access (8d) is a single-admin email allow-list (an env var), not a
roles table - there is exactly one admin (the client) for now.

## Tech stack

- **Next.js 16.2.10 (App Router)** - routing, server components, server
  actions, metadata API.
- **React 19.2.4 / TypeScript 5** - strict mode, functional components.
- **Tailwind CSS v4** - CSS-first config via `@theme` in `globals.css`, no
  `tailwind.config.js`.
- **shadcn/ui** (`radix-nova` style, neutral base) - `button` and `card`
  installed so far; extend by wrapping, not rewriting.
- **lucide-react** - icon set, plus 3 hand-built social icon components.
- **Resend** - transactional email for contact form delivery. Needs
  `RESEND_API_KEY` and sender-domain DNS records at Namecheap.
- **Supabase** (planned, feature 8) - Postgres (job applications), Auth
  (applicant accounts + admin gate), and Storage (resume uploads). Needs
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and a
  service-role key (server-only) for the admin page's queries.
- **npm** - package manager (`package-lock.json`).
- No ORM - query Supabase directly via its JS client. No test runner, no CI.

## Monetization

Not applicable in-app. The site drives leads to the underlying subsidiary
businesses (healthcare services, import/export deals, auto parts sales,
investment partnerships, IT contracts, food & beverage supply) - it doesn't
transact itself. Feature 8 is a hiring tool, not a revenue feature.

## UI/UX

Clean, modern corporate look: zinc neutral palette, light mode default with a
working dark toggle (persisted to `localStorage`), shadcn Card grids, gradient
hero banners with dark image overlays on interior pages. Feature 8's pages
follow the same visual system.

- `/` - hero, subsidiary grid, stats.
- `/about` - mission/vision, journey, values, testimonials.
- `/services` - overview of all 6 sectors.
- `/services/healthcare`, `/services/exports`, `/services/autos`,
  `/services/investments`, `/services/tech`, `/services/food` - one detail
  page per sector.
- `/contact` - office cards + contact form.
- `/careers` - open roles list (8a), linked from the footer.
- `/careers/[role]` - role detail + apply entry point (8a/8c).
- `/signup`, `/login` - applicant account creation and sign-in (8b).
- `/careers/admin` (or similar, finalized in 8d's spec) - client-only
  application review page, gated by the admin email allow-list.

## Deployment

Live on Vercel at `nicek.vercel.app` (project `nicek`, GitHub remote
`Ritashsehu/nicek`). Deployment protection (Vercel SSO) is disabled so the
site is publicly reachable. DNS cutover to `nicekgroup.com` has not happened
yet - `layout.tsx`'s OG `url` is set to that domain ahead of the cutover
(tracked as finding F-09).

Feature 8 adds a new deployment dependency: a Supabase project must be
provisioned, with its URL, anon key, and service-role key set as Vercel
environment variables before 8b ships.

## Open questions

> None currently blocking - resolve here if the two plans diverge again.
