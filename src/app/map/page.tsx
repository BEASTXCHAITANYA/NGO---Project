"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center text-gray-400">
      Loading map…
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="flex flex-col" style={{ height: "calc(100vh - 56px)" }}>
      <div className="px-4 py-4 flex items-center gap-4 shrink-0">
        <h1 className="text-2xl font-bold">Impact Map</h1>
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Helped
        </span>
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Needs help
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <MapView />
      </div>
    </main>
  );
}
