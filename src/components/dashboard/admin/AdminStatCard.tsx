import { type LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export default function AdminStatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  prefix = "",
  suffix = "",
  description,
}: AdminStatCardProps) {
  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-5 shadow-sm overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Subtle glow */}
      <div className={`absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-10 ${iconBg}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            {label}
          </p>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {prefix}
            {typeof value === "number" ? value.toLocaleString() : value}
            {suffix}
          </p>
          {description && (
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
          )}
        </div>

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} shadow-sm`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
