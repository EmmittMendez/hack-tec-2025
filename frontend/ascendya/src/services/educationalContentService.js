// Educational Content Service
// Para obtener cursos y recursos educativos de múltiples fuentes

import youtubeService from "./youtubeService.js";

class EducationalContentService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 60 * 60 * 1000; // 1 hora
  }

  // Obtener cursos recomendados basados en las rutas del usuario
  async getRecommendedCourses(learningPaths, limit = 8) {
    const cacheKey = `courses_${JSON.stringify(
      learningPaths.map((p) => p.id)
    )}_${limit}`;

    // Verificar cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const courses = [];

      // Si hay rutas de aprendizaje, generar cursos basados en ellas
      if (learningPaths && learningPaths.length > 0) {
        for (const path of learningPaths) {
          const pathCourses = this.generateCoursesFromPath(path);
          courses.push(...pathCourses);
        }
      }

      // Si no hay suficientes cursos, agregar cursos generales
      if (courses.length < limit) {
        const generalCourses = this.getGeneralCourses();
        courses.push(...generalCourses);
      }

      // Remover duplicados y limitar
      const uniqueCourses = this.removeDuplicates(courses);
      const limitedCourses = uniqueCourses.slice(0, limit);

      // Guardar en cache
      this.cache.set(cacheKey, {
        data: limitedCourses,
        timestamp: Date.now(),
      });

      return limitedCourses;
    } catch (error) {
      console.error("Error getting recommended courses:", error);
      return this.getGeneralCourses().slice(0, limit);
    }
  }

  // Generar cursos basados en una ruta de aprendizaje
  generateCoursesFromPath(path) {
    const courses = [];
    const subjects = this.extractSubjects(path);
    const difficulty = path.difficulty || path.level || "Intermedio";
    const university = this.determineUniversity(path);

    subjects.forEach((subject, index) => {
      const course = {
        id: `${path.id}-course-${index}`,
        title: this.generateCourseTitle(subject, difficulty),
        instructor: this.generateInstructor(subject),
        rating: this.generateRating(),
        thumbnail: this.getThumbnailForSubject(subject),
        category: subject,
        level: difficulty,
        duration: this.generateDuration(),
        university: university,
        description: this.generateDescription(subject, difficulty),
        isFromUserPath: true,
        pathId: path.id,
        pathTitle: path.title,
      };
      courses.push(course);
    });

    return courses;
  }

  // Extraer materias de una ruta de aprendizaje
  extractSubjects(path) {
    const subjects = new Set();

    // De interests
    if (path.interests) {
      const interests = path.interests.split(", ");
      interests.forEach((interest) => {
        const mappedSubject = this.mapInterestToSubject(interest.trim());
        subjects.add(mappedSubject);
      });
    }

    // De subjects array
    if (path.subjects && Array.isArray(path.subjects)) {
      path.subjects.forEach((subject) => subjects.add(subject));
    }

    // Del título
    const titleSubjects = this.extractSubjectsFromTitle(path.title || "");
    titleSubjects.forEach((subject) => subjects.add(subject));

    return Array.from(subjects).slice(0, 3); // Máximo 3 materias por ruta
  }

  // Mapear intereses a materias académicas
  mapInterestToSubject(interest) {
    const mapping = {
      matemáticas: "Matemáticas",
      matematicas: "Matemáticas",
      algebra: "Matemáticas",
      cálculo: "Matemáticas",
      calculo: "Matemáticas",
      geometría: "Matemáticas",
      geometria: "Matemáticas",
      física: "Física",
      fisica: "Física",
      mecánica: "Física",
      mecanica: "Física",
      química: "Química",
      quimica: "Química",
      biología: "Biología",
      biologia: "Biología",
      historia: "Historia",
      literatura: "Literatura",
      inglés: "Inglés",
      ingles: "Inglés",
      programación: "Programación",
      programacion: "Programación",
      ciencias: "Ciencias Naturales",
      humanidades: "Humanidades",
    };

    const lowerInterest = interest.toLowerCase();
    return mapping[lowerInterest] || interest;
  }

  // Extraer materias del título
  extractSubjectsFromTitle(title) {
    const subjects = [];
    const titleLower = title.toLowerCase();

    const subjectKeywords = {
      Matemáticas: [
        "matemática",
        "álgebra",
        "cálculo",
        "geometría",
        "trigonometría",
        "estadística",
      ],
      Física: [
        "física",
        "mecánica",
        "óptica",
        "termodinámica",
        "electromagnetismo",
      ],
      Química: ["química", "orgánica", "inorgánica", "bioquímica"],
      Biología: ["biología", "anatomía", "genética", "ecología", "medicina"],
      Historia: ["historia", "civilización", "cultura", "sociedad"],
      Literatura: ["literatura", "lengua", "español", "redacción"],
      Inglés: ["inglés", "english", "idioma"],
      Programación: ["programación", "software", "computación", "informática"],
    };

    for (const [subject, keywords] of Object.entries(subjectKeywords)) {
      if (keywords.some((keyword) => titleLower.includes(keyword))) {
        subjects.push(subject);
      }
    }

    return subjects;
  }

  // Generar título de curso
  generateCourseTitle(subject, difficulty) {
    const templates = {
      Básico: [
        `Introducción a ${subject}`,
        `Fundamentos de ${subject}`,
        `${subject} para Principiantes`,
      ],
      Intermedio: [
        `${subject} Universitario`,
        `Curso Completo de ${subject}`,
        `${subject} Aplicado`,
      ],
      Avanzado: [
        `${subject} Avanzado`,
        `Especialización en ${subject}`,
        `${subject} para Profesionales`,
      ],
    };

    const levelTemplates = templates[difficulty] || templates["Intermedio"];
    const randomTemplate =
      levelTemplates[Math.floor(Math.random() * levelTemplates.length)];

    return randomTemplate;
  }

  // Generar instructor
  generateInstructor(subject) {
    const instructors = {
      Matemáticas: [
        "Dr. Carlos Mendoza",
        "Dra. Ana Rodríguez",
        "Prof. Luis García",
      ],
      Física: ["Dr. Roberto Silva", "Dra. Carmen López", "Prof. Miguel Torres"],
      Química: [
        "Dra. Elena Martínez",
        "Dr. Andrés Vega",
        "Prof. Sofia Herrera",
      ],
      Biología: [
        "Dr. Fernando Castro",
        "Dra. Isabel Ruiz",
        "Prof. Diego Morales",
      ],
      Historia: [
        "Dr. Ricardo Paz",
        "Dra. Laura Jiménez",
        "Prof. Carlos Sánchez",
      ],
      Literatura: [
        "Dra. Patricia Ramos",
        "Prof. Alejandro Núñez",
        "Lic. María González",
      ],
      Inglés: [
        "Prof. Jennifer Smith",
        "Lic. Michael Johnson",
        "Dra. Sarah Williams",
      ],
      Programación: [
        "Ing. David López",
        "Dr. Ana Castillo",
        "Prof. Javier Moreno",
      ],
    };

    const subjectInstructors =
      instructors[subject] || instructors["Matemáticas"];
    return subjectInstructors[
      Math.floor(Math.random() * subjectInstructors.length)
    ];
  }

  // Generar rating
  generateRating() {
    return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10; // Entre 3.5 y 5.0
  }

  // Obtener thumbnail para materia
  getThumbnailForSubject(subject) {
    const thumbnails = {
      Matemáticas:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop",
      Física:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop",
      Química:
        "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=200&fit=crop",
      Biología:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      Historia:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      Literatura:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      Inglés:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
      Programación:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    };

    return thumbnails[subject] || thumbnails["Matemáticas"];
  }

  // Generar duración
  generateDuration() {
    const hours = Math.floor(Math.random() * 40) + 20; // Entre 20 y 60 horas
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}min`;
  }

  // Determinar universidad basada en la ruta
  determineUniversity(path) {
    const title = (path.title || "").toLowerCase();

    if (title.includes("unam")) return "Para UNAM";
    if (title.includes("ipn")) return "Para IPN";
    if (title.includes("uam")) return "Para UAM";
    if (title.includes("medicina")) return "Para Medicina";
    if (title.includes("ingeniería") || title.includes("ingenieria"))
      return "Para Ingeniería";
    if (title.includes("humanidades")) return "Para Humanidades";
    if (title.includes("exani")) return "Para EXANI-II";

    return "Universitario General";
  }

  // Generar descripción
  generateDescription(subject, difficulty) {
    const descriptions = {
      Básico: `Curso introductorio de ${subject} diseñado para estudiantes que inician en esta materia.`,
      Intermedio: `Curso completo de ${subject} a nivel universitario con enfoque práctico y teórico.`,
      Avanzado: `Especialización en ${subject} para estudiantes con conocimientos previos sólidos.`,
    };

    return descriptions[difficulty] || descriptions["Intermedio"];
  }

  // Obtener cursos generales cuando no hay rutas
  getGeneralCourses() {
    return [
      {
        id: "general-1",
        title: "Matemáticas para Examen de Admisión",
        instructor: "Dr. Carlos Mendoza",
        rating: 4.8,
        thumbnail:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop",
        category: "Matemáticas",
        level: "Intermedio",
        duration: "45h 25min",
        university: "Para UNAM, IPN, UAM",
        description:
          "Preparación completa en matemáticas para exámenes de admisión universitaria.",
        isFromUserPath: false,
      },
      {
        id: "general-2",
        title: "Física Universitaria",
        instructor: "Dra. Ana Rodríguez",
        rating: 4.7,
        thumbnail:
          "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop",
        category: "Física",
        level: "Intermedio",
        duration: "38h 45min",
        university: "Para Ingeniería",
        description:
          "Curso completo de física con enfoque en ingeniería y ciencias exactas.",
        isFromUserPath: false,
      },
      {
        id: "general-3",
        title: "Química General",
        instructor: "Dr. Roberto Silva",
        rating: 4.6,
        thumbnail:
          "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=200&fit=crop",
        category: "Química",
        level: "Básico",
        duration: "42h 15min",
        university: "Para Ciencias",
        description:
          "Fundamentos de química para estudiantes de ciencias naturales.",
        isFromUserPath: false,
      },
      {
        id: "general-4",
        title: "Biología Molecular",
        instructor: "Dra. Carmen López",
        rating: 4.9,
        thumbnail:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        category: "Biología",
        level: "Avanzado",
        duration: "35h 30min",
        university: "Para Medicina",
        description:
          "Especialización en biología molecular para estudiantes de medicina.",
        isFromUserPath: false,
      },
    ];
  }

  // Obtener videos personalizados para "Continua con tus clases"
  async getContinueStudyingVideos(learningPaths, limit = 4) {
    if (!learningPaths || learningPaths.length === 0) {
      // Videos generales si no hay rutas
      return this.getGeneralStudyVideos().slice(0, limit);
    }

    try {
      // Obtener videos basados en las rutas del usuario
      const videos = await youtubeService.getVideosForUserPaths(
        learningPaths,
        Math.ceil(limit / learningPaths.length)
      );
      return videos.slice(0, limit);
    } catch (error) {
      console.error("Error getting continue studying videos:", error);
      return this.getGeneralStudyVideos().slice(0, limit);
    }
  }

  // Videos generales para continuar estudiando
  getGeneralStudyVideos() {
    return [
      {
        id: "study-1",
        title: "Técnicas de Estudio Efectivas",
        subject: "Estudio",
        progress: 0,
        duration: "12 min 30 seg",
        thumbnail:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
        instructor: "Prof. Estudio Eficaz",
        isLive: false,
        hasSubtitles: true,
        hasSignLanguage: false,
        hasAudioDescription: false,
        difficulty: "Básico",
        url: "#",
      },
      {
        id: "study-2",
        title: "Preparación para Exámenes de Admisión",
        subject: "Admisión",
        progress: 0,
        duration: "25 min 45 seg",
        thumbnail:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
        instructor: "Dr. Preparación",
        isLive: false,
        hasSubtitles: true,
        hasSignLanguage: true,
        hasAudioDescription: true,
        difficulty: "Intermedio",
        url: "#",
      },
    ];
  }

  // Remover duplicados
  removeDuplicates(items) {
    const seen = new Set();
    return items.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }

  // Limpiar cache
  clearCache() {
    this.cache.clear();
    youtubeService.clearCache();
  }
}

export default new EducationalContentService();
