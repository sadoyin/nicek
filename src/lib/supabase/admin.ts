import { createClient } from "@supabase/supabase-js";

// Service-role client for the admin review page only - bypasses the RLS
// policies that scope job_applications to its owning applicant. Never import
// this into a Client Component; SUPABASE_SECRET_KEY has no NEXT_PUBLIC_
// prefix, so it only exists server-side.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false } }
  );
}
