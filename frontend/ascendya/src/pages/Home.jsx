import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Home() {
  // Referencias para las animaciones
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const beneficiosRef = useRef(null);
  const accesibilidadRef = useRef(null);
  const accesibilidadTextRef = useRef(null);
  const accesibilidadImageRef = useRef(null);
  const finalCtaRef = useRef(null);
  const particlesRef = useRef(null);

  const beneficios = [
    {
      icon: "🧠",
      title: "IA Personalizada",
      description:
        "Nuestro asistente de IA analiza tus preferencias y te recomienda las mejores rutas de aprendizaje",
      color: "from-green-400 to-green-600",
    },
    {
      icon: "📈",
      title: "Rutas Adaptativas",
      description:
        "Caminos de aprendizaje que se adaptan a tu ritmo, disponibilidad y objetivos específicos",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "👥",
      title: "Comunidad Activa",
      description:
        "Conecta con otros estudiantes, mentores y profesionales de tu área de interés",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: "🎯",
      title: "Orientación Profesional",
      description:
        "Descubre las profesiones que mejor se adaptan a tus habilidades y pasiones",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      icon: "⚡",
      title: "Aprendizaje Rápido",
      description:
        "Metodologías probadas que aceleran tu proceso de aprendizaje y retención",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: "🛡️",
      title: "Contenido Verificado",
      description:
        "Todos nuestros recursos son revisados por expertos en la industria",
      color: "from-red-400 to-red-600",
    },
    {
      icon: "💖",
      title: "Soporte 24/7",
      description:
        "Nuestro equipo está disponible para ayudarte en cada paso de tu journey",
      color: "from-pink-400 to-pink-600",
    },
  ];

  // Configurar animaciones básicas
  useEffect(() => {
    // Verificar que las referencias existan
    if (
      !heroRef.current ||
      !badgeRef.current ||
      !titleRef.current ||
      !subtitleRef.current
    ) {
      return;
    }

    // Timeline principal para la entrada del hero
    const tl = gsap.timeline();

    // Animación del badge
    tl.fromTo(
      badgeRef.current,
      {
        scale: 0,
        rotation: -45,
        opacity: 0,
        y: -20,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    // Animación del título
    tl.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Animación del subtítulo
    tl.fromTo(
      subtitleRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animación de los botones CTA si existen
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        {
          y: 25,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // Animaciones de scroll para secciones
    if (beneficiosRef.current && beneficiosRef.current.children) {
      gsap.fromTo(
        beneficiosRef.current.children,
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: beneficiosRef.current,
            start: "top 90%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
            scrub: false,
            markers: false,
            onEnter: () => {
              // Agregar una pequeña vibración al hacer scroll
              gsap.to(beneficiosRef.current, {
                scale: 1.005,
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
              });
            },
          },
        }
      );
    }

    // Animación para la sección de accesibilidad
    if (accesibilidadTextRef.current && accesibilidadImageRef.current) {
      gsap.fromTo(
        accesibilidadTextRef.current,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accesibilidadRef.current,
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        accesibilidadImageRef.current,
        {
          x: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accesibilidadRef.current,
            start: "top 85%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
            onUpdate: (self) => {
              // Efecto parallax sutil en la imagen
              const progress = self.progress;
              gsap.to(accesibilidadImageRef.current, {
                y: progress * -10,
                duration: 0.3,
                ease: "none",
              });
            },
          },
        }
      );
    }

    // Animación para el CTA final
    if (finalCtaRef.current && finalCtaRef.current.children) {
      gsap.fromTo(
        finalCtaRef.current.children,
        {
          y: 40,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: finalCtaRef.current,
            start: "top 85%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleBeneficioHover = (e, isEntering) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".benefit-icon");

    if (isEntering) {
      gsap.to(card, {
        scale: 1.03,
        y: -5,
        borderColor: "#10b981",
        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1.1,
        rotate: 5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        borderColor: "#475569",
        boxShadow: "0 0 0 rgba(16, 185, 129, 0)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0"
      ></div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 z-10"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge animado */}
          <div
            ref={badgeRef}
            className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium mb-8"
          >
            ✨ Plataforma educativa del futuro
          </div>

          {/* Título principal */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Tu futuro profesional
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              comienza aquí
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Descubre tu camino ideal hacia la educación superior con IA
            personalizada, rutas de aprendizaje adaptativas y una comunidad que
            te apoya en cada paso.
          </p>

          {/* Botones CTA */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Comenzar mi journey
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

      {/* Beneficios Section */}
      <section className="py-20 px-4 bg-slate-900/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué elegir Ascendia?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Descubre las ventajas que te ayudarán a tomar las mejores
              decisiones para tu futuro
            </p>
          </div>

          <div
            ref={beneficiosRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 transition-all duration-300 group cursor-pointer"
                onMouseEnter={(e) => handleBeneficioHover(e, true)}
                onMouseLeave={(e) => handleBeneficioHover(e, false)}
              >
                <div
                  className={`benefit-icon w-16 h-16 bg-gradient-to-r ${beneficio.color} rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300`}
                >
                  {beneficio.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {beneficio.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {beneficio.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accesibilidad Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div
            ref={accesibilidadRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div ref={accesibilidadTextRef}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                🌍 Educación para todos
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Accesibilidad sin
                <span className="text-blue-400"> barreras</span>
              </h2>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Creemos que la educación de calidad debe estar al alcance de
                todos, sin importar su situación económica o ubicación
                geográfica.
              </p>

              <div className="space-y-4">
                {[
                  "100% gratuito para estudiantes",
                  "Disponible en múltiples idiomas",
                  "Funciona con conexión limitada",
                  "Compatible con dispositivos básicos",
                  "Horarios flexibles de estudio",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
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
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={accesibilidadImageRef} className="relative">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30">
                <div className="text-6xl mb-6">🌐</div>
                <h3 className="text-2xl font-bold mb-4">Alcance Global</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Ya estamos presentes en más de 25 países, democratizando el
                  acceso a la educación superior y profesional.
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
      <section className="py-20 px-4 bg-slate-900/50 relative z-10">
        <div ref={finalCtaRef} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Tu futuro profesional
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              comienza hoy
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Únete a miles de estudiantes que ya están construyendo su camino
            hacia el éxito. Es gratis, es fácil y puede cambiar tu vida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Comenzar mi journey
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
                  <svg
                    className="w-6 h-6 text-white"
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
                <span className="text-xl font-bold">Ascendia</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Democratizando el acceso a la educación superior y profesional
                para jóvenes de todo el mundo.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Plataforma</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rutas de aprendizaje
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Recursos gratuitos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Comunidad
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Becas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
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
