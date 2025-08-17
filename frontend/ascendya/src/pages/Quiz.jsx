import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
import { useLearningPathStore } from "../store/learningPathStore";
import { getGeminiRoute } from "../services/geminiService";

// Esquemas de validación por paso
const stepSchemas = {
  1: yup.object({
    academicInterests: yup
      .array()
      .min(1, "Selecciona al menos una materia")
      .required("Este campo es obligatorio"),
  }),
  2: yup.object({
    learningStyle: yup.string().required("Selecciona tu estilo de aprendizaje"),
    teamWork: yup.string().required("Selecciona tu preferencia de trabajo"),
    preferredActivities: yup
      .array()
      .min(1, "Selecciona al menos una actividad")
      .required("Este campo es obligatorio"),
  }),
  3: yup.object({
    resourcePreferences: yup
      .array()
      .min(1, "Selecciona al menos un tipo de recurso")
      .required("Este campo es obligatorio"),
  }),
  4: yup.object({
    vocationalAreas: yup
      .array()
      .min(1, "Selecciona al menos un área de interés")
      .max(3, "Selecciona máximo 3 áreas")
      .required("Este campo es obligatorio"),
  }),
  5: yup.object({
    studyExpectation: yup
      .string()
      .required("Selecciona tu expectativa de estudio"),
    timeCommitment: yup
      .string()
      .required("Selecciona tu disponibilidad de tiempo"),
  }),
};

function Quiz() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [quizResults, setQuizResults] = useState(null);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);
  const navigate = useNavigate();
  const { setQuizData, setCurrentPath } = userStore();

  const addLearningPath = useLearningPathStore(
    (state) => state.addLearningPath
  );
  const handleGeminiRoute = async (finalAnswers = null) => {
    setIsGeneratingRoute(true);
    try {
      const answersToUse = finalAnswers || quizAnswers;
      console.log("Enviando respuestas a Gemini:", answersToUse);
      const result = await getGeminiRoute(answersToUse);
      console.log("Resultado de Gemini:", result);
      setQuizResults(result);
      addLearningPath(result);
    } catch (error) {
      console.error("Error generating route with Gemini:", error);
      // Mostrar un mensaje de error al usuario
      alert(
        "Error al generar la ruta de aprendizaje. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsGeneratingRoute(false);
    }
  };

  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: yupResolver(stepSchemas[currentStep]),
    defaultValues: {
      academicInterests: [],
      preferredActivities: [],
      resourcePreferences: [],
      vocationalAreas: [],
    },
  });

  // Datos del quiz
  const academicSubjects = [
    { id: "matematicas", name: "Matemáticas", icon: "🔢" },
    { id: "fisica", name: "Física", icon: "⚛️" },
    { id: "quimica", name: "Química", icon: "🧪" },
    { id: "biologia", name: "Biología", icon: "🧬" },
    { id: "historia", name: "Historia", icon: "📚" },
    { id: "literatura", name: "Literatura", icon: "📖" },
    { id: "artes", name: "Artes", icon: "🎨" },
    { id: "informatica", name: "Informática", icon: "💻" },
    { id: "idiomas", name: "Idiomas", icon: "🌍" },
    { id: "musica", name: "Música", icon: "🎵" },
    { id: "geografia", name: "Geografía", icon: "🗺️" },
    { id: "economia", name: "Economía", icon: "💰" },
  ];

  const activities = [
    { id: "proyectos", name: "Desarrollar proyectos", icon: "🚀" },
    { id: "experimentos", name: "Hacer experimentos", icon: "🔬" },
    { id: "investigacion", name: "Investigación", icon: "🔍" },
    { id: "debates", name: "Debates y discusiones", icon: "💬" },
    { id: "programacion", name: "Programación", icon: "👨‍💻" },
    { id: "diseno", name: "Diseño", icon: "🎯" },
    { id: "escritura", name: "Escritura", icon: "✍️" },
    { id: "presentaciones", name: "Presentaciones", icon: "📊" },
    { id: "analisis", name: "Análisis de datos", icon: "📈" },
    { id: "creatividad", name: "Actividades creativas", icon: "✨" },
  ];

  const resourceTypes = [
    {
      id: "videos",
      name: "Videos educativos",
      icon: "🎥",
      description: "Contenido visual y dinámico",
    },
    {
      id: "articulos",
      name: "Artículos y blogs",
      icon: "📄",
      description: "Lectura profunda",
    },
    {
      id: "cursos",
      name: "Cursos interactivos",
      icon: "🎓",
      description: "Aprendizaje guiado",
    },
    {
      id: "libros",
      name: "Libros digitales",
      icon: "📚",
      description: "Teoría fundamentada",
    },
    {
      id: "podcasts",
      name: "Podcasts",
      icon: "🎧",
      description: "Aprendizaje auditivo",
    },
    {
      id: "ejercicios",
      name: "Ejercicios prácticos",
      icon: "💪",
      description: "Práctica dirigida",
    },
    {
      id: "simuladores",
      name: "Simuladores",
      icon: "🕹️",
      description: "Experiencia inmersiva",
    },
    {
      id: "documentales",
      name: "Documentales",
      icon: "🎬",
      description: "Casos reales",
    },
  ];

  const vocationalAreas = [
    {
      id: "ciencia_tecnologia",
      name: "Ciencia y Tecnología",
      icon: "🔬",
      description: "Investigación, innovación, desarrollo",
    },
    {
      id: "artes_humanidades",
      name: "Artes y Humanidades",
      icon: "🎨",
      description: "Creatividad, cultura, expresión",
    },
    {
      id: "ciencias_sociales",
      name: "Ciencias Sociales",
      icon: "👥",
      description: "Sociedad, comportamiento, política",
    },
    {
      id: "salud_medicina",
      name: "Salud y Medicina",
      icon: "⚕️",
      description: "Bienestar, tratamiento, prevención",
    },
    {
      id: "negocios_economia",
      name: "Negocios y Economía",
      icon: "💼",
      description: "Empresas, finanzas, mercados",
    },
    {
      id: "ingenieria",
      name: "Ingeniería",
      icon: "⚙️",
      description: "Construcción, sistemas, soluciones",
    },
    {
      id: "informatica",
      name: "Informática y Software",
      icon: "💻",
      description: "Programación, sistemas, apps",
    },
    {
      id: "educacion",
      name: "Educación",
      icon: "👨‍🏫",
      description: "Enseñanza, formación, desarrollo",
    },
  ];

  const watchedValues = watch();

  const handleArrayToggle = (fieldName, value) => {
    const currentValues = getValues(fieldName) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setValue(fieldName, newValues);
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateLearningRoute = (formData) => {
    setIsGeneratingRoute(true);

    // Simular generación de ruta (aquí conectarías con IA)
    setTimeout(() => {
      const route = {
        id: Date.now(),
        title: generateRouteTitle(formData),
        description: generateRouteDescription(formData),
        estimatedTime: calculateEstimatedTime(formData),
        courses: generateCourses(formData),
        skills: generateSkills(formData),
        careerPaths: generateCareerPaths(formData),
        resources: generateResources(formData),
        difficulty: calculateDifficulty(formData),
      };

      setQuizResults(route);
      setQuizData(formData);
      setCurrentPath(route);
      setIsGeneratingRoute(false);
    }, 3000);
  };

  const generateRouteTitle = (data) => {
    const primaryArea = data.vocationalAreas[0];
    const areaMap = {
      ciencia_tecnologia: "Ruta de Ciencia y Tecnología",
      artes_humanidades: "Ruta de Artes y Humanidades",
      ciencias_sociales: "Ruta de Ciencias Sociales",
      salud_medicina: "Ruta de Salud y Medicina",
      negocios_economia: "Ruta de Negocios y Economía",
      ingenieria: "Ruta de Ingeniería",
      informatica: "Ruta de Programación y Desarrollo",
      educacion: "Ruta de Educación y Pedagogía",
    };
    return areaMap[primaryArea] || "Ruta Personalizada";
  };

  const generateRouteDescription = (data) => {
    return `Ruta personalizada basada en tus intereses en ${data.academicInterests.join(
      ", "
    )} y tu preferencia por el aprendizaje ${data.learningStyle.toLowerCase()}.`;
  };

  const calculateEstimatedTime = (data) => {
    const baseHours = 120;
    const timeMap = {
      "1-2_horas": 0.5,
      "3-5_horas": 1,
      "6-10_horas": 1.5,
      mas_10_horas: 2,
    };
    return Math.round(baseHours * (timeMap[data.timeCommitment] || 1));
  };

  const generateCourses = (data) => {
    // Lógica para generar cursos basados en respuestas
    const courseMap = {
      informatica: [
        "Fundamentos de Programación",
        "Desarrollo Web Básico",
        "Bases de Datos",
        "Algoritmos y Estructuras de Datos",
      ],
      matematicas: [
        "Cálculo Diferencial",
        "Álgebra Lineal",
        "Estadística Aplicada",
        "Matemáticas Discretas",
      ],
      ciencia_tecnologia: [
        "Método Científico",
        "Física Moderna",
        "Química General",
        "Investigación Aplicada",
      ],
    };

    let courses = [];
    data.academicInterests.forEach((interest) => {
      if (courseMap[interest]) {
        courses = [...courses, ...courseMap[interest]];
      }
    });

    return courses.slice(0, 8); // Limitar a 8 cursos
  };

  const generateSkills = (data) => {
    const skillMap = {
      proyectos: ["Gestión de Proyectos", "Planificación"],
      programacion: ["Lógica de Programación", "Resolución de Problemas"],
      investigacion: ["Análisis Crítico", "Metodología de Investigación"],
      creatividad: ["Pensamiento Creativo", "Innovación"],
    };

    let skills = [];
    data.preferredActivities?.forEach((activity) => {
      if (skillMap[activity]) {
        skills = [...skills, ...skillMap[activity]];
      }
    });

    return [...new Set(skills)]; // Eliminar duplicados
  };

  const generateCareerPaths = (data) => {
    const careerMap = {
      informatica: [
        "Desarrollador de Software",
        "Ingeniero de Datos",
        "Ciberseguridad",
      ],
      ciencia_tecnologia: [
        "Investigador",
        "Científico de Datos",
        "Ingeniero de I+D",
      ],
      salud_medicina: ["Médico", "Enfermero", "Investigador Biomédico"],
      negocios_economia: [
        "Analista Financiero",
        "Emprendedor",
        "Consultor de Negocios",
      ],
    };

    let careers = [];
    data.vocationalAreas?.forEach((area) => {
      if (careerMap[area]) {
        careers = [...careers, ...careerMap[area]];
      }
    });

    return [...new Set(careers)].slice(0, 6);
  };

  const generateResources = (data) => {
    return (
      data.resourcePreferences?.map((type) => ({
        type,
        count: Math.floor(Math.random() * 20) + 10,
      })) || []
    );
  };

  const calculateDifficulty = (data) => {
    const practicalWeight =
      data.learningStyle === "muy_practico"
        ? 1
        : data.learningStyle === "practico"
        ? 2
        : data.learningStyle === "equilibrado"
        ? 3
        : data.learningStyle === "teorico"
        ? 4
        : 5;

    return practicalWeight <= 2
      ? "Principiante"
      : practicalWeight <= 4
      ? "Intermedio"
      : "Avanzado";
  };

  const onSubmit = (data) => {
    const finalAnswers = { ...quizAnswers, ...data };
    setQuizAnswers(finalAnswers);
    handleGeminiRoute(finalAnswers);
  };

  if (quizResults) {
    return (
      <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Resultados del Quiz */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold mb-4">¡Tu ruta está lista! 🎉</h1>
            <p className="text-xl text-slate-300 mb-8">
              Hemos creado una ruta personalizada basada en tus respuestas
            </p>
          </div>

          {/* Ruta generada */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  {quizResults?.title || "Ruta de Aprendizaje"}
                </h2>
                <p className="text-slate-300 mb-4">
                  {quizResults?.description || "Descripción no disponible"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">⏱️</span>
                    <span>
                      {quizResults?.estimatedTime || "N/A"} horas estimadas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">📚</span>
                    <span>
                      {quizResults?.courses ? quizResults.courses.length : 0}{" "}
                      cursos incluidos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">⭐</span>
                    <span>
                      Nivel{" "}
                      {quizResults?.difficulty || quizResults?.level || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de la ruta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Cursos */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-400">📚</span>
                Cursos en tu ruta
              </h3>
              <div className="space-y-3">
                {quizResults?.courses && quizResults.courses.length > 0 ? (
                  quizResults.courses.map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm">{course}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">
                    No hay cursos disponibles
                  </p>
                )}
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-400">💪</span>
                Habilidades que desarrollarás
              </h3>
              <div className="flex flex-wrap gap-2">
                {quizResults?.skills && quizResults.skills.length > 0 ? (
                  quizResults.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">
                    No hay habilidades especificadas
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">🚀</span>
                  Posibles carreras
                </h4>
                <div className="space-y-2">
                  {quizResults?.careerPaths &&
                  quizResults.careerPaths.length > 0 ? (
                    quizResults.careerPaths.map((career, index) => (
                      <div
                        key={index}
                        className="text-sm text-slate-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                        {career}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">
                      No hay carreras especificadas
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recursos disponibles */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-purple-400">🎯</span>
              Recursos personalizados para ti
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quizResults?.resources && quizResults.resources.length > 0 ? (
                quizResults.resources.map((resource, index) => {
                  const resourceData = resourceTypes.find(
                    (r) => r.id === resource.type
                  );
                  return (
                    <div
                      key={index}
                      className="text-center p-4 bg-slate-800 rounded-lg"
                    >
                      <div className="text-2xl mb-2">
                        {resourceData?.icon || "📚"}
                      </div>
                      <div className="font-medium text-sm mb-1">
                        {resourceData?.name || resource.type || "Recurso"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {resource.count || "Varios"} disponibles
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-400">
                    No hay recursos específicos disponibles
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/resources")}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Comenzar mi ruta
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Ver mi dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isGeneratingRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-4">
            Generando tu ruta personalizada...
          </h2>
          <p className="text-slate-400">
            Analizando tus respuestas y creando el mejor camino para ti
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Test Vocacional Personalizado
          </h1>
          <p className="text-slate-400 mb-6">
            Responde estas preguntas para crear tu ruta de aprendizaje ideal
          </p>

          {/* Progress bar */}
          <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="text-sm text-slate-400">
            Paso {currentStep} de {totalSteps}
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-8"
        >
          {/* Paso 1: Intereses Académicos */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                ¿Qué materias disfrutas más?
              </h2>
              <p className="text-slate-400 mb-6">
                Selecciona todas las que te interesen
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {academicSubjects.map((subject) => {
                  const isSelected = watchedValues.academicInterests?.includes(
                    subject.id
                  );
                  return (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() =>
                        handleArrayToggle("academicInterests", subject.id)
                      }
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        isSelected
                          ? "border-green-500 bg-green-500/20 text-green-400"
                          : "border-slate-600 bg-slate-800 hover:border-slate-500"
                      }`}
                    >
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <div className="font-medium text-sm">{subject.name}</div>
                    </button>
                  );
                })}
              </div>

              {errors.academicInterests && (
                <p className="mt-4 text-sm text-red-400">
                  {errors.academicInterests.message}
                </p>
              )}
            </div>
          )}

          {/* Paso 2: Estilo de Aprendizaje */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  ¿Cómo prefieres aprender?
                </h2>
                <p className="text-slate-400 mb-6">
                  Cuéntanos sobre tu estilo de aprendizaje
                </p>

                {/* Estilo de aprendizaje */}
                <div className="mb-8">
                  <label className="block font-medium mb-4">
                    ¿Prefieres aprender de forma práctica o teórica?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { value: "muy_practico", label: "Muy práctico" },
                      { value: "practico", label: "Práctico" },
                      { value: "equilibrado", label: "Equilibrado" },
                      { value: "teorico", label: "Teórico" },
                      { value: "muy_teorico", label: "Muy teórico" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          {...register("learningStyle")}
                          value={option.value}
                          className="text-green-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.learningStyle && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.learningStyle.message}
                    </p>
                  )}
                </div>

                {/* Trabajo en equipo */}
                <div className="mb-8">
                  <label className="block font-medium mb-4">
                    ¿Te gusta trabajar en equipo o individualmente?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: "equipo", label: "Prefiero trabajo en equipo" },
                      {
                        value: "individual",
                        label: "Prefiero trabajo individual",
                      },
                      { value: "ambos", label: "Me adapto a ambos" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer p-3 border border-slate-600 rounded-lg hover:border-slate-500"
                      >
                        <input
                          type="radio"
                          {...register("teamWork")}
                          value={option.value}
                          className="text-green-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.teamWork && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.teamWork.message}
                    </p>
                  )}
                </div>

                {/* Actividades preferidas */}
                <div>
                  <label className="block font-medium mb-4">
                    ¿Qué tipo de actividades disfrutas más?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activities.map((activity) => {
                      const isSelected =
                        watchedValues.preferredActivities?.includes(
                          activity.id
                        );
                      return (
                        <button
                          key={activity.id}
                          type="button"
                          onClick={() =>
                            handleArrayToggle(
                              "preferredActivities",
                              activity.id
                            )
                          }
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? "border-green-500 bg-green-500/20 text-green-400"
                              : "border-slate-600 bg-slate-800 hover:border-slate-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{activity.icon}</span>
                            <span className="text-sm">{activity.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.preferredActivities && (
                    <p className="mt-4 text-sm text-red-400">
                      {errors.preferredActivities.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Preferencias de Recursos */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                ¿Qué tipo de recursos prefieres para aprender?
              </h2>
              <p className="text-slate-400 mb-6">
                Selecciona los formatos que más te gusten
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceTypes.map((resource) => {
                  const isSelected =
                    watchedValues.resourcePreferences?.includes(resource.id);
                  return (
                    <button
                      key={resource.id}
                      type="button"
                      onClick={() =>
                        handleArrayToggle("resourcePreferences", resource.id)
                      }
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-green-500 bg-green-500/20"
                          : "border-slate-600 bg-slate-800 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{resource.icon}</span>
                        <div>
                          <div
                            className={`font-medium ${
                              isSelected ? "text-green-400" : "text-white"
                            }`}
                          >
                            {resource.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {resource.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {errors.resourcePreferences && (
                <p className="mt-4 text-sm text-red-400">
                  {errors.resourcePreferences.message}
                </p>
              )}
            </div>
          )}

          {/* Paso 4: Orientación Vocacional */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                ¿Qué áreas te interesan más?
              </h2>
              <p className="text-slate-400 mb-6">
                Selecciona hasta 3 áreas de tu interés
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vocationalAreas.map((area) => {
                  const isSelected = watchedValues.vocationalAreas?.includes(
                    area.id
                  );
                  const isDisabled =
                    !isSelected && watchedValues.vocationalAreas?.length >= 3;

                  return (
                    <button
                      key={area.id}
                      type="button"
                      disabled={isDisabled}
                      onClick={() =>
                        handleArrayToggle("vocationalAreas", area.id)
                      }
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-green-500 bg-green-500/20"
                          : isDisabled
                          ? "border-slate-700 bg-slate-800/50 opacity-50 cursor-not-allowed"
                          : "border-slate-600 bg-slate-800 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{area.icon}</span>
                        <div>
                          <div
                            className={`font-medium ${
                              isSelected ? "text-green-400" : "text-white"
                            }`}
                          >
                            {area.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {area.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 text-sm text-slate-400">
                {watchedValues.vocationalAreas?.length || 0} de 3 áreas
                seleccionadas
              </div>

              {errors.vocationalAreas && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.vocationalAreas.message}
                </p>
              )}
            </div>
          )}

          {/* Paso 5: Expectativas */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  ¿Cuáles son tus expectativas?
                </h2>
                <p className="text-slate-400 mb-6">
                  Cuéntanos sobre tus planes y disponibilidad
                </p>

                {/* Expectativas de estudio */}
                <div className="mb-8">
                  <label className="block font-medium mb-4">
                    ¿Te interesa estudiar en universidad o prefieres rutas
                    autodidactas?
                  </label>
                  <div className="space-y-3">
                    {[
                      {
                        value: "universidad",
                        label: "Quiero prepararme para la universidad",
                        desc: "Recursos enfocados en exámenes de admisión",
                      },
                      {
                        value: "autodidacta",
                        label: "Prefiero aprendizaje autodidacta",
                        desc: "Rutas completamente gratuitas y flexibles",
                      },
                      {
                        value: "ambos",
                        label: "Me interesan ambas opciones",
                        desc: "Combinación de preparación universitaria y habilidades prácticas",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-start gap-3 cursor-pointer p-4 border border-slate-600 rounded-lg hover:border-slate-500"
                      >
                        <input
                          type="radio"
                          {...register("studyExpectation")}
                          value={option.value}
                          className="text-green-500 mt-1"
                        />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-slate-400">
                            {option.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.studyExpectation && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.studyExpectation.message}
                    </p>
                  )}
                </div>

                {/* Tiempo disponible */}
                <div>
                  <label className="block font-medium mb-4">
                    ¿Cuánto tiempo puedes dedicar al estudio por semana?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      {
                        value: "1-2_horas",
                        label: "1-2 horas por semana",
                        desc: "Ritmo relajado",
                      },
                      {
                        value: "3-5_horas",
                        label: "3-5 horas por semana",
                        desc: "Ritmo moderado",
                      },
                      {
                        value: "6-10_horas",
                        label: "6-10 horas por semana",
                        desc: "Ritmo activo",
                      },
                      {
                        value: "mas_10_horas",
                        label: "Más de 10 horas por semana",
                        desc: "Ritmo intensivo",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-start gap-3 cursor-pointer p-4 border border-slate-600 rounded-lg hover:border-slate-500"
                      >
                        <input
                          type="radio"
                          {...register("timeCommitment")}
                          value={option.value}
                          className="text-green-500 mt-1"
                        />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-slate-400">
                            {option.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.timeCommitment && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.timeCommitment.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between mt-8 pt-8 border-t border-slate-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Generar mi ruta
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Siguiente
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Quiz;
