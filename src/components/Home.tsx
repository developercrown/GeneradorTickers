import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Car as IdCard, Key, Mail } from 'lucide-react';

const MenuOption = ({ icon: Icon, title, path, description }) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(path)}
      className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:bg-gray-700 transition-all transform hover:scale-105 flex flex-col items-center text-center"
    >
      <Icon size={48} className="mb-4 text-blue-400" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
};

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 mt-8">Selecciona una Operación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MenuOption
          icon={Wifi}
          title="Generación de QR WiFi"
          path="/wifi-qr"
          description="Genera códigos QR para conexión WiFi"
        />
        <MenuOption
          icon={IdCard}
          title="Cita para Credencialización"
          path="/credential-appointment"
          description="Programa citas para emisión de credenciales"
        />
        <MenuOption
          icon={Key}
          title="Reposición de Credenciales"
          path="/user-credentials"
          description="Recupera usuario y contraseña"
        />
        <MenuOption
          icon={Mail}
          title="Datos de Contacto"
          path="/contact-info"
          description="Comparte información de contacto"
        />
      </div>
    </div>
  );
};

export default Home;