import { Link } from 'react-router-dom';

function Home() {
  const beneficios = [
    {
      icon: '🧠',
      title: 'IA Personalizada',
      description: 'Nuestro asistente de IA analiza tus preferencias y te recomienda las mejores rutas de aprendizaje',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: '📈',
      title: 'Rutas Adaptativas',
      description: 'Caminos de aprendizaje que se adaptan a tu ritmo, disponibilidad y objetivos específicos',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '👥',
      title: 'Comunidad Global',
      description: 'Conecta con estudiantes de todo el mundo y comparte experiencias de aprendizaje',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: '⚡',
      title: 'Aprendizaje Rápido',
      description: 'Metodologías probadas que aceleran tu proceso de aprendizaje y retención',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: '🛡️',
      title: 'Contenido Verificado',
      description: 'Todos nuestros recursos son revisados por expertos en la industria',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: '💖',
      title: 'Soporte 24/7',
      description: 'Nuestro equipo está disponible para ayudarte en cada paso de tu journey',
      color: 'from-pink-400 to-pink-600'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium mb-8">
            🚀 Tu futuro profesional comienza aquí
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Descubre tu camino
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              hacia el éxito
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            Una plataforma educacional inteligente que te ayuda a elegir tu carrera universitaria 
            y acceder a recursos gratuitos de alta calidad. Sin importar tu situación económica, 
            tu futuro profesional está a tu alcance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Comenzar gratis
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300">
              Ver demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">15,000+</div>
              <div className="text-slate-400">Estudiantes activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-slate-400">Recursos gratuitos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-slate-400">Satisfacción estudiantil</div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Por qué elegir Ascendia?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Descubre las ventajas que te ayudarán a tomar las mejores decisiones para tu futuro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${beneficio.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {beneficio.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{beneficio.title}</h3>
                <p className="text-slate-300 leading-relaxed">{beneficio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accesibilidad Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                🌍 Educación para todos
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Accesibilidad sin
                <span className="text-blue-400"> barreras</span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Creemos que la educación de calidad debe estar al alcance de todos, 
                sin importar su situación económica o ubicación geográfica.
              </p>

              <div className="space-y-4">
                {[
                  '100% gratuito para estudiantes',
                  'Disponible en múltiples idiomas',
                  'Funciona con conexión limitada',
                  'Compatible con dispositivos básicos',
                  'Horarios flexibles de estudio'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30">
                <div className="text-6xl mb-6">🌐</div>
                <h3 className="text-2xl font-bold mb-4">Alcance Global</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Ya estamos presentes en más de 25 países, democratizando el acceso 
                  a la educación superior y profesional.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">25+</div>
                    <div className="text-sm text-slate-400">Países</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">12</div>
                    <div className="text-sm text-slate-400">Idiomas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Tu futuro profesional
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              comienza hoy
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Únete a miles de estudiantes que ya están construyendo su camino hacia el éxito. 
            Es gratis, es fácil y puede cambiar tu vida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Comenzar mi journey
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Ascendia</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Democratizando el acceso a la educación superior y profesional para jóvenes de todo el mundo.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Plataforma</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rutas de aprendizaje</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recursos gratuitos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidad</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Becas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Ascendia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;