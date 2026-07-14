import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-zinc-50 dark:bg-zinc-900 transition-colors duration-200">
      {/* Sidebar Container */}
      <DashboardSidebar />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}