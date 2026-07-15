import { EarningsDataPoint } from "@/lib/api/freelancerDashboard";
import { Plus } from "lucide-react";

export default function EarningsTrend({ data }: { data: EarningsDataPoint[] }) {
  // Find max value to scale the bars correctly
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col h-full relative">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Earnings Trend</h2>
      
      <div className="flex-1 flex items-end justify-between gap-2 pb-6 mt-4">
        {data.map((point, i) => {
          // Highlight the last bar
          const isLast = i === data.length - 1;
          const heightPercent = `${(point.amount / maxAmount) * 100}%`;
          
          return (
            <div key={point.month} className="flex flex-col items-center gap-3 w-full group">
              {/* Tooltip (visible on hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-zinc-800 text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none z-10 whitespace-nowrap">
                ${point.amount.toLocaleString()}
              </div>

              {/* Bar */}
              <div 
                className={`w-full max-w-[40px] rounded-t-md transition-all duration-300 ${
                  isLast 
                    ? "bg-[#4B4EFC] relative" 
                    : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                }`}
                style={{ height: heightPercent, minHeight: '20px' }}
              >
                {/* Floating Plus button on the last bar like in the design */}
                {isLast && (
                  <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4B4EFC] rounded-full text-white flex items-center justify-center shadow-md shadow-[#4B4EFC]/30 hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* Label */}
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {point.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
