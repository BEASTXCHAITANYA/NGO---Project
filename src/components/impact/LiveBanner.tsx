"use client";

export default function LiveBanner() {
  return (
    <div className="max-w-5xl mx-auto px-4 mb-4">
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-sm font-semibold text-green-400 tracking-wide">Live</span>
        </div>
        <div className="h-px sm:h-8 sm:w-px bg-green-500/20 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-white">Real-Time Impact Engine</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Live impact posts are instantly updated using Firebase real-time listeners.
          </p>
        </div>
      </div>
    </div>
  );
}
