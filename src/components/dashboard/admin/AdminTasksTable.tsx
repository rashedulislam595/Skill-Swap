"use client";

import { useState, useTransition } from "react";
import { Trash2, Clock, Search, ChevronDown, AlertTriangle, ClipboardList } from "lucide-react";
import { deleteAdminTask } from "@/lib/action/admin";
import { type AdminTask } from "@/lib/api/admin";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  open: {
    label: "Open",
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40",
  },
  completed: {
    label: "Completed",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40",
  },
};

function getStatusConfig(status: string) {
  return (
    STATUS_CONFIG[status?.toLowerCase()] ?? {
      label: status || "Unknown",
      color: "text-zinc-600 dark:text-zinc-400",
      bg: "bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40",
    }
  );
}

function formatDeadline(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: "Expired", urgent: true };
  return { label: `${days}d left`, urgent: days <= 3 };
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function TaskRow({ task, onDelete }: { task: AdminTask; onDelete: (id: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);
  const statusConf = getStatusConfig(task.status);
  const { label: deadlineLabel, urgent } = formatDeadline(task.deadline);
  const budget = Number(task.budget).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const handleDelete = () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    startTransition(async () => {
      await deleteAdminTask(task._id);
      onDelete(task._id);
    });
  };

  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors duration-150">
      {/* Title */}
      <td className="px-4 py-3.5 max-w-[220px]">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white line-clamp-1">{task.title}</p>
        {task.clientName && (
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">by {task.clientName}</p>
        )}
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 capitalize">{task.category}</span>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusConf.bg} ${statusConf.color}`}
        >
          {statusConf.label}
        </span>
      </td>

      {/* Budget */}
      <td className="px-4 py-3.5">
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{budget}</span>
      </td>

      {/* Deadline */}
      <td className="px-4 py-3.5">
        <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${urgent ? "text-rose-500 dark:text-rose-400" : "text-zinc-400 dark:text-zinc-500"}`}>
          <Clock className="h-3 w-3" />
          {deadlineLabel}
        </span>
      </td>

      {/* Action */}
      <td className="px-4 py-3.5 text-right">
        {confirm ? (
          <div className="inline-flex items-center gap-2">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Sure?
            </span>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all duration-150 disabled:opacity-50"
            >
              {isPending ? <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Trash2 className="h-3 w-3" />}
              {isPending ? "" : "Delete"}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-150"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── Main Table ───────────────────────────────────────────────────────────────

export default function AdminTasksTable({ tasks: initialTasks }: { tasks: AdminTask[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const filtered = tasks.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.clientName?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchStatus = statusFilter === "all" || t.status?.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title or client…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-9 pr-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-4 pr-9 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        </div>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Showing <span className="font-semibold text-zinc-600 dark:text-zinc-300">{filtered.length}</span> of {tasks.length} tasks
      </p>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/30">
                {["Task", "Category", "Status", "Budget", "Deadline", "Action"].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ${h === "Action" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-700/50 text-zinc-400 dark:text-zinc-500 mb-4 shadow-xs">
                        <ClipboardList className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        No Tasks Found
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        We couldn&apos;t find any tasks matching your current search or status filters. Try adjusting your inputs.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((task) => (
                  <TaskRow key={task._id} task={task} onDelete={handleDelete} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
