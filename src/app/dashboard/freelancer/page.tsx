import { Calendar, Download } from "lucide-react";
import DashboardStats from "@/components/dashboard/freelancer/DashboardStats";
import QuickActions from "@/components/dashboard/freelancer/QuickActions";
import RecentActivity from "@/components/dashboard/freelancer/RecentActivity";
import ProfileStrength from "@/components/dashboard/freelancer/ProfileStrength";
import EarningsTrend from "@/components/dashboard/freelancer/EarningsTrend";

import { 
  getDashboardStats, 
  getRecentActivities, 
  getProfileStrength, 
  getEarningsTrend 
} from "@/lib/api/freelancerDashboard";

export default async function FreelancerDashboardPage() {
  const [stats, activities, profileStrength, earningsData] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(),
    getProfileStrength(),
    getEarningsTrend()
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1527] dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-[#64748B] dark:text-zinc-400 text-sm sm:text-base mt-1">
            Welcome back, Alex. Here is what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm">
            <Calendar className="w-4 h-4 text-zinc-500" />
            Last 30 Days
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <DashboardStats stats={stats} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Quick Actions + Recent Activity) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <QuickActions />
          <div className="flex-1">
            <RecentActivity activities={activities} />
          </div>
        </div>

        {/* Right Column (Profile Strength + Earnings Trend) */}
        <div className="space-y-6 flex flex-col">
          <div className="shrink-0">
            <ProfileStrength profileStrength={profileStrength} />
          </div>
          <div className="flex-1 min-h-[300px]">
            <EarningsTrend data={earningsData} />
          </div>
        </div>
        
      </div>
    </div>
  );
}