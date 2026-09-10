import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { XCircle, AlertCircle, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PasswordInput } from "@/components/PasswordInput";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Nicek Group applicant account.",
};

function getField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// Only allow same-site paths as a redirect target - anything else (an
// absolute URL or a protocol-relative "//host" URL) is an open-redirect
// risk, so it falls back to the default instead.
function safeNext(next: string | undefined): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return "/careers";
}

async function handleLogin(formData: FormData) {
  "use server";

  const email = getField(formData, "email");
  const password = getField(formData, "password");
  const next = safeNext(getField(formData, "next"));

  if (!email || !password) {
    redirect(
      `/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent("Email and password are required.")}`
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      `/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent(error.message)}`
    );
  }

  redirect(next);
}

interface LoginPageProps {
  searchParams?: Promise<{
    next?: string;
    error?: string;
    confirmError?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const next = safeNext(params?.next);

  if (user) {
    redirect(next);
  }

  const errorMessage = params?.error;
  const isConfirmError = params?.confirmError === "true";

  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Welcome Back
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Log In
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full mx-auto">
                <LogIn className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Log In
              </h2>
            </div>

            {isConfirmError ? (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-600 dark:text-amber-500">
                  That confirmation link is expired or already used. Log in
                  below if your account is already confirmed.
                </p>
              </div>
            ) : null}

            {errorMessage ? (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-2.5">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errorMessage}
                </p>
              </div>
            ) : null}

            <form
              action={async (formData) => {
                "use server";
                await handleLogin(formData);
              }}
              className="space-y-4"
            >
              <input type="hidden" name="next" value={next} />
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <SubmitButton
                pendingText="Logging in..."
                className="w-full rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                Log In
              </SubmitButton>
            </form>

            <p className="text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-zinc-900 dark:text-white hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
