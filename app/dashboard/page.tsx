"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const [complaints, setComplaints] =
    useState<import("firebase/firestore").DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "ai-complaints")
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComplaints(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white p-6 md:p-10">
        {/* Header */}
        <div className="animate-fade-in-up max-w-7xl mx-auto mb-10">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium tracking-wider uppercase">
            Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Civic Intelligence <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
        </div>

        {/* Stats Row */}
        <div className="animate-fade-in-up delay-100 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-card hover-lift rounded-2xl p-6 transition-all duration-300">
            <p className="text-sm text-zinc-400 mb-1">Total Complaints</p>
            <p className="text-4xl font-bold text-orange-400">{complaints.length}</p>
          </div>
          <div className="glass-card hover-lift rounded-2xl p-6 transition-all duration-300">
            <p className="text-sm text-zinc-400 mb-1">High Severity</p>
            <p className="text-4xl font-bold text-red-400">
              {complaints.filter((c) => c.severity === "High").length}
            </p>
          </div>
          <div className="glass-card hover-lift rounded-2xl p-6 transition-all duration-300">
            <p className="text-sm text-zinc-400 mb-1">AI Analyzed</p>
            <p className="text-4xl font-bold text-emerald-400">
              {complaints.filter((c) => c.aiAnalysis).length}
            </p>
          </div>
        </div>

        {/* Complaint Cards */}
        {loading ? (
          <div className="max-w-7xl mx-auto flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-zinc-400">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-lg">Loading complaints...</span>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((item, index) => (
              <div
                key={index}
                className="animate-fade-in-up glass-card hover-lift rounded-2xl p-6 transition-all duration-300"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-orange-400">
                    Complaint
                  </h2>
                  <span className="text-xs text-zinc-500">#{index + 1}</span>
                </div>

                <p className="mb-6 text-zinc-300 leading-relaxed">
                  {item.complaint}
                </p>

                <div className="flex gap-3 mb-6 flex-wrap">
                  <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-orange-500/15 text-orange-400 border border-orange-500/20">
                    {item.category || "Unknown"}
                  </div>
                  <div
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                      item.severity === "High"
                        ? "bg-red-500/15 text-red-400 border-red-500/20"
                        : item.severity === "Medium"
                        ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
                        : "bg-green-500/15 text-green-400 border-green-500/20"
                    }`}
                  >
                    {item.severity || "Medium"}
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    AI Analysis
                  </h3>
                  <p className="whitespace-pre-wrap text-zinc-400 text-sm leading-relaxed">
                    {item.aiAnalysis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}