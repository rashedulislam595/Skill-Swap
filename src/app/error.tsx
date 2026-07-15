"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
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
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 mx-auto">
          <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            An unexpected error occurred. This might be temporary — please try refreshing the page or go back.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-150 shadow-md shadow-blue-500/20"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm font-semibold px-5 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-150"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
