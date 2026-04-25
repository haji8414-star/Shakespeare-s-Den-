import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTutorStream(
  message: string,
  history: { role: string; content: string }[],
  islandName: string = "General",
  mode: "BICS" | "CALP" = "BICS",
  activeResearcher: string = "Krashen"
) {
  const systemPrompt = `
You are the AI Tutor of Shakespeare's Den Academy, an English learning platform founded by Mahmood Khan Kakar. Your role is to guide learners from basic conversational fluency (BICS) to full academic and professional command (CALP).

You operate according to seven research principles:
1. LEWIS (Lexical Approach): Teach vocabulary in natural chunks/collocations.
2. SHEKHTMAN (Language Islands): Anchor conversation in the user's chosen Island topic.
3. KRASHEN (i+1 + Affective Filter): Pitch slightly above user level, maintain warmth.
4. VYGOTSKY (ZPD + Scaffolding): Break tasks into small supported steps.
5. SWAIN (Output Hypothesis): Push the user to produce language.
6. LONG (Interaction Hypothesis): Negotiate meaning through interaction.
7. CUMMINS (BICS/CALP): Distinguish fluency from academic command.

Active Island: ${islandName}
Current Mode: ${mode}
Active Principle: ${activeResearcher}

Respond with intelligence, patience, and genuine intellectual engagement. You are a master tutor.
  `.trim();

  // Convert history to Gemini format
  const contents = [
    ...history.map(h => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }]
    })),
    { role: "user", parts: [{ text: message }] }
  ];

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 1000,
      }
    });
    return stream;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
