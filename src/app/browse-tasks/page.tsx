import { Suspense } from "react";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllTasks } from "@/lib/api/task";
import TaskCard from "@/components/browse-tasks/TaskCard";
import EmptyTasks from "@/components/browse-tasks/EmptyTasks";
import BrowseTasksSearch from "@/components/browse-tasks/BrowseTasksSearch";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Tasks | SkillSwap",
  description:
    "Explore available tasks and micro-projects from clients. Find your next freelance opportunity on SkillSwap.",
};

const TASKS_PER_PAGE = 9;

// ─── Skeleton ────────────────────────────────────────────────────────────────

function TaskGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: TASKS_PER_PAGE }).map((_, i) => (
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

// ─── Pagination Component ─────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  query,
  category,
}: {
  currentPage: number;
  totalPages: number;
  query: string;
  category: string;
}) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "all") params.set("category", category);
    params.set("page", String(page));
    return `/browse-tasks?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | "...")[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-150"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-zinc-400 dark:text-zinc-500"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p as number)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-150 border ${
              p === currentPage
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
            }`}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-150"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-100 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}

// ─── Task Grid (async, paginated) ─────────────────────────────────────────────

async function TaskGrid({
  query,
  category,
  page,
}: {
  query: string;
  category: string;
  page: number;
}) {
  let tasks = await getAllTasks();

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

  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginated = tasks.slice(
    (safePage - 1) * TASKS_PER_PAGE,
    safePage * TASKS_PER_PAGE
  );

  return (
    <>
      {/* Result count */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
        Showing{" "}
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">
          {(safePage - 1) * TASKS_PER_PAGE + 1}–
          {Math.min(safePage * TASKS_PER_PAGE, tasks.length)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">
          {tasks.length}
        </span>{" "}
        tasks
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginated.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        query={query}
        category={category}
      />
    </>
  );
}

// ─── Task Count Badge (async) ─────────────────────────────────────────────────

async function TaskCountBadge() {
  let count: number | null = null;
  try {
    const tasks = await getAllTasks();
    count = tasks.length;
  } catch {
    // silently ignore
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
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

export default async function BrowseTasksPage({ searchParams }: BrowseTasksPageProps) {
  const { q = "", category = "all", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  return (
    <section className="relative bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-200">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] w-144.5 -translate-x-1/2 rotate-[30] bg-linear-to-tr from-cyan-500 to-purple-500 opacity-[0.06] dark:opacity-[0.12] sm:left-[calc(50%-30rem)] sm:w-288.75" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Available Tasks
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Find your next project from our community of creators and entrepreneurs.
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

        {/* ── Task Grid + Pagination ── */}
        <Suspense fallback={<TaskGridSkeleton />}>
          <TaskGrid query={q} category={category} page={currentPage} />
        </Suspense>
      </div>
    </section>
  );
}