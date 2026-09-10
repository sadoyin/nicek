import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Log Out",
  description: "Log out of your Nicek Group applicant account.",
};

async function handleLogout() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default function LogoutPage() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      {/* Banner */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Log Out
          </h1>
        </div>
      </section>

      {/* Confirm */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm text-center space-y-6">
            <div className="inline-flex p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full mx-auto">
              <LogOut className="w-5 h-5" />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Ready to end your session?
            </p>
            <form action={handleLogout}>
              <SubmitButton
                pendingText="Logging out..."
                className="w-full rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                Log Out
              </SubmitButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
