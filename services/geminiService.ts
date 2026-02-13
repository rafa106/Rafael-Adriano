
import { GoogleGenAI, Type } from "@google/genai";
import { Appointment, Professional } from "../types";
import { Language } from "../translations";

const getApiKey = () => {
  // Tenta obter a chave de várias fontes possíveis em ambientes de build/browser
  try {
    if (typeof process !== 'undefined' && process.env?.API_KEY) return process.env.API_KEY;
    // @ts-ignore - Caso esteja usando variáveis de ambiente do Vite no Netlify
    if (import.meta.env?.VITE_API_KEY) return import.meta.env.VITE_API_KEY;
    return "";
  } catch {
    return "";
  }
};

export const generateSmartInsights = async (
  appointments: Appointment[],
  professional: Professional,
  lang: Language = 'pt'
) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API Key não encontrada. Insights desativados.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    You are a customer retention specialist for independent professionals.
    Analyze the appointments of ${professional.name} and create strategies to reduce no-shows.
    
    IMPORTANT: Respond strictly in the following language: ${lang === 'pt' ? 'Portuguese (Brazil)' : lang === 'en' ? 'English (US)' : 'Spanish (ES)'}.
    FOCUS: Short WhatsApp messages optimized for "Interactive Buttons" of the Business API.
    
    Data: ${JSON.stringify(appointments)}
    
    Return JSON:
    1. insights: 3 critical observations about client behavior.
    2. optimization: A suggestion for changes in schedule or intervals.
    3. messages: 
       - reminder24h: Short text (max 140 chars) for the "Confirm Presence" button.
       - confirmation: Text for immediate confirmation after booking.
       - reschedule: Empathetic text for when the client clicks "Reschedule".
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            optimization: { type: Type.STRING },
            messages: {
              type: Type.OBJECT,
              properties: {
                reminder24h: { type: Type.STRING },
                confirmation: { type: Type.STRING },
                reschedule: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return null;
  }
};
