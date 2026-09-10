import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, XCircle, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getRoleBySlug } from "@/lib/careerRoles";
import { SubmitButton } from "@/components/SubmitButton";

interface ApplyPageProps {
  params: Promise<{ role: string }>;
  searchParams?: Promise<{ success?: string; error?: string }>;
}

export async function generateMetadata({
  params,
}: ApplyPageProps): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: "Apply" };
  return {
    title: `Apply - ${role.title}`,
    description: `Apply for the ${role.title} position at Nicek Group.`,
  };
}

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_EXTENSIONS_BY_TYPE: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

function getField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function handleApply(formData: FormData) {
  "use server";

  const roleSlug = getField(formData, "role");
  const role = getRoleBySlug(roleSlug);
  if (!role) {
    redirect("/careers");
  }

  const applyPath = `/careers/${roleSlug}/apply`;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(applyPath)}`);
  }

  const { data: existing } = await supabase
    .from("job_applications")
    .select("id")
    .eq("user_id", user.id)
    .eq("role", roleSlug)
    .maybeSingle();

  if (existing) {
    redirect(applyPath);
  }

  const name = getField(formData, "name");
  const phone = getField(formData, "phone");
  const coverNote = getField(formData, "coverNote");
  const resume = formData.get("resume");

  if (!name || !phone || !coverNote) {
    redirect(`${applyPath}?error=${encodeURIComponent("All fields are required.")}`);
  }

  if (!(resume instanceof File) || resume.size === 0) {
    redirect(`${applyPath}?error=${encodeURIComponent("A resume file is required.")}`);
  }

  const resumeFile = resume as File;
  const extension = RESUME_EXTENSIONS_BY_TYPE[resumeFile.type];
  if (!extension) {
    redirect(
      `${applyPath}?error=${encodeURIComponent("Resume must be a PDF, DOC, or DOCX file.")}`
    );
  }

  if (resumeFile.size > RESUME_MAX_BYTES) {
    redirect(`${applyPath}?error=${encodeURIComponent("Resume must be under 5MB.")}`);
  }

  const resumePath = `${user.id}/${roleSlug}-${Date.now()}.${extension}`;
  const buffer = Buffer.from(await resumeFile.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(resumePath, buffer, { contentType: resumeFile.type });

  if (uploadError) {
    redirect(
      `${applyPath}?error=${encodeURIComponent("Could not upload resume. Please try again.")}`
    );
  }

  const { error: insertError } = await supabase.from("job_applications").insert({
    user_id: user.id,
    role: roleSlug,
    name,
    phone,
    cover_note: coverNote,
    resume_path: resumePath,
  });

  if (insertError) {
    // Don't leave an orphaned file with no matching row.
    await supabase.storage.from("resumes").remove([resumePath]);
    redirect(
      `${applyPath}?error=${encodeURIComponent("Could not submit your application. Please try again.")}`
    );
  }

  redirect(`${applyPath}?success=true`);
}

export default async function ApplyPage({ params, searchParams }: ApplyPageProps) {
  const { role: slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/careers/${slug}/apply`)}`);
  }

  const { data: existing } = await supabase
    .from("job_applications")
    .select("id")
    .eq("user_id", user.id)
    .eq("role", slug)
    .maybeSingle();

  const search = await searchParams;
  const errorMessage = search?.error;
  const isSuccess = search?.success === "true";

  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Apply
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            {role.title}
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
            {existing || isSuccess ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center space-y-3">
                <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {isSuccess ? "Application Submitted" : "Already Applied"}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500">
                  {isSuccess
                    ? "Thanks for applying - we'll be in touch."
                    : `You've already applied for ${role.title}.`}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
                  Apply for {role.title}
                </h2>

                {errorMessage ? (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errorMessage}
                    </p>
                  </div>
                ) : null}

                <form action={handleApply} className="space-y-4">
                  <input type="hidden" name="role" value={slug} />
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="coverNote"
                      className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Cover Note
                    </label>
                    <textarea
                      id="coverNote"
                      name="coverNote"
                      required
                      rows={4}
                      placeholder="Tell us why you're a fit for this role"
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="resume"
                      className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Resume (PDF, DOC, or DOCX, max 5MB)
                    </label>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:dark:bg-white file:text-white file:dark:text-zinc-950 file:px-3.5 file:py-2 file:text-sm file:font-semibold"
                    />
                  </div>
                  <SubmitButton
                    pendingText="Submitting..."
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                  >
                    <Send className="w-4 h-4" /> Submit Application
                  </SubmitButton>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
