"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";

export default function TaskProposalForm({ taskId }: { taskId: string }) {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const [bid, setBid] = useState("");
  const [days, setDays] = useState("");
  const [coverNote, setCoverNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // In a real app, you would submit to an API here
    toast.success("Proposal submitted successfully!");
    setBid("");
    setDays("");
    setCoverNote("");
  };

  return (
    <div className="rounded-2xl border-2 border-blue-600/20 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
        Submit Proposal
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Your Bid (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
              $
            </span>
            <input
              type="number"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 pl-8 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Estimated Days
          </label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="e.g. 7"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Cover Note
          </label>
          <textarea
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="Why are you a good fit for this task?"
            rows={4}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
            required
          />
        </div>

        <div className="pt-2">
          {isPending ? (
            <div className="h-12 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          ) : user ? (
            <button
              type="submit"
              className="w-full flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 transition-colors"
            >
              Submit Proposal
            </button>
          ) : (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800/30 p-4 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Please login to submit your proposal and start earning.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold py-2.5 px-6 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors gap-2 text-sm"
              >
                <Lock className="w-4 h-4" />
                Login to Apply
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
