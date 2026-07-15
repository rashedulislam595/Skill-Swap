"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Wrench, DollarSign, Star, SlidersHorizontal } from "lucide-react";

interface BrowseFreelancersSearchProps {
  initialSkill?: string;
  initialRate?: string;
  initialRating?: string;
}

export default function BrowseFreelancersSearch({
  initialSkill = "all",
  initialRate = "any",
  initialRating = "any",
}: BrowseFreelancersSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [skill, setSkill] = useState(initialSkill);
  const [rate, setRate] = useState(initialRate);
  const [rating, setRating] = useState(initialRating);

  const applyFilters = useCallback(
    (s: string, r: string, rt: string) => {
      const params = new URLSearchParams();
      if (s && s !== "all") params.set("skill", s);
      if (r && r !== "any") params.set("rate", r);
      if (rt && rt !== "any") params.set("rating", rt);
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname]
  );

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    applyFilters(skill, rate, rating);
  };

  return (
    <form
      onSubmit={handleApply}
      className="flex flex-col sm:flex-row flex-wrap gap-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-5 shadow-sm"
    >
      {/* Skills Dropdown */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">
          Skills & Expertise
        </label>
        <div className="relative">
          <Wrench className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full appearance-none rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 pl-9 pr-8 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 cursor-pointer transition-colors"
          >
            <option value="all">All Skills</option>
            <option value="react">React.js</option>
            <option value="node">Node.js</option>
            <option value="design">UI/UX Design</option>
            <option value="marketing">Marketing</option>
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {/* Hourly Rate Dropdown */}
      <div className="w-full sm:w-auto min-w-[160px]">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">
          Hourly Rate
        </label>
        <div className="relative">
          <DollarSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <select
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full appearance-none rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 pl-9 pr-8 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 cursor-pointer transition-colors"
          >
            <option value="any">Any Price</option>
            <option value="0-50">$0 - $50/hr</option>
            <option value="50-100">$50 - $100/hr</option>
            <option value="100+">$100+/hr</option>
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {/* Rating Dropdown */}
      <div className="w-full sm:w-auto min-w-[160px]">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">
          Rating
        </label>
        <div className="relative">
          <Star className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full appearance-none rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 pl-9 pr-8 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 cursor-pointer transition-colors"
          >
            <option value="any">Any Rating</option>
            <option value="4.5+">4.5 & up</option>
            <option value="4.0+">4.0 & up</option>
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {/* Apply Button */}
      <div className="w-full sm:w-auto flex items-end">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          Apply Filters
        </button>
      </div>
    </form>
  );
}
