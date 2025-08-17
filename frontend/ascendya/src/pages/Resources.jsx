import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useStore from '../store/useStore';

// Esquema de validación con Yup
const schema = yup.object({
  firstName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  lastName: yup
    .string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Debe ser un email válido'),
  
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    ),
  
  confirmPassword: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  
  age: yup
    .number()
    .required('La edad es obligatoria')
    .min(13, 'Debes tener al menos 13 años')
    .max(100, 'Edad no válida'),
  
  country: yup
    .string()
    .required('Selecciona tu país'),
  
  educationLevel: yup
    .string()
    .required('Selecciona tu nivel educativo'),
  
  interests: yup
    .array()
    .min(1, 'Selecciona al menos un área de interés'),
  
  terms: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones')
});

function Register() {
  const navigate = useNavigate();
  const { setUser, setLoading } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      interests: []
    }
  });

  const countries = [
    'México', 'España', 'Argentina', 'Colombia', 'Chile', 'Perú', 
    'Venezuela', 'Ecuador', 'Bolivia', 'Uruguay', 'Paraguay', 
    'Estados Unidos', 'Canadá', 'Brasil', 'Otro'
  ];

  const educationLevels = [
    'Secundaria en curso',
    'Secundaria completada',
    'Preparatoria en curso',
    'Preparatoria completada',
    'Universidad en curso',
    'Universidad completada',
    'Posgrado'
  ];

  const interestAreas = [
    'Tecnología', 'Medicina', 'Ingeniería', 'Arte y Diseño',
    'Negocios', 'Ciencias', 'Educación', 'Deportes',
    'Música', 'Literatura', 'Psicología', 'Derecho'
  ];

  const watchedInterests = watch('interests');

  const handleInterestChange = (interest) => {
    const currentInterests = getValues('interests') || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    setValue('interests', newInterests);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular usuario registrado
      const newUser = {
        id: Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        educationLevel: data.educationLevel,
        interests: data.interests,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      navigate('/quiz'); // Redirigir al quiz después del registro
      
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Ascendia</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Crea tu cuenta
          </h1>
          <p className="text-slate-400 mb-6">
            Comienza tu journey educativo personalizado
          </p>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium">
            🎉 ¡Es completamente gratis!
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Apellido */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                    }`}
                    placeholder="Tu apellido"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Contraseñas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className={`w-full px-4 py-3 pr-12 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirmar Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirmar Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className={`w-full px-4 py-3 pr-12 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showConfirmPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                Información Adicional
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Edad */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Edad *
                  </label>
                  <input
                    type="number"
                    {...register('age')}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.age 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                    }`}
                    placeholder="18"
                    min="13"
                    max="100"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-400">{errors.age.message}</p>
                  )}
                </div>

                {/* País */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    País *
                  </label>
                  <select
                    {...register('country')}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.country 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                    }`}
                  >
                    <option value="">Selecciona tu país</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
                  )}
                </div>
              </div>

              {/* Nivel Educativo */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nivel Educativo *
                </label>
                <select
                  {...register('educationLevel')}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                    errors.educationLevel 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-600 focus:border-green-500 focus:ring-green-500/50'
                  }`}
                >
                  <option value="">Selecciona tu nivel educativo</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.educationLevel && (
                  <p className="mt-1 text-sm text-red-400">{errors.educationLevel.message}</p>
                )}
              </div>
            </div>

            {/* Áreas de Interés */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                Áreas de Interés
              </h3>
              
              <p className="text-slate-400 text-sm mb-4">
                Selecciona las áreas que más te interesan (mínimo 1)
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestAreas.map(interest => {
                  const isSelected = watchedInterests?.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestChange(interest)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                        isSelected
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
              {errors.interests && (
                <p className="mt-2 text-sm text-red-400">{errors.interests.message}</p>
              )}
            </div>

            {/* Términos y Condiciones */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  {...register('terms')}
                  className="mt-1 w-4 h-4 text-green-500 bg-slate-800 border-slate-600 rounded focus:ring-green-500"
                />
                <div>
                  <label className="text-sm text-slate-300">
                    Acepto los{' '}
                    <a href="#" className="text-green-400 hover:text-green-300 underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-green-400 hover:text-green-300 underline">
                      política de privacidad
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-400">{errors.terms.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear mi cuenta
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Link a Login */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-medium">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;