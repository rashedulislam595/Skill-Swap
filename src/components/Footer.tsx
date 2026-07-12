"use client";

import Link from "next/link";
import { Globe, DollarSign } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const footerLinks = {
  Marketplace: [
    { label: "Browse Tasks", href: "/tasks" },
    { label: "Freelancers", href: "/freelancers" },
    { label: "Enterprise Solutions", href: "/enterprise" },
    { label: "Categories", href: "/categories" },
  ],
  Resources: [
    { label: "Support", href: "/support" },
    { label: "Contact", href: "/contact" },
    { label: "Success Stories", href: "/stories" },
    { label: "API Documentation", href: "/docs" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: CiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 dark:border-zinc-800 transition-colors duration-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 w-fit group">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-200">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
              The world&apos;s most efficient marketplace for specialized micro-tasks and high-quality freelance talent.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-150"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-5 tracking-wide">
                {section}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} SkillSwap Marketplace. All rights reserved.
          </p>

          {/* Locale & Currency */}
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <button className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150">
              <Globe className="h-3.5 w-3.5" />
              English (US)
            </button>
            <button className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150">
              <DollarSign className="h-3.5 w-3.5" />
              USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
