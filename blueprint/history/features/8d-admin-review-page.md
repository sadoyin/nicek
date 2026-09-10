# Feature: Admin review page

**From build-plan:** feature 8d
**Status:** complete

## Goal

Give the Nicek admin (the client) a single gated page that lists every
submitted job application, grouped by role, with a way to open each
applicant's resume - so applications collected by 8c are actually reviewable
instead of sitting invisibly in Supabase.

## In scope

- `/careers/admin` page, server-rendered, no public link to it anywhere in
  the site (nav/footer stay as they are).
- Gating by a single admin email allow-list env var: signed-out visitors are
  sent to log in, signed-in non-admins see a plain "not authorized" message,
  only the allow-listed email sees the data.
- A server-side Supabase client that reads with the secret key, bypassing the
  per-user RLS that scopes `job_applications` to its owner - the admin has to
  see every row, not just their own.
- Applications grouped under each of the 3 open roles (using the existing
  `roles` list from `careerRoles.ts` for title/order), showing name, phone,
  cover note, and submitted date per application, newest first.
- A working link to download/view each applicant's resume via a short-lived
  signed Storage URL.
- An empty state per role when it has no applications yet.

## Out of scope

- Any action on an application (status, notes, rejecting/accepting,
  exporting). This is read-only review for now.
- Editing the admin allow-list from the UI - it's an env var, deploy-time
  config only.
- Email notifications to the admin when a new application arrives.
- Changing `job_applications` RLS policies - 8c's policies stay as they are;
  this feature reads around them with a service-role client instead.

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight
   on. Checkpoints are optional; `/complete` makes the real feature-level
   commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the
step was too big, so split it.

## Build steps

- [x] **Step 1 - Admin Supabase client + allow-list helper** - add
  `src/lib/supabase/admin.ts` exporting a `createAdminClient()` that builds a
  plain `@supabase/supabase-js` client from `NEXT_PUBLIC_SUPABASE_URL` and
  `SUPABASE_SECRET_KEY` (`persistSession: false`, no cookies - this key is
  server-only since it has no `NEXT_PUBLIC_` prefix). Add
  `src/lib/adminAccess.ts` exporting `isAdminEmail(email)` that reads
  `ADMIN_EMAILS` (comma-separated), trims and lowercases both sides, and
  returns whether the given email is in the list. Document `ADMIN_EMAILS` in
  `.env.example` with a comment. *Done when:* `npm run build` passes and both
  modules export the expected functions with no other behavior change.

- [x] **Step 2 - Gated admin page shell** - add
  `src/app/careers/admin/page.tsx` as a server component that: gets the
  current user via the existing `createClient()` (`@/lib/supabase/server`);
  redirects to `/login?next=/careers/admin` if signed out; renders a
  "Not authorized" card (same visual language as the error states in
  `login`/`apply` pages) if signed in but `isAdminEmail(user.email)` is
  false; otherwise renders a placeholder "Applications" heading. Export
  `metadata` with `robots: { index: false, follow: false }` since this is an
  internal page with no public link to it. No data fetching yet. *Done
  when:* visiting `/careers/admin` signed out redirects to login with the
  right `next`; signed in as a non-admin shows "Not authorized"; signed in as
  the allow-listed email (set locally in `.env.local` for the check) shows
  the placeholder heading.

- [x] **Step 3 - List applications by role with resume links** - extend the
  admin branch of the page to query all `job_applications` rows with
  `createAdminClient()`, group them under each role from
  `roles` (`@/lib/careerRoles`) in that array's order, and render per role: a
  count, an empty state ("No applications yet") when there are none, and per
  application a card/row with name, phone, submitted date
  (`created_at`, formatted), the cover note, and a "View resume" link built
  from `supabase.storage.from("resumes").createSignedUrl(resume_path, 3600)`.
  If signing fails for a row (missing file, storage error), render "Resume
  unavailable" text instead of a broken link rather than failing the whole
  page. *Done when:* as the admin, the page lists every applicant across all
  three roles (confirm against the `job_applications` table in the Supabase
  dashboard), each resume link opens the correct file, a role with zero
  applications shows its empty state instead of an empty gap, and the page
  still renders the rest of the list if one row's signed URL fails.

## Files / areas

- `src/lib/supabase/admin.ts` - new, service-role Supabase client factory.
- `src/lib/adminAccess.ts` - new, admin email allow-list check.
- `src/app/careers/admin/page.tsx` - new, the gated review page.
- `.env.example` - document `ADMIN_EMAILS`.
- `.env.local` - add `ADMIN_EMAILS` locally (not committed) to test the gate.

## Data / contracts

Reads the `JobApplication` shape locked in `project-overview.md` (id,
user_id, role, name, phone, cover_note, resume_path, created_at) and the
`resumes` Storage bucket - both already in place from 8c. No schema changes.
No new contract introduced for later features.

## Testing

No test runner is configured in this project (`coding-standards.md`), so
this rides on build + manual verification, matching the rest of the careers
flow:

- `npm run build` after each step.
- Manual check with three states: signed out, signed in as a non-admin
  applicant, signed in as the `ADMIN_EMAILS` address - confirmed via the dev
  server per the Step 2 and Step 3 done-whens above.

## Notes for the AI

- `admin.ts`'s client must never be imported into a Client Component or
  anything that ships to the browser - it only belongs in this server
  component. `SUPABASE_SECRET_KEY` has no `NEXT_PUBLIC_` prefix, so Next
  already keeps it server-only; don't re-export it or the client through
  anything client-facing.
- Reuse the existing visual patterns from `login/page.tsx` and
  `careers/[role]/apply/page.tsx` (zinc palette, gradient banner, rounded-2xl
  bordered panels, the red/emerald/amber alert-card styles) rather than
  inventing new admin-specific styling.
- `job_applications` has one row per `(user_id, role)` per 8c's own-application
  check, but don't assume one row per applicant overall - group by `role`,
  not by user.
- Follow the `safeNext`-style redirect pattern already in `login/page.tsx`
  for the `next=/careers/admin` redirect target.
