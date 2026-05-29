"use client";

import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/config";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#f97316",
  "#ef4444",
  "#3b82f6",
  "#22c55e",
];

export default function AnalyticsChart() {

  const [data, setData] = useState<{name: string; value: number}[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "complaints"),
      (snapshot) => {

        const complaints = snapshot.docs.map(
          (doc) => doc.data()
        );

        const counts: Record<string, number> = {};

        complaints.forEach((complaint: import('firebase/firestore').DocumentData) => {

          const category = complaint.category;

          counts[category] =
            (counts[category] || 0) + 1;

        });

        const formattedData = Object.keys(counts).map(
          (key) => ({
            name: key,
            value: counts[key],
          })
        );

        setData(formattedData);

      }
    );

    return () => unsubscribe();

  }, []);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl h-[400px]">

      <h2 className="text-2xl font-bold mb-6">
        Realtime Complaint Analytics
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}