import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, XCircle, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PasswordInput } from "@/components/PasswordInput";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to apply for open roles at Nicek Group.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function handleSignup(formData: FormData) {
  "use server";

  const email = getField(formData, "email");
  const password = getField(formData, "password");
  const confirmPassword = getField(formData, "confirmPassword");

  if (!email || !password || !confirmPassword) {
    redirect(`/signup?error=${encodeURIComponent("All fields are required.")}`);
  }
  if (!EMAIL_PATTERN.test(email)) {
    redirect(`/signup?error=${encodeURIComponent("Enter a valid email address.")}`);
  }
  if (password.length < 6) {
    redirect(`/signup?error=${encodeURIComponent("Password must be at least 6 characters.")}`);
  }
  if (password !== confirmPassword) {
    redirect(`/signup?error=${encodeURIComponent("Passwords do not match.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/signup?success=true");
}

interface SignupPageProps {
  searchParams?: Promise<{ success?: string; error?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/careers");
  }

  const params = await searchParams;
  const isSuccess = params?.success === "true";
  const errorMessage = params?.error;

  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
            Join Nicek Group
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Create Your Account
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
            {isSuccess ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center space-y-3">
                <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  Check Your Email
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500">
                  We sent a confirmation link to your email address. Click it
                  to activate your account, then log in.
                </p>
                <Link
                  href="/login"
                  className="inline-block text-sm font-semibold text-zinc-900 dark:text-white hover:underline pt-2"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full mx-auto">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Sign Up
                  </h2>
                </div>

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
                    await handleSignup(formData);
                  }}
                  className="space-y-4"
                >
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
                      minLength={6}
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Confirm Password
                    </label>
                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength={6}
                      placeholder="Re-enter your password"
                    />
                  </div>
                  <SubmitButton
                    pendingText="Signing up..."
                    className="w-full rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                  >
                    Sign Up
                  </SubmitButton>
                </form>

                <p className="text-center text-sm text-zinc-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-zinc-900 dark:text-white hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
