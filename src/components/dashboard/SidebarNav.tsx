"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid, 
  ClipboardList, 
  CirclePlus, 
  FileText, 
  Search, 
  Banknote, 
  UserCircle, 
  Users, 
  SlidersHorizontal, 
  History, 
  RefreshCw,
  Briefcase,
  LucideIcon 
} from "lucide-react";

interface SidebarNavProps {
  user: {
    role?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

interface NavItem {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface RoleConfig {
  title: string;
  subtitle: string;
  headerIcon: LucideIcon;
  headerBg: string;
  items: NavItem[];
}

export default function SidebarNav({ user }: SidebarNavProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Normalize role (lowercase to handle any casing from the database)
  const rawRole = (user?.role || "client").toLowerCase();
  const role = rawRole === "reader" ? "client" : rawRole === "writer" ? "freelancer" : rawRole;

  const roleConfigs: Record<string, RoleConfig> = {
    client: {
      title: "Properly.by",
      subtitle: "Freelance Marketplace",
      headerIcon: Briefcase,
      headerBg: "bg-linear-to-tr from-cyan-500 to-blue-600",
      items: [
        { icon: LayoutGrid, href: "/dashboard/client", label: "Dashboard" },
        { icon: ClipboardList, href: "/dashboard/client/my-tasks", label: "My Tasks" },
        { icon: CirclePlus, href: "/dashboard/client/post-task", label: "Post a Task" },
        { icon: FileText, href: "/dashboard/client/proposals", label: "Proposals" },
      ],
    },
    freelancer: {
      title: "WorkSync",
      subtitle: "Freelancer Pro",
      headerIcon: RefreshCw,
      headerBg: "bg-linear-to-tr from-purple-500 to-indigo-600",
      items: [
        { icon: LayoutGrid, href: "/dashboard/freelancer", label: "Dashboard" },
        { icon: Search, href: "/browse-tasks", label: "Browse Tasks" },
        { icon: FileText, href: "/dashboard/freelancer/my-proposals", label: "My Proposals" },
        { icon: ClipboardList, href: "/dashboard/freelancer/projects", label: "Active Projects" },
        { icon: Banknote, href: "/dashboard/freelancer/earnings", label: "My Earnings" },
        { icon: UserCircle, href: "/dashboard/freelancer/profile", label: "Profile" },
      ],
    },
    admin: {
      title: "Protocol Admin",
      subtitle: "System Controller",
      headerIcon: SlidersHorizontal,
      headerBg: "bg-linear-to-tr from-indigo-600 to-purple-800",
      items: [
        { icon: LayoutGrid, href: "/dashboard/admin", label: "Overview" },
        { icon: Users, href: "/dashboard/admin/users", label: "User Management" },
        { icon: SlidersHorizontal, href: "/dashboard/admin/tasks", label: "Task Moderation" },
        { icon: History, href: "/dashboard/admin/transactions", label: "Transaction History" },
      ],
    },
  };

  const currentConfig = roleConfigs[role] || roleConfigs.client;
  const HeaderIcon = currentConfig.headerIcon;

  return (
    <div className="flex flex-col h-full text-zinc-900 dark:text-zinc-100">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center lg:justify-start px-1.5 lg:px-3 py-5 mb-4 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-blue-500/10 lg:mr-3 ${currentConfig.headerBg}`}>
          <HeaderIcon className="h-5 w-5" />
        </div>
        <div className="hidden lg:flex flex-col min-w-0">
          <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white truncate">
            {currentConfig.title}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-0.5 truncate">
            {currentConfig.subtitle}
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1.5 px-0.5 lg:px-1">
        {currentConfig.items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={isMobile ? item.label : undefined}
              className={`flex items-center justify-center lg:justify-start gap-3.5 rounded-lg p-3 lg:px-3.5 lg:py-3 text-[14px] font-semibold tracking-wide transition-all duration-200 select-none group relative overflow-hidden
                ${isActive
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/10"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                }`}
            >
              {/* Left active line indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-full" />
              )}
              
              <item.icon
                className={`size-5 shrink-0 transition-transform duration-200 group-hover:scale-105
                  ${isActive ? "text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"}`}
              />

              <span className="hidden lg:inline truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}