# Feature: Job application flow

**From build-plan:** feature 8c
**Status:** complete

## Goal

Let a logged-in applicant actually apply to one of the three open roles:
name, phone, cover note, and a resume upload, stored in Supabase. This is
the feature that makes the careers pages and 8b's accounts actually useful
together - right now "Apply Now" still points at `/contact` (8a's
deliberate interim target) and there's nowhere in Supabase to store an
application yet.

## In scope

- Supabase schema: a `job_applications` table (matching the `JobApplication`
  contract already locked in `project-overview.md`) plus a private
  `resumes` Storage bucket, both with row-level security so an applicant
  can only see/create their own rows and files.
- A shared `src/lib/careerRoles.ts` module (slug, title, icon) extracted
  from `careers/page.tsx`'s existing inline array, so the new apply route
  and the careers listing share one source of truth for valid roles -
  avoids a second hardcoded copy of the 3 slugs.
- `/careers/[role]/apply` - a dynamic route (one page handles all 3 roles,
  unlike the marketing pages' per-role static files, since the form itself
  doesn't differ by role - only the label does). Gates on auth: redirects
  an unauthenticated visitor to `/login?next=/careers/{role}/apply` (using
  8b's `next` convention), and on invalid role slugs, `notFound()`.
- The apply form itself: name, phone, cover note, resume file (PDF/DOC/DOCX,
  5MB max, validated server-side, not just via the input's `accept`
  attribute). On submit: uploads the resume to Storage, inserts the
  application row, and shows a success state.
- A friendly "you've already applied to this role" state - checked before
  the form renders (GET) and re-checked before any upload happens (POST),
  so a duplicate attempt never uploads an orphaned file with no matching
  row.
- Updated the "Apply Now" button on all 3 role detail pages to link to
  `/careers/{slug}/apply` instead of `/contact`.
- Raised Next.js's Server Action body size limit (default ~1MB) so a normal
  resume PDF doesn't get rejected before the app's own validation even
  runs.

## Out of scope

- The admin review page (feature 8d) - applications go into the database
  with nowhere to view them yet; that's 8d's entire job.
- Editing, withdrawing, or resubmitting an application once sent - one
  application per role per user, no update path.
- Emailing the admin (or the applicant) when an application is submitted -
  not requested; flagging as a plausible near-term follow-up once 8d
  exists, same as 8b's flagged-but-deferred password reset.
- Applying to the same role twice - blocked by a unique constraint, not a
  feature to build around.
- Any change to `/login`, `/signup`, or `/logout` beyond what already
  exists - this feature only *uses* the `next` redirect convention 8b
  already built.
- Letting an applicant view or download their own submitted resume/
  application after the fact - no such page is requested.

## Build steps

- [x] **Step 1 - Supabase schema (manual, via SQL Editor)** - Ran the
  `job_applications` table, RLS policies, and `resumes` Storage bucket +
  policies in the Supabase dashboard. Hit and fixed a real gap along the
  way: `service_role` needed explicit `GRANT`s on the new table (bypassing
  RLS doesn't bypass base Postgres grants) - resolved with a follow-up
  `grant usage on schema public ...` / `grant select, insert on ...`.
- [x] **Step 2 - Extract shared role list** - Added `src/lib/careerRoles.ts`;
  `careers/page.tsx` now imports it instead of an inline array.
- [x] **Step 3 - Raise the Server Action body size limit** - Set
  `experimental.serverActions.bodySizeLimit` to `"5mb"` in
  `next.config.ts` (confirmed via Next's own type definitions that this
  is still nested under `experimental` in this version).
- [x] **Step 4 - Apply route with auth gating** - Added
  `src/app/careers/[role]/apply/page.tsx`: role validation, auth gate with
  `next`-param redirect, and the already-applied check, plus the full
  form/success/error UI.
- [x] **Step 5 - Application submission** - Implemented `handleApply`: auth
  re-check, duplicate short-circuit before any upload, field/file
  validation, resume upload with a type-derived extension, DB insert, and
  orphan-cleanup (deletes the uploaded file if the insert fails).
- [x] **Step 6 - Success/error UI + Apply Now links** - The UI states were
  already built and proven in Steps 4-5; this step wired all 3 role pages'
  "Apply Now" buttons to the real flow instead of `/contact`.

## Files / areas

- `src/lib/careerRoles.ts` (new)
- `src/app/careers/[role]/apply/page.tsx` (new)
- `next.config.ts` (Server Action body size limit)
- `src/app/careers/page.tsx` (import shared roles instead of inline array)
- `src/app/careers/operations-technical-manager/page.tsx`,
  `qa-regulatory-officer/page.tsx`, `commercial-finance-controller/page.tsx`
  (Apply Now link target only)

## Data / contracts

`job_applications` (Postgres, RLS-protected) - matches the `JobApplication`
contract already locked in `project-overview.md`, now made concrete:

- `id` (uuid, PK, default `gen_random_uuid()`)
- `user_id` (uuid, FK to `auth.users.id`, cascade delete)
- `role` (text) - must match a `careerRoles` slug (enforced in app code, not
  a DB constraint, matching the project's no-ORM/no-migration-tool setup)
- `name`, `phone`, `cover_note` (text, required)
- `resume_path` (text) - path within the `resumes` Storage bucket
- `created_at` (timestamptz, default `now()`)
- `unique (user_id, role)` - one application per role per user

`resumes` Storage bucket (private) - objects stored at
`{user_id}/{role}-{timestamp}.{ext}`. This path shape is load-bearing for
8d, which will need to resolve `resume_path` to a signed URL for the admin
to download.

`src/lib/careerRoles.ts`'s exported `roles` array (and its `slug` values
specifically) is load-bearing for 8d too, which will want to show
applications grouped or filterable by role.

**Reusable gotcha for 8d:** any new table 8d needs will likely hit the same
`service_role` grant gap this feature did - remember to run the explicit
`grant` statements alongside `create table`, not just RLS policies.

## Testing

No test runner configured - this feature has real logic worth testing
(file type/size validation, duplicate-application short-circuit) per
`coding-standards.md`'s testing section; not building a runner now.

Verified against the **real** Supabase project throughout, comprehensively:

- Schema: confirmed table access and bucket existence via the admin API
  before and after the grant fix.
- Route + auth gating: real HTTP tests confirmed invalid-role 404,
  logged-out redirect to `/login?next=...` with correct encoding, and
  login-then-redirect-back landing on the form.
- Submission: a real login + a real multipart POST (matching Next's no-JS
  Server Action wire format) with an actual small PDF file created a real
  row and a real Storage object, confirmed via the admin API. A second
  submission to the same role was blocked with zero orphaned rows or
  files. Wrong file type and missing required fields were both rejected
  with zero side effects.
- Apply Now links: confirmed via real HTTP that each role's button now
  points to its correct `/careers/{slug}/apply` route.
- All test data (application rows, Storage files, test user) cleaned up
  after verification.

`npm run build` passed at every step (one transient Google Fonts network
failure along the way, unrelated to the code, resolved on retry).

## Notes for the AI

- The dynamic `[role]` route is a deliberate departure from the 3 static
  per-role files pattern used for the marketing pages (`8a`) - justified
  here because the apply form's structure is identical across roles (only
  a label differs), so 3 duplicate copies of validation/upload/DB logic
  would be pure duplication. `coding-standards.md` already names dynamic
  routes as the intended pattern for detail-style pages; this is the
  first feature that actually uses one.
- Server Action file uploads: accept the resume via `formData.get("resume")`
  as a `File`, matching Next.js's native support for file fields in
  Server Action `FormData` - no client-side upload library needed.
- Re-validate everything server-side that the client already validates
  (file type/size, required fields) - the `accept` attribute and `required`
  HTML attributes are UX hints only, never trust them per
  `coding-standards.md`'s Error Handling section.
- Reuse `src/lib/supabase/server.ts`'s `createClient()` (already
  cookie-aware) for both the auth check and the DB/Storage calls - no new
  Supabase client pattern needed.
- Match the existing success/error card visual pattern
  (`CheckCircle2`/`XCircle`, emerald/red) already used on `/contact`,
  `/signup`, and `/login`.
