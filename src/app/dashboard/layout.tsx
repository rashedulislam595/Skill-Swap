import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-row min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-200">
      {/* Sidebar Container */}
      <DashboardSidebar />

      {/* Main Dashboard Content */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
        {children}
      </main>
    </div>
  );
}