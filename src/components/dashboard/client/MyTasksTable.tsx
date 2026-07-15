"use client";

import Link from "next/link";
import { Pencil, Trash2, Calendar, DollarSign } from "lucide-react";
import { type Task } from "@/lib/api/task";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/lib/action/task";
import { toast } from "react-toastify";

interface MyTasksTableProps {
  tasks: Task[];
}

const STATUS_CONFIG: Record<
  string,
  { dot: string; text: string; bg: string; border: string }
> = {
  open: {
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800/50",
  },
  "in progress": {
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800/50",
  },
  completed: {
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/50",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  design: "Design & Creative",
  development: "Web Development",
  writing: "Writing & Translation",
  marketing: "Digital Marketing",
};

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  const cfg = STATUS_CONFIG[key] ?? {
    dot: "bg-zinc-400",
    text: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-50 dark:bg-zinc-900",
    border: "border-zinc-200 dark:border-zinc-700",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.border} ${cfg.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {label}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function TaskRow({ task }: { task: Task }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${task.title}"?`)) return;

    startTransition(async () => {
      try {
        await deleteTask(task._id);
        toast.success("Task deleted successfully!", {
          position: "top-center",
        });
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete task.", {
          position: "top-center",
        });
      }
    });
  };

  return (
    <tr className="group transition-colors duration-150 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30">
      {/* Task Title */}
      <td className="py-4 px-4 min-w-[220px] max-w-[280px]">
        <p className="font-semibold text-zinc-900 dark:text-white leading-tight line-clamp-1">
          {task.title}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">
          {task.description.slice(0, 60)}…
        </p>
      </td>

      {/* Category */}
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="inline-block text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-md">
          {CATEGORY_LABELS[task.category] ?? task.category}
        </span>
      </td>

      {/* Date Posted */}
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="text-sm">{formatDate(task.createdAt)}</span>
        </div>
      </td>

      {/* Deadline */}
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-rose-400 dark:text-rose-500" />
          <span className="text-sm">{formatDate(task.deadline)}</span>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusBadge status={task.status} />
      </td>

      {/* Budget */}
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white">
          <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
          {Number(task.budget).toFixed(2)}
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right whitespace-nowrap">
        <div className="inline-flex items-center gap-1.5">
          <Link
            href={`/dashboard/client/my-tasks/${task._id}/edit`}
            title="Edit task"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-150 hover:scale-105"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isPending}
            title="Delete task"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:border-red-400 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150 hover:scale-105 disabled:opacity-50"
          >
            {isPending ? (
              <span className="h-3 w-3 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function MyTasksTable({ tasks }: MyTasksTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* ── Head ── */}
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-800">
            {["Task Title", "Category", "Date Posted", "Deadline", "Status", "Budget", "Actions"].map(
              (col, i) => (
                <th
                  key={col}
                  className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap bg-zinc-50/60 dark:bg-zinc-900/40 ${
                    i === 0 ? "text-left" : i === 6 ? "text-right" : "text-left"
                  }`}
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {tasks.map((task) => (
            <TaskRow key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
