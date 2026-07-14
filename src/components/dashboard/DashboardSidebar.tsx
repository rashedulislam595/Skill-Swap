"use client";

import { useSession } from "@/lib/auth-client";
import SidebarNav from "./SidebarNav";

export default function DashboardSidebar() {
  const { data: sessionData } = useSession();
  const user = sessionData?.user || null;

  return (
    <div className="w-16 lg:w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 min-h-screen">
      <aside className="p-3 lg:p-5 h-full">
        <SidebarNav user={user} />
      </aside>
    </div>
  );
}