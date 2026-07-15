import { Suspense } from "react";
import { Activity } from "lucide-react";
import { getAllTasks } from "@/lib/api/task";
import TaskCard from "@/components/browse-tasks/TaskCard";
import EmptyTasks from "@/components/browse-tasks/EmptyTasks";
import BrowseTasksSearch from "@/components/browse-tasks/BrowseTasksSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Tasks | SkillSwap",
  description:
    "Explore available tasks and micro-projects from clients. Find your next freelance opportunity on SkillSwap.",
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

function TaskGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-5 shadow-sm animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-4 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="h-5 w-3/4 rounded-md bg-zinc-100 dark:bg-zinc-800 mb-2" />
          <div className="h-4 w-full rounded-md bg-zinc-100 dark:bg-zinc-800 mb-1" />
          <div className="h-4 w-2/3 rounded-md bg-zinc-100 dark:bg-zinc-800 mb-4" />
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-28 rounded-md bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <div className="h-6 w-20 rounded-md bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Task Grid (async data-fetching) ─────────────────────────────────────────

async function TaskGrid({ query, category }: { query: string; category: string }) {
  let tasks = await getAllTasks();

  // Client-side-style filtering for search & category (done server-side here)
  if (query) {
    const q = query.toLowerCase();
    tasks = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }
  if (category && category !== "all") {
    tasks = tasks.filter(
      (t) => t.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (tasks.length === 0) {
    return <EmptyTasks />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

// ─── Task Count Badge (async) ─────────────────────────────────────────────────

async function TaskCountBadge() {
  let count: number | null = null;
  try {
    const tasks = await getAllTasks();
    count = tasks.length;
  } catch {
    // silently ignore — badge simply won't render
  }

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
      <Activity className="h-3.5 w-3.5 animate-pulse" />
      {count.toLocaleString()} Tasks Live
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface BrowseTasksPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function BrowseTasksPage({ searchParams }: BrowseTasksPageProps) {
  const { q = "", category = "all" } = await searchParams;

  return (
    <section className="relative bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-200">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)]  w-144.5 -translate-x-1/2 rotate-[30] bg-linear-to-tr from-cyan-500 to-purple-500 opacity-[0.06] dark:opacity-[0.12] sm:left-[calc(50%-30rem)] sm:w-288.75" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Available Tasks
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Find your next project from our community of creators and
              entrepreneurs.
            </p>
          </div>

          {/* Live badge */}
          <div className="shrink-0 self-start sm:self-center">
            <Suspense
              fallback={
                <span className="inline-flex h-7 w-32 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
              }
            >
              <TaskCountBadge />
            </Suspense>
          </div>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="mb-8">
          <BrowseTasksSearch initialQuery={q} initialCategory={category} />
        </div>

        {/* ── Task Grid ── */}
        <Suspense fallback={<TaskGridSkeleton />}>
          <TaskGrid query={q} category={category} />
        </Suspense>
      </div>
    </section>
  );
}