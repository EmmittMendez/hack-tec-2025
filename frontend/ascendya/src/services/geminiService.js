import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Construye el prompt en el formato requerido por Gemini
export function buildGeminiPrompt(answers) {
  const nivel =
    answers.learningStyle === "muy_practico" ||
    answers.learningStyle === "practico"
      ? "principiante"
      : answers.learningStyle === "equilibrado"
      ? "intermedio"
      : "avanzado";

  const intereses =
    Array.isArray(answers.academicInterests) &&
    answers.academicInterests.length > 0
      ? answers.academicInterests.join(", ")
      : "general";

  const tiempo =
    {
      "1-2_horas": "2 horas por semana",
      "3-5_horas": "5 horas por semana",
      "6-10_horas": "10 horas por semana",
      mas_10_horas: "más de 10 horas por semana",
    }[answers.timeCommitment] || "flexible";

  const actividades = Array.isArray(answers.preferredActivities)
    ? answers.preferredActivities.join(", ")
    : "variadas";

  const areasVocacionales = Array.isArray(answers.vocationalAreas)
    ? answers.vocationalAreas.join(", ")
    : "general";

  const recursos = Array.isArray(answers.resourcePreferences)
    ? answers.resourcePreferences.join(", ")
    : "variados";

  const estiloTrabajo = answers.teamWork || "flexible";
  const expectativaEstudio = answers.studyExpectation || "general";

  // Agregar elemento de aleatoriedad para generar respuestas únicas
  const timestamp = Date.now();
  const uniqueId = Math.random().toString(36).substring(7);

  return `[ID de sesión: ${uniqueId}-${timestamp}] Crea una ruta de aprendizaje personalizada y ÚNICA para un estudiante con este perfil específico:

PERFIL DETALLADO DEL ESTUDIANTE:
- Nivel de experiencia: ${nivel}
- Materias de mayor interés: ${intereses}
- Tiempo que puede dedicar: ${tiempo}
- Actividades que más disfruta: ${actividades}
- Áreas vocacionales que le interesan: ${areasVocacionales}
- Recursos de aprendizaje preferidos: ${recursos}
- Prefiere trabajar: ${estiloTrabajo}
- Sus expectativas de estudio: ${expectativaEstudio}

INSTRUCCIONES IMPORTANTES:
1. Crea una respuesta COMPLETAMENTE PERSONALIZADA basada en este perfil específico
2. NO uses contenido genérico - adapta todo al perfil del estudiante
3. Considera TODOS los aspectos del perfil para crear una ruta coherente
4. Haz que la respuesta sea ÚNICA - no debe ser igual a respuestas anteriores
5. Los cursos, habilidades y carreras deben estar directamente relacionados con los intereses específicos

Genera una respuesta ÚNICAMENTE en formato JSON válido, sin texto adicional antes o después del JSON:

{
  "title": "Título específico y personalizado que refleje los intereses principales (${intereses})",
  "description": "Descripción detallada que mencione específicamente las materias de interés, actividades preferidas y tiempo disponible",
  "level": "${nivel}",
  "estimatedTime": "número realista de horas basado en ${tiempo}",
  "difficulty": "${nivel}",
  "interests": "${intereses}",
  "courses": [
    "Curso específico 1 directamente relacionado con ${intereses}",
    "Curso específico 2 que combine ${intereses} con ${actividades}",
    "Curso específico 3 orientado hacia ${areasVocacionales}"
  ],
  "skills": [
    "Habilidad específica 1 relacionada con ${intereses}",
    "Habilidad específica 2 que se desarrolle con ${actividades}", 
    "Habilidad específica 3 orientada hacia ${areasVocacionales}"
  ],
  "careerPaths": [
    "Carrera profesional 1 que combine ${intereses} y ${areasVocacionales}",
    "Carrera profesional 2 específica para alguien que prefiere ${actividades}",
    "Carrera profesional 3 en el campo de ${areasVocacionales}"
  ],
  "modules": [
    {
      "name": "Módulo inicial específico para ${intereses}",
      "duration": "duración apropiada para ${tiempo}",
      "topics": ["tema específico 1 de ${intereses}", "tema específico 2", "tema específico 3"],
      "resources": [
        {"type": "book", "title": "Título específico relacionado con ${intereses}", "author": "Autor relevante"},
        {"type": "course", "title": "Curso específico en ${areasVocacionales}", "platform": "Plataforma adecuada"}
      ]
    }
  ]
}

RECUERDA: Esta respuesta debe ser ÚNICA y específica para este perfil. No repitas contenido genérico.`;
}

// Función para limpiar y validar la respuesta JSON
function cleanAndParseJSON(responseText) {
  try {
    // Remover posibles backticks y palabras como 'json' que pueda agregar Gemini
    let cleanText = responseText.trim();

    // Remover markdown code blocks si existen
    cleanText = cleanText.replace(/```json\s*/g, "").replace(/```\s*$/g, "");
    cleanText = cleanText.replace(/```\s*/g, "");

    // Buscar el primer { y último } para extraer solo el JSON
    const firstBrace = cleanText.indexOf("{");
    const lastBrace = cleanText.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleanText);

    // Validar que tenga campos mínimos requeridos
    const requiredFields = ["title", "description", "level"];
    const missingFields = requiredFields.filter((field) => !parsed[field]);

    if (missingFields.length > 0) {
      console.warn("Campos faltantes en la respuesta:", missingFields);
      // Agregar valores por defecto
      if (!parsed.title) parsed.title = "Ruta de Aprendizaje Personalizada";
      if (!parsed.description)
        parsed.description =
          "Una ruta de aprendizaje diseñada específicamente para ti";
      if (!parsed.level) parsed.level = "intermedio";
    }

    // Asegurar que los arrays existan
    if (!parsed.courses) parsed.courses = [];
    if (!parsed.skills) parsed.skills = [];
    if (!parsed.careerPaths) parsed.careerPaths = [];
    if (!parsed.modules) parsed.modules = [];

    return parsed;
  } catch (error) {
    throw new Error(`Error al parsear JSON: ${error.message}`);
  }
}

export async function getGeminiRoute(quizAnswers) {
  const prompt = buildGeminiPrompt(quizAnswers);

  console.log("Enviando prompt a Gemini:", prompt);
  console.log("Datos del quiz:", quizAnswers);

  try {
    // Verificar que tenemos la API key
    if (!GEMINI_API_KEY) {
      throw new Error(
        "No se encontró la API key de Gemini. Verifica que VITE_GEMINI_API_KEY esté configurada."
      );
    }

    // Obtener el modelo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generar contenido
    const result = await model.generateContent(prompt);

    console.log("Resultado completo de Gemini:", result);

    // Extraer el texto de la respuesta
    const response = await result.response;
    const responseText = response.text();

    console.log("Respuesta cruda de Gemini:", responseText);

    // Limpiar y parsear el JSON
    const parsedResponse = cleanAndParseJSON(responseText);
    console.log("Respuesta parseada:", parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.error("Error completo:", error);

    // Proporcionar errores más específicos
    if (error.message.includes("API key")) {
      throw new Error("Error de autenticación: Verifica tu API key de Gemini");
    } else if (error.message.includes("quota")) {
      throw new Error("Límite de uso de la API alcanzado. Inténtalo más tarde");
    } else if (error.message.includes("model")) {
      throw new Error(
        "Error con el modelo de Gemini. Verifica la configuración"
      );
    } else {
      throw new Error("Error al obtener la ruta de Gemini: " + error.message);
    }
  }
}
