import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield, 
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Globe,
  Brain
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Ascendia</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors">
                Beneficios
              </a>
              <a href="#accesibilidad" className="text-gray-300 hover:text-white transition-colors">
                Accesibilidad
              </a>
              <a href="#becas" className="text-gray-300 hover:text-white transition-colors">
                Becas
              </a>
              <a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">
                ¿Cómo funciona?
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-green-400">
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Registrarse gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
            🚀 Tu futuro profesional comienza aquí
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Descubre tu camino
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              hacia el éxito
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Una plataforma educacional inteligente que te ayuda a elegir tu carrera universitaria 
            y acceder a recursos gratuitos de alta calidad. Sin importar tu situación económica, 
            tu futuro profesional está a tu alcance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg">
                Comenzar gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg">
              Ver demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">15,000+</div>
              <div className="text-gray-400">Estudiantes activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-400">Recursos gratuitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-400">Satisfacción estudiantil</div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">¿Por qué elegir Ascendia?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubre las ventajas que te ayudarán a tomar las mejores decisiones para tu futuro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-white">IA Personalizada</CardTitle>
                <CardDescription className="text-gray-300">
                  Nuestro asistente de IA analiza tus preferencias y te recomienda las mejores rutas de aprendizaje
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Rutas Adaptativas</CardTitle>
                <CardDescription className="text-gray-300">
                  Caminos de aprendizaje que se adaptan a tu ritmo, disponibilidad y objetivos específicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Comunidad Global</CardTitle>
                <CardDescription className="text-gray-300">
                  Conecta con estudiantes de todo el mundo y comparte experiencias de aprendizaje
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Aprendizaje Rápido</CardTitle>
                <CardDescription className="text-gray-300">
                  Metodologías probadas que aceleran tu proceso de aprendizaje y retención
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-red-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-400" />
                </div>
                <CardTitle className="text-white">Contenido Verificado</CardTitle>
                <CardDescription className="text-gray-300">
                  Todos nuestros recursos son revisados por expertos en la industria
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-pink-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">Soporte 24/7</CardTitle>
                <CardDescription className="text-gray-300">
                  Nuestro equipo está disponible para ayudarte en cada paso de tu journey
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Accesibilidad Section */}
      <section id="accesibilidad" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
                🌍 Educación para todos
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Accesibilidad sin
                <span className="text-blue-400"> barreras</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Creemos que la educación de calidad debe estar al alcance de todos, 
                sin importar su situación económica o ubicación geográfica.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">100% gratuito para estudiantes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Disponible en múltiples idiomas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Funciona con conexión limitada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Compatible con dispositivos básicos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Horarios flexibles de estudio</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30">
                <Globe className="h-16 w-16 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Alcance Global</h3>
                <p className="text-gray-300 mb-6">
                  Ya estamos presentes en más de 25 países, democratizando el acceso 
                  a la educación superior y profesional.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">25+</div>
                    <div className="text-sm text-gray-400">Países</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">12</div>
                    <div className="text-sm text-gray-400">Idiomas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Becas Section */}
      <section id="becas" className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              💰 Oportunidades de financiamiento
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Programa de Becas
              <span className="text-yellow-400"> Ascendia</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No dejes que los recursos económicos limiten tu potencial. 
              Ofrecemos múltiples opciones de becas y financiamiento para tu educación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-400" />
                </div>
                <CardTitle className="text-white text-xl">Beca Excelencia</CardTitle>
                <CardDescription className="text-gray-300">
                  Para estudiantes con rendimiento académico sobresaliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-yellow-400">100%</div>
                  <div className="text-sm text-gray-400">Cobertura total</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Acceso a todos los cursos premium</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Mentoría personalizada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Certificaciones oficiales</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:border-blue-400 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">Beca Social</CardTitle>
                <CardDescription className="text-gray-300">
                  Basada en necesidades económicas y potencial de crecimiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-400">75%</div>
                  <div className="text-sm text-gray-400">Cobertura parcial</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Recursos de aprendizaje</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Sesiones de tutoría grupal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Red de contactos profesionales</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30 hover:border-green-400 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-white text-xl">Beca Emprendimiento</CardTitle>
                <CardDescription className="text-gray-300">
                  Para futuros emprendedores con proyectos innovadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-400">50%</div>
                  <div className="text-sm text-gray-400">+ Mentoría</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Cursos de business</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Red de inversionistas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Incubadora de startups</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/register">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
                Aplicar a becas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu futuro profesional
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                comienza hoy
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a miles de estudiantes que ya están construyendo su camino hacia el éxito. 
              Es gratis, es fácil y puede cambiar tu vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                  Comenzar mi journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg">
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Ascendia</span>
              </div>
              <p className="text-gray-400">
                Democratizando el acceso a la educación superior y profesional para jóvenes de todo el mundo.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rutas de aprendizaje</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recursos gratuitos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidad</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Becas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ascendia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;