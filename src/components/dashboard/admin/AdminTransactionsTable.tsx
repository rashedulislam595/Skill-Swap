import { type AdminTransaction } from "@/lib/api/admin";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  paid: {
    label: "Paid",
    icon: CheckCircle2,
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    color: "text-red-700 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40",
  },
  refunded: {
    label: "Refunded",
    icon: AlertCircle,
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/40",
  },
};

function getStatusConfig(status: string) {
  return (
    STATUS_CONFIG[status?.toLowerCase()] ?? {
      label: status || "Unknown",
      icon: AlertCircle,
      color: "text-zinc-600 dark:text-zinc-400",
      bg: "bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40",
    }
  );
}

export default function AdminTransactionsTable({
  transactions,
}: {
  transactions: AdminTransaction[];
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-16 text-center shadow-xs">
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-700/50 text-zinc-400 dark:text-zinc-500 mb-4 shadow-xs">
            <span className="text-xl font-bold">$</span>
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
            No Transactions Found
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            There are currently no active Stripe payments or transaction records processed on the platform.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">{transactions.length}</span> total transactions
      </p>

      <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/30">
                {[
                  "Client Email",
                  "Freelancer Email",
                  "Payout",
                  "Date",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => {
                const statusConf = getStatusConfig(tx.status);
                const StatusIcon = statusConf.icon;
                const amount = Number(tx.amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                });
                const date = new Date(tx.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <tr
                    key={tx._id ?? idx}
                    className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors duration-150"
                  >
                    {/* Client email */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-zinc-700 dark:text-zinc-200">{tx.clientEmail}</span>
                    </td>

                    {/* Freelancer email */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-zinc-700 dark:text-zinc-200">{tx.freelancerEmail}</span>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{amount}</span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{date}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusConf.bg} ${statusConf.color}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConf.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
