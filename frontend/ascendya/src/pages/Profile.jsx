import { useState } from 'react';
import { Link } from 'react-router-dom';
import userStore from '../store/userStore';

function Profile() {
  const [activeTab, setActiveTab] = useState('cursos');
  const { user } = userStore();

  // Datos del perfil
  const profileData = {
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Edgar Cervantes Cruz',
    username: user?.username || 'edcruzw',
    email: user?.email || 'edgar@ascendia.com',
    country: 'México',
    flag: '🇲🇽',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Im on track for learning more about Cybersecurity, Artificial Intelligence, Data Base and Frontend.',
    linkedin: 'https://www.linkedin.com/in/edcruztw/',
    stats: {
      points: 998,
      questions: 0,
      answers: 0
    },
    joinDate: '2024-01-15',
    location: user?.state || 'Puebla, México'
  };

  // Cursos del usuario
  const userCourses = [
    {
      id: 1,
      title: 'Curso Práctico de Frontend Developer',
      icon: '💻',
      iconColor: 'bg-yellow-500',
      progress: 70,
      materialsCompleted: 22,
      totalMaterials: 22,
      status: 'aprobado',
      actionText: 'Presenta el examen',
      actionColor: 'bg-green-500 hover:bg-green-600',
      certificate: false
    },
    {
      id: 2,
      title: 'Laboratorio de JavaScript: Crea tu App de Filtros y Detección de Rostros',
      icon: '🔬',
      iconColor: 'bg-green-500',
      progress: 28,
      materialsCompleted: 2,
      totalMaterials: 5,
      status: 'aprobado',
      actionText: 'Continúa el curso',
      actionColor: 'bg-blue-500 hover:bg-blue-600',
      certificate: false
    },
    {
      id: 3,
      title: 'Curso de Pensamiento Lógico: Lenguajes de Programación',
      icon: '🧠',
      iconColor: 'bg-green-600',
      progress: 16,
      materialsCompleted: 4,
      totalMaterials: 17,
      status: 'aprobado',
      actionText: 'Continúa el curso',
      actionColor: 'bg-blue-500 hover:bg-blue-600',
      certificate: false
    },
    {
      id: 4,
      title: 'Curso de Inglés Básico A1 para Principiantes',
      icon: '🗣️',
      iconColor: 'bg-purple-500',
      progress: 100,
      materialsCompleted: 15,
      totalMaterials: 15,
      status: 'completado',
      actionText: 'Descarga tu certificado',
      actionColor: 'bg-green-500 hover:bg-green-600',
      certificate: true,
      note: 'Felicidades por aprobar el curso'
    },
    {
      id: 5,
      title: 'Curso de N8N',
      icon: '⚡',
      iconColor: 'bg-slate-600',
      progress: 100,
      materialsCompleted: 8,
      totalMaterials: 8,
      status: 'completado',
      actionText: 'Descarga tu certificado',
      actionColor: 'bg-green-500 hover:bg-green-600',
      certificate: true
    }
  ];

  const tabs = [
    { id: 'cursos', name: 'Mis Cursos' },
    { id: 'portafolio', name: 'Mi Portafolio' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completado': return 'text-green-400';
      case 'aprobado': return 'text-blue-400';
      case 'en_progreso': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const downloadCertificate = (courseTitle) => {
    alert(`Descargando certificado de: ${courseTitle}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header del perfil */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Info principal del usuario */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.name}
                    className="w-32 h-32 rounded-full border-4 border-slate-700"
                  />
                  <div className="text-center mt-3">
                    <Link 
  to="/EditProfile"
  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
>
  Editar perfil
</Link>
                  </div>
                </div>

                {/* Info del usuario */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    {profileData.name} 
                    <span className="text-2xl">{profileData.flag}</span>
                  </h1>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {profileData.bio}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <a 
                      href={profileData.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      {profileData.linkedin}
                    </a>
                  </div>

                  <div className="text-sm text-slate-400">
                    <p>📍 {profileData.location}</p>
                    <p>📅 Miembro desde {new Date(profileData.joinDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-400 text-green-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {activeTab === 'cursos' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Tus cursos</h2>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Los materiales de cada curso equivalen a un 70% del total, mientras que el examen comprende el 
                    otro 30%. Puedes tomar el examen en cualquier momento cuando estés listo.
                  </p>
                </div>

                <div className="space-y-6">
                  {userCourses.map((course) => (
                    <div key={course.id} className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:shadow-2xl hover:border-slate-600 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        
                        {/* Icono del curso */}
                        <div className={`w-16 h-16 ${course.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-2xl text-white">{course.icon}</span>
                        </div>

                        {/* Contenido del curso */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                            {course.title}
                          </h3>

                          {/* Progreso */}
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-2xl font-bold text-white">
                              {course.progress}%
                            </span>
                            <div className="flex-1">
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Materiales */}
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-300">
                              <span className="font-medium">
                                {course.materialsCompleted}/{course.totalMaterials} Materiales
                              </span>
                              <span className={`ml-4 ${getStatusColor(course.status)}`}>
                                {course.status}
                              </span>
                            </div>

                            {/* Botón de acción */}
                            <button
                              onClick={() => {
                                if (course.certificate) {
                                  downloadCertificate(course.title);
                                } else {
                                  // Redirigir al curso
                                  console.log(`Continuar curso: ${course.title}`);
                                }
                              }}
                              className={`${course.actionColor} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105`}
                            >
                              {course.certificate && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                              {course.actionText}
                            </button>
                          </div>

                          {/* Nota especial */}
                          {course.note && (
                            <div className="mt-3 text-sm text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-2 rounded-lg">
                              ✨ {course.note}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portafolio' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Mi Portafolio</h2>
                
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Aún no has creado proyectos
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Comparte tus proyectos y muestra tu progreso como desarrollador
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Crear mi primer proyecto
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tutoriales */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Tutoriales</h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📹</div>
                <p className="text-slate-400 text-sm mb-3">
                  Aún no has creado tutoriales
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Comparte tus conocimientos. Tus tutoriales pueden ser parte de los cursos y llegar a muchas personas.
                </p>
              </div>
            </div>

            {/* Preguntas */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Tus preguntas</h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-3">❓</div>
                <p className="text-slate-400 text-sm mb-3">
                  Aún no has hecho preguntas
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  La comunidad de profesores y estudiantes responderá a todas tus dudas
                </p>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">Completaste "Curso de N8N"</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-300">Continuaste "Frontend Developer"</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-300">Obtuviste 50 puntos nuevos</span>
                </div>
              </div>
            </div>

            {/* Logros */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Logros</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-medium text-green-400">Primer Certificado</div>
                    <div className="text-xs text-green-300">Completaste tu primer curso</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <span className="text-2xl">📚</span>
                  <div>
                    <div className="font-medium text-blue-400">Estudiante Activo</div>
                    <div className="text-xs text-blue-300">Más de 1000 puntos acumulados</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas adicionales */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Cursos completados</span>
                  <span className="text-green-400 font-medium">
                    {userCourses.filter(c => c.status === 'completado').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Cursos en progreso</span>
                  <span className="text-blue-400 font-medium">
                    {userCourses.filter(c => c.status === 'aprobado').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Certificados obtenidos</span>
                  <span className="text-purple-400 font-medium">
                    {userCourses.filter(c => c.certificate).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Progreso promedio</span>
                  <span className="text-yellow-400 font-medium">
                    {Math.round(userCourses.reduce((sum, c) => sum + c.progress, 0) / userCourses.length)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;