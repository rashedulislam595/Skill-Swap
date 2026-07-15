import Link from "next/link";
import { Compass, User, ChevronRight, Zap } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500" />
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Action 1 */}
        <Link href="/browse-tasks" className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-zinc-700 hover:shadow-sm transition-all bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">Browse Tasks</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Find new opportunities</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-blue-500 transition-colors" />
        </Link>

        {/* Action 2 */}
        <Link href="/dashboard/freelancer/profile" className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-zinc-700 hover:shadow-sm transition-all bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">Update Profile</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Keep your skills fresh</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-indigo-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
