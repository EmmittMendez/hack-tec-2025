import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Contexto del asistente virtual
const ASSISTANT_CONTEXT = `
Eres un asistente virtual especializado en educación y mentor académico llamado "Ascend AI". 
Tu función es ayudar a estudiantes que se preparan para exámenes de admisión universitaria y su desarrollo académico.

CARACTERÍSTICAS:
- Eres amigable, motivador y profesional
- Proporcionas respuestas claras y estructuradas
- Te enfocas en educación, estudio y desarrollo personal
- Puedes analizar documentos académicos cuando se adjunten
- Ofreces consejos de estudio personalizados
- Ayudas con dudas específicas de materias

CAPACIDADES:
- Responder preguntas sobre materias académicas
- Crear planes de estudio personalizados
- Analizar documentos y archivos académicos
- Proporcionar técnicas de estudio
- Dar consejos motivacionales
- Explicar conceptos complejos de forma simple

REGLAS:
- Siempre mantén un tono positivo y motivador
- Si no sabes algo específico, reconócelo honestamente
- Sugiere recursos adicionales cuando sea apropiado
- Enfócate en el aprendizaje efectivo
- Personaliza tus respuestas según el contexto del usuario

Responde en español de manera conversacional y útil.
`;

export const getChatbotResponse = async (message, conversationHistory = [], attachedFile = null) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construir el historial de conversación
    let conversationText = '';
    if (conversationHistory.length > 0) {
      conversationText = '\n\nHistorial de conversación:\n' + 
        conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    }

    let prompt = `${ASSISTANT_CONTEXT}${conversationText}\n\nUsuario: ${message}`;

    let result;
    
    // Si hay un archivo adjunto, procesarlo
    if (attachedFile) {
      const fileText = await readFileAsText(attachedFile);
      prompt += `\n\nArchivo adjunto (${attachedFile.name}):\n${fileText}`;
    }

    result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      response: text,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error en chatbot service:', error);
    return {
      success: false,
      error: error.message || 'Error al conectar con el asistente',
      timestamp: new Date().toISOString()
    };
  }
};

// Función para leer archivos como texto
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    
    reader.onerror = (e) => {
      reject(new Error('Error al leer el archivo'));
    };

    // Leer según el tipo de archivo
    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || 
        file.name.endsWith('.md') || file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else if (file.type === 'application/pdf') {
      // Para PDFs necesitaríamos una librería adicional
      resolve('Archivo PDF detectado. Por favor, convierte el contenido a texto para un mejor análisis.');
    } else {
      resolve(`Archivo ${file.name} adjuntado. Tipo: ${file.type}`);
    }
  });
};

// Función para convertir voz a texto usando Web Speech API
export const startVoiceRecognition = (onResult, onError) => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError('Tu navegador no soporta reconocimiento de voz');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'es-ES';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    onError(`Error de reconocimiento de voz: ${event.error}`);
  };

  recognition.onend = () => {
    console.log('Reconocimiento de voz terminado');
  };

  return recognition;
};

// Función para texto a voz
export const speakText = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  }
};
