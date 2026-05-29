"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const DynamicMap = dynamic(
  () => import("@/components/Map"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        Smart City Live Map
      </h1>

      <div className="h-[80vh] rounded-2xl overflow-hidden">
        <DynamicMap />
      </div>

    </main>
  );
}