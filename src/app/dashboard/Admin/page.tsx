import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { getAdminStats } from "@/lib/api/admin";
import AdminStatCard from "@/components/dashboard/admin/AdminStatCard";
import {
  Users,
  ClipboardList,
  DollarSign,
  Activity,
  ShieldCheck,
  ArrowRight,
  SlidersHorizontal,
  History,
} from "lucide-react";

export const metadata = {
  title: "Admin Overview — Skill Swap",
  description: "System-wide stats and quick access for platform administrators.",
};

export default async function AdminOverviewPage() {
  const user = await getUserSession();
  if (!user || user.role !== "admin") redirect("/");

  let stats = { totalUsers: 0, totalTasks: 0, totalRevenue: 0, activeTasks: 0 };
  try {
    stats = await getAdminStats();
  } catch {
    // stats stay at zero — backend not yet connected
  }

  const quickLinks = [
    {
      href: "/dashboard/admin/users",
      icon: Users,
      label: "Manage Users",
      desc: "View, block, or unblock platform accounts",
      gradient: "from-blue-600 to-indigo-600",
      iconBg: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      href: "/dashboard/admin/tasks",
      icon: SlidersHorizontal,
      label: "Task Moderation",
      desc: "Review and remove policy-violating tasks",
      gradient: "from-violet-600 to-purple-600",
      iconBg: "bg-violet-50 dark:bg-violet-950/30",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
      href: "/dashboard/admin/transactions",
      icon: History,
      label: "Transactions",
      desc: "Full Stripe payment history and status",
      gradient: "from-emerald-600 to-teal-600",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin Control Panel
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Platform Overview
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back, <span className="font-semibold text-zinc-700 dark:text-zinc-200">{user.name}</span>. Here&apos;s what&apos;s happening.
          </p>
        </div>

        {/* Live dot */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 px-4 py-2.5 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">System Online</span>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Total Users"
          value={stats.totalUsers}
          icon={Users}
          iconBg="bg-blue-50 dark:bg-blue-950/30"
          iconColor="text-blue-600 dark:text-blue-400"
          description="All registered accounts"
        />
        <AdminStatCard
          label="Total Tasks"
          value={stats.totalTasks}
          icon={ClipboardList}
          iconBg="bg-violet-50 dark:bg-violet-950/30"
          iconColor="text-violet-600 dark:text-violet-400"
          description="Posted across all categories"
        />
        <AdminStatCard
          label="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          iconBg="bg-emerald-50 dark:bg-emerald-950/30"
          iconColor="text-emerald-600 dark:text-emerald-400"
          prefix="$"
          description="Processed via Stripe"
        />
        <AdminStatCard
          label="Active Tasks"
          value={stats.activeTasks}
          icon={Activity}
          iconBg="bg-amber-50 dark:bg-amber-950/30"
          iconColor="text-amber-600 dark:text-amber-400"
          description="Currently open or in-progress"
        />
      </div>

      {/* ── Quick Links ── */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-start gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-5 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${link.iconBg} ${link.iconColor} group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                    {link.label}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {link.desc}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 self-center text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-150" />
                {/* Shimmer */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-blue-500/5 via-transparent to-transparent rounded-2xl" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
