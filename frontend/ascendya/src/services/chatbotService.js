import { GoogleGenerativeAI } from "@google/generative-ai";

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

export const getChatbotResponse = async (
  message,
  conversationHistory = [],
  attachedFile = null
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construir el historial de conversación
    let conversationText = "";
    if (conversationHistory.length > 0) {
      conversationText =
        "\n\nHistorial de conversación:\n" +
        conversationHistory
          .map((msg) => `${msg.role}: ${msg.content}`)
          .join("\n");
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
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error en chatbot service:", error);
    return {
      success: false,
      error: error.message || "Error al conectar con el asistente",
      timestamp: new Date().toISOString(),
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
      reject(new Error("Error al leer el archivo"));
    };

    // Leer según el tipo de archivo
    if (
      file.type.startsWith("text/") ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json")
    ) {
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      resolve(
        "Archivo PDF detectado. Por favor, convierte el contenido a texto para un mejor análisis."
      );
    } else {
      resolve(`Archivo ${file.name} adjuntado. Tipo: ${file.type}`);
    }
  });
};

// Función para convertir voz a texto usando Web Speech API
export const startVoiceRecognition = (onResult, onError, onStart = null) => {
  if (
    !("webkitSpeechRecognition" in window) &&
    !("SpeechRecognition" in window)
  ) {
    onError(
      "Tu navegador no soporta reconocimiento de voz. Puedes escribir tu mensaje en el chat."
    );
    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configuración mejorada para evitar problemas de red
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "es-ES";
  recognition.maxAlternatives = 1;

  // Intentar configurar para uso offline/local
  try {
    if ("webkitSpeechRecognition" in window) {
      // Configuraciones específicas para Chrome/Edge
      recognition.serviceURI = ""; // Vacío para forzar local
      recognition.grammars = null; // Sin gramáticas específicas
    }
  } catch (e) {
    console.log(
      "No se pudo configurar para uso local, usando configuración estándar"
    );
  }

  recognition.onstart = () => {
    console.log("Reconocimiento de voz iniciado");
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      console.log("Transcripción obtenida:", transcript);
      onResult(transcript);
    } else {
      onError(
        "No se pudo capturar ningún audio. Intenta hablar más cerca del micrófono."
      );
    }
  };

  recognition.onerror = (event) => {
    console.error("Error de reconocimiento de voz:", event.error);

    let errorMessage = "Error en el reconocimiento de voz";

    switch (event.error) {
      case "network":
        errorMessage =
          "🌐 Problema de conexión detectado. El reconocimiento de voz requiere internet estable. Mientras tanto, puedes escribir tu mensaje en el chat.";
        // Sugerir reintentar después de un momento
        setTimeout(() => {
          onError(
            "💡 Consejo: Verifica tu conexión WiFi o datos móviles y vuelve a intentar el reconocimiento de voz."
          );
        }, 3000);
        break;
      case "not-allowed":
        errorMessage =
          "🎤 Permiso de micrófono denegado. Ve a la configuración de tu navegador → Privacidad → Micrófono y permite el acceso para este sitio.";
        break;
      case "no-speech":
        errorMessage =
          "🔇 No se detectó ningún audio. Asegúrate de hablar cerca del micrófono y que no haya ruido de fondo.";
        break;
        "No se detectó ningún audio. Asegúrate de hablar cerca del micrófono.";
        break;
      case "audio-capture":
        errorMessage =
          "No se pudo capturar audio. Verifica que tu micrófono esté funcionando.";
        break;
      case "service-not-allowed":
        errorMessage =
          "El servicio de reconocimiento de voz no está disponible.";
        break;
      case "bad-grammar":
        errorMessage =
          "Error en el procesamiento del audio. Intenta hablar más claro.";
        break;
      case "language-not-supported":
        errorMessage = "El idioma español no está soportado en este navegador.";
        break;
      default:
        errorMessage = `Error de reconocimiento: ${event.error}. Puedes escribir tu mensaje en el chat.`;
    }

    onError(errorMessage);
  };

  recognition.onend = () => {
    console.log("Reconocimiento de voz terminado");
  };

  // Agregar timeout para evitar que se quede colgado
  const timeout = setTimeout(() => {
    try {
      recognition.stop();
      onError(
        "Timeout: El reconocimiento de voz tardó demasiado. Intenta de nuevo."
      );
    } catch (e) {
      console.log("Recognition already stopped");
    }
  }, 10000); // 10 segundos timeout

  // Limpiar timeout cuando termine
  recognition.onend = () => {
    clearTimeout(timeout);
    console.log("Reconocimiento de voz terminado");
  };

  recognition.onresult = (event) => {
    clearTimeout(timeout);
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      console.log("Transcripción obtenida:", transcript);
      onResult(transcript);
    } else {
      onError(
        "No se pudo capturar ningún audio. Intenta hablar más cerca del micrófono."
      );
    }
  };

  return recognition;
};

// Función de reintentos para reconocimiento de voz
export const startVoiceRecognitionWithRetry = (
  onResult,
  onError,
  onStart = null,
  maxRetries = 2
) => {
  let retryCount = 0;

  const attemptRecognition = () => {
    const recognition = startVoiceRecognition(
      onResult,
      (error) => {
        // Si es un error de red y aún tenemos reintentos
        if (error.includes("conexión") && retryCount < maxRetries) {
          retryCount++;
          onError(
            `🔄 Reintentando reconocimiento de voz... (${retryCount}/${maxRetries})`
          );
          setTimeout(() => {
            attemptRecognition();
          }, 2000);
        } else {
          // Si no es error de red o ya no hay más reintentos
          onError(error);
        }
      },
      onStart
    );

    return recognition;
  };

  return attemptRecognition();
};

// Función alternativa para entrada de voz con fallback manual
export const createVoiceInputFallback = (onResult) => {
  return {
    startManualInput: () => {
      const transcript = prompt(
        "🎤 Como el reconocimiento automático falló, puedes escribir aquí lo que querías decir por voz:"
      );
      if (transcript && transcript.trim()) {
        onResult(transcript.trim());
        return true;
      }
      return false;
    },

    showVoiceInstructions: () => {
      return `
🎙️ **Guía para Solucionar Problemas de Voz:**

1. **Verifica tu conexión a internet** - El reconocimiento necesita conexión estable
2. **Permite permisos de micrófono** - Busca el ícono 🎤 en la barra de direcciones
3. **Usa Chrome o Edge** - Mejor compatibilidad con reconocimiento de voz
4. **Habla claramente** - A unos 15cm del micrófono
5. **Evita ruido de fondo** - Busca un lugar silencioso

💡 **Alternativa:** Puedes escribir tu mensaje directamente en el chat.
      `;
    },
  };
};

// Función para verificar permisos y disponibilidad del micrófono
export const checkMicrophonePermissions = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Cerrar el stream inmediatamente después de verificar
    stream.getTracks().forEach((track) => track.stop());
    return { success: true, message: "Micrófono disponible" };
  } catch (error) {
    let message = "Error al acceder al micrófono";

    switch (error.name) {
      case "NotAllowedError":
        message =
          "Permiso de micrófono denegado. Por favor, permite el acceso en la configuración del navegador.";
        break;
      case "NotFoundError":
        message =
          "No se encontró ningún micrófono. Verifica que tengas uno conectado.";
        break;
      case "NotReadableError":
        message = "El micrófono está siendo usado por otra aplicación.";
        break;
      case "OverconstrainedError":
        message =
          "No se pudo configurar el micrófono con los parámetros solicitados.";
        break;
      default:
        message = `Error del micrófono: ${error.message}`;
    }

    return { success: false, message };
  }
};

// Función para verificar conectividad de red
export const checkNetworkConnectivity = () => {
  return new Promise((resolve) => {
    if (!navigator.onLine) {
      resolve({ success: false, message: "Sin conexión a internet" });
      return;
    }

    // Hacer una pequeña prueba de conectividad
    const img = new Image();
    const timeout = setTimeout(() => {
      resolve({ success: false, message: "Conexión lenta o inestable" });
    }, 5000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve({ success: true, message: "Conexión estable" });
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve({ success: false, message: "Problemas de conectividad" });
    };

    // Usar un pixel de Google para verificar conectividad
    img.src = "https://www.google.com/favicon.ico?" + Date.now();
  });
};

// Función para texto a voz
export const speakText = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }
};
