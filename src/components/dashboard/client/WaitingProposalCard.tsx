import { Users } from "lucide-react";

export default function WaitingProposalCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700/60 bg-zinc-50/40 dark:bg-zinc-900/20 min-h-[320px] p-8 gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        <Users className="h-7 w-7 text-zinc-400 dark:text-zinc-500" />
      </div>
      <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
        Waiting for more…
      </p>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center max-w-[200px] leading-relaxed">
        New talent applications will appear here as they come in.
      </p>
    </div>
  );
}
