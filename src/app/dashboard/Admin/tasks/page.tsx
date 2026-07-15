import { redirect } from "next/navigation";
import { requireRole } from "@/lib/core/session";
import { getAdminTasks, type AdminTask } from "@/lib/api/admin";
import AdminTasksTable from "@/components/dashboard/admin/AdminTasksTable";
import { SlidersHorizontal, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Task Moderation — Admin | Skill Swap",
  description: "Review all platform tasks and remove policy-violating content.",
};

export default async function AdminTasksPage() {
  await requireRole("admin");

  let tasks: AdminTask[] = [];
  try {
    tasks = await getAdminTasks();
  } catch {
    // empty until backend is connected
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/30 px-3 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-3">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Task Moderation
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            All Platform Tasks
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Remove tasks that violate platform guidelines or contain inappropriate content.
          </p>
        </div>

        {/* Count pill */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 px-4 py-2.5 shadow-sm">
          <ClipboardList className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {tasks.length} Tasks
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-100 dark:border-zinc-800" />

      {/* Warning banner */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/60 dark:bg-amber-950/10 px-4 py-3">
        <span className="text-amber-500 text-base mt-0.5">⚠️</span>
        <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
          Deleting a task is permanent and cannot be undone. A two-step confirmation is required before deletion.
        </p>
      </div>

      {/* Table */}
      <AdminTasksTable tasks={tasks} />
    </div>
  );
}
