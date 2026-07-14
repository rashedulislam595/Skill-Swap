import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";

export default function TaskEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      {/* Icon container */}
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-900/40 shadow-lg shadow-blue-500/10">
          <ClipboardList className="h-11 w-11 text-blue-500 dark:text-blue-400" />
        </div>
        <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md">
          <Plus className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Text */}
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
        No tasks posted yet
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm leading-relaxed mb-8">
        You haven&apos;t posted any tasks yet. Post your first task and start
        receiving proposals from talented freelancers.
      </p>

      {/* CTA */}
      <Link
        href="/dashboard/client/post-task"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" />
        Post Your First Task
      </Link>
    </div>
  );
}
