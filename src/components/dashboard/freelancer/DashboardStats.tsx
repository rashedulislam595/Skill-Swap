import { DashboardStats as Stats } from "@/lib/api/freelancerDashboard";
import { Send, ClipboardList, CheckCircle2, Wallet } from "lucide-react";

export default function DashboardStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Proposals */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Send className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            +{stats.totalProposals.trend}%
          </span>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1">
            Total Proposals
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {stats.totalProposals.count}
          </p>
        </div>
      </div>

      {/* Pending Proposals */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <ClipboardList className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
            Active
          </span>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1">
            Pending Proposals
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {stats.pendingProposals.count}
          </p>
        </div>
      </div>

      {/* Accepted Proposals */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            {stats.acceptedProposals.rate}% Rate
          </span>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-1">
            Accepted Proposals
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {stats.acceptedProposals.count}
          </p>
        </div>
      </div>

      {/* Total Earnings (Dark style) */}
      <div className="bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between text-white">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Wallet className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300">
            MTD
          </span>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 mb-1">
            Total Earnings
          </p>
          <p className="text-3xl font-extrabold text-white">
            ${stats.totalEarnings.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

    </div>
  );
}
