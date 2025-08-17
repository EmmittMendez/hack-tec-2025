import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import useStore from "../store/useStore";

// Esquema de validación con Yup
const schema = yup.object({
  username: yup
    .string()
    .required("El nombre de usuario es obligatorio")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(20, "El nombre de usuario no puede exceder 20 caracteres")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Solo se permiten letras, números y guiones bajos"
    ),

  firstName: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),

  lastName: yup
    .string()
    .required("Los apellidos son obligatorios")
    .min(2, "Los apellidos deben tener al menos 2 caracteres")
    .max(50, "Los apellidos no pueden exceder 50 caracteres"),

  email: yup
    .string()
    .required("El email es obligatorio")
    .email("Debe ser un email válido"),

  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    ),

  confirmPassword: yup
    .string()
    .required("Confirma tu contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),

  state: yup.string().required("Selecciona tu estado"),

  educationLevel: yup
    .string()
    .required("Selecciona tu último grado de estudios"),
});

function Register() {
  const navigate = useNavigate();
  const { register: registerUser, loading, error } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const states = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  // Mapeo de nombres completos a valores del backend
  const stateMapping = {
    "Aguascalientes": "aguascalientes",
    "Baja California": "baja_california",
    "Baja California Sur": "baja_california_sur",
    "Campeche": "campeche",
    "Chiapas": "chiapas",
    "Chihuahua": "chihuahua",
    "Ciudad de México": "cdmx",
    "Coahuila": "coahuila",
    "Colima": "colima",
    "Durango": "durango",
    "Estado de México": "mexico",
    "Guanajuato": "guanajuato",
    "Guerrero": "guerrero",
    "Hidalgo": "hidalgo",
    "Jalisco": "jalisco",
    "Michoacán": "michoacan",
    "Morelos": "morelos",
    "Nayarit": "nayarit",
    "Nuevo León": "nuevo_leon",
    "Oaxaca": "oaxaca",
    "Puebla": "puebla",
    "Querétaro": "queretaro",
    "Quintana Roo": "quintana_roo",
    "San Luis Potosí": "san_luis_potosi",
    "Sinaloa": "sinaloa",
    "Sonora": "sonora",
    "Tabasco": "tabasco",
    "Tamaulipas": "tamaulipas",
    "Tlaxcala": "tlaxcala",
    "Veracruz": "veracruz",
    "Yucatán": "yucatan",
    "Zacatecas": "zacatecas",
  };

  const educationLevels = [
    "Primaria",
    "Secundaria",
    "Preparatoria / Bachillerato",
    "Técnico Superior",
    "Licenciatura",
    "Maestría",
    "Doctorado",
  ];

  const onSubmit = async (data) => {
    try {
      // Mapear los datos del formulario al formato del backend
      const userData = {
        username: data.username,
        nombres: data.firstName,
        apellidos: data.lastName,
        email: data.email,
        password: data.password,
        password_confirm: data.confirmPassword,
        estado: stateMapping[data.state], // Mapear el estado al valor del backend
        ultimo_grado_estudios: data.educationLevel,
      };

      await registerUser(userData);
      
      // Si llegamos aquí, el registro fue exitoso
      console.log("Usuario registrado exitosamente");
      navigate("/quiz");
    } catch (error) {
      console.error("Error al registrar:", error);
      // El error ya se maneja en el store
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Ascendia</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Crea tu cuenta</h1>
          <p className="text-slate-400 mb-6">
            Únete a nuestra comunidad educativa
          </p>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium">
            🎉 ¡Es completamente gratis!
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          {/* Error del store */}
          {error && (
            <div className="mb-5 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nombre de Usuario */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre de usuario *
              </label>
              <input
                type="text"
                {...register("username")}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                }`}
                placeholder="mi_usuario123"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                {...register("firstName")}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                }`}
                placeholder="Tu nombre"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Apellidos *
              </label>
              <input
                type="text"
                {...register("lastName")}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                }`}
                placeholder="Tus apellidos"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Correo electrónico *
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full px-4 py-3 pr-12 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirmar contraseña *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-3 pr-12 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showConfirmPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Estado *
              </label>
              <select
                {...register("state")}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.state
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                }`}
              >
                <option value="">Selecciona tu estado</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* Último grado de estudios */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Último grado de estudios *
              </label>
              <select
                {...register("educationLevel")}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.educationLevel
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-slate-600 focus:border-green-500 focus:ring-green-500/50"
                }`}
              >
                <option value="">Selecciona tu nivel de estudios</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.educationLevel && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.educationLevel.message}
                </p>
              )}
            </div>

            {/* Botón de Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear mi cuenta
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Link a Login */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-green-400 hover:text-green-300 font-medium"
              >
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
