import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Home size={24} />
          </button>
        </div>
        <h1 className="text-xl font-semibold">Sistema de Impresión de Tickets</h1>
      </div>
    </nav>
  );
};

export default Navigation;