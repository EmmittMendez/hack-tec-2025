import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:8000/api';

const useUserStore = create((set, get) => ({
  // Estado inicial
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Función para limpiar errores
  clearError: () => set({ error: null }),

  // Función para verificar la autenticación al cargar la app
  checkAuth: async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          set({ 
            user: userData, 
            isAuthenticated: true,
            error: null 
          });
        } else {
          // Token inválido, limpiar
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          set({ 
            user: null, 
            isAuthenticated: false,
            error: null 
          });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ 
          user: null, 
          isAuthenticated: false,
          error: null 
        });
      }
    }
  },

  // Función de registro
  registerUser: async (userData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso, hacer login automático
        await get().loginUser(userData.username, userData.password);
      } else {
        // Error en el registro
        set({ 
          loading: false, 
          error: data.message || data.error || 'Error en el registro' 
        });
        throw new Error(data.message || 'Error en el registro');
      }
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error de conexión' 
      });
      throw error;
    }
  },

  // Función de login
  loginUser: async (username, password) => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar tokens
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        
        // Obtener datos del usuario
        const userResponse = await fetch(`${API_BASE_URL}/users/profile/`, {
          headers: {
            'Authorization': `Bearer ${data.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          set({ 
            user: userData,
            isAuthenticated: true,
            loading: false,
            error: null 
          });
        } else {
          throw new Error('Error obteniendo datos del usuario');
        }
      } else {
        set({ 
          loading: false, 
          error: data.detail || data.message || 'Credenciales inválidas' 
        });
        throw new Error(data.detail || 'Credenciales inválidas');
      }
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Error de conexión' 
      });
      throw error;
    }
  },

  // Función de logout
  logoutUser: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ 
      user: null, 
      isAuthenticated: false, 
      loading: false,
      error: null 
    });
  },

  // Funciones del quiz
  quizScore: 0,
  quizCompleted: false,
  
  setQuizScore: (score) => set({ quizScore: score }),
  setQuizCompleted: (completed) => set({ quizCompleted: completed }),
  
  // Función para completar quiz y actualizar nivel
  completeQuiz: async (score) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/complete-quiz/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
      });

      if (response.ok) {
        const data = await response.json();
        set({ 
          quizScore: score,
          quizCompleted: true,
          user: { ...get().user, education_level: data.new_level }
        });
      }
    } catch (error) {
      console.error('Error completing quiz:', error);
    }
  },
}));

export default useUserStore;
