"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  pendingText: string;
  className?: string;
}

export function SubmitButton({
  children,
  pendingText,
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
