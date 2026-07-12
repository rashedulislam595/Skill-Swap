"use client";

import Link from "next/link";
import { Code2, Palette, PenTool, Megaphone, Database, Video } from "lucide-react";

export default function Categories() {
  const categories = [
    {
      name: "Development",
      href: "/categories/development",
      icon: Code2,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50/80 dark:bg-blue-950/30",
    },
    {
      name: "Design",
      href: "/categories/design",
      icon: Palette,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50/80 dark:bg-emerald-950/30",
    },
    {
      name: "Writing",
      href: "/categories/writing",
      icon: PenTool,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50/80 dark:bg-amber-950/30",
    },
    {
      name: "Marketing",
      href: "/categories/marketing",
      icon: Megaphone,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-50/80 dark:bg-indigo-950/30",
    },
    {
      name: "Data Entry",
      href: "/categories/data-entry",
      icon: Database,
      iconColor: "text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-50/80 dark:bg-teal-950/30",
    },
    {
      name: "Video",
      href: "/categories/video",
      icon: Video,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50/80 dark:bg-rose-950/30",
    },
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        {/* Header section */}
        <div className="mb-10">
          {/* Title & Description - centered */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Popular Categories
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Find specialized talent across all modern industries.
            </p>
          </div>
          {/* View All link - right aligned on its own row */}
          <div className="flex justify-end mt-4">
            <Link
              href="/categories"
              className="group inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
            >
              View All
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group flex flex-col items-center justify-center rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 p-6 text-center shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-zinc-800 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Icon wrapper */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${category.iconBg} ${category.iconColor} group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                  <Icon className="h-6 w-6" />
                </div>
                {/* Category name */}
                <span className="mt-4 text-[15px] font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
