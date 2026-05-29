"use client";
import axios from "axios";
import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReportPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "civic_upload");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dajjnirjp/image/upload",
          formData
        );
        imageUrl = response.data.secure_url;
      }

      let lat = 20.2961;
      let lng = 85.8245;

      if ("geolocation" in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        } catch (err) {
          console.warn("Geolocation denied or failed. Using default location.", err);
        }
      }

      await addDoc(collection(db, "complaints"), {
        title,
        description,
        category,
        imageUrl,
        createdAt: new Date(),
        status: "Pending",
        latitude: lat,
        longitude: lng,
      });

      setSuccess(true);
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert("Submission Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white p-6 md:p-10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/8 blur-[140px] rounded-full pointer-events-none animate-glow-pulse"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <div className="animate-fade-in-up mb-10">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium tracking-wider uppercase">
              Report
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Report Civic <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Issue</span>
            </h1>
            <p className="text-zinc-400">Help improve your community by reporting issues you encounter.</p>
          </div>

          {/* Success message */}
          {success && (
            <div className="animate-fade-in-up mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="font-medium">Complaint submitted successfully!</span>
            </div>
          )}

          {/* Form */}
          <div className="animate-fade-in-up delay-100 space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Issue Title</label>
              <input
                type="text"
                placeholder="E.g. Broken streetlight on Main Road"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-2xl glass-card text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
              <textarea
                placeholder="Describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-2xl glass-card text-white placeholder:text-zinc-600 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 rounded-2xl glass-card text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-900">Select Category</option>
                <option value="Pothole" className="bg-zinc-900">🕳️ Pothole</option>
                <option value="Garbage" className="bg-zinc-900">🗑️ Garbage</option>
                <option value="Flooding" className="bg-zinc-900">🌊 Flooding</option>
                <option value="Streetlight" className="bg-zinc-900">💡 Streetlight</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Attach Photo (optional)</label>
              <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files?.[0] || null)
                }
                className="w-full p-4 rounded-2xl glass-card text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30 transition-all duration-300 cursor-pointer"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="press-effect w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Complaint"
              )}
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}