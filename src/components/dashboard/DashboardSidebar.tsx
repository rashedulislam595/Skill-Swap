import { getUserSession } from "@/lib/core/session";
import SidebarNav from "./SidebarNav";

export default async function DashboardSidebar() {
  const user = await getUserSession();

  return (
    <div className="w-16 lg:w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 min-h-screen">
      <aside className="p-3 lg:p-5 h-full">
        <SidebarNav user={user} />
      </aside>
    </div>
  );
}