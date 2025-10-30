
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const extractXmlAsJson = async (text: string): Promise<string> => {
  const prompt = `
    You are an expert data processor. Your task is to find the first valid XML block from the provided text and convert it into a clean, well-formatted JSON object.

    Rules:
    1.  Only output the final JSON object.
    2.  Do not include any extra text, explanations, or markdown code fences like \`\`\`json.
    3.  Ensure the resulting JSON is syntactically correct.

    Here is the text to process:
    ---
    ${text}
    ---
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
