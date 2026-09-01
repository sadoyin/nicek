"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8 text-center font-sans">
      <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
        Error
      </span>
      <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
        Something Went Wrong
      </h1>
      <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        We hit an unexpected error. Please try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-3 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
