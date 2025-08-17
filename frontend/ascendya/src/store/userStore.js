import { create } from 'zustand';
import { authService } from '../services/api';

const userStore = create((set, get) => ({
  // Estado de autenticación
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Acciones básicas
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Acciones de autenticación
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(username, password);
      set({ 
        user: data.user, 
        isAuthenticated: true, 
        loading: false 
      });
      return data;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false,
        user: null,
        isAuthenticated: false 
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.register(userData);
      set({ 
        user: data.user, 
        isAuthenticated: true, 
        loading: false 
      });
      return data;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false,
        user: null,
        isAuthenticated: false 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    } catch (error) {
      console.error('Error en logout:', error);
      // Limpiar estado aunque haya error
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },

  // Inicializar autenticación desde localStorage
  initAuth: () => {
    const isAuth = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();
    
    set({ 
      isAuthenticated: isAuth, 
      user: currentUser 
    });

    // Si hay token, verificar que sea válido obteniendo el perfil
    if (isAuth) {
      authService.getProfile()
        .then(user => {
          set({ user });
        })
        .catch(() => {
          // Token inválido, limpiar
          authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false 
          });
        });
    }
  },

  // Actualizar perfil
  updateProfile: async () => {
    try {
      const user = await authService.getProfile();
      set({ user });
      return user;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  }
}));

export default userStore;
