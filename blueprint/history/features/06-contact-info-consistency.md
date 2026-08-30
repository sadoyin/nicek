# Feature: Contact info consistency

**From build-plan:** feature 6
**Status:** complete

## Goal

Make the contact details shown on `/contact` match the footer exactly, so a
visitor sees the same email and hours no matter where they look. Resolves the
inconsistency flagged in `nicek-audit-report.md` and `project-plan.md` §1/§8.

Re-checked against current code (not just the audit, which described the old
pre-revamp site): addresses and phone numbers already match between the
footer and the contact page. Two real gaps remain:

1. The Wyoming HQ card on `/contact` shows `contact@nicekgroup.com`; every
   other office (Boston, Lagos) and the footer show `info@nicekgroup.com`.
2. Business hours (Monday-Friday 7:00 AM - 7:00 PM, Weekend (US) 10:00 AM -
   5:00 PM) appear only in the footer, not on `/contact` itself.

User decisions (confirmed):

- Wyoming HQ email should be `info@nicekgroup.com`, matching everywhere else.
- Business hours should also appear on `/contact`, using the footer's exact
  copy.

## In scope

- Fix the Wyoming HQ email on `/contact` to `info@nicekgroup.com`.
- Add a Business Hours block to `/contact`, matching the footer's copy
  exactly (`src/app/layout.tsx`).

## Out of scope

- The contact form itself not sending/storing submissions - that's build-plan
  feature 7, a separate spec.
- Adding contact info to the navbar/header - the header currently shows no
  address, phone, or hours at all, so there is no header-vs-footer conflict
  to resolve; adding info there would be new scope, not a consistency fix.

## Build steps

- [x] **Step 1 - Fix Wyoming HQ email** - change the Wyoming Head Office
  card's email from `contact@nicekgroup.com` to `info@nicekgroup.com` in
  `src/app/contact/page.tsx`. *Done when:* all three office cards and the
  footer show the same email, `info@nicekgroup.com`.
- [x] **Step 2 - Add business hours to the contact page** - add a Business
  Hours block to the info-cards column on `/contact`, next to the existing
  "Contact Numbers" block, using the same copy as the footer (Monday-Friday
  7:00 AM - 7:00 PM; Weekend (US) 10:00 AM - 5:00 PM) and the already-imported
  `Clock` icon. Match the existing "Contact Numbers" block's styling
  (`space-y-3 p-6 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/40
  dark:border-zinc-800/20 rounded-2xl`). *Done when:* `/contact` shows the
  same hours text as the footer, rendered responsively at mobile and desktop
  widths.

## Files / areas

- `src/app/contact/page.tsx` - both steps.
- `src/app/layout.tsx` - read-only reference for the footer's exact hours
  copy and email; not modified (it's already correct).

## Data / contracts

None. Both changes are static JSX content, no data model or type changes.

## Testing

No test runner is configured, and both steps are purely presentational
(static text/markup, no logic). Verified with `npm run build` (clean, 13/13
pages) after each step, plus a live fetch of `/contact` from the dev server
confirming: "Business Hours" and "7:00 AM - 7:00 PM" render, `info@nicekgroup.com`
appears consistently, and `contact@nicekgroup.com` no longer appears anywhere
on the page.

## Notes for the AI

- `/contact` is a server component (`export default async function
  ContactPage`) - no client-side state needed for either step.
- Keep the new Business Hours block visually consistent with the existing
  "Contact Numbers" block right below it (same card style, same heading
  pattern: `font-bold text-sm uppercase tracking-wider text-zinc-800
  dark:text-zinc-200`).
- Don't touch the footer (`src/app/layout.tsx`) - it's already the
  authoritative source both fixes are matching against.
