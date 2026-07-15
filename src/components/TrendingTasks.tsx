import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  ChevronRight,
  Code2,
  Palette,
  PenTool,
  Megaphone,
  Database,
  Video,
  Briefcase,
  TrendingUp,
  Flame,
} from "lucide-react";
import { getAllTasks, type Task } from "@/lib/api/task";

// ─── category config (matches TaskCard) ─────────────────────────────────────

const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; dot: string; icon: React.ElementType }
> = {
  development: {
    label: "Development",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40",
    dot: "bg-blue-500",
    icon: Code2,
  },
  design: {
    label: "Design",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40",
    dot: "bg-violet-500",
    icon: Palette,
  },
  writing: {
    label: "Writing",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40",
    dot: "bg-amber-500",
    icon: PenTool,
  },
  marketing: {
    label: "Marketing",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40",
    dot: "bg-indigo-500",
    icon: Megaphone,
  },
  "data entry": {
    label: "Data Entry",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40",
    dot: "bg-teal-500",
    icon: Database,
  },
  video: {
    label: "Video",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40",
    dot: "bg-rose-500",
    icon: Video,
  },
};

const DEFAULT_CATEGORY = {
  label: "General",
  color: "text-zinc-600 dark:text-zinc-400",
  bg: "bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40",
  dot: "bg-zinc-400",
  icon: Briefcase,
};

function getCategoryConfig(category: string) {
  return (
    CATEGORY_CONFIG[category?.toLowerCase()] ?? {
      ...DEFAULT_CATEGORY,
      label: category || "General",
    }
  );
}

function formatDeadline(deadline: string): { label: string; isUrgent: boolean } {
  const diff = new Date(deadline).getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (diff < 0) return { label: "Expired", isUrgent: true };
  if (hours < 24) return { label: `${hours}h left`, isUrgent: true };
  return { label: `${days}d left`, isUrgent: days <= 3 };
}

function avatarGradient(clientId: string | undefined) {
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
  ];
  if (!clientId) return gradients[0];
  const idx =
    clientId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    gradients.length;
  return gradients[idx];
}

// ─── Trending Task Card ──────────────────────────────────────────────────────

function TrendingTaskCard({ task, rank }: { task: Task; rank: number }) {
  const cat = getCategoryConfig(task.category ?? "");
  const CategoryIcon = cat.icon;
  const { label: deadlineLabel, isUrgent } = formatDeadline(task.deadline ?? "");
  const gradient = avatarGradient(task.clientId);
  const displayName =
    task.clientName || `Client #${task.clientId ? task.clientId.slice(-6) : "------"}`;
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

  const rankColors = [
    "from-amber-400 to-orange-500",   // 1st
    "from-zinc-400 to-zinc-500",       // 2nd
    "from-amber-600 to-yellow-700",    // 3rd
    "from-blue-500 to-indigo-600",     // 4-6
    "from-blue-500 to-indigo-600",
    "from-blue-500 to-indigo-600",
  ];

  return (
    <Link
      href={`/browse-tasks/${task._id}`}
      className="group relative flex items-start gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-4 shadow-sm hover:shadow-lg hover:border-blue-100 dark:hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Rank badge */}
      <div
        className={`flex-shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br ${rankColors[rank - 1] ?? rankColors[3]} flex items-center justify-center text-white text-xs font-extrabold shadow-md`}
      >
        #{rank}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Category + Deadline */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cat.bg} ${cat.color}`}
          >
            <CategoryIcon className="h-2.5 w-2.5" />
            {cat.label}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-medium ${
              isUrgent ? "text-rose-500 dark:text-rose-400" : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            <Clock className="h-2.5 w-2.5" />
            {deadlineLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150 mb-1.5">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">
          {task.description}
        </p>

        {/* Footer: avatar + budget */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {task.clientImage ? (
              <Image
                src={task.clientImage}
                alt={displayName}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
              />
            ) : (
              <div
                className={`h-5 w-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[8px] font-bold`}
              >
                {initial}
              </div>
            )}
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 truncate max-w-[90px]">
              {displayName}
            </span>
          </div>

          <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
            {budgetFormatted}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 self-center">
        <ChevronRight className="h-4 w-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors duration-150" />
      </div>

      {/* Hover shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-2xl" />
    </Link>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default async function TrendingTasks() {
  let tasks: Task[] = [];
  try {
    const all = await getAllTasks();
    tasks = all.slice(0, 6);
  } catch {
    tasks = [];
  }

  if (tasks.length === 0) return null;

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 px-4 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30 mb-4">
              <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
              <span>Hot Right Now</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Trending Tasks
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              The most in-demand tasks posted by clients right now.
            </p>
          </div>

          {/* View All */}
          <div className="flex justify-end mt-4">
            <Link
              href="/browse-tasks"
              className="group inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
            >
              <TrendingUp className="h-4 w-4 mr-1.5" />
              View All Tasks
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, idx) => (
            <TrendingTaskCard key={task._id} task={task} rank={idx + 1} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 rounded-2xl border border-dashed border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Ready to find your next opportunity?
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Browse hundreds of open tasks and start earning today.
            </p>
          </div>
          <Link
            href="/browse-tasks"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            Explore All Tasks
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
