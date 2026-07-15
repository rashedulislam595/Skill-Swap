import { Wallet, ArrowUpRight, ArrowDownRight, Download, Filter } from "lucide-react";

const transactions = [
  {
    id: "tx1",
    date: "Jun 24, 2026",
    description: "Milestone 2 - TechFlow SaaS",
    type: "CREDIT",
    amount: 1500,
    status: "COMPLETED",
  },
  {
    id: "tx2",
    date: "Jun 20, 2026",
    description: "Withdrawal to Bank Account (...1234)",
    type: "DEBIT",
    amount: 2500,
    status: "COMPLETED",
  },
  {
    id: "tx3",
    date: "Jun 18, 2026",
    description: "Milestone 1 - CreativePulse",
    type: "CREDIT",
    amount: 2000,
    status: "COMPLETED",
  },
  {
    id: "tx4",
    date: "Jun 15, 2026",
    description: "Milestone 1 - TechFlow SaaS",
    type: "CREDIT",
    amount: 1200,
    status: "PENDING",
  }
];

export default function EarningsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1527] dark:text-white tracking-tight">
            Earnings
          </h1>
          <p className="text-[#64748B] dark:text-zinc-400 text-sm mt-1">
            Manage your finances and withdraw funds
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          Withdraw Funds
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-zinc-400">
            <Wallet className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest uppercase">Available Balance</span>
          </div>
          <div className="text-4xl font-extrabold">$4,250.00</div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-zinc-500 dark:text-zinc-400">
            <ArrowUpRight className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold tracking-widest uppercase">Pending Clearance</span>
          </div>
          <div className="text-4xl font-extrabold text-zinc-900 dark:text-white">$1,200.00</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-zinc-500 dark:text-zinc-400">
            <Download className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold tracking-widest uppercase">Total Withdrawn</span>
          </div>
          <div className="text-4xl font-extrabold text-zinc-900 dark:text-white">$8,500.00</div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Transaction History</h2>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-200">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4">
                    {tx.status === "COMPLETED" ? (
                      <span className="inline-flex px-2 py-1 rounded bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-bold whitespace-nowrap">
                    <span className={tx.type === "CREDIT" ? "text-green-600 dark:text-green-400" : "text-zinc-900 dark:text-white"}>
                      {tx.type === "CREDIT" ? "+" : "-"}${tx.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
