import { create } from 'zustand';
import { authService } from '../services/api';

export const useStore = create((set, get) => ({
  // Estado de autenticación
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
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
        loading: false,
        error: null 
      });
      return data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message,
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
        loading: false,
        error: null 
      });
      return data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message,
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
        loading: false,
        error: null 
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Limpiar el estado local incluso si hay error
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false,
        error: null 
      });
    }
  },

  // Función para verificar autenticación al cargar la app
  checkAuth: () => {
    const isAuth = authService.isAuthenticated();
    const user = authService.getCurrentUser();
    set({ 
      isAuthenticated: isAuth, 
      user: user 
    });
  },

  // Función para actualizar perfil del usuario
  updateProfile: async () => {
    try {
      const profile = await authService.getProfile();
      set({ user: profile });
      return profile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}));

export default useStore;
