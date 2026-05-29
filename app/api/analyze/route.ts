import OpenAI from "openai";

import { db } from "@/firebase/config";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const client = new OpenAI({

  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { description } = body;

    const prompt = `
Analyze this civic complaint.

Complaint:
${description}

Return ONLY plain text.

Format exactly like this:

Category: Road Issue
Severity: High
Summary: Large pothole causing accidents.

Rules:
- No markdown
- No bullet points
- No numbering
- No stars
- No bold text
- Keep response short and professional
`;

    const completion =
      await client.chat.completions.create({

        model: "deepseek/deepseek-chat",

        messages: [

          {
            role: "system",

            content:
              "You are an AI civic complaint analyzer.",
          },

          {
            role: "user",

            content: prompt,
          },
        ],
      });

    const aiResult =
      completion.choices[0].message.content || "";

    const categoryMatch =
      aiResult.match(/Category:\s*(.*)/i);

    const severityMatch =
      aiResult.match(/Severity:\s*(.*)/i);

    await addDoc(
      collection(db, "ai-complaints"),
      {

        complaint: description,

        aiAnalysis: aiResult,

        category:
          categoryMatch?.[1] || "Unknown",

        severity:
          severityMatch?.[1] || "Medium",

        createdAt: serverTimestamp(),
      }
    );

    return Response.json({

      result: aiResult,
    });

  } catch (error: unknown) {

    console.log(error);

    return Response.json({

      error: (error as Error).message,
    });
  }
}