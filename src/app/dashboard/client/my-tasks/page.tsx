import Link from "next/link";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { getUserSession } from "@/lib/core/session";
import { getTaskByClientId } from "@/lib/api/task";
import TaskStatsCards from "@/components/dashboard/client/TaskStatsCards";
import MyTasksTable from "@/components/dashboard/client/MyTasksTable";
import TaskEmptyState from "@/components/dashboard/client/TaskEmptyState";

export const metadata: Metadata = {
  title: "My Tasks | SkillSwap",
  description: "Manage and track your posted freelance tasks.",
};

export default async function MyTaskPage() {
  const user = await getUserSession();
  const tasks = user?.id ? await getTaskByClientId(user.id) : [];

  return (
    <div className="p-2 sm:p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage and track the progress of your posted freelance opportunities.
          </p>
        </div>
        <Link
          href="/dashboard/client/post-task"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Post New Task
        </Link>
      </div>

      {/* Stats */}
      <TaskStatsCards tasks={tasks} />

      {/* Table or Empty State */}
      {tasks.length === 0 ? (
        <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
          <TaskEmptyState />
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
              All Tasks
              <span className="ml-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                {tasks.length}
              </span>
            </h2>
          </div>
          <MyTasksTable tasks={tasks} />
        </div>
      )}
    </div>
  );
}