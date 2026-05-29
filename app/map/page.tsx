"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import ProtectedRoute from "@/components/ProtectedRoute";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center glass-card rounded-2xl">
      <div className="flex items-center gap-3 text-zinc-400">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Loading map...</span>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white p-6 md:p-10">
        {/* Header */}
        <div className="animate-fade-in-up max-w-7xl mx-auto mb-8">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-wider uppercase">
            Live Tracking
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Smart City <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Live Map</span>
          </h1>
        </div>

        {/* Map */}
        <div className="animate-fade-in-up delay-200 max-w-7xl mx-auto h-[75vh] rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl shadow-black/50">
          <DynamicMap />
        </div>
      </main>
    </ProtectedRoute>
  );
}