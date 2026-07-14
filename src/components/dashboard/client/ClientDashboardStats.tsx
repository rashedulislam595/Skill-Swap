import {
  ClipboardList,
  Briefcase,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Minus,
  Activity,
  BarChart3,
} from "lucide-react";
import { type Task } from "@/lib/api/task";

interface ClientDashboardStatsProps {
  tasks: Task[];
}

export default function ClientDashboardStats({
  tasks,
}: ClientDashboardStatsProps) {
  const total = tasks.length;
  const open = tasks.filter((t) => t.status.toLowerCase() === "open").length;
  const inProgress = tasks.filter(
    (t) => t.status.toLowerCase() === "in progress"
  ).length;
  const totalSpent = tasks.reduce((sum, t) => sum + Number(t.budget), 0);

  const formatSpent = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val.toFixed(2)}`;
  };

  const stats = [
    {
      label: "Total Tasks",
      value: String(total),
      icon: ClipboardList,
      badge: "+12%",
      badgeColor:
        "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
      badgeIcon: TrendingUp,
      iconBg: "bg-blue-50 dark:bg-blue-950/40",
      iconColor: "text-blue-500",
      border: "border-blue-100 dark:border-blue-900/30",
    },
    {
      label: "Open Tasks",
      value: String(open),
      icon: Briefcase,
      badge: "Steady",
      badgeColor:
        "text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800",
      badgeIcon: Minus,
      iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
      iconColor: "text-indigo-500",
      border: "border-indigo-100 dark:border-indigo-900/30",
    },
    {
      label: "In Progress",
      value: String(inProgress),
      icon: RefreshCw,
      badge: "Active",
      badgeColor:
        "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
      badgeIcon: Activity,
      iconBg: "bg-amber-50 dark:bg-amber-950/40",
      iconColor: "text-amber-500",
      border: "border-amber-100 dark:border-amber-900/30",
    },
    {
      label: "Total Spent (USD)",
      value: formatSpent(totalSpent),
      icon: DollarSign,
      badge: "Q4",
      badgeColor:
        "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40",
      badgeIcon: BarChart3,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
      iconColor: "text-emerald-500",
      border: "border-emerald-100 dark:border-emerald-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        const BadgeIcon = s.badgeIcon;
        return (
          <div
            key={s.label}
            className={`relative flex flex-col gap-3 rounded-xl border ${s.border} bg-white dark:bg-zinc-900/70 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group`}
          >
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.badgeColor}`}
              >
                <BadgeIcon className="h-3 w-3" />
                {s.badge}
              </span>
            </div>

            {/* Label */}
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {s.label}
            </p>

            {/* Value */}
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-none">
              {s.value}
            </p>

            {/* Subtle gradient shimmer on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent dark:from-white/3" />
          </div>
        );
      })}
    </div>
  );
}
