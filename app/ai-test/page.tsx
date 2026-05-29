"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AITestPage() {
  const [complaint, setComplaint] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeComplaint = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: complaint }),
      });
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult(JSON.stringify(data, null, 2));
      }
    } catch (error: unknown) {
      setResult((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white p-6 md:p-10 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-600/8 blur-[130px] rounded-full pointer-events-none animate-glow-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-orange-600/8 blur-[120px] rounded-full pointer-events-none animate-glow-pulse delay-500"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Header */}
          <div className="animate-fade-in-up mb-10">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium tracking-wider uppercase">
              AI Engine
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Civic <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI Analyzer</span>
            </h1>
            <p className="text-zinc-400">Enter a civic complaint and let our AI classify, prioritize, and suggest actions.</p>
          </div>

          {/* Input */}
          <div className="animate-fade-in-up delay-100 mb-6">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Describe a civic issue</label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="E.g. There is a large pothole on the main road near the school that has been causing accidents..."
              className="w-full h-44 p-5 rounded-2xl glass-card text-white placeholder:text-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-300"
            />
          </div>

          {/* Button */}
          <div className="animate-fade-in-up delay-200 mb-10">
            <button
              onClick={analyzeComplaint}
              disabled={loading || !complaint.trim()}
              className="press-effect w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  Analyze Complaint
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h2 className="text-xl font-bold text-emerald-400">AI Analysis Result</h2>
              </div>
              <div className="glass-card rounded-2xl p-6 whitespace-pre-wrap text-zinc-300 leading-relaxed text-sm">
                {result}
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}