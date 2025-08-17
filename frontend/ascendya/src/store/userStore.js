import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
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
        isLoading: false
      }),
      
      login: (email, password) => {
        set({ isLoading: true });
        
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password.length >= 6) {
              const userData = {
                id: Date.now(),
                firstName: 'Edgar',
                lastName: 'Cervantes Cruz',
                username: email.split('@')[0],
                email: email,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
                bio: 'Im on track for learning more about Cybersecurity, Artificial Intelligence, Data Base and Frontend.',
                location: 'Puebla, México',
                state: 'Puebla',
                country: 'México',
                linkedin: 'https://www.linkedin.com/in/edcruzw/',
                joinDate: new Date().toISOString()
              };
              
              set({ 
                user: userData, 
                isAuthenticated: true,
                isLoading: false
              });
              resolve(userData);
            } else {
              set({ isLoading: false });
              reject(new Error('Email y contraseña son requeridos'));
            }
          }, 1500);
        });
      },
      
      register: (userData) => { // ← Este método existe y funciona
        set({ isLoading: true });
        
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (userData.firstName && userData.lastName && userData.email) {
              const newUser = {
                id: Date.now(),
                ...userData,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
                bio: 'Nuevo en Ascendia, ¡listo para aprender!',
                joinDate: new Date().toISOString()
              };
              
              set({ 
                user: newUser, 
                isAuthenticated: true,
                isLoading: false
              });
              resolve(newUser);
            } else {
              set({ isLoading: false });
              reject(new Error('Todos los campos son requeridos'));
            }
          }, 1500);
        });
      },
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        currentPath: null,
        quizData: null,
        quizCompleted: false,
        isLoading: false
      }),
      
      setLoading: (loading) => set({ 
        isLoading: loading 
      }),
      
      // Resto de acciones...
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
      
      setDashboardData: (data) => set({ 
        dashboardData: data 
      }),
      
      updateUserStats: (stats) => set((state) => ({
        user: state.user ? { ...state.user, ...stats } : null
      })),
      
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