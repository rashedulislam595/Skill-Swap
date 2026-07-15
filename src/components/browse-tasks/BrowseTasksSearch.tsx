"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "writing", label: "Writing" },
  { value: "marketing", label: "Marketing" },
  { value: "data entry", label: "Data Entry" },
  { value: "video", label: "Video" },
];

interface BrowseTasksSearchProps {
  initialQuery: string;
  initialCategory: string;
}

export default function BrowseTasksSearch({
  initialQuery,
  initialCategory,
}: BrowseTasksSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const applyFilters = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat && cat !== "all") params.set("category", cat);
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(query, category);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    applyFilters(query, cat);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-3 shadow-sm"
    >
      {/* Search input */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <input
          id="browse-tasks-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by task title or keywords…"
          className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 pl-9 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-150"
        />
      </div>

      {/* Category select */}
      <div className="relative">
        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <select
          id="browse-tasks-category"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="h-full w-full sm:w-48 appearance-none rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 pl-9 pr-8 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 cursor-pointer transition-all duration-150"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Search button */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isPending ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        Search
      </button>
    </form>
  );
}
