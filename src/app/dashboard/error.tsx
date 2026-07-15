"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
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
    <div className="flex h-full min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-sm w-full text-center space-y-5">
        {/* Icon */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 mx-auto">
          <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Failed to load dashboard
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Something went wrong while loading this section. Please try again or return to the overview.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 mt-1">
              Ref: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 transition-all shadow-md shadow-blue-500/20"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm font-semibold px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            <Home className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
