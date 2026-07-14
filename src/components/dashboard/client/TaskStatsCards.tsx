import {
  ClipboardList,
  Briefcase,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

interface Task {
  status: string;
}

interface TaskStatsCardsProps {
  tasks: Task[];
}

export default function TaskStatsCards({ tasks }: TaskStatsCardsProps) {
  const total = tasks.length;
  const open = tasks.filter((t) => t.status.toLowerCase() === "open").length;
  const inProgress = tasks.filter(
    (t) => t.status.toLowerCase() === "in progress"
  ).length;
  const completed = tasks.filter(
    (t) => t.status.toLowerCase() === "completed"
  ).length;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ClipboardList,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-100 dark:border-blue-900/30",
    },
    {
      label: "Open Positions",
      value: open,
      icon: Briefcase,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-100 dark:border-emerald-900/30",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: RefreshCw,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-100 dark:border-amber-900/30",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
      border: "border-indigo-100 dark:border-indigo-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`flex items-center justify-between rounded-xl border ${stat.border} bg-white dark:bg-zinc-900/60 p-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
