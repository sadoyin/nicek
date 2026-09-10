import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldAlert, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/adminAccess";
import { roles } from "@/lib/careerRoles";

interface JobApplication {
  id: string;
  role: string;
  name: string;
  phone: string;
  cover_note: string;
  resume_path: string;
  created_at: string;
}

const RESUME_URL_TTL_SECONDS = 3600;

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const metadata: Metadata = {
  title: "Applications",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/careers/admin");
  }

  if (!isAdminEmail(user.email)) {
    return (
      <div className="flex flex-col min-h-full font-sans">
        <section className="py-24 bg-white dark:bg-zinc-950">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-6 text-center space-y-3">
                <div className="inline-flex p-3 bg-red-500 text-white rounded-full mx-auto">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h1 className="text-lg font-bold text-red-700 dark:text-red-400">
                  Not Authorized
                </h1>
                <p className="text-sm text-red-600 dark:text-red-500">
                  Your account doesn&apos;t have access to this page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const adminClient = createAdminClient();
  const { data: applications, error: fetchError } = await adminClient
    .from("job_applications")
    .select("id, role, name, phone, cover_note, resume_path, created_at")
    .order("created_at", { ascending: false })
    .returns<JobApplication[]>();

  const applicationsWithResume = await Promise.all(
    (applications ?? []).map(async (application) => {
      const { data: signed } = await adminClient.storage
        .from("resumes")
        .createSignedUrl(application.resume_path, RESUME_URL_TTL_SECONDS);
      return { ...application, resumeUrl: signed?.signedUrl ?? null };
    })
  );

  const applicationsByRole = new Map(
    roles.map((role) => [role.slug, [] as typeof applicationsWithResume])
  );
  for (const application of applicationsWithResume) {
    applicationsByRole.get(application.role)?.push(application);
  }

  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Admin
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Applications
          </h1>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {fetchError ? (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-500">
                Could not load applications. Try refreshing.
              </p>
            </div>
          ) : (
            roles.map((role) => {
              const roleApplications = applicationsByRole.get(role.slug) ?? [];
              return (
                <div key={role.slug}>
                  <div className="flex items-baseline justify-between mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {role.title}
                    </h2>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {roleApplications.length} application
                      {roleApplications.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  {roleApplications.length === 0 ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      No applications yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {roleApplications.map((application) => (
                        <div
                          key={application.id}
                          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="font-semibold text-zinc-900 dark:text-white">
                                {application.name}
                              </p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {application.phone}
                              </p>
                            </div>
                            <span className="text-xs text-zinc-400 dark:text-zinc-500">
                              {formatDate(application.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                            {application.cover_note}
                          </p>
                          {application.resumeUrl ? (
                            <a
                              href={application.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-white hover:underline"
                            >
                              <FileText className="w-4 h-4" /> View resume
                            </a>
                          ) : (
                            <span className="text-sm text-zinc-400 dark:text-zinc-500">
                              Resume unavailable
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
