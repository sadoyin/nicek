"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const clampClasses: Record<number, string> = {
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
  7: "line-clamp-7",
  8: "line-clamp-8",
};

interface ExpandableTextProps {
  children: React.ReactNode;
  lines?: number;
  className?: string;
}

export function ExpandableText({ children, lines = 6, className = "" }: ExpandableTextProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="flex flex-col items-center lg:items-start">
      <p className={`${className} ${expanded ? "" : (clampClasses[lines] ?? "line-clamp-6")}`}>
        {children}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
      >
        {expanded ? "See less" : "See more"}
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
}
