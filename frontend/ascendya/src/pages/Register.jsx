import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userStore from '../store/userStore';

const schema = yup.object({
  nombres: yup
    .string()
    .required('El nombre es requerido'),
  apellidos: yup
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
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
  ultimo_grado_estudios: yup
    .string()
    .required('El último grado de estudios es requerido'),
  estado: yup
    .string()
    .required('El estado es requerido')
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
      await registerUser(data); // Enviar datos directamente sin mapeo
      
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
            {/* Nombres */}
            <div>
              <label htmlFor="nombres" className="block text-sm font-medium text-slate-300 mb-2">
                Nombre
              </label>
              <input
                {...register('nombres')}
                type="text"
                autoComplete="given-name"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.nombres ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Tu nombre"
              />
              {errors.nombres && (
                <p className="mt-1 text-sm text-red-400">{errors.nombres.message}</p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label htmlFor="apellidos" className="block text-sm font-medium text-slate-300 mb-2">
                Apellidos
              </label>
              <input
                {...register('apellidos')}
                type="text"
                autoComplete="family-name"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.apellidos ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Tus apellidos"
              />
              {errors.apellidos && (
                <p className="mt-1 text-sm text-red-400">{errors.apellidos.message}</p>
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
              <label htmlFor="password_confirm" className="block text-sm font-medium text-slate-300 mb-2">
                Confirmar contraseña
              </label>
              <input
                {...register('password_confirm')}
                type="password"
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg placeholder-slate-400 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.password_confirm ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="••••••••"
              />
              {errors.password_confirm && (
                <p className="mt-1 text-sm text-red-400">{errors.password_confirm.message}</p>
              )}
            </div>

            {/* Último grado de estudios */}
            <div>
              <label htmlFor="ultimo_grado_estudios" className="block text-sm font-medium text-slate-300 mb-2">
                Último grado de estudios
              </label>
              <select
                {...register('ultimo_grado_estudios')}
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.ultimo_grado_estudios ? 'border-red-500' : 'border-slate-600'
                }`}
              >
                <option value="">Selecciona tu último grado</option>
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Preparatoria">Preparatoria</option>
                <option value="Universidad">Universidad</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
              {errors.ultimo_grado_estudios && (
                <p className="mt-1 text-sm text-red-400">{errors.ultimo_grado_estudios.message}</p>
              )}
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-slate-300 mb-2">
                Estado
              </label>
              <select
                {...register('estado')}
                className={`appearance-none relative block w-full px-3 py-3 border rounded-lg text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.estado ? 'border-red-500' : 'border-slate-600'
                }`}
              >
                <option value="">Selecciona tu estado</option>
                <option value="aguascalientes">Aguascalientes</option>
                <option value="baja_california">Baja California</option>
                <option value="baja_california_sur">Baja California Sur</option>
                <option value="campeche">Campeche</option>
                <option value="coahuila">Coahuila</option>
                <option value="colima">Colima</option>
                <option value="chiapas">Chiapas</option>
                <option value="chihuahua">Chihuahua</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="durango">Durango</option>
                <option value="guanajuato">Guanajuato</option>
                <option value="guerrero">Guerrero</option>
                <option value="hidalgo">Hidalgo</option>
                <option value="jalisco">Jalisco</option>
                <option value="mexico">Estado de México</option>
                <option value="michoacan">Michoacán</option>
                <option value="morelos">Morelos</option>
                <option value="nayarit">Nayarit</option>
                <option value="nuevo_leon">Nuevo León</option>
                <option value="oaxaca">Oaxaca</option>
                <option value="puebla">Puebla</option>
                <option value="queretaro">Querétaro</option>
                <option value="quintana_roo">Quintana Roo</option>
                <option value="san_luis_potosi">San Luis Potosí</option>
                <option value="sinaloa">Sinaloa</option>
                <option value="sonora">Sonora</option>
                <option value="tabasco">Tabasco</option>
                <option value="tamaulipas">Tamaulipas</option>
                <option value="tlaxcala">Tlaxcala</option>
                <option value="veracruz">Veracruz</option>
                <option value="yucatan">Yucatán</option>
                <option value="zacatecas">Zacatecas</option>
              </select>
              {errors.estado && (
                <p className="mt-1 text-sm text-red-400">{errors.estado.message}</p>
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