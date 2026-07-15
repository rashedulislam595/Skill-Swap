import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-96 w-full max-w-2xl rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-[0.06] dark:opacity-[0.1]" />
      </div>

      <div className="max-w-lg w-full text-center space-y-8">
        {/* Big 404 */}
        <div className="space-y-2">
          <p className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent select-none">
            404
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <Search className="h-3 w-3" />
            Page Not Found
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Oops! This page doesn&apos;t exist
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
            The page you&apos;re looking for may have been moved, deleted, or never
            existed. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-150 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/browse-tasks"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm font-semibold px-5 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-150"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Tasks
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 pt-2" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="inline-block rounded-full bg-zinc-200 dark:bg-zinc-800"
              style={{
                width: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5,
                height: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
