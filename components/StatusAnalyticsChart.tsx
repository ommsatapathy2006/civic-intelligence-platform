"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function StatusAnalyticsChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const complaints = snapshot.docs.map((doc) => doc.data());

      let pending = 0;
      let resolved = 0;

      complaints.forEach((complaint: import("firebase/firestore").DocumentData) => {
        if (complaint.status === "Resolved") {
          resolved++;
        } else {
          pending++;
        }
      });

      setTotal(complaints.length);
      setData([
        { name: "Pending", value: pending },
        { name: "Resolved", value: resolved },
      ]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-bold mb-2">Resolution Impact</h3>
        <p className="text-zinc-400 mb-8">
          A real-time overview of civic issues tracked on our platform. Total issues reported: <span className="font-bold text-white">{total}</span>.
        </p>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
            <YAxis stroke="#888" tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "#222" }}
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Resolved" ? "#22c55e" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
