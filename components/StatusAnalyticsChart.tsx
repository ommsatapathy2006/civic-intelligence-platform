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
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "complaints"), (snapshot) => {
      const complaints = snapshot.docs.map((doc) => doc.data());

      let pending = 0;
      let res = 0;

      complaints.forEach((complaint: import("firebase/firestore").DocumentData) => {
        if (complaint.status === "Resolved") {
          res++;
        } else {
          pending++;
        }
      });

      setTotal(complaints.length);
      setResolved(res);
      setData([
        { name: "Pending", value: pending },
        { name: "Resolved", value: res },
      ]);
    });

    return () => unsubscribe();
  }, []);

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-full transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold">Resolution Impact</h3>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            Live
          </div>
        </div>
        <p className="text-zinc-400 mb-6 text-sm">
          Real-time overview of civic issues. Total:{" "}
          <span className="font-bold text-white">{total}</span> • Resolution
          rate:{" "}
          <span className="font-bold text-emerald-400">{resolutionRate}%</span>
        </p>

        {/* Mini progress bar */}
        <div className="w-full h-2 bg-zinc-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${resolutionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#222"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#666"
              tickLine={false}
              axisLine={false}
              fontSize={13}
            />
            <YAxis stroke="#666" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "Resolved"
                      ? "url(#greenGrad)"
                      : "url(#redGrad)"
                  }
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
