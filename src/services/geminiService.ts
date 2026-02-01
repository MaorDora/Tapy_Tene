import { GoogleGenAI } from "@google/genai";

// שליפת המפתח בצורה המתאימה ל-Vite. אם לא קיים, יהיה מחרוזת ריקה.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let ai: GoogleGenAI | null = null;

// איתחול רק אם יש מפתח אמיתי
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
  }
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // 1. מצב "ללא חיבור" - אם אין מפתח או הלקוח לא אותחל
  if (!API_KEY || !ai) {
    // השהייה קטנה כדי שזה ירגיש טבעי בממשק (אופציונלי)
    await new Promise(resolve => setTimeout(resolve, 800));

    // ההודעה שתופיע למשתמש
    return "⚠️ **מצב עבודה מקומי:**\nאין חיבור פעיל לבינה מלאכותית.\nהנתונים המוצגים במערכת נטענים מקבצים מקומיים (Mock Data) בלבד.";
  }

  // 2. מצב "מחובר" - ניסיון שליחה ל-AI
  try {
    const model = 'gemini-2.0-flash'; // מודל מומלץ (מהיר וחסכוני)
    const systemInstruction = `
      You are an expert military logistics AI assistant named "ChaTene". 
      Your user is a workshop manager ("Sharon"). 
      Speak Hebrew. Be concise, professional, and skeptical. ֱֶ
      Focus on facts, discrepancies, and actionable advice.
      Format responses with clear bullet points.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "התקבלה תשובה ריקה מהמערכת.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "שגיאה בתקשורת עם מנוע הבינה המלאכותית (בדוק את החיבור לרשת).";
  }
};