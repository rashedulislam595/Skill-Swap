import Link from "next/link";
import { ChevronRight, DollarSign } from "lucide-react";
import { Metadata } from "next";
import ProposalList from "@/components/dashboard/client/ProposalList";
import { type Proposal } from "@/components/dashboard/client/ProposalCard";

export const metadata: Metadata = {
  title: "Manage Proposals | SkillSwap",
  description: "Review and manage freelancer proposals for your tasks.",
};

// ── Mock proposals (replace with real API fetch when ready) ─────────────────
const MOCK_PROPOSALS: Proposal[] = [
  {
    _id: "p1",
    freelancerName: "Sarah Jenkins",
    freelancerTitle: "Expert Developer",
    rating: 4.9,
    reviewCount: 124,
    estimatedBudget: 3800,
    timeline: "14 Days",
    statusNote: "Ready to start",
    statusIcon: "clock",
    coverLetter:
      "I've carefully reviewed your requirements for the React-based dashboard. With over 6 years of experience in building scalable fintech interfaces, I can ensure a pixel-perfect implementation of your Figma designs while maintaining clean, maintainable code. I'll start with a full architecture plan and deliver weekly progress updates.",
    status: "pending",
  },
  {
    _id: "p2",
    freelancerName: "Marcus Thorne",
    freelancerTitle: "Full-Stack Lead",
    rating: 5.0,
    reviewCount: 42,
    estimatedBudget: 4250,
    timeline: "10 Days",
    statusNote: "Express Delivery",
    statusIcon: "zap",
    coverLetter:
      "I can deliver this project faster than average without compromising quality. I have a pre-built library of custom UI components that fits your design aesthetic perfectly. My price includes 3 rounds of revisions and full source code handover with documentation. Let's schedule a quick call to align on expectations.",
    status: "pending",
  },
  {
    _id: "p3",
    freelancerName: "Elena Rodriguez",
    freelancerTitle: "Senior UI Engineer",
    rating: 4.8,
    reviewCount: 89,
    estimatedBudget: 3500,
    timeline: "21 Days",
    statusNote: "112 Tasks",
    statusIcon: "check",
    coverLetter:
      "Hi, I've worked on similar marketplace platforms before and understand the importance of user experience in conversion-focused dashboards. I specialise in accessibility-first React development and can ensure WCAG 2.1 AA compliance out of the box. Happy to provide references from past clients in the SaaS space.",
    status: "pending",
  },
];

const TASK_TITLE = "Website Redesign Project";
const TASK_BUDGET = 4500;

export default function ClientProposalsPage() {
  const activeCount = MOCK_PROPOSALS.filter((p) => p.status === "pending").length;

  return (
    <div className="p-2 sm:p-4 lg:p-6 space-y-6">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500">
        <Link
          href="/dashboard/client/my-tasks"
          className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
        >
          My Tasks
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {TASK_TITLE}
        </span>
      </nav>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Manage Proposals
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Review{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {activeCount} active
            </span>{" "}
            application{activeCount !== 1 ? "s" : ""} for your{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {TASK_TITLE.toLowerCase()}
            </span>{" "}
            task.
          </p>
        </div>

        {/* Total Budget pill */}
        <div className="flex items-center gap-2.5 self-start rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2.5 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
            <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Total Budget
            </p>
            <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-300">
              ${TASK_BUDGET.toLocaleString()}.00
            </p>
          </div>
        </div>
      </div>

      {/* ── Proposal Grid ── */}
      <ProposalList initialProposals={MOCK_PROPOSALS} />
    </div>
  );
}
