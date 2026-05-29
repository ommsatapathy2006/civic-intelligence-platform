"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  createdAt?: { seconds: number } | Date;
}

export default function AdminPage() {
  const [govId, setGovId] = useState("");
  const [idVerified, setIdVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Pending" | "Resolved">("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!idVerified || !user) return;

    const unsubscribe = onSnapshot(
      collection(db, "complaints"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as DocumentData),
        })) as Complaint[];

        data.sort((a, b) => {
          const aTime = a.createdAt
            ? "seconds" in (a.createdAt as object)
              ? (a.createdAt as { seconds: number }).seconds
              : new Date(a.createdAt as unknown as string).getTime() / 1000
            : 0;
          const bTime = b.createdAt
            ? "seconds" in (b.createdAt as object)
              ? (b.createdAt as { seconds: number }).seconds
              : new Date(b.createdAt as unknown as string).getTime() / 1000
            : 0;
          return bTime - aTime;
        });

        setComplaints(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [idVerified, user]);

  const handleGovIdSubmit = () => {
    if (govId.trim().length < 4) {
      alert("Please enter a valid Government ID");
      return;
    }
    setIdVerified(true);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error(error);
      alert("Login Failed: " + (error.message || "Unknown error"));
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await updateDoc(doc(db, "complaints", id), {
        status: "Resolved",
      });
    } catch (error) {
      console.error("Failed to resolve complaint:", error);
      alert("Failed to update status");
    }
  };

  const handleReopen = async (id: string) => {
    try {
      await updateDoc(doc(db, "complaints", id), {
        status: "Pending",
      });
    } catch (error) {
      console.error("Failed to reopen complaint:", error);
      alert("Failed to update status");
    }
  };

  // Step 1: Government ID Gate
  if (!idVerified) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/8 blur-[140px] rounded-full pointer-events-none animate-glow-pulse"></div>
        <div className="animate-scale-in glass-card p-10 rounded-3xl max-w-md w-full text-center relative z-10">
          <div className="text-5xl mb-6 animate-float">🏛️</div>
          <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
          <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
            Enter your valid Government ID to proceed. Only authorized government officials are permitted to access the admin dashboard.
          </p>
          <input
            type="text"
            placeholder="Enter Government ID"
            value={govId}
            onChange={(e) => setGovId(e.target.value)}
            className="w-full p-4 rounded-2xl glass-card text-white mb-4 focus:ring-2 focus:ring-orange-500/40 focus:outline-none transition-all duration-300 placeholder:text-zinc-600"
          />
          <button
            onClick={handleGovIdSubmit}
            className="press-effect w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]"
          >
            Verify & Proceed
          </button>
        </div>
      </main>
    );
  }

  // Step 2: Google Login Gate
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 blur-[140px] rounded-full pointer-events-none animate-glow-pulse"></div>
        <div className="animate-scale-in glass-card p-10 rounded-3xl max-w-md w-full text-center relative z-10">
          <div className="text-5xl mb-6 animate-float">🔐</div>
          <h1 className="text-3xl font-bold mb-4">Official Login</h1>
          <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
            Government ID verified. Now sign in with your official email to access the reports.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="press-effect w-full bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-zinc-200 transition-all duration-300"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    );
  }

  // Step 3: Admin Dashboard
  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  const pendingCount = complaints.filter((c) => c.status === "Pending").length;
  const resolvedCount = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* Header */}
      <div className="animate-fade-in-up max-w-7xl mx-auto mb-10">
        <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium tracking-wider uppercase">
          Admin Panel
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Admin <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Dashboard</span>
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="animate-fade-in-up delay-100 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card hover-lift rounded-2xl p-6 transition-all duration-300">
          <h2 className="text-sm text-zinc-400 mb-1">Total Complaints</h2>
          <p className="text-4xl font-bold">{complaints.length}</p>
        </div>
        <div className="glass-card hover-lift rounded-2xl p-6 transition-all duration-300 border-red-500/10">
          <h2 className="text-sm text-red-400 mb-1">Pending</h2>
          <p className="text-4xl font-bold text-red-400">{pendingCount}</p>
        </div>
        <div className="glass-card hover-lift rounded-2xl p-6 transition-all duration-300 border-green-500/10">
          <h2 className="text-sm text-green-400 mb-1">Resolved</h2>
          <p className="text-4xl font-bold text-green-400">{resolvedCount}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="animate-fade-in-up delay-200 max-w-7xl mx-auto flex gap-3 mb-8">
        {(["All", "Pending", "Resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`press-effect px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${
              filter === f
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "glass-card text-zinc-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Complaints Table */}
      <div className="animate-fade-in-up delay-300 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-zinc-400">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-lg">Loading complaints...</span>
            </div>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-xl text-zinc-500">No complaints found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto glass-card rounded-2xl">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/50 text-left">
                  <th className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Title</th>
                  <th className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Category</th>
                  <th className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Description</th>
                  <th className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Image</th>
                  <th className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint, index) => (
                  <tr
                    key={complaint.id}
                    className="border-b border-zinc-800/30 hover:bg-white/[0.02] transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="p-4 font-semibold text-sm">{complaint.title}</td>
                    <td className="p-4">
                      <span className="bg-orange-500/15 text-orange-400 px-3 py-1 rounded-full text-xs font-medium border border-orange-500/20">
                        {complaint.category}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400 max-w-xs truncate text-sm">
                      {complaint.description}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          complaint.status === "Resolved"
                            ? "bg-green-500/15 text-green-400 border-green-500/20"
                            : "bg-red-500/15 text-red-400 border-red-500/20"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {complaint.imageUrl ? (
                        <img
                          src={complaint.imageUrl}
                          alt={complaint.title}
                          className="w-14 h-14 rounded-xl object-cover border border-zinc-800"
                        />
                      ) : (
                        <span className="text-zinc-600 text-xs">No image</span>
                      )}
                    </td>
                    <td className="p-4">
                      {complaint.status === "Pending" ? (
                        <button
                          onClick={() => handleResolve(complaint.id)}
                          className="press-effect bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-lg shadow-green-500/10"
                        >
                          ✓ Resolve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReopen(complaint.id)}
                          className="press-effect glass-card text-zinc-400 hover:text-white px-4 py-2 rounded-xl text-xs font-medium transition-all"
                        >
                          ↺ Reopen
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
