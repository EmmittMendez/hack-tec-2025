import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Construye el prompt en el formato requerido por Gemini
export function buildGeminiPrompt(answers) {
  const nivel =
    answers.learningStyle === "muy_practico" ||
    answers.learningStyle === "practico"
      ? "beginner"
      : answers.learningStyle === "equilibrado"
      ? "intermediate"
      : "advanced";
  const intereses =
    Array.isArray(answers.academicInterests) &&
    answers.academicInterests.length > 0
      ? answers.academicInterests.join(", ")
      : "N/A";
  const tiempo =
    {
      "1-2_horas": "2h/semana",
      "3-5_horas": "5h/semana",
      "6-10_horas": "10h/semana",
      mas_10_horas: "+10h/semana",
    }[answers.timeCommitment] || "N/A";

  return `Dado este perfil de usuario (nivel: ${nivel}, intereses: ${intereses}, tiempo disponible: ${tiempo}), genera una ruta de estudio personalizada en el siguiente formato JSON. No incluyas texto fuera del JSON, solo responde con el objeto JSON:

{
  "title": "...",
  "description": "...",
  "level": "...",
  "interests": "...",
  "time": "...",
  "modules": [
    {
      "name": "...",
      "duration": "...",
      "topics": ["...", "..."],
      "resources": [
        {"type": "book", "title": "...", "author": "..."},
        {"type": "course", "title": "...", "platform": "..."}
      ]
    }
  ]
}
`;
}

export async function getGeminiRoute(quizAnswers) {
  const prompt = buildGeminiPrompt(quizAnswers);
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Eres un experto en educación y aprendizaje personalizado.",
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error("Error al obtener la ruta de Gemini: " + error.message);
  }
}
