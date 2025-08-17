import { useState } from "react";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import { useLearningPathStore } from "../store/learningPathStore";

// Componente para gráfica circular simple
const SimpleCircularChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-white text-center">{title}</h3>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Círculo base */}
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#334155"
              strokeWidth="10"
            />

            {/* Círculos de progreso */}
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${
                (percentage / 100) * circumference
              } ${circumference}`;

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={circumference * 0.75}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              );
            })}
          </svg>

          {/* Porcentaje en el centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(
                  data.reduce((sum, item) => sum + item.progress, 0) /
                    data.length
                )}
                %
              </div>
              <div className="text-xs text-slate-400">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-slate-400">
              {item.progress}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para gráfica de barras simple
const SimpleBarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item.hours));
  const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-6 text-white">{title}</h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">{item.name}</span>
              <span className="text-sm font-medium text-slate-400">
                {item.hours}h
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(item.hours / maxValue) * 100}%`,
                  backgroundColor: colors[index % colors.length],
                  animationDelay: `${index * 0.2}s`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para gráfica de línea simple
const SimpleLineChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 300;
      const y = 150 - ((item.value - minValue) / (maxValue - minValue)) * 120;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-6 text-white">{title}</h3>

      <div className="bg-slate-800 rounded-lg p-4">
        <svg
          width="100%"
          height="200"
          viewBox="0 0 300 150"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={30 + i * 30}
              x2="300"
              y2={30 + i * 30}
              stroke="#334155"
              strokeWidth="1"
            />
          ))}

          {/* Línea principal */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            points={points}
            className="animate-pulse"
          />

          {/* Puntos */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y =
              150 - ((item.value - minValue) / (maxValue - minValue)) * 120;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>

        {/* Etiquetas del eje X */}
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          {data.map((item, index) => (
            <span key={index}>Sem {index + 1}</span>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-lg font-bold text-green-400">{maxValue}</div>
          <div className="text-xs text-slate-400">Máximo</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-400">
            {Math.round(
              data.reduce((sum, item) => sum + item.value, 0) / data.length
            )}
          </div>
          <div className="text-xs text-slate-400">Promedio</div>
        </div>
        <div>
          <div className="text-lg font-bold text-purple-400">{minValue}</div>
          <div className="text-xs text-slate-400">Mínimo</div>
        </div>
      </div>
    </div>
  );
};

// Componente para progreso de ruta
const RouteCard = ({ route, isSelected, onClick }) => {
  const progressPercentage =
    (route.completedModules / route.totalModules) * 100;

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected
          ? "border-green-500 bg-green-500/10 shadow-lg"
          : "border-slate-600 bg-slate-800 hover:border-slate-500"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={route.avatar}
          alt={route.title}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-medium text-sm text-white line-clamp-1">
            {route.title}
          </h3>
          <p className="text-xs text-slate-400">
            {route.completedModules}/{route.totalModules} módulos
          </p>
          {route.isFromGemini && (
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full mt-1 inline-block">
              ✨ IA
            </span>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Progreso</span>
          <span className="text-green-400 font-medium">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Estadísticas mini */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-blue-400">
            {route.weeklyTime}h
          </div>
          <div className="text-xs text-slate-400">Semanal</div>
        </div>
        <div>
          <div className="text-sm font-bold text-yellow-400">
            {route.streak}
          </div>
          <div className="text-xs text-slate-400">Racha</div>
        </div>
        <div>
          <div className="text-sm font-bold text-green-400">
            {route.avgScore}%
          </div>
          <div className="text-xs text-slate-400">Promedio</div>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedRoute, setSelectedRoute] = useState(0);
  const { user } = userStore();
  const { learningPaths } = useLearningPathStore();

  // Función para convertir rutas de Gemini al formato del dashboard
  const convertToRouteData = (geminiPath, index) => {
    const totalModules =
      geminiPath.modules?.length || geminiPath.courses?.length || 5;
    const completedModules = Math.floor(Math.random() * totalModules); // Simular progreso aleatorio inicial

    return {
      id: `gemini-${index}`,
      title: geminiPath.title || "Ruta Personalizada",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face",
      progress: Math.round((completedModules / totalModules) * 100),
      completedModules: completedModules,
      totalModules: totalModules,
      weeklyTime:
        parseInt(geminiPath.estimatedTime) ||
        Math.floor(Math.random() * 12) + 4, // 4-16 horas
      streak: Math.floor(Math.random() * 20) + 1, // 1-20 días
      avgScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      isFromGemini: true,
      difficulty: geminiPath.difficulty || geminiPath.level,
      subjects: geminiPath.interests?.split(", ") || [],
      skills: geminiPath.skills || [],
      careerPaths: geminiPath.careerPaths || [],
      description: geminiPath.description,
    };
  };

  // Usar solo las rutas de Gemini (generadas por IA)
  const routesData = learningPaths.map((path, index) =>
    convertToRouteData(path, index)
  );

  // Datos para gráficas
  const circularData = routesData.map((route) => ({
    name: route.title.split(" ").slice(0, 2).join(" "),
    value: route.completedModules,
    progress: route.progress,
  }));

  const barData = routesData.map((route) => ({
    name: route.title.split(" ").slice(0, 2).join(" "),
    hours: route.weeklyTime,
  }));

  const lineData = [
    { value: 15 },
    { value: 22 },
    { value: 28 },
    { value: 35 },
    { value: 41 },
    { value: 48 },
    { value: 56 },
  ];

  const selectedRouteLineData = [
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 3 },
    { value: 5 },
    { value: 4 },
    { value: 6 },
  ];

  const tabs = [
    { id: "general", name: "Dashboard General", icon: "📊" },
    { id: "routes", name: "Mis Rutas", icon: "🎯" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">
            ¡Hola {user?.firstName || "Edgar"}! 👋
          </h1>
          <p className="text-slate-400">
            Aquí tienes un resumen de tu progreso de aprendizaje
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(
                    routesData.reduce((sum, route) => sum + route.progress, 0) /
                      routesData.length
                  )}
                  %
                </div>
                <div className="text-sm text-slate-400">Progreso Total</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {routesData.reduce(
                    (sum, route) => sum + route.completedModules,
                    0
                  )}
                </div>
                <div className="text-sm text-slate-400">
                  Módulos Completados
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {routesData.reduce((sum, route) => sum + route.weeklyTime, 0)}
                  h
                </div>
                <div className="text-sm text-slate-400">Horas/Semana</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {Math.max(...routesData.map((route) => route.streak))}
                </div>
                <div className="text-sm text-slate-400">Mejor Racha</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-green-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard General */}
        {activeTab === "general" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gráfica circular */}
              <SimpleCircularChart
                data={circularData}
                title="📊 Progreso por Rutas"
              />

              {/* Gráfica de barras */}
              <SimpleBarChart
                data={barData}
                title="⏰ Tiempo de Estudio Semanal"
              />
            </div>

            {/* Gráfica de línea */}
            <SimpleLineChart
              data={lineData}
              title="📈 Evolución del Aprendizaje General"
            />
          </div>
        )}

        {/* Dashboard por Rutas */}
        {activeTab === "routes" && (
          <div className="space-y-8">
            {/* Estadísticas de rutas de Gemini */}
            {routesData.length > 0 && (
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Rutas Personalizadas con IA
                    </h3>
                    <p className="text-purple-300 text-sm">
                      Generadas especialmente para ti
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {routesData.length}
                    </div>
                    <div className="text-sm text-slate-300">
                      Rutas IA Creadas
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round(
                        routesData.reduce(
                          (sum, route) => sum + route.progress,
                          0
                        ) / routesData.length
                      ) || 0}
                      %
                    </div>
                    <div className="text-sm text-slate-300">
                      Progreso Promedio
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      {routesData.reduce(
                        (sum, route) => sum + route.completedModules,
                        0
                      )}
                    </div>
                    <div className="text-sm text-slate-300">
                      Módulos Completados
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje para crear primera ruta */}
            {learningPaths.length === 0 && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  ¡Crea tu primera ruta personalizada!
                </h3>
                <p className="text-slate-400 mb-6">
                  Completa nuestro quiz inteligente y deja que la IA genere una
                  ruta de aprendizaje perfecta para ti
                </p>
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <span>✨</span>
                  Crear mi ruta con IA
                </Link>
              </div>
            )}

            {/* Selector de rutas */}
            {routesData.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-white">
                  Selecciona una ruta para ver detalles
                  {routesData.length > 0 && (
                    <span className="text-sm font-normal text-purple-400 ml-2">
                      ({routesData.length} personalizadas con IA)
                    </span>
                  )}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {routesData.map((route, index) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      isSelected={selectedRoute === index}
                      onClick={() => setSelectedRoute(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Detalles de la ruta seleccionada */}
            {routesData.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Información detallada */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={routesData[selectedRoute].avatar}
                      alt={routesData[selectedRoute].title}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {routesData[selectedRoute].title}
                      </h3>
                      <p className="text-slate-400">
                        {routesData[selectedRoute].completedModules} de{" "}
                        {routesData[selectedRoute].totalModules} módulos
                        completados
                      </p>
                      {routesData[selectedRoute].isFromGemini && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                            ✨ Ruta Personalizada con IA
                          </span>
                          {routesData[selectedRoute].difficulty && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                routesData[
                                  selectedRoute
                                ].difficulty.toLowerCase() === "principiante"
                                  ? "bg-green-500/20 text-green-400"
                                  : routesData[
                                      selectedRoute
                                    ].difficulty.toLowerCase() === "intermedio"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {routesData[selectedRoute].difficulty}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Información específica de rutas de Gemini */}
                  {routesData[selectedRoute].isFromGemini && (
                    <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                        <span>🎯</span>
                        Detalles de tu ruta personalizada
                      </h4>

                      {routesData[selectedRoute].description && (
                        <p className="text-sm text-slate-300 mb-3">
                          {routesData[selectedRoute].description}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {routesData[selectedRoute].subjects &&
                          routesData[selectedRoute].subjects.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-slate-400 mb-2">
                                Materias de interés:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {routesData[selectedRoute].subjects.map(
                                  (subject, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded"
                                    >
                                      {subject}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {routesData[selectedRoute].skills &&
                          routesData[selectedRoute].skills.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-slate-400 mb-2">
                                Habilidades a desarrollar:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {routesData[selectedRoute].skills
                                  .slice(0, 3)
                                  .map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                {routesData[selectedRoute].skills.length >
                                  3 && (
                                  <span className="text-xs text-slate-400">
                                    +
                                    {routesData[selectedRoute].skills.length -
                                      3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                      </div>

                      {routesData[selectedRoute].careerPaths &&
                        routesData[selectedRoute].careerPaths.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-slate-400 mb-2">
                              Carreras relacionadas:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {routesData[selectedRoute].careerPaths
                                .slice(0, 2)
                                .map((career, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded"
                                  >
                                    {career}
                                  </span>
                                ))}
                              {routesData[selectedRoute].careerPaths.length >
                                2 && (
                                <span className="text-xs text-slate-400">
                                  +
                                  {routesData[selectedRoute].careerPaths
                                    .length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                  {/* Progreso detallado */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Progreso General</span>
                        <span className="text-green-400 font-medium">
                          {Math.round(
                            (routesData[selectedRoute].completedModules /
                              routesData[selectedRoute].totalModules) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000"
                          style={{
                            width: `${
                              (routesData[selectedRoute].completedModules /
                                routesData[selectedRoute].totalModules) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Próximos módulos */}
                    <div>
                      <h4 className="font-semibold mb-3 text-white">
                        🎯 Próximos módulos
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                          <span className="text-sm text-white">
                            Álgebra Lineal - Matrices
                          </span>
                          <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                            Siguiente
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                          <span className="text-sm text-white">
                            Sistemas de Ecuaciones
                          </span>
                          <span className="text-xs text-slate-400">
                            Después
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparativo visual */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 text-white">
                    📋 Estado de Módulos
                  </h3>

                  <div className="space-y-6">
                    {/* Gráfico comparativo */}
                    <div>
                      <div className="flex h-12 rounded-lg overflow-hidden mb-4">
                        <div
                          className="bg-green-500 flex items-center justify-center text-sm font-bold text-white transition-all duration-1000"
                          style={{
                            width: `${
                              (routesData[selectedRoute].completedModules /
                                routesData[selectedRoute].totalModules) *
                              100
                            }%`,
                          }}
                        >
                          Completados:{" "}
                          {routesData[selectedRoute].completedModules}
                        </div>
                        <div
                          className="bg-slate-600 flex items-center justify-center text-sm font-bold text-white transition-all duration-1000"
                          style={{
                            width: `${
                              ((routesData[selectedRoute].totalModules -
                                routesData[selectedRoute].completedModules) /
                                routesData[selectedRoute].totalModules) *
                              100
                            }%`,
                          }}
                        >
                          Pendientes:{" "}
                          {routesData[selectedRoute].totalModules -
                            routesData[selectedRoute].completedModules}
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-slate-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-400">
                          {routesData[selectedRoute].weeklyTime}
                        </div>
                        <div className="text-sm text-slate-400">
                          Horas/Semana
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">
                          {routesData[selectedRoute].streak}
                        </div>
                        <div className="text-sm text-slate-400">
                          Días Seguidos
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-400">
                          {routesData[selectedRoute].avgScore}%
                        </div>
                        <div className="text-sm text-slate-400">Promedio</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progreso semanal de la ruta */}
                <SimpleLineChart
                  data={selectedRouteLineData}
                  title={`📈 Progreso Semanal - ${routesData[selectedRoute].title}`}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
