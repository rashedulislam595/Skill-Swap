"use client";

import { useState } from "react";
import { CheckCircle2, X, Clock, Zap, CheckSquare, Star, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export interface Proposal {
  _id: string;
  freelancerName: string;
  freelancerImage?: string;
  freelancerTitle: string;
  rating: number;
  reviewCount: number;
  estimatedBudget: number;
  timeline: string;
  statusNote: string;
  statusIcon: "clock" | "zap" | "check";
  coverLetter: string;
  status: "pending" | "accepted" | "rejected";
}

interface ProposalCardProps {
  proposal: Proposal;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const STATUS_ICON_MAP = {
  clock: Clock,
  zap: Zap,
  check: CheckSquare,
};

const STATUS_NOTE_COLOR: Record<string, string> = {
  "Ready to start": "text-blue-600 dark:text-blue-400",
  "Express Delivery": "text-amber-600 dark:text-amber-400",
  default: "text-zinc-600 dark:text-zinc-400",
};

function FreelancerAvatar({ name, image }: { name: string; image?: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={56}
        height={56}
        className="h-14 w-14 rounded-xl object-cover shadow-md border border-zinc-200 dark:border-zinc-700"
      />
    );
  }

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
  ];
  const colorIndex =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;

  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${colors[colorIndex]} text-white text-lg font-bold shadow-md shrink-0`}
    >
      {initials}
    </div>
  );
}

export default function ProposalCard({
  proposal,
  onAccept,
  onReject,
}: ProposalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null);

  const StatusIcon = STATUS_ICON_MAP[proposal.statusIcon];
  const noteColor =
    STATUS_NOTE_COLOR[proposal.statusNote] ?? STATUS_NOTE_COLOR.default;

  const isAccepted = proposal.status === "accepted";
  const isRejected = proposal.status === "rejected";
  const isResolved = isAccepted || isRejected;

  const handleAccept = async () => {
    setLoading("accept");
    await new Promise((r) => setTimeout(r, 600));
    onAccept(proposal._id);
    setLoading(null);
  };

  const handleReject = async () => {
    setLoading("reject");
    await new Promise((r) => setTimeout(r, 400));
    onReject(proposal._id);
    setLoading(null);
  };

  return (
    <div
      className={`relative flex flex-col gap-5 rounded-xl border bg-white dark:bg-zinc-900/70 p-5 shadow-sm transition-all duration-200 hover:shadow-md ${
        isAccepted
          ? "border-emerald-300 dark:border-emerald-700/60 ring-1 ring-emerald-200 dark:ring-emerald-800/40"
          : isRejected
          ? "border-zinc-200 dark:border-zinc-800 opacity-55"
          : "border-zinc-100 dark:border-zinc-800"
      }`}
    >
      {/* Status ribbon */}
      {isAccepted && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-2.5 py-0.5 rounded-full">
          <CheckCircle2 className="h-3 w-3" /> Accepted
        </div>
      )}
      {isRejected && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full">
          <X className="h-3 w-3" /> Rejected
        </div>
      )}

      {/* ── Top: Avatar + Name + Budget ── */}
      <div className="flex items-start gap-4">
        <FreelancerAvatar
          name={proposal.freelancerName}
          image={proposal.freelancerImage}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
            {proposal.freelancerName}
          </h3>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {proposal.rating.toFixed(1)}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                ({proposal.reviewCount} reviews)
              </span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="text-[11px] font-bold tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
              {proposal.freelancerTitle}
            </span>
          </div>
        </div>
        {/* Budget */}
        <div className="text-right shrink-0">
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ${proposal.estimatedBudget.toLocaleString()}
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-tight">
            Estimated<br />Budget
          </p>
        </div>
      </div>

      {/* ── Meta: Timeline + Status ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Timeline */}
        <div className="flex items-center gap-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/60 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0">
            <Clock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          </div>
          <div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              Timeline
            </p>
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {proposal.timeline}
            </p>
          </div>
        </div>
        {/* Status note */}
        <div className="flex items-center gap-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/60 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0">
            <StatusIcon className={`h-4 w-4 ${noteColor}`} />
          </div>
          <div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              {proposal.statusIcon === "check" ? "Completed" : proposal.statusIcon === "zap" ? "Speed" : "Status"}
            </p>
            <p className={`text-sm font-bold ${noteColor}`}>
              {proposal.statusNote}
            </p>
          </div>
        </div>
      </div>

      {/* ── Cover Letter ── */}
      <div>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
          Cover Letter
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {expanded
            ? proposal.coverLetter
            : `${proposal.coverLetter.slice(0, 160)}…`}
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Read full message <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* ── Actions ── */}
      {!isResolved && (
        <div className="flex gap-2.5 pt-1">
          <button
            onClick={handleAccept}
            disabled={loading !== null}
            className="flex flex-1 items-center justify-center gap-2 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
          >
            {loading === "accept" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Accept Proposal
          </button>
          <button
            onClick={handleReject}
            disabled={loading !== null}
            className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:border-red-400 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            <X className="h-4 w-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
