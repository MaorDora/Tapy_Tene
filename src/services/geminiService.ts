import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize only if key exists to avoid runtime errors in demo mode without key
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    // Mock response for prototype without API Key
    console.warn("No API_KEY found. Returning mock response.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate latency
    return `**סימולציית בינה מלאכותית (ללא מפתח API):**\n\nעל סמך הנתונים במערכת, נראה כי ישנה חריגה בתהליכי העבודה.\n\n*   **מקור 1:** יומן מחסן מראה ניפוק כפול.\n*   **מקור 2:** דיווח שעות טכנאי אינו תואם את שעת הניפוק.\n\nמומלץ לבדוק מול מנהל העבודה במחלקת רכב.`;
  }

  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are an expert military logistics AI assistant named "ChaTene". 
      Your user is a workshop manager ("Sharon"). 
      Speak Hebrew. Be concise, professional, and skeptical. 
      Focus on facts, discrepancies, and actionable advice.
      Format responses with clear bullet points.
      Always cite a "Source" (invent a plausible one like "SAP Log #402" or "Gate Camera 2") for your claims.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "לא התקבלה תשובה מהמערכת.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "שגיאה בתקשורת עם מנוע הבינה המלאכותית. אנא נסה שנית מאוחר יותר.";
  }
};