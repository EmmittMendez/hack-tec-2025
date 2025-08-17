// Servicio de autenticación JWT para conectar con Django backend
const API_BASE_URL = 'http://127.0.0.1:8000/api';

class AuthService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Obtener tokens del localStorage
  getTokens() {
    return {
      access: localStorage.getItem('access_token'),
      refresh: localStorage.getItem('refresh_token')
    };
  }

  // Guardar tokens en localStorage
  setTokens(access, refresh) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  // Limpiar tokens del localStorage
  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    const { access } = this.getTokens();
    return !!access;
  }

  // Obtener datos del usuario del localStorage
  getUserData() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  // Guardar datos del usuario
  setUserData(userData) {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  // Registrar nuevo usuario
  async register(userData) {
    try {
      // Generar username automáticamente basado en el email
      const username = userData.email.split('@')[0] + '_' + Date.now().toString().slice(-4);

      // Extraer solo los campos requeridos
      const {
        nombres,
        apellidos,
        email,
        password,
        password_confirm,
        ultimo_grado_estudios,
        estado
      } = userData;

      // Preparar datos para el backend
      const dataToSend = {
        nombres,
        apellidos,
        email,
        password,
        password_confirm,
        ultimo_grado_estudios,
        estado,
        username
      };

      console.log('=== DEBUG REGISTRO ===');
      console.log('Datos originales del formulario:', userData);
      console.log('Datos a enviar al backend:', dataToSend);
      console.log('JSON a enviar:', JSON.stringify(dataToSend, null, 2));
      console.log('========================');

      const response = await fetch(`${this.baseURL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log('=== RESPUESTA BACKEND ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Response data:', data);
      console.log('========================');

      if (response.ok) {
        // Guardar tokens y datos del usuario
        this.setTokens(data.access, data.refresh);
        this.setUserData(data.user);
        return { success: true, data };
      } else {
        return { success: false, error: data };
      }
    } catch (error) {
      console.error('=== ERROR EN AUTHSERVICE ===');
      console.error('Error completo:', error);
      console.error('=============================');
      return { success: false, error: { message: 'Error de conexión con el servidor' } };
    }
  }

  // Iniciar sesión
  async login(email, password) {
    try {
      console.log('Intentando login con:', { email }); // Debug

      const response = await fetch(`${this.baseURL}/auth/login-custom/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Respuesta del login:', { status: response.status, data }); // Debug

      if (response.ok) {
        // Guardar tokens y datos del usuario
        this.setTokens(data.access, data.refresh);
        this.setUserData(data.user);
        return { success: true, data };
      } else {
        return { success: false, error: data };
      }
    } catch (error) {
      console.error('Error en authService.login:', error); // Debug
      return { success: false, error: { message: 'Error de conexión con el servidor' } };
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      const { access, refresh } = this.getTokens();

      if (access && refresh) {
        await fetch(`${this.baseURL}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
          },
          body: JSON.stringify({ refresh }),
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Limpiar tokens independientemente del resultado
      this.clearTokens();
    }
  }

  // Renovar token de acceso
  async refreshToken() {
    try {
      const { refresh } = this.getTokens();

      if (!refresh) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${this.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.access, data.refresh || refresh);
        return { success: true, data };
      } else {
        // Si el refresh token no es válido, limpiar todo
        this.clearTokens();
        return { success: false, error: data };
      }
    } catch (error) {
      this.clearTokens();
      return { success: false, error: { message: 'Error refreshing token' } };
    }
  }

  // Hacer peticiones autenticadas
  async authenticatedRequest(url, options = {}) {
    let { access } = this.getTokens();

    const makeRequest = async (token) => {
      return fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      });
    };

    let response = await makeRequest(access);

    // Si el token expiró, intentar renovarlo
    if (response.status === 401) {
      const refreshResult = await this.refreshToken();

      if (refreshResult.success) {
        const { access: newToken } = this.getTokens();
        response = await makeRequest(newToken);
      } else {
        // Si no se puede renovar, limpiar tokens
        this.clearTokens();
        throw new Error('Session expired');
      }
    }

    return response;
  }

  // Obtener perfil del usuario
  async getProfile() {
    try {
      const response = await this.authenticatedRequest(`${this.baseURL}/auth/profile/`);

      if (response && response.ok) {
        const userData = await response.json();
        this.setUserData(userData);
        return { success: true, data: userData };
      } else {
        return { success: false, error: 'Error fetching profile' };
      }
    } catch (error) {
      return { success: false, error: { message: 'Error de conexión' } };
    }
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();
export default authService;
