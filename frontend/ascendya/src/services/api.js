// Configuración base de la API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Función helper para hacer peticiones HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Agregar token de autorización si existe
  const token = localStorage.getItem('access_token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Si es 401 (token expirado), intentar refresh
    if (response.status === 401 && token) {
      const refreshed = await refreshToken();
      if (refreshed) {
        // Reintentar la petición con el nuevo token
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return await fetch(url, config);
      } else {
        // Refresh falló, redirigir a login
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
    }

    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Servicios de autenticación
export const authService = {
  // Login
  login: async (username, password) => {
    const response = await apiRequest('/users/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Guardar tokens y usuario en localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } else {
      const error = await response.json();
      throw new Error(error.detail || 'Error en login');
    }
  },

  // Registro
  register: async (userData) => {
    const response = await apiRequest('/users/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Guardar tokens y usuario en localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } else {
      const error = await response.json();
      console.error('Register error response:', error);
      throw new Error(error.detail || error.message || JSON.stringify(error) || 'Error en registro');
    }
  },

  // Logout
  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (refreshToken) {
      try {
        await apiRequest('/users/auth/logout/', {
          method: 'POST',
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch (error) {
        console.error('Error en logout:', error);
      }
    }
    
    // Limpiar localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Obtener perfil del usuario
  getProfile: async () => {
    const response = await apiRequest('/users/profile/');
    
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error al obtener perfil');
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Obtener usuario del localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Función para refresh token
const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  
  if (!refresh) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/auth/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};

export default apiRequest;
