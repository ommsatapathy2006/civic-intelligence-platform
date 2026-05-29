"use client";

import { useState } from "react";

export default function AITestPage() {

  const [complaint, setComplaint] = useState("");

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const analyzeComplaint = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "/api/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            description: complaint,
          }),
        }
      );

      const data = await response.json();

      if (data.result) {

        setResult(data.result);

      } else {

        setResult(
          JSON.stringify(data, null, 2)
        );
      }

    } catch (error: unknown) {

      setResult((error as Error).message);

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">

        Civic AI Analyzer

      </h1>

      <textarea
        value={complaint}
        onChange={(e) =>
          setComplaint(e.target.value)
        }
        placeholder="Describe civic issue..."
        className="
          w-full
          h-40
          p-4
          rounded-xl
          text-white
          mb-6
        "
      />

      <button
        onClick={analyzeComplaint}
        disabled={loading}
        className="
          bg-orange-500
          px-6
          py-3
          rounded-xl
        "
      >

        {loading
          ? "Analyzing..."
          : "Analyze Complaint"}

      </button>

      <div className="mt-10">

       

        <h2 className="text-2xl font-bold mb-4">

          AI Analysis

        </h2>

        <div className="
          bg-gray-900
          p-4
          rounded-xl
          whitespace-pre-wrap
        ">

          {result}

        </div>

      </div>

    </main>
  );
}