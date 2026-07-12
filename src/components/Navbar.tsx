"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tasks", href: "/browse-tasks" },
    { name: "Browse Freelancers", href: "/browse-freelancers" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  // Helper to determine if a link is active
  const isActive = (href: string) => {
    // Default to active for "Browse Tasks" if on homepage as shown in user's image
    if (href === "/" && (pathname === "/" || pathname === "/")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80 transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo - Left Side */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 text-white shadow-lg shadow-blue-500/25 dark:shadow-indigo-500/10 group-hover:scale-105 transition-all duration-200">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 transition-all duration-200">
              SkillSwap
            </span>
          </Link>
        </div>

        {/* Navigation Items - Middle */}
        <nav className="hidden md:flex items-center justify-center space-x-1 h-full">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex h-8 items-center px-4 text-[14px] font-medium transition-colors duration-200 ${
                  active
                    ? "text-zinc-900 dark:text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons - Right Side */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-3.5">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-cyan-500 bg-transparent px-6 text-sm font-semibold text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent dark:text-cyan-400 dark:border-cyan-500/60 dark:hover:border-transparent shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay / Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-colors duration-200">
          <div className="space-y-1 px-4 pt-3 pb-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-150 ${
                    active
                      ? "bg-blue-50/50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 font-semibold"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/30 dark:hover:text-zinc-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-5 border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center justify-center rounded-md border border-cyan-500 bg-transparent text-sm font-semibold text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent dark:text-cyan-400 dark:border-cyan-500/60 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
