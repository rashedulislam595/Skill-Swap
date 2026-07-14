import Link from "next/link";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { getUserSession } from "@/lib/core/session";
import { getTaskByClientId } from "@/lib/api/task";
import ClientDashboardStats from "@/components/dashboard/client/ClientDashboardStats";
import RecentTaskActivity from "@/components/dashboard/client/RecentTaskActivity";
import ClientQuickActions from "@/components/dashboard/client/ClientQuickActions";

export const metadata: Metadata = {
  title: "Client Dashboard | SkillSwap",
  description: "Overview of your active projects and spending on SkillSwap.",
};

export default async function ClientPage() {
  const user = await getUserSession();
  const tasks = user?.id ? await getTaskByClientId(user.id) : [];

  return (
    <div className="p-2 sm:p-4 lg:p-6 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Client Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {user?.name?.split(" ")[0] ?? "there"}
            </span>
            . Here is an overview of your active projects and spending.
          </p>
        </div>
        <Link
          href="/dashboard/client/post-task"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Create New Task
        </Link>
      </div>

      {/* ── Stats Cards ── */}
      <ClientDashboardStats tasks={tasks} />

      {/* ── Main Content: Recent Activity + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        <RecentTaskActivity tasks={tasks} />
        <ClientQuickActions />
      </div>

    </div>
  );
}