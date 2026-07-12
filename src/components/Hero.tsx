"use client";

import Link from "next/link";
import { Zap, PlusCircle } from "lucide-react";

export default function Hero() {
  const stats = [
    { value: "15k+", label: "Active Tasks" },
    { value: "50k+", label: "Top Freelancers" },
    { value: "10min", label: "Avg. Hire Time" },
    { value: "99.8%", label: "Task Success" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200">
      {/* Background Subtle Gradient Glow for Premium Feel */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-500 to-purple-500 opacity-10 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/30 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 mb-8 backdrop-blur-sm">
          <Zap className="h-3.5 w-3.5 fill-current animate-pulse" />
          <span>Quick execution for one-time projects</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] max-w-3xl">
          Get your tasks done by{" "}
          <span className="text-blue-600 dark:text-blue-500 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            skilled freelancers
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-6 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          The modern marketplace for high-velocity work. Post a micro-task, hire a professional in minutes, and pay securely when the job is done.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/post-task"
            className="inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Post a Task
            <PlusCircle className="h-4.5 w-4.5" />
          </Link>
          <Link
            href="/browse-tasks"
            className="inline-flex w-full sm:w-auto h-12 items-center justify-center rounded-md border border-cyan-500 bg-transparent px-8 text-sm font-semibold text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent dark:text-cyan-400 dark:border-cyan-500/60 dark:hover:border-transparent shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse Tasks
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-20 w-full border-t border-zinc-100/80 dark:border-zinc-900 pt-10">
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
