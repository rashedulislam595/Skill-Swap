"use client";

import { useState } from "react";
import ProposalCard, { type Proposal } from "./ProposalCard";
import WaitingProposalCard from "./WaitingProposalCard";

interface ProposalListProps {
  initialProposals: Proposal[];
}

export default function ProposalList({ initialProposals }: ProposalListProps) {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  const handleAccept = (id: string) => {
    setProposals((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "accepted" } : p))
    );
  };

  const handleReject = (id: string) => {
    setProposals((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "rejected" } : p))
    );
  };

  // Always show at least 4 slots (fill empty ones with waiting card)
  const minSlots = Math.max(proposals.length, 4);
  // Make it even so grid is balanced
  const slots = minSlots % 2 === 0 ? minSlots : minSlots + 1;
  const placeholderCount = Math.max(0, slots - proposals.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal._id}
          proposal={proposal}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <WaitingProposalCard key={`placeholder-${i}`} />
      ))}
    </div>
  );
}
