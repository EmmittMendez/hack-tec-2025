# 🤖 Ascend AI - Asistente Virtual

## Descripción General

Ascend AI es un asistente virtual inteligente integrado en la página Resources, diseñado para funcionar como guía y mentor académico para estudiantes que se preparan para exámenes universitarios.

## 🌟 Características Principales

### 💬 Chat Inteligente

- **Conversación natural** con contexto mantenido
- **Respuestas personalizadas** basadas en el perfil del estudiante
- **Historial de conversación** para referencias futuras

### 🎤 Reconocimiento de Voz

- **Comando por voz** usando Web Speech API
- **Soporte para español** (es-ES)
- **Indicador visual** durante la grabación
- **Conversión automática** de voz a texto

### 🔊 Síntesis de Voz

- **Reproducción de respuestas** por voz (opcional)
- **Control de activación/desactivación** de audio
- **Soporte nativo** del navegador

### 📎 Adjuntar Archivos

- **Tipos soportados**: TXT, MD, JSON, PDF, CSV, DOC, DOCX
- **Límite de tamaño**: 5MB máximo
- **Análisis automático** del contenido
- **Vista previa** del archivo adjunto

## 🧠 Capacidades del Asistente

### Educación y Aprendizaje

- ✅ Responder preguntas sobre materias académicas
- ✅ Crear planes de estudio personalizados
- ✅ Explicar conceptos complejos de forma simple
- ✅ Proporcionar técnicas de estudio efectivas
- ✅ Analizar documentos académicos
- ✅ Dar consejos motivacionales

### Análisis de Documentos

- ✅ Lectura y análisis de archivos de texto
- ✅ Extracción de información clave
- ✅ Resumen de contenido académico
- ✅ Identificación de conceptos importantes

## 🎨 Interfaz de Usuario

### Diseño Responsive

- **Botón flotante** siempre visible en la esquina inferior derecha
- **Ventana de chat** optimizada para móviles y desktop
- **Animaciones suaves** y transiciones fluidas
- **Tema oscuro** consistente con la aplicación

### Controles Intuitivos

- 🎤 **Botón de voz** - Grabar mensaje por voz
- 📎 **Botón de archivo** - Adjuntar documentos
- 📤 **Botón enviar** - Enviar mensaje
- 🔊 **Toggle de voz** - Activar/desactivar audio
- 🗑️ **Limpiar chat** - Reiniciar conversación

## 🔧 Arquitectura Técnica

### Servicios

```
src/services/chatbotService.js
├── getChatbotResponse()     - Comunicación con Gemini API
├── startVoiceRecognition()  - Reconocimiento de voz
├── speakText()              - Síntesis de voz
└── readFileAsText()         - Lectura de archivos
```

### Componentes

```
src/components/VirtualAssistant.jsx
├── Estado del chat
├── Manejo de mensajes
├── Interfaz de usuario
├── Integración con servicios
└── Gestión de archivos
```

## 🚀 Integración

### En Resources.jsx

```jsx
import VirtualAssistant from "../components/VirtualAssistant";

// Al final del componente
<VirtualAssistant />;
```

### Variables de Entorno

```env
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

## 📱 Uso del Asistente

### 1. Abrir el Chat

- Hacer clic en el botón flotante "🤖 Ascend AI"
- La ventana de chat se abrirá en la esquina inferior derecha

### 2. Enviar Mensajes

- **Por texto**: Escribir en el campo de texto y presionar Enter o el botón 📤
- **Por voz**: Hacer clic en 🎤, hablar y el texto aparecerá automáticamente

### 3. Adjuntar Archivos

- Hacer clic en 📎
- Seleccionar archivo (máx. 5MB)
- El archivo se analizará junto con tu mensaje

### 4. Configuración

- **🔊**: Activar/desactivar reproducción de voz de las respuestas
- **🗑️**: Limpiar historial de chat
- **✕**: Cerrar ventana de chat

## 🎯 Casos de Uso Ejemplo

### Consultas Académicas

```
Usuario: "Explícame los sistemas de ecuaciones lineales"
AI: "Los sistemas de ecuaciones lineales son..."
```

### Análisis de Documentos

```
Usuario: [Adjunta PDF] "Analiza este temario y crea un plan de estudio"
AI: "He analizado tu temario. Aquí tienes un plan personalizado..."
```

### Comando por Voz

```
Usuario: 🎤 "Necesito técnicas para memorizar fórmulas matemáticas"
AI: "Excelente pregunta. Te comparto varias técnicas efectivas..."
```

## 🔮 Funcionalidades Futuras

### Próximas Mejoras

- [ ] Integración con calendario de estudio
- [ ] Recordatorios inteligentes
- [ ] Análisis de progreso personalizado
- [ ] Conexión con bases de datos académicas
- [ ] Soporte para más tipos de archivo (imágenes, videos)
- [ ] Modo offline básico
- [ ] Personalización de la personalidad del asistente

## 🛡️ Consideraciones de Seguridad

### Privacidad

- Los mensajes se procesan temporalmente
- No se almacenan conversaciones en el servidor
- Los archivos se procesan localmente cuando es posible

### Límites

- Archivos limitados a 5MB
- Rate limiting en API calls
- Validación de tipos de archivo

## 🎨 Personalización

### Temas y Estilos

El asistente usa clases de Tailwind CSS que se pueden personalizar:

- `bg-purple-500` - Color principal
- `bg-slate-900` - Fondo del chat
- `text-white` - Color del texto

### Configuración del Asistente

En `chatbotService.js` se puede modificar:

- `ASSISTANT_CONTEXT` - Personalidad y comportamiento
- Parámetros de la API de Gemini
- Configuración de voz y idioma

¡El asistente está listo para ayudar a los estudiantes en su camino hacia la universidad! 🎓
