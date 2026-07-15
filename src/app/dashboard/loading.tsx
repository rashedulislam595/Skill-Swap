// Dashboard loading skeleton — matches the sidebar + main content layout
export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-7 w-52 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-64 rounded-md bg-zinc-100 dark:bg-zinc-800" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-100 dark:border-zinc-800" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 rounded-md bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="h-7 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-28 rounded-md bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden shadow-sm">
        {/* Table head */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/30">
          {[100, 80, 60, 60, 50].map((w, i) => (
            <div key={i} className={`h-3 w-${w === 100 ? "full" : w} rounded-md bg-zinc-100 dark:bg-zinc-800`} style={{ width: w }} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-4 border-b border-zinc-50 dark:border-zinc-800/60 last:border-0"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0" />
              <div className="space-y-1 flex-1">
                <div className="h-3.5 w-32 rounded-md bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-2.5 w-24 rounded-md bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </div>
            <div className="h-3 w-20 rounded-md bg-zinc-100 dark:bg-zinc-800 hidden sm:block" />
            <div className="h-5 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 hidden md:block" />
            <div className="h-5 w-14 rounded-full bg-zinc-100 dark:bg-zinc-800 hidden lg:block" />
            <div className="h-7 w-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
