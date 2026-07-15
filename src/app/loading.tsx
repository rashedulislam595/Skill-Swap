export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo ring */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping" />
          <span className="relative inline-flex h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30" />
        </div>
        {/* Animated bar */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
              style={{ animation: `bounce 1.2s ${i * 0.15}s infinite ease-in-out` }}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500 tracking-wide">
          Loading…
        </p>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
