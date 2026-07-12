"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white dark:bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-4xl">
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/60 dark:shadow-zinc-900/60 px-8 py-16 sm:px-16 text-center">

          {/* Subtle gradient orbs for depth */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl" />

          {/* Heading */}
          <h2 className="relative text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
            Ready to scale your productivity?
          </h2>

          {/* Subtitle */}
          <p className="relative mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Join thousands of businesses and freelancers getting things done every single day.
          </p>

          {/* Buttons */}
          <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary — Blue → Purple gradient (matches Register btn) */}
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started Now
            </Link>

            {/* Secondary — Cyan outline (matches Login btn) */}
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center rounded-md border border-cyan-500 bg-transparent px-8 text-sm font-semibold text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent dark:text-cyan-400 dark:border-cyan-500/60 dark:hover:border-transparent shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
