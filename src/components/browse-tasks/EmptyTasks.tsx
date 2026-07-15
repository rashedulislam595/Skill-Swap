import { SearchX } from "lucide-react";
import Link from "next/link";

export default function EmptyTasks() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 text-center">
      {/* Icon container */}
      <div className="relative mb-6">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-xl scale-150" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <SearchX className="h-9 w-9 text-zinc-400 dark:text-zinc-500" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
        No Tasks Available
      </h3>
      <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        There are no tasks posted yet. Be the first to post a task and find the
        perfect freelancer for your project.
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
        <Link
          href="/post-task"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Post a Task
        </Link>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
