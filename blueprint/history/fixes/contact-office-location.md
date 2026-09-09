# Fix: Contact page office location out of sync with footer

**Type:** Fix

## The problem

`src/app/contact/page.tsx` still listed a "Boston Office (US)" card with the
old Massachusetts address (304 North Cardinal St., Dorchester Center, MA
02124). The footer (`src/app/layout.tsx`) was recently updated to a New
Jersey office instead (921 Somerset Street, Somerset, NJ 08873) - the
contact page was never updated to match, reintroducing exactly the kind of
office-info mismatch feature 6 (`06-contact-info-consistency.md`) already
fixed once.

## The fix

Updated the contact page's office card to match the footer exactly: title,
street address, and city/state/zip. Also found and fixed two more "Boston"
references in the page's SEO metadata (title/OG description) while
implementing - same underlying inconsistency, just not mentioned in the
original spec.

## Build steps

- [x] 1. In `src/app/contact/page.tsx`, changed the "Boston Office (US)"
  card title to "New Jersey Office (US)" and its address to "921 Somerset
  Street, Somerset, NJ 08873", matching the footer's wording. Also updated
  the page's `metadata.description` and `openGraph.description` (both said
  "Wyoming, Boston, and Lagos") to say "Wyoming, New Jersey, and Lagos".

## Verify

- `npm run build` passed with no new errors/warnings.
- Compared `/contact` and the footer - same office name, same address text.
- Lint clean on the changed file.
