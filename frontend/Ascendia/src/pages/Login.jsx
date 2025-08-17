import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Ascendia</span>
          </div>
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-gray-400">Continúa tu camino hacia el éxito</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-center text-gray-400">Página en desarrollo...</p>
          <Link to="/">
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;