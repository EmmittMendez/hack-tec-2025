import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userStore from '../store/userStore';

const schema = yup.object({
  firstName: yup
    .string()
    .required('El nombre es requerido'),
  lastName: yup
    .string()
    .required('Los apellidos son requeridos'),
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')
});

function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = userStore(); // ← Cambiar a registerUser
  const [registerError, setRegisterError] = useState('');

  const {
    register, // ← Este es de react-hook-form
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setRegisterError('');
      await registerUser({ // ← Usar registerUser aquí
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.email.split('@')[0],
        location: 'México',
        state: 'Puebla',
        country: 'México'
      });
      
      navigate('/dashboard');
    } catch (error) {
      setRegisterError(error.message || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            O{' '}
            <Link
              to="/login"
              className="font-medium text-green-400 hover:text-green-300 transition-colors"
            >
              inicia sesión si ya tienes cuenta
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                Nombre
              </label>
              <input
                {...register('firstName')}
                type="text"
                autoComplete="given-name"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.firstName ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Tu nombre"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                Apellidos
              </label>
              <input
                {...register('lastName')}
                type="text"
                autoComplete="family-name"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.lastName ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Tus apellidos"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.email ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.password ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirmar contraseña
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Error de registro */}
          {registerError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              {registerError}
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-colors ${
                isLoading
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </div>

          {/* Demo info */}
          <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-3 rounded-lg text-sm">
            <p className="font-medium mb-1">Registro de prueba:</p>
            <p>✅ Completa todos los campos</p>
            <p>✅ Usa cualquier email válido</p>
            <p>✅ Contraseña de 6+ caracteres</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;