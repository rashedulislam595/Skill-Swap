import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight, Code2, Palette, PenTool, Megaphone, Database, Video, Briefcase } from "lucide-react";
import { type Task } from "@/lib/api/task";

// ─── helpers ────────────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  development: {
    label: "Development",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40",
    icon: Code2,
  },
  design: {
    label: "Design",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50/80 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40",
    icon: Palette,
  },
  writing: {
    label: "Writing",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40",
    icon: PenTool,
  },
  marketing: {
    label: "Marketing",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40",
    icon: Megaphone,
  },
  "data entry": {
    label: "Data Entry",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50/80 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40",
    icon: Database,
  },
  video: {
    label: "Video",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40",
    icon: Video,
  },
};

const DEFAULT_CATEGORY = {
  label: "General",
  color: "text-zinc-600 dark:text-zinc-400",
  bg: "bg-zinc-100/80 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40",
  icon: Briefcase,
};

function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category.toLowerCase()] ?? {
    ...DEFAULT_CATEGORY,
    label: category,
  };
}

/** Returns a short relative deadline label e.g. "2d left" or "Expired" */
function formatDeadline(deadline: string): { label: string; isUrgent: boolean } {
  const diff = new Date(deadline).getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (diff < 0) return { label: "Expired", isUrgent: true };
  if (hours < 24) return { label: `${hours}h left`, isUrgent: true };
  return { label: `${days}d left`, isUrgent: days <= 3 };
}

/** Generates initials avatar colour based on clientId */
function avatarColor(clientId: string | undefined) {
  const colours = [
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];
  if (!clientId) return colours[0];
  const idx =
    clientId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colours.length;
  return colours[idx];
}

// ─── component ──────────────────────────────────────────────────────────────

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const cat = getCategoryConfig(task.category ?? "");
  const CategoryIcon = cat.icon;
  const { label: deadlineLabel, isUrgent } = formatDeadline(task.deadline ?? "");
  const gradient = avatarColor(task.clientId);
  // Prefer real name; fall back to a short client ID label
  const displayName = task.clientName || `Client #${task.clientId ? task.clientId.slice(-6) : "------"}`;
  // First letter: from real name, or from clientId
  const initial = task.clientName
    ? task.clientName[0].toUpperCase()
    : task.clientId
    ? task.clientId[0].toUpperCase()
    : "?";

  const budgetFormatted = Number(task.budget).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="group relative flex flex-col rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm hover:shadow-lg hover:border-blue-100 dark:hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">

      {/* ── Top section ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Row: category badge + deadline */}
        <div className="flex items-center justify-between">
          {/* Category badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${cat.bg} ${cat.color}`}
          >
            <CategoryIcon className="h-3 w-3" />
            {cat.label}
          </span>

          {/* Deadline */}
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium ${
              isUrgent
                ? "text-rose-500 dark:text-rose-400"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            <Clock className="h-3 w-3" />
            {deadlineLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2 flex-1">
          {task.description}
        </p>

        {/* Client avatar row */}
        <div className="flex items-center gap-2 mt-1">
          {task.clientImage ? (
            <Image
              src={task.clientImage}
              alt={displayName}
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
            />
          ) : (
            <div
              className={`h-7 w-7 shrink-0 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center text-white text-[10px] font-bold shadow`}
            >
              {initial}
            </div>
          )}
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 truncate">
            {displayName}
          </span>
        </div>
      </div>

      {/* ── Bottom Budget Bar ── */}
      <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 px-5 py-3 bg-zinc-50/60 dark:bg-zinc-800/30">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
            Budget
          </p>
          <p className="text-base font-extrabold text-blue-600 dark:text-blue-400 leading-none">
            {budgetFormatted}
          </p>
        </div>
        <Link
          href={`/browse-tasks/${task._id}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-linear-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all duration-200 hover:scale-105 shadow-sm"
          aria-label="View task details"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Hover shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-blue-500/30 via-transparent to-transparent rounded-2xl" />
    </div>
  );
}
