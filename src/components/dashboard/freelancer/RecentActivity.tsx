import { RecentActivity as Activity } from "@/lib/api/freelancerDashboard";
import { CheckCircle2, Eye, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col h-full">
      <div className="p-6 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Recent Activity</h2>
        <Link href="/dashboard/freelancer/activity" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700">
          View All
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activities.length > 0 ? (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
            {activities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                <div className="flex gap-4 items-start">
                  
                  {/* Icon */}
                  <div className="shrink-0 mt-1">
                    {activity.type === "ACCEPTED" && (
                      <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    {activity.type === "VIEWED" && (
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                        <Eye className="w-5 h-5" />
                      </div>
                    )}
                    {activity.type === "FEEDBACK" && (
                      <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-500">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap ml-4">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      {activity.description}
                    </p>
                    
                    {/* Action Row */}
                    {activity.type === "ACCEPTED" && activity.projectValue && (
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                          PROJECT VALUE: ${activity.projectValue.toLocaleString()}
                        </span>
                        <button className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
            No recent activity.
          </div>
        )}
      </div>
    </div>
  );
}
