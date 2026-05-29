"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export default function DashboardPage() {

  const [complaints, setComplaints] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "ai-complaints"
            )
          );

        const data =
          querySnapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),
            })
          );

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

    <main className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">

      <h1 className="
        text-5xl
        font-bold
        mb-10
      ">

        Civic Intelligence Dashboard

      </h1>

      <div className="
        mb-10
        bg-gray-900
        p-6
        rounded-2xl
        border
        border-gray-800
      ">

        <h2 className="
          text-2xl
          font-bold
          text-orange-400
          mb-2
        ">

          Total Complaints

        </h2>

        <p className="
          text-5xl
          font-bold
        ">

          {complaints.length}

        </p>

      </div>

      {loading ? (

        <p className="
          text-xl
          text-gray-400
        ">

          Loading complaints...

        </p>

      ) : (

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {complaints.map(
            (item, index) => (

              <div
                key={index}
                className="
                  bg-gray-900
                  p-6
                  rounded-2xl
                  border
                  border-gray-800
                  hover:border-orange-500
                  transition-all
                "
              >

                <h2 className="
                  text-xl
                  font-bold
                  text-orange-400
                  mb-4
                ">

                  Complaint

                </h2>

                <p className="
                  mb-6
                  text-gray-300
                ">

                  {item.complaint}

                </p>

                <div className="
                  flex
                  gap-4
                  mb-6
                  flex-wrap
                ">

                  <div className="
                    bg-orange-500/20
                    text-orange-400
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                  ">

                    {item.category || "Unknown"}

                  </div>

                  <div className={`

                    px-4
                    py-2
                    rounded-xl
                    font-semibold

                    ${
                      item.severity === "High"

                        ? "bg-red-500/20 text-red-400"

                        : item.severity === "Medium"

                        ? "bg-yellow-500/20 text-yellow-400"

                        : "bg-green-500/20 text-green-400"
                    }

                  `}>

                    {item.severity || "Medium"}

                  </div>

                </div>

                <h2 className="
                  text-xl
                  font-bold
                  text-green-400
                  mb-4
                ">

                  AI Analysis

                </h2>

                <p className="
                  whitespace-pre-wrap
                  text-gray-300
                ">

                  {item.aiAnalysis}

                </p>

              </div>
            )
          )}

        </div>
      )}

    </main>
  );
}