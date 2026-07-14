import Link from "next/link";
import {
  CirclePlus,
  Users,
  Download,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    icon: CirclePlus,
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-500",
    label: "Post New Task",
    description: "List a project to hire expert help",
    href: "/dashboard/client/post-task",
  },
  {
    icon: Users,
    iconBg: "bg-purple-50 dark:bg-purple-950/40",
    iconColor: "text-purple-500",
    label: "Browse Freelancers",
    description: "Find the right talent for your needs",
    href: "/browse-freelancers",
  },
  {
    icon: Download,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-500",
    label: "Download Reports",
    description: "Get a detailed CSV of your spending",
    href: "#",
  },
];

export default function ClientQuickActions() {
  return (
    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm overflow-hidden h-fit">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">
          Quick Actions
        </h2>
      </div>

      {/* Actions */}
      <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center gap-3.5 px-5 py-4 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-all duration-150"
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.iconBg} transition-transform duration-150 group-hover:scale-105`}
              >
                <Icon className={`h-5 w-5 ${action.iconColor}`} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white leading-tight">
                  {action.label}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-snug">
                  {action.description}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-4 w-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-150 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
