import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

function University() {
  const [filters, setFilters] = useState({
    state: 'todos',
    university: 'todas',
    deadline: 'todas',
    area: 'todas'
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Datos de convocatorias universitarias
  const convocatorias = [
    {
      id: 1,
      university: 'Universidad Nacional Autónoma de México (UNAM)',
      shortName: 'UNAM',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
      state: 'Ciudad de México',
      city: 'Ciudad de México',
      areas: ['Ciencias Físico-Matemáticas', 'Ciencias Biológicas', 'Ciencias Sociales', 'Humanidades'],
      examDate: '2025-04-15',
      registrationStart: '2025-02-01',
      registrationEnd: '2025-03-15',
      resultsDate: '2025-05-20',
      cost: 'Gratuito',
      type: 'Pública',
      places: 12500,
      website: 'https://www.dgae.unam.mx',
      requirements: [
        'Certificado de bachillerato',
        'Acta de nacimiento',
        'CURP',
        'Fotografías tamaño infantil'
      ],
      description: 'Convocatoria para ingreso a licenciatura en Ciudad Universitaria y planteles de la UNAM.',
      status: 'Próximamente',
      featured: true
    },
    {
      id: 2,
      university: 'Instituto Politécnico Nacional',
      shortName: 'IPN',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      state: 'Ciudad de México',
      city: 'Ciudad de México',
      areas: ['Ingeniería y Ciencias Físico Matemáticas', 'Ciencias Médico Biológicas', 'Ciencias Sociales y Administrativas'],
      examDate: '2025-04-22',
      registrationStart: '2025-02-15',
      registrationEnd: '2025-03-30',
      resultsDate: '2025-05-25',
      cost: '$350',
      type: 'Pública',
      places: 8500,
      website: 'https://www.ipn.mx',
      requirements: [
        'Certificado de estudios de nivel medio superior',
        'Acta de nacimiento',
        'CURP',
        'Comprobante de pago'
      ],
      description: 'Proceso de admisión para carreras de ingeniería, ciencias médicas y administrativas.',
      status: 'Abierta',
      featured: true
    },
    {
      id: 3,
      university: 'Universidad Autónoma Metropolitana',
      shortName: 'UAM',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
      state: 'Ciudad de México',
      city: 'Ciudad de México',
      areas: ['Ciencias Básicas e Ingeniería', 'Ciencias Biológicas y de la Salud', 'Ciencias Sociales y Humanidades'],
      examDate: '2025-05-10',
      registrationStart: '2025-03-01',
      registrationEnd: '2025-04-15',
      resultsDate: '2025-06-05',
      cost: '$300',
      type: 'Pública',
      places: 6800,
      website: 'https://www.uam.mx',
      requirements: [
        'Certificado de bachillerato',
        'Acta de nacimiento',
        'CURP',
        'Fotografías'
      ],
      description: 'Admisión a las unidades Azcapotzalco, Cuajimalpa, Iztapalapa, Lerma y Xochimilco.',
      status: 'Próximamente',
      featured: false
    },
    {
      id: 4,
      university: 'Tecnológico de Monterrey',
      shortName: 'TEC',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop',
      state: 'Nuevo León',
      city: 'Monterrey',
      areas: ['Ingeniería y Tecnología', 'Negocios', 'Ciencias Sociales', 'Arquitectura y Diseño'],
      examDate: '2025-03-20',
      registrationStart: '2025-01-15',
      registrationEnd: '2025-03-05',
      resultsDate: '2025-04-10',
      cost: '$1,200',
      type: 'Privada',
      places: 15000,
      website: 'https://tec.mx',
      requirements: [
        'Certificado de preparatoria',
        'Examen de admisión',
        'Entrevista personal',
        'Documentos oficiales'
      ],
      description: 'Proceso de admisión para todos los campus del Tecnológico de Monterrey.',
      status: 'Abierta',
      featured: true
    },
    {
      id: 5,
      university: 'Universidad de Guadalajara',
      shortName: 'UDG',
      logo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop',
      state: 'Jalisco',
      city: 'Guadalajara',
      areas: ['Ciencias Exactas e Ingenierías', 'Ciencias Biológicas', 'Ciencias Sociales', 'Arte y Cultura'],
      examDate: '2025-04-28',
      registrationStart: '2025-02-20',
      registrationEnd: '2025-04-10',
      resultsDate: '2025-05-30',
      cost: '$250',
      type: 'Pública',
      places: 9200,
      website: 'https://www.udg.mx',
      requirements: [
        'Certificado de bachillerato',
        'Acta de nacimiento',
        'CURP',
        'Comprobante de domicilio'
      ],
      description: 'Convocatoria para centros universitarios de la Universidad de Guadalajara.',
      status: 'Próximamente',
      featured: false
    },
    {
      id: 6,
      university: 'Universidad Autónoma de Nuevo León',
      shortName: 'UANL',
      logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop',
      state: 'Nuevo León',
      city: 'Monterrey',
      areas: ['Ciencias Exactas', 'Ciencias de la Salud', 'Ciencias Sociales', 'Ingeniería'],
      examDate: '2025-05-15',
      registrationStart: '2025-03-10',
      registrationEnd: '2025-04-25',
      resultsDate: '2025-06-15',
      cost: '$400',
      type: 'Pública',
      places: 7500,
      website: 'https://www.uanl.mx',
      requirements: [
        'Certificado de estudios de preparatoria',
        'Acta de nacimiento',
        'CURP',
        'Fotografías tamaño infantil'
      ],
      description: 'Proceso de selección para facultades de la Universidad Autónoma de Nuevo León.',
      status: 'Próximamente',
      featured: false
    },
    {
      id: 7,
      university: 'Benemérita Universidad Autónoma de Puebla',
      shortName: 'BUAP',
      logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100&h=100&fit=crop',
      state: 'Puebla',
      city: 'Puebla',
      areas: ['Ingeniería', 'Ciencias Químicas', 'Ciencias de la Computación', 'Medicina'],
      examDate: '2025-04-08',
      registrationStart: '2025-02-05',
      registrationEnd: '2025-03-20',
      resultsDate: '2025-05-10',
      cost: '$200',
      type: 'Pública',
      places: 5800,
      website: 'https://www.buap.mx',
      requirements: [
        'Certificado de bachillerato',
        'Acta de nacimiento',
        'CURP',
        'Examen médico'
      ],
      description: 'Convocatoria de admisión para licenciaturas en Ciudad Universitaria BUAP.',
      status: 'Abierta',
      featured: false
    },
    {
      id: 8,
      university: 'Universidad Iberoamericana',
      shortName: 'IBERO',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop',
      state: 'Ciudad de México',
      city: 'Ciudad de México',
      areas: ['Ingeniería', 'Negocios', 'Comunicación', 'Psicología'],
      examDate: '2025-03-25',
      registrationStart: '2025-01-20',
      registrationEnd: '2025-03-10',
      resultsDate: '2025-04-15',
      cost: '$1,500',
      type: 'Privada',
      places: 3500,
      website: 'https://ibero.mx',
      requirements: [
        'Certificado de preparatoria',
        'Examen de admisión',
        'Ensayo personal',
        'Entrevista'
      ],
      description: 'Proceso de admisión para carreras profesionales en Universidad Iberoamericana.',
      status: 'Abierta',
      featured: false
    }
  ];

  // Estados únicos
  const states = ['todos', ...new Set(convocatorias.map(conv => conv.state))];
  
  // Universidades únicas
  const universities = ['todas', ...new Set(convocatorias.map(conv => conv.shortName))];
  
  // Áreas únicas
  const areas = ['todas', ...new Set(convocatorias.flatMap(conv => conv.areas))];

  // Filtrar convocatorias
  const filteredConvocatorias = useMemo(() => {
    return convocatorias.filter(conv => {
      const matchesSearch = conv.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conv.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conv.areas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesState = filters.state === 'todos' || conv.state === filters.state;
      const matchesUniversity = filters.university === 'todas' || conv.shortName === filters.university;
      const matchesArea = filters.area === 'todas' || conv.areas.some(area => area === filters.area);
      
      let matchesDeadline = true;
      if (filters.deadline !== 'todas') {
        const regEndDate = new Date(conv.registrationEnd);
        const today = new Date();
        const diffDays = Math.ceil((regEndDate - today) / (1000 * 60 * 60 * 24));
        
        if (filters.deadline === 'urgente' && diffDays > 7) matchesDeadline = false;
        if (filters.deadline === 'proximas' && (diffDays <= 7 || diffDays > 30)) matchesDeadline = false;
        if (filters.deadline === 'futuras' && diffDays <= 30) matchesDeadline = false;
      }
      
      return matchesSearch && matchesState && matchesUniversity && matchesArea && matchesDeadline;
    });
  }, [convocatorias, searchTerm, filters]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Abierta': return 'bg-green-500';
      case 'Próximamente': return 'bg-blue-500';
      case 'Cerrada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            🎓 Convocatorias Universitarias 2024
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Encuentra las mejores oportunidades para continuar tus estudios universitarios
          </p>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {convocatorias.filter(c => c.status === 'Abierta').length}
              </div>
              <div className="text-sm text-slate-400">Convocatorias Abiertas</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {convocatorias.reduce((sum, c) => sum + c.places, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Lugares Disponibles</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {new Set(convocatorias.map(c => c.state)).size}
              </div>
              <div className="text-sm text-slate-400">Estados Disponibles</div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {convocatorias.filter(c => c.type === 'Pública').length}
              </div>
              <div className="text-sm text-slate-400">Universidades Públicas</div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">🔍 Filtros de Búsqueda</h2>
          
          {/* Barra de búsqueda */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar por universidad, ciudad o área de estudio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={filters.state}
                onChange={(e) => setFilters(prev => ({...prev, state: e.target.value}))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state === 'todos' ? 'Todos los estados' : state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Universidad</label>
              <select
                value={filters.university}
                onChange={(e) => setFilters(prev => ({...prev, university: e.target.value}))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {universities.map(uni => (
                  <option key={uni} value={uni}>
                    {uni === 'todas' ? 'Todas las universidades' : uni}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Área de Estudio</label>
              <select
                value={filters.area}
                onChange={(e) => setFilters(prev => ({...prev, area: e.target.value}))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {areas.map(area => (
                  <option key={area} value={area}>
                    {area === 'todas' ? 'Todas las áreas' : area}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fecha Límite</label>
              <select
                value={filters.deadline}
                onChange={(e) => setFilters(prev => ({...prev, deadline: e.target.value}))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="todas">Todas las fechas</option>
                <option value="urgente">Urgentes (≤ 7 días)</option>
                <option value="proximas">Próximas (8-30 días)</option>
                <option value="futuras">Futuras (= 30 días)</option>
              </select>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          <div className="mt-4">
            <button
              onClick={() => {
                setFilters({
                  state: 'todos',
                  university: 'todas',
                  deadline: 'todas',
                  area: 'todas'
                });
                setSearchTerm('');
              }}
              className="text-green-400 hover:text-green-300 text-sm font-medium"
            >
              🔄 Limpiar filtros
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              📋 Convocatorias Disponibles ({filteredConvocatorias.length})
            </h2>
            <div className="text-sm text-slate-400">
              Ordenado por fecha de cierre
            </div>
          </div>
        </div>

        {/* Grid de convocatorias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredConvocatorias.map((conv) => {
            const daysUntilDeadline = getDaysUntilDeadline(conv.registrationEnd);
            const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline >= 0;
            
            return (
              <div 
                key={conv.id} 
                className={`bg-slate-900 border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  conv.featured ? 'border-green-500 ring-1 ring-green-500/20' : 'border-slate-700'
                } ${isUrgent ? 'ring-2 ring-red-500/50' : ''}`}
              >
                {/* Header de la card */}
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={conv.logo} 
                        alt={conv.shortName}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-600"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white line-clamp-2">
                          {conv.university}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-slate-400">📍 {conv.city}, {conv.state}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(conv.status)}`}>
                        {conv.status}
                      </span>
                      {conv.featured && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
                          ⭐ Destacada
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-4">
                    {conv.description}
                  </p>

                  {/* Fechas importantes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">📅 Registro</div>
                      <div className="text-sm font-medium">
                        {formatDate(conv.registrationStart)} - {formatDate(conv.registrationEnd)}
                      </div>
                      {isUrgent && (
                        <div className="text-xs text-red-400 mt-1">
                          ⚠️ Quedan {daysUntilDeadline} días
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">🎯 Examen</div>
                      <div className="text-sm font-medium">
                        {formatDate(conv.examDate)}
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">{conv.places.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Lugares</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">{conv.cost}</div>
                      <div className="text-xs text-slate-400">Costo</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">{conv.type}</div>
                      <div className="text-xs text-slate-400">Tipo</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{conv.areas.length}</div>
                      <div className="text-xs text-slate-400">Áreas</div>
                    </div>
                  </div>
                </div>

                {/* Áreas de estudio */}
                <div className="p-6 border-b border-slate-700">
                  <h4 className="text-sm font-semibold mb-3 text-white">🎓 Áreas de Estudio:</h4>
                  <div className="flex flex-wrap gap-2">
                    {conv.areas.map((area, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requisitos */}
                <div className="p-6 border-b border-slate-700">
                  <h4 className="text-sm font-semibold mb-3 text-white">📋 Requisitos Principales:</h4>
                  <ul className="space-y-1">
                    {conv.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                    {conv.requirements.length > 3 && (
                      <li className="text-xs text-slate-400">
                        + {conv.requirements.length - 3} requisitos más
                      </li>
                    )}
                  </ul>
                </div>

                {/* Footer con acciones */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => window.open(conv.website, '_blank')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      🌐 Sitio Oficial
                    </button>
                    <Link 
                      to={`/university/${conv.id}`}
                      className="flex-1 border border-slate-600 text-white hover:bg-slate-800 px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      📖 Ver Detalles
                    </Link>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-xs text-slate-400">
                      Resultados: {formatDate(conv.resultsDate)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredConvocatorias.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No se encontraron convocatorias</h3>
            <p className="text-slate-400 mb-6">
              Intenta ajustar los filtros o términos de búsqueda
            </p>
            <button
              onClick={() => {
                setFilters({
                  state: 'todos',
                  university: 'todas', 
                  deadline: 'todas',
                  area: 'todas'
                });
                setSearchTerm('');
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        )}

        {/* Footer informativo */}
        <div className="mt-16 bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-4">📚 ¿Necesitas ayuda para prepararte?</h3>
          <p className="text-slate-300 mb-6">
            Descubre nuestros cursos de preparación universitaria diseñados específicamente 
            para los exámenes de admisión de estas universidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/resources"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Ver Cursos de Preparación
            </Link>
            <Link 
              to="/quiz"
              className="border border-slate-600 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Hacer Test Vocacional
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default University;