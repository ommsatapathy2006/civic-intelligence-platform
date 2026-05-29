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
  const handleSubmit = async () => {

    try {
     let imageUrl = "";

if (image) {

  const formData = new FormData();

  formData.append("file", image);

  formData.append(
    "upload_preset",
    "civic_upload"
  );

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
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
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

      alert("Complaint Submitted Successfully");

      setTitle("");
      setDescription("");
      setCategory("");

    } catch (error) {

      console.error(error);
      alert("Submission Failed");

    }
  };

  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        Report Civic Issue
      </h1>

      <div className="max-w-2xl space-y-6">

        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 h-40"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        >
          <option value="">Select Category</option>
          <option value="Pothole">Pothole</option>
          <option value="Garbage">Garbage</option>
          <option value="Flooding">Flooding</option>
          <option value="Streetlight">Streetlight</option>
        </select>
<input
  type="file"
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setImage(e.target.files?.[0] || null)
  }
  className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
/>
        <button
          onClick={handleSubmit}
          className="bg-orange-500 px-6 py-3 rounded-xl font-semibold"
        >
          Submit Complaint
        </button>

      </div>

    </main>
    </ProtectedRoute>
  );
}