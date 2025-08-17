import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/authService'

const userStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Quiz state
      quizData: null,
      quizProgress: 0,
      quizCompleted: false,
      
      // Learning paths state
      currentPath: null,
      learningPaths: [],
      
      // Dashboard state
      dashboardData: null,
      
      // Theme state
      theme: 'dark',
      
      // Actions - Authentication
      setUser: (userData) => set({ 
        user: userData, 
        isAuthenticated: true,
        isLoading: false,
        error: null
      }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authService.login(email, password);
          
          if (result.success) {
            set({ 
              user: result.data.user, 
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return result.data;
          } else {
            const errorMessage = result.error?.detail || result.error?.message || 'Error al iniciar sesión';
            set({ 
              isLoading: false,
              error: errorMessage
            });
            throw new Error(errorMessage);
          }
        } catch (error) {
          const errorMessage = error.message || 'Error de conexión';
          set({ 
            isLoading: false,
            error: errorMessage
          });
          throw error;
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authService.register(userData);
          
          if (result.success) {
            set({ 
              user: result.data.user, 
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return result.data;
          } else {
            let errorMessage = 'Error al registrar usuario';
            
            if (result.error) {
              if (typeof result.error === 'object') {
                // Si hay errores específicos por campo
                const errorMessages = Object.values(result.error).flat().join(', ');
                errorMessage = errorMessages;
              } else {
                errorMessage = result.error;
              }
            }
            
            set({ 
              isLoading: false,
              error: errorMessage
            });
            throw new Error(errorMessage);
          }
        } catch (error) {
          const errorMessage = error.message || 'Error de conexión';
          set({ 
            isLoading: false,
            error: errorMessage
          });
          throw error;
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authService.logout();
        } catch (error) {
          console.error('Error during logout:', error);
        } finally {
          set({ 
            user: null, 
            isAuthenticated: false,
            currentPath: null,
            quizData: null,
            quizCompleted: false,
            isLoading: false,
            error: null
          });
        }
      },

      // Verificar autenticación al cargar la app
      checkAuth: async () => {
        if (authService.isAuthenticated()) {
          const userData = authService.getUserData();
          
          if (userData) {
            set({ 
              user: userData, 
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            // Si no hay datos del usuario, obtenerlos del servidor
            try {
              const result = await authService.getProfile();
              
              if (result.success) {
                set({ 
                  user: result.data, 
                  isAuthenticated: true,
                  isLoading: false 
                });
              } else {
                // Si no se puede obtener el perfil, limpiar todo
                authService.clearTokens();
                set({ 
                  user: null, 
                  isAuthenticated: false,
                  isLoading: false 
                });
              }
            } catch (error) {
              console.error('Error checking auth:', error);
              authService.clearTokens();
              set({ 
                user: null, 
                isAuthenticated: false,
                isLoading: false 
              });
            }
          }
        } else {
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },
      
      setLoading: (loading) => set({ 
        isLoading: loading 
      }),
      
      // Quiz actions
      setQuizData: (data) => set({ 
        quizData: data,
        quizCompleted: true 
      }),
      
      setQuizProgress: (progress) => set({ 
        quizProgress: progress 
      }),
      
      resetQuiz: () => set({ 
        quizData: null, 
        quizProgress: 0, 
        quizCompleted: false 
      }),
      
      // Learning paths actions
      setCurrentPath: (path) => set({ 
        currentPath: path 
      }),
      
      setLearningPaths: (paths) => set({ 
        learningPaths: paths 
      }),
      
      addLearningPath: (path) => set((state) => ({
        learningPaths: [...state.learningPaths, path]
      })),
      
      updatePathProgress: (pathId, progress) => set((state) => ({
        learningPaths: state.learningPaths.map(path =>
          path.id === pathId ? { ...path, progress } : path
        ),
        currentPath: state.currentPath?.id === pathId 
          ? { ...state.currentPath, progress }
          : state.currentPath
      })),
      
      // Dashboard actions
      setDashboardData: (data) => set({ 
        dashboardData: data 
      }),
      
      updateUserStats: (stats) => set((state) => ({
        user: state.user ? { ...state.user, ...stats } : null
      })),
      
      // Theme actions
      setTheme: (theme) => set({ 
        theme 
      })
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        theme: state.theme 
      })
    }
  )
);

export default userStore;