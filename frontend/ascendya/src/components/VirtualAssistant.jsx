import { useState, useRef, useEffect } from 'react';
import { getChatbotResponse, startVoiceRecognition, speakText } from '../services/chatbotService';

const VirtualAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '¡Hola! Soy Ascend AI, tu asistente virtual y mentor académico. Estoy aquí para ayudarte con tus estudios, responder preguntas sobre materias, crear planes de estudio y analizar documentos. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll al final cuando hay nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !attachedFile) return;

    const newMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      attachedFile: attachedFile ? {
        name: attachedFile.name,
        size: attachedFile.size,
        type: attachedFile.type
      } : null
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Obtener historial para contexto
    const conversationHistory = messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const result = await getChatbotResponse(inputMessage, conversationHistory, attachedFile);
      
      if (result.success) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: result.response,
          timestamp: result.timestamp
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Reproducir respuesta por voz si está habilitado
        if (voiceEnabled) {
          speakText(result.response);
        }
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Lo siento, hubo un error: ${result.error}. Por favor intenta de nuevo.`,
          timestamp: new Date().toISOString(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Lo siento, hubo un problema técnico. Por favor intenta de nuevo.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInputMessage('');
    setAttachedFile(null);
    setIsLoading(false);
  };

  // Manejar reconocimiento de voz
  const handleVoiceInput = () => {
    if (isRecording) {
      // Detener grabación
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Iniciar grabación
      setIsRecording(true);
      
      recognitionRef.current = startVoiceRecognition(
        (transcript) => {
          setInputMessage(transcript);
          setIsRecording(false);
        },
        (error) => {
          console.error('Error de voz:', error);
          setIsRecording(false);
          alert('Error en el reconocimiento de voz: ' + error);
        }
      );

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
  };

  // Manejar adjuntar archivo
  const handleFileAttach = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 5MB.');
        return;
      }
      
      // Validar tipos permitidos
      const allowedTypes = [
        'text/plain', 'text/markdown', 'application/json',
        'application/pdf', 'text/csv', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
        alert('Tipo de archivo no soportado. Usa: TXT, MD, JSON, PDF, CSV, DOC, DOCX');
        return;
      }

      setAttachedFile(file);
    }
  };

  // Remover archivo adjunto
  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Limpiar chat
  const clearChat = () => {
    setMessages([{
      id: 1,
      role: 'assistant',
      content: '¡Hola! Soy Ascend AI, tu asistente virtual y mentor académico. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toISOString()
    }]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
          title="Abrir Asistente Virtual"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="hidden sm:inline font-medium">Ascend AI</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Ascend AI</h3>
                <p className="text-xs text-purple-100">Tu mentor académico</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  voiceEnabled ? 'bg-white/20 text-white' : 'bg-white/10 text-purple-200'
                }`}
                title={voiceEnabled ? 'Desactivar voz' : 'Activar voz'}
              >
                <span className="text-sm">🔊</span>
              </button>
              <button
                onClick={clearChat}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Limpiar chat"
              >
                <span className="text-sm">🗑️</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Cerrar"
              >
                <span className="text-sm">✕</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-purple-500 text-white'
                    : message.isError
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-slate-800 text-slate-100'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                
                {message.attachedFile && (
                  <div className="mt-2 p-2 bg-slate-700 rounded text-xs">
                    <span className="text-blue-400">📎 {message.attachedFile.name}</span>
                    <span className="text-slate-400 ml-2">
                      ({(message.attachedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}
                
                <div className="text-xs opacity-60 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-100 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm">Pensando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* File attachment preview */}
        {attachedFile && (
          <div className="p-3 bg-slate-800 border-t border-slate-700">
            <div className="flex items-center justify-between bg-slate-700 p-2 rounded">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">📎</span>
                <span className="text-sm text-slate-200 truncate">{attachedFile.name}</span>
                <span className="text-xs text-slate-400">
                  ({(attachedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={removeAttachedFile}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu pregunta o consulta..."
                className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-500"
                rows="2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              {/* Voice input */}
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
                disabled={isLoading}
                title={isRecording ? 'Detener grabación' : 'Grabar mensaje de voz'}
              >
                <span className="text-lg">{isRecording ? '⏹️' : '🎤'}</span>
              </button>
              
              {/* File input */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                disabled={isLoading}
                title="Adjuntar archivo"
              >
                <span className="text-lg">📎</span>
              </button>
              
              {/* Send button */}
              <button
                onClick={handleSendMessage}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={isLoading || (!inputMessage.trim() && !attachedFile)}
                title="Enviar mensaje"
              >
                <span className="text-lg">📤</span>
              </button>
            </div>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileAttach}
            className="hidden"
            accept=".txt,.md,.json,.pdf,.csv,.doc,.docx"
          />
          
          <div className="text-xs text-slate-400 mt-2">
            💡 Puedes hacer preguntas de voz 🎤, adjuntar archivos 📎, o escribir directamente
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
