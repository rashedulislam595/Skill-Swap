import { Filter, Search, ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";

// Mock data for proposals
const proposals = [
  {
    id: "1",
    title: "Modern SaaS Dashboard Design",
    client: "TechFlow Systems",
    status: "ACCEPTED",
    submittedAt: "2 days ago",
    amount: 4200,
  },
  {
    id: "2",
    title: "Mobile App Prototypes for Fintech",
    client: "CreativePulse",
    status: "PENDING",
    submittedAt: "5 days ago",
    amount: 3500,
  },
  {
    id: "3",
    title: "E-commerce Redesign",
    client: "RetailSolutions",
    status: "REJECTED",
    submittedAt: "1 week ago",
    amount: 2800,
  },
];

export default function MyProposalsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1527] dark:text-white tracking-tight">
            My Proposals
          </h1>
          <p className="text-[#64748B] dark:text-zinc-400 text-sm mt-1">
            Track and manage your submitted proposals
          </p>
        </div>
        <Link href="/browse-tasks" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          Find New Tasks
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search proposals..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="p-4 sm:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    {proposal.title}
                  </h3>
                  {proposal.status === "ACCEPTED" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                    </span>
                  )}
                  {proposal.status === "PENDING" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                  {proposal.status === "REJECTED" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <span>Client: <span className="font-medium text-zinc-700 dark:text-zinc-300">{proposal.client}</span></span>
                  <span>Submitted: {proposal.submittedAt}</span>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <div className="text-lg font-extrabold text-zinc-900 dark:text-white">
                  ${proposal.amount.toLocaleString()}
                </div>
                <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
