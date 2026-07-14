import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Task } from "@/lib/api/task";

interface RecentTaskActivityProps {
  tasks: Task[];
}

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  open: {
    label: "Open",
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/40",
  },
  "in progress": {
    label: "In Progress",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800/40",
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800/40",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  design: "from-pink-500 to-rose-500",
  development: "from-blue-500 to-indigo-500",
  writing: "from-emerald-500 to-teal-500",
  marketing: "from-amber-500 to-orange-500",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
}

function getInitials(title: string): string {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function RecentTaskActivity({ tasks }: RecentTaskActivityProps) {
  const recent = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">
          Recent Task Activity
        </h2>
        <Link
          href="/dashboard/client/my-tasks"
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          View All Tasks
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Column labels */}
      <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-x-4 px-5 py-2.5 border-b border-zinc-50 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/40">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Task Title
        </span>
        <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-center w-20">
          Category
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-center w-24">
          Status
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 text-right w-20">
          Budget
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
        {recent.length === 0 ? (
          <p className="py-10 text-center text-sm text-zinc-400 dark:text-zinc-500">
            No tasks yet.
          </p>
        ) : (
          recent.map((task) => {
            const statusKey = task.status.toLowerCase();
            const cfg =
              STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["open"];
            const gradientClass =
              CATEGORY_COLORS[task.category] ?? "from-zinc-400 to-zinc-500";

            return (
              <div
                key={task._id}
                className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-x-4 items-center px-5 py-3.5 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors duration-150"
              >
                {/* Title + avatar + time */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} text-white text-[11px] font-bold shadow-sm`}
                  >
                    {getInitials(task.title)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white leading-tight truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      Posted {timeAgo(task.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Category badge */}
                <div className="hidden sm:flex justify-center w-20">
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md capitalize">
                    {task.category}
                  </span>
                </div>

                {/* Status */}
                <div className="flex justify-center w-24">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>

                {/* Budget */}
                <div className="flex justify-end w-20">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    ${Number(task.budget).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
