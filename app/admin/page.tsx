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
    } catch (error) {
      console.error(error);
      alert("Login Failed");
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
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <div className="bg-zinc-900 p-10 rounded-2xl border border-zinc-800 max-w-md w-full text-center">
          <div className="text-5xl mb-6">🏛️</div>
          <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
          <p className="text-zinc-400 mb-8">
            Enter your valid Government ID to proceed. Only authorized government officials are permitted to access the admin dashboard.
          </p>
          <input
            type="text"
            placeholder="Enter Government ID"
            value={govId}
            onChange={(e) => setGovId(e.target.value)}
            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white mb-4 focus:border-orange-500 focus:outline-none transition-colors"
          />
          <button
            onClick={handleGovIdSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
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
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <div className="bg-zinc-900 p-10 rounded-2xl border border-zinc-800 max-w-md w-full text-center">
          <div className="text-5xl mb-6">🔐</div>
          <h1 className="text-3xl font-bold mb-4">Official Login</h1>
          <p className="text-zinc-400 mb-8">
            Government ID verified. Now sign in with your official email to access the reports.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition-colors"
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
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-medium text-zinc-400 mb-1">
            Total Complaints
          </h2>
          <p className="text-4xl font-bold">{complaints.length}</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-red-900/50">
          <h2 className="text-lg font-medium text-red-400 mb-1">
            Pending
          </h2>
          <p className="text-4xl font-bold text-red-400">{pendingCount}</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-green-900/50">
          <h2 className="text-lg font-medium text-green-400 mb-1">
            Resolved
          </h2>
          <p className="text-4xl font-bold text-green-400">
            {resolvedCount}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {(["All", "Pending", "Resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-medium transition-colors ${
              filter === f
                ? "bg-orange-500 text-white"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Complaints Table */}
      {loading ? (
        <p className="text-xl text-gray-400">Loading complaints...</p>
      ) : filteredComplaints.length === 0 ? (
        <p className="text-xl text-gray-400">No complaints found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-left">
                <th className="p-4 text-zinc-400 font-medium">Title</th>
                <th className="p-4 text-zinc-400 font-medium">Category</th>
                <th className="p-4 text-zinc-400 font-medium">
                  Description
                </th>
                <th className="p-4 text-zinc-400 font-medium">Status</th>
                <th className="p-4 text-zinc-400 font-medium">Image</th>
                <th className="p-4 text-zinc-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="p-4 font-semibold">{complaint.title}</td>
                  <td className="p-4">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg text-sm font-medium">
                      {complaint.category}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400 max-w-xs truncate">
                    {complaint.description}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        complaint.status === "Resolved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
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
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-zinc-600 text-sm">No image</span>
                    )}
                  </td>
                  <td className="p-4">
                    {complaint.status === "Pending" ? (
                      <button
                        onClick={() => handleResolve(complaint.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        Mark Resolved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReopen(complaint.id)}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        Reopen
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
