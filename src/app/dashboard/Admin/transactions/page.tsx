import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getAdminTransactions, type AdminTransaction } from "@/lib/api/admin";
import AdminTransactionsTable from "@/components/dashboard/admin/AdminTransactionsTable";
import { History, CreditCard } from "lucide-react";

export const metadata = {
  title: "Transaction History — Admin | Skill Swap",
  description: "Complete Stripe payment history across all platform transactions.",
};

export default async function AdminTransactionsPage() {
  const user = await getUserSession();
  if (!user || user.role !== "admin") redirect("/");

  let transactions: AdminTransaction[] = [];
  let totalRevenue = 0;
  try {
    transactions = await getAdminTransactions();
    totalRevenue = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  } catch {
    // empty until backend is connected
  }

  const totalFormatted = totalRevenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            <History className="h-3.5 w-3.5" />
            Transaction History
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Stripe Payments
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Complete record of all processed payments across the platform.
          </p>
        </div>

        {/* Revenue pill */}
        <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 px-4 py-2.5 shadow-sm">
          <CreditCard className="h-4 w-4 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">
              Total Revenue
            </span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
              {totalFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-100 dark:border-zinc-800" />

      {/* Table */}
      <AdminTransactionsTable transactions={transactions} />
    </div>
  );
}
