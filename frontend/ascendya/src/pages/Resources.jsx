import { useState } from "react";
import { Link } from "react-router-dom";
import { useLearningPathStore } from "../store/learningPathStore";
import VirtualAssistant from "../components/VirtualAssistant";

function Resources() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedPath, setSelectedPath] = useState(null);
  const [showPathDetails, setShowPathDetails] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: "normal",
    highContrast: false,
    subtitles: true,
    audioDescription: false,
    signLanguage: false,
    slowMotion: false,
    keyboardNavigation: true,
  });

  // Obtener rutas del store
  const { learningPaths: storedPaths } = useLearningPathStore();

  // Función para convertir datos de Gemini al formato esperado
  const convertGeminiPath = (geminiPath, index) => {
    return {
      id: `gemini-${Date.now()}-${index}`,
      title: geminiPath.title || "Ruta Personalizada",
      description: geminiPath.description,
      courses: geminiPath.courses?.length || 0,
      progress: 0, // Nueva ruta, sin progreso
      totalHours: geminiPath.estimatedTime || 40,
      type: "Ruta Personalizada IA",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      downloadable: true,
      subjects: geminiPath.interests?.split(", ") || [],
      difficulty: geminiPath.difficulty || geminiPath.level || "Intermedio",
      skills: geminiPath.skills || [],
      careerPaths: geminiPath.careerPaths || [],
      modules: geminiPath.modules || [],
      courseList: geminiPath.courses || [],
      isFromGemini: true,
    };
  };

  // Rutas estáticas (ejemplos predefinidos)
  const staticLearningPaths = [
    {
      id: 1,
      title: "Preparación EXANI-II (Ingeniería)",
      courses: 24,
      progress: 67,
      totalHours: 120,
      type: "Ruta Especializada",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      downloadable: true,
      subjects: ["Matemáticas", "Física", "Química"],
      isFromGemini: false,
    },
    {
      id: 2,
      title: "Examen de Admisión UNAM (Área 1)",
      courses: 18,
      progress: 12,
      totalHours: 85,
      type: "Ruta Oficial",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      downloadable: true,
      subjects: ["Matemáticas", "Física", "Química", "Biología"],
      isFromGemini: false,
    },
  ];

  // Combinar rutas: convertir las de Gemini y agregar las estáticas
  const geminiPaths = storedPaths.map((path, index) =>
    convertGeminiPath(path, index)
  );
  const allLearningPaths = [...geminiPaths, ...staticLearningPaths];

  // Usar todas las rutas combinadas
  const learningPaths = allLearningPaths;
  const currentVideos = [
    {
      id: 1,
      title: "Álgebra Lineal: Sistemas de Ecuaciones y Matrices",
      subject: "Matemáticas",
      progress: 45,
      duration: "15 min 27 seg",
      thumbnail:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop",
      instructor: "Dra. María González",
      isLive: false,
      hasSubtitles: true,
      hasSignLanguage: true,
      hasAudioDescription: true,
      difficulty: "Intermedio",
    },
    {
      id: 2,
      title: "Química Orgánica: Hidrocarburos y Nomenclatura",
      subject: "Química",
      progress: 100,
      duration: "22 min 15 seg",
      thumbnail:
        "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=200&fit=crop",
      instructor: "Dr. Carlos Ruiz",
      isLive: false,
      hasSubtitles: true,
      hasSignLanguage: false,
      hasAudioDescription: true,
      difficulty: "Avanzado",
    },
    {
      id: 3,
      title: "Física: Mecánica Clásica y Leyes de Newton",
      subject: "Física",
      progress: 23,
      duration: "18 min 08 seg",
      thumbnail:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop",
      instructor: "Dr. Ana Martín",
      isLive: false,
      hasSubtitles: true,
      hasSignLanguage: true,
      hasAudioDescription: false,
      difficulty: "Intermedio",
    },
    {
      id: 4,
      title: "Historia Universal: Revolución Industrial",
      subject: "Historia",
      progress: 0,
      duration: "25 min 33 seg",
      thumbnail:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      instructor: "Lic. Diego López",
      isLive: true,
      hasSubtitles: true,
      hasSignLanguage: true,
      hasAudioDescription: true,
      difficulty: "Básico",
    },
  ];

  // Cursos de materias universitarias
  const recommendedCourses = [
    {
      id: 1,
      title: "Cálculo Diferencial e Integral",
      instructor: "Dr. Sebastián Delmont",
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop",
      category: "Matemáticas",
      level: "Intermedio",
      duration: "45h 25min",
      university: "Para UNAM, IPN, UAM",
    },
    {
      id: 2,
      title: "Biología Molecular y Celular",
      instructor: "Dra. Anna Espinoza",
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      category: "Biología",
      level: "Avanzado",
      duration: "38h 45min",
      university: "Para Medicina",
    },
    {
      id: 3,
      title: "Literatura Mexicana e Hispanoamericana",
      instructor: "Mtro. Carlos José Rojas",
      rating: 4.5,
      thumbnail:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      category: "Literatura",
      level: "Intermedio",
      duration: "28h 20min",
      university: "Para Humanidades",
    },
    {
      id: 4,
      title: "Química Analítica y Cuantitativa",
      instructor: "Dra. María Camila Lenis",
      rating: 4.6,
      thumbnail:
        "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=200&fit=crop",
      category: "Química",
      level: "Avanzado",
      duration: "42h 15min",
      university: "Para Ingeniería Química",
    },
    {
      id: 5,
      title: "Geografía y Medio Ambiente",
      instructor: "Lic. Jaivic Villegas",
      rating: 4.4,
      thumbnail:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
      category: "Geografía",
      level: "Básico",
      duration: "25h 30min",
      university: "Para Ciencias Sociales",
    },
  ];

  const categories = [
    { id: "todos", name: "Todas las materias", count: 125 },
    { id: "matematicas", name: "Matemáticas", count: 45 },
    { id: "ciencias", name: "Ciencias", count: 38 },
    { id: "humanidades", name: "Humanidades", count: 22 },
    { id: "sociales", name: "Ciencias Sociales", count: 20 },
  ];

  const toggleAccessibilityOption = (option) => {
    setAccessibilitySettings((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const downloadLearningPath = (pathId) => {
    // Simular descarga de ruta
    alert(`Descargando ruta de aprendizaje ${pathId} para acceso offline...`);
  };

  const handlePathClick = (path) => {
    setSelectedPath(path);
    setShowPathDetails(true);
  };

  const closePathDetails = () => {
    setSelectedPath(null);
    setShowPathDetails(false);
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-white ${
        accessibilitySettings.fontSize === "large"
          ? "text-lg"
          : accessibilitySettings.fontSize === "small"
          ? "text-sm"
          : "text-base"
      } ${accessibilitySettings.highContrast ? "filter contrast-150" : ""}`}
    >
      {/* Panel de Accesibilidad */}
      <div className="bg-slate-900 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer text-green-400 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Opciones de Accesibilidad</span>
              <svg
                className="w-4 h-4 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {/* Tamaño de fuente */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tamaño de texto
                </label>
                <select
                  value={accessibilitySettings.fontSize}
                  onChange={(e) =>
                    setAccessibilitySettings((prev) => ({
                      ...prev,
                      fontSize: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="small">Pequeño</option>
                  <option value="normal">Normal</option>
                  <option value="large">Grande</option>
                </select>
              </div>

              {/* Alto contraste */}
              <button
                onClick={() => toggleAccessibilityOption("highContrast")}
                className={`p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  accessibilitySettings.highContrast
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Alto Contraste
              </button>

              {/* Subtítulos */}
              <button
                onClick={() => toggleAccessibilityOption("subtitles")}
                className={`p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  accessibilitySettings.subtitles
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Subtítulos
              </button>

              {/* Descripción de audio */}
              <button
                onClick={() => toggleAccessibilityOption("audioDescription")}
                className={`p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  accessibilitySettings.audioDescription
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Audio Descripción
              </button>

              {/* Lengua de señas */}
              <button
                onClick={() => toggleAccessibilityOption("signLanguage")}
                className={`p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  accessibilitySettings.signLanguage
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Lengua de Señas
              </button>

              {/* Velocidad lenta */}
              <button
                onClick={() => toggleAccessibilityOption("slowMotion")}
                className={`p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  accessibilitySettings.slowMotion
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Velocidad 0.5x
              </button>

              {/* Navegación por teclado */}
              <button
                onClick={() => toggleAccessibilityOption("keyboardNavigation")}
                className={`p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  accessibilitySettings.keyboardNavigation
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Navegación Teclado
              </button>
            </div>
          </details>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Edgar, continúa preparándote para la universidad
          </h1>
          <div className="flex items-center gap-2 text-slate-400">
            <Link
              to="/courses"
              className="text-green-400 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              tabIndex={accessibilitySettings.keyboardNavigation ? 0 : -1}
            >
              Ver mis cursos de preparación
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Asistente Virtual - Sección destacada */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Ascend AI - Tu Mentor Virtual</h2>
                  <p className="text-purple-300">Asistente inteligente disponible 24/7</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-purple-300">
                <span className="text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full animate-pulse">
                  ● En línea
                </span>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6">
              Tu compañero de estudio inteligente está aquí para ayudarte. Haz preguntas por voz, 
              adjunta documentos para análisis, recibe planes de estudio personalizados y obtén 
              respuestas inmediatas a tus dudas académicas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎤</span>
                  <h3 className="font-semibold text-white">Comando por Voz</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Habla naturalmente y obtén respuestas instantáneas
                </p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📎</span>
                  <h3 className="font-semibold text-white">Análisis de Archivos</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Adjunta PDFs, documentos y obtén análisis detallados
                </p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎯</span>
                  <h3 className="font-semibold text-white">Planes Personalizados</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Estrategias de estudio adaptadas a tu nivel
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>💡</span>
                <span>Encuentra el botón flotante en la esquina inferior derecha</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-400">Powered by</span>
                <span className="text-xs font-semibold text-purple-300">Google Gemini AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Videos/Clases Actuales */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Continúa con tus clases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentVideos.map((video, index) => (
              <div
                key={video.id}
                className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
                tabIndex={accessibilitySettings.keyboardNavigation ? 0 : -1}
                role="button"
                aria-label={`Reproducir clase: ${video.title}, duración ${video.duration}, progreso ${video.progress}%`}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={`Clase de ${video.subject}: ${video.title}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  {/* Accessibility features indicators */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {video.hasSubtitles && (
                      <div
                        className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded"
                        title="Tiene subtítulos"
                      >
                        CC
                      </div>
                    )}
                    {video.hasSignLanguage && (
                      <div
                        className="bg-purple-500 text-white text-xs px-1 py-0.5 rounded"
                        title="Tiene lengua de señas"
                      >
                        🤟
                      </div>
                    )}
                    {video.hasAudioDescription && (
                      <div
                        className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded"
                        title="Tiene audio descripción"
                      >
                        AD
                      </div>
                    )}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {video.progress > 0 && (
                    <div className="absolute top-3 right-3">
                      <div
                        className={`w-8 h-8 rounded-full border-2 ${
                          video.progress === 100
                            ? "border-green-500 bg-green-500"
                            : "border-blue-500"
                        } flex items-center justify-center`}
                      >
                        {video.progress === 100 ? (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold text-white">
                            {video.progress}%
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Live indicator */}
                  {video.isLive && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                      🔴 EN VIVO
                    </div>
                  )}

                  {/* Difficulty level */}
                  <div className="absolute top-3 right-12 bg-slate-700/90 text-white text-xs px-2 py-1 rounded">
                    {video.difficulty}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {video.subject}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-green-400 group-focus:text-green-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {video.instructor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mis Rutas con descarga */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Mis rutas de preparación</h2>
            <button className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-green-500 rounded">
              Ver todas
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.length > 0 ? (
              learningPaths.map((path) => (
                <div
                  key={path.id}
                  onClick={() => handlePathClick(path)}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-green-500/50 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-green-500"
                  tabIndex={accessibilitySettings.keyboardNavigation ? 0 : -1}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={path.avatar}
                      alt={`Instructor de ${path.title}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm group-hover:text-green-400 group-focus:text-green-400 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {path.courses} cursos • {path.type}
                      </p>
                      {path.isFromGemini && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                            ✨ Personalizada IA
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Download button */}
                    {path.downloadable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadLearningPath(path.id);
                        }}
                        className="p-2 text-slate-400 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                        title="Descargar ruta para acceso offline"
                        aria-label={`Descargar ruta ${path.title} para acceso offline`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Subjects tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {path.subjects &&
                      path.subjects.slice(0, 3).map((subject, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                    {path.subjects && path.subjects.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{path.subjects.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Description for Gemini paths */}
                  {path.isFromGemini && path.description && (
                    <p
                      className="text-xs text-slate-400 mb-3"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {path.description}
                    </p>
                  )}

                  {/* Skills for Gemini paths */}
                  {path.isFromGemini &&
                    path.skills &&
                    path.skills.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-slate-300 mb-1">
                          Habilidades:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.slice(0, 2).map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {path.skills.length > 2 && (
                            <span className="text-xs text-slate-400">
                              +{path.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>
                        {path.progress || 0} de {path.totalHours} horas
                      </span>
                      <span>
                        {Math.round(
                          ((path.progress || 0) / path.totalHours) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div
                      className="w-full bg-slate-700 rounded-full h-2"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={Math.round(
                        ((path.progress || 0) / path.totalHours) * 100
                      )}
                      aria-label={`Progreso de ${path.title}: ${Math.round(
                        ((path.progress || 0) / path.totalHours) * 100
                      )}%`}
                    >
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((path.progress || 0) / path.totalHours) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Difficulty indicator */}
                  {path.difficulty && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Nivel:</span>
                      <span
                        className={`px-2 py-0.5 rounded ${
                          path.difficulty.toLowerCase() === "principiante"
                            ? "bg-green-500/20 text-green-400"
                            : path.difficulty.toLowerCase() === "intermedio"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {path.difficulty}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-300 mb-2">
                    No tienes rutas de aprendizaje aún
                  </h3>
                  <p className="text-slate-400 mb-4">
                    Completa nuestro quiz para generar tu primera ruta
                    personalizada con IA
                  </p>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Crear mi primera ruta
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">
            Explora materias universitarias
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  activeCategory === category.id
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
                tabIndex={accessibilitySettings.keyboardNavigation ? 0 : -1}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Cursos recomendados */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">
            Cursos para tu preparación universitaria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
                tabIndex={accessibilitySettings.keyboardNavigation ? 0 : -1}
                role="button"
                aria-label={`Curso: ${course.title}, instructor: ${course.instructor}, calificación: ${course.rating} estrellas`}
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={`Curso de ${course.category}: ${course.title}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-black ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {course.category}
                  </div>

                  {/* Level badge */}
                  <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
                    {course.level}
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-green-400 group-focus:text-green-400 transition-colors mb-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-1">
                    Por {course.instructor}
                  </p>

                  <p className="text-xs text-blue-400 mb-2">
                    {course.university}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de inclusión educativa */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-4">
            🌟 Educación Inclusiva y Accesible
          </h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Todos nuestros cursos incluyen subtítulos, descripción de audio,
            lengua de señas mexicana, navegación por teclado y compatibilidad
            con lectores de pantalla.
            <strong> La educación es un derecho universal.</strong>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <span>👁️</span>
              <span>Accesibilidad Visual</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👂</span>
              <span>Accesibilidad Auditiva</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⌨️</span>
              <span>Accesibilidad Motora</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🧠</span>
              <span>Accesibilidad Cognitiva</span>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
            Conoce más sobre nuestras características de accesibilidad
          </button>
        </div>
      </div>

      {/* Modal de detalles de ruta */}
      {showPathDetails && selectedPath && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPath.avatar}
                  alt={`Instructor de ${selectedPath.title}`}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedPath.title}</h2>
                  <p className="text-slate-400">{selectedPath.type}</p>
                </div>
              </div>
              <button
                onClick={closePathDetails}
                className="p-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Descripción */}
              {selectedPath.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                  <p className="text-slate-300">{selectedPath.description}</p>
                </div>
              )}

              {/* Estadísticas de la ruta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {selectedPath.courses}
                  </div>
                  <div className="text-sm text-slate-400">Cursos</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {selectedPath.totalHours}h
                  </div>
                  <div className="text-sm text-slate-400">Total</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {selectedPath.progress || 0}%
                  </div>
                  <div className="text-sm text-slate-400">Progreso</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {selectedPath.difficulty}
                  </div>
                  <div className="text-sm text-slate-400">Nivel</div>
                </div>
              </div>

              {/* Materias/Intereses */}
              {selectedPath.subjects && selectedPath.subjects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Materias de estudio
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Habilidades (solo para rutas de Gemini) */}
              {selectedPath.isFromGemini &&
                selectedPath.skills &&
                selectedPath.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Habilidades que desarrollarás
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Cursos específicos (solo para rutas de Gemini) */}
              {selectedPath.isFromGemini &&
                selectedPath.courseList &&
                selectedPath.courseList.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Cursos incluidos
                    </h3>
                    <div className="space-y-2">
                      {selectedPath.courseList.map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Posibles carreras (solo para rutas de Gemini) */}
              {selectedPath.isFromGemini &&
                selectedPath.careerPaths &&
                selectedPath.careerPaths.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Posibles carreras profesionales
                    </h3>
                    <div className="space-y-2">
                      {selectedPath.careerPaths.map((career, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-slate-300"
                        >
                          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Módulos (solo para rutas de Gemini) */}
              {selectedPath.isFromGemini &&
                selectedPath.modules &&
                selectedPath.modules.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Módulos de aprendizaje
                    </h3>
                    <div className="space-y-4">
                      {selectedPath.modules.map((module, idx) => (
                        <div key={idx} className="bg-slate-800 rounded-lg p-4">
                          <h4 className="font-medium mb-2">{module.name}</h4>
                          <p className="text-sm text-slate-400 mb-2">
                            Duración: {module.duration}
                          </p>
                          {module.topics && module.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {module.topics.map((topic, topicIdx) => (
                                <span
                                  key={topicIdx}
                                  className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                          {module.resources && module.resources.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-slate-300 mb-1">
                                Recursos:
                              </p>
                              <div className="space-y-1">
                                {module.resources.map((resource, resIdx) => (
                                  <div
                                    key={resIdx}
                                    className="text-xs text-slate-400"
                                  >
                                    📚 {resource.title}{" "}
                                    {resource.author && `- ${resource.author}`}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Botones de acción */}
              <div className="flex gap-4">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
                  Comenzar ruta
                </button>
                {selectedPath.downloadable && (
                  <button
                    onClick={() => downloadLearningPath(selectedPath.id)}
                    className="px-6 py-3 border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Descargar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Asistente Virtual */}
      <VirtualAssistant />
    </div>
  );
}

export default Resources;
