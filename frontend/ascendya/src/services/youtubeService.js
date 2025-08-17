// YouTube Data API Service
// Para obtener videos educativos reales basados en las preferencias del usuario

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "demo";
const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

class YouTubeService {
  constructor() {
    this.cache = new Map(); // Cache para evitar llamadas innecesarias
    this.cacheExpiry = 30 * 60 * 1000; // 30 minutos
  }

  // Obtener videos educativos por tema/materia
  async searchEducationalVideos(query, maxResults = 10, language = "es") {
    const cacheKey = `search_${query}_${maxResults}_${language}`;

    // Verificar cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      // Si no hay API key real, devolver datos demo
      if (YOUTUBE_API_KEY === "demo") {
        return this.getDemoVideos(query, maxResults);
      }

      const searchQuery = `${query} educativo tutorial español -musica -gaming`;
      const url =
        `${YOUTUBE_API_BASE_URL}/search?` +
        `key=${YOUTUBE_API_KEY}&` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `type=video&` +
        `part=snippet&` +
        `maxResults=${maxResults}&` +
        `relevanceLanguage=${language}&` +
        `videoDefinition=high&` +
        `videoDuration=medium&` +
        `order=relevance`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `YouTube API Error: ${data.error?.message || "Unknown error"}`
        );
      }

      // Obtener detalles adicionales de los videos
      const videoIds = data.items.map((item) => item.id.videoId).join(",");
      const detailsUrl =
        `${YOUTUBE_API_BASE_URL}/videos?` +
        `key=${YOUTUBE_API_KEY}&` +
        `id=${videoIds}&` +
        `part=snippet,contentDetails,statistics`;

      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      // Combinar datos de búsqueda con detalles
      const videos = this.formatYouTubeVideos(data.items, detailsData.items);

      // Guardar en cache
      this.cache.set(cacheKey, {
        data: videos,
        timestamp: Date.now(),
      });

      return videos;
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      // Fallback a datos demo en caso de error
      return this.getDemoVideos(query, maxResults);
    }
  }

  // Formatear datos de YouTube al formato esperado por la aplicación
  formatYouTubeVideos(searchItems, detailItems) {
    return searchItems.map((item, index) => {
      const details = detailItems?.find(
        (detail) => detail.id === item.id.videoId
      );
      const duration = details?.contentDetails?.duration || "PT10M";

      return {
        id: item.id.videoId,
        title: item.snippet.title,
        subject: this.extractSubjectFromTitle(item.snippet.title),
        progress: 0, // Nuevo video, sin progreso
        duration: this.formatDuration(duration),
        thumbnail:
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        instructor: item.snippet.channelTitle,
        isLive: item.snippet.liveBroadcastContent === "live",
        hasSubtitles: true, // YouTube generalmente tiene subtítulos automáticos
        hasSignLanguage: false, // No podemos detectar esto automáticamente
        hasAudioDescription: false, // No podemos detectar esto automáticamente
        difficulty: this.determineDifficulty(
          item.snippet.title,
          item.snippet.description
        ),
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        viewCount: details?.statistics?.viewCount || 0,
        likeCount: details?.statistics?.likeCount || 0,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      };
    });
  }

  // Extraer materia/tema del título del video
  extractSubjectFromTitle(title) {
    const subjects = {
      matemáticas: [
        "matemática",
        "algebra",
        "cálculo",
        "geometría",
        "trigonometría",
      ],
      física: ["física", "mecánica", "termodinámica", "electromagnetismo"],
      química: ["química", "orgánica", "inorgánica", "bioquímica"],
      biología: ["biología", "anatomía", "genética", "ecología"],
      historia: ["historia", "civilización", "cultura", "sociedad"],
      literatura: ["literatura", "poesía", "narrativa", "ensayo"],
      inglés: ["inglés", "english", "grammar", "vocabulary"],
    };

    const titleLower = title.toLowerCase();

    for (const [subject, keywords] of Object.entries(subjects)) {
      if (keywords.some((keyword) => titleLower.includes(keyword))) {
        return subject.charAt(0).toUpperCase() + subject.slice(1);
      }
    }

    return "General";
  }

  // Determinar dificultad basada en título y descripción
  determineDifficulty(title, description = "") {
    const content = (title + " " + description).toLowerCase();

    if (
      content.includes("básico") ||
      content.includes("principiante") ||
      content.includes("introducción")
    ) {
      return "Básico";
    } else if (
      content.includes("avanzado") ||
      content.includes("experto") ||
      content.includes("profesional")
    ) {
      return "Avanzado";
    }

    return "Intermedio";
  }

  // Convertir duración de YouTube (PT10M30S) a formato legible
  formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "10 min";

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else {
      return `${minutes} min ${seconds.toString().padStart(2, "0")} seg`;
    }
  }

  // Obtener videos basados en las rutas de aprendizaje del usuario
  async getVideosForUserPaths(learningPaths, maxVideosPerPath = 3) {
    const allVideos = [];

    for (const path of learningPaths) {
      // Extraer temas de la ruta
      const topics = this.extractTopicsFromPath(path);

      for (const topic of topics.slice(0, 2)) {
        // Limitar a 2 temas por ruta
        try {
          const videos = await this.searchEducationalVideos(
            topic,
            maxVideosPerPath
          );
          allVideos.push(...videos);
        } catch (error) {
          console.error(`Error fetching videos for topic ${topic}:`, error);
        }
      }
    }

    // Remover duplicados y mezclar
    const uniqueVideos = this.removeDuplicates(allVideos);
    return this.shuffleArray(uniqueVideos).slice(0, 12); // Máximo 12 videos
  }

  // Extraer temas de una ruta de aprendizaje
  extractTopicsFromPath(path) {
    const topics = [];

    // De los intereses/materias
    if (path.interests) {
      topics.push(...path.interests.split(", "));
    }

    // De las materias/subjects
    if (path.subjects) {
      topics.push(...path.subjects);
    }

    // Del título de la ruta
    if (path.title) {
      const titleTopics = this.extractTopicsFromTitle(path.title);
      topics.push(...titleTopics);
    }

    return [...new Set(topics)]; // Remover duplicados
  }

  // Extraer temas del título de una ruta
  extractTopicsFromTitle(title) {
    const topics = [];
    const titleLower = title.toLowerCase();

    const topicKeywords = {
      matemáticas: ["matemática", "álgebra", "cálculo", "geometría"],
      física: ["física", "mecánica", "óptica"],
      química: ["química", "orgánica", "inorgánica"],
      biología: ["biología", "anatomía", "genética"],
      examen: ["exani", "unam", "ipn", "admisión"],
    };

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some((keyword) => titleLower.includes(keyword))) {
        topics.push(topic);
      }
    }

    return topics;
  }

  // Remover videos duplicados
  removeDuplicates(videos) {
    const seen = new Set();
    return videos.filter((video) => {
      if (seen.has(video.id)) {
        return false;
      }
      seen.add(video.id);
      return true;
    });
  }

  // Mezclar array aleatoriamente
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Datos demo para cuando no hay API key o falla la API
  getDemoVideos(query, maxResults) {
    const demoVideos = [
      {
        id: "demo-1",
        title: `${query}: Conceptos Fundamentales`,
        subject: this.extractSubjectFromTitle(query),
        progress: 0,
        duration: "15 min 30 seg",
        thumbnail:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop",
        instructor: "Prof. Demo",
        isLive: false,
        hasSubtitles: true,
        hasSignLanguage: false,
        hasAudioDescription: false,
        difficulty: "Intermedio",
        url: "#",
        description: `Video educativo sobre ${query}`,
      },
      {
        id: "demo-2",
        title: `Guía Completa de ${query}`,
        subject: this.extractSubjectFromTitle(query),
        progress: 0,
        duration: "22 min 45 seg",
        thumbnail:
          "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=200&fit=crop",
        instructor: "Dr. Ejemplo",
        isLive: false,
        hasSubtitles: true,
        hasSignLanguage: true,
        hasAudioDescription: true,
        difficulty: "Avanzado",
        url: "#",
        description: `Tutorial avanzado de ${query}`,
      },
    ];

    return demoVideos.slice(0, maxResults);
  }

  // Limpiar cache
  clearCache() {
    this.cache.clear();
  }
}

export default new YouTubeService();
