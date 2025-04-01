import React, { useState } from 'react';
import { 
  Ticket, 
  // Calendar, 
  Wifi, 
  // Key, 
  // Users, 
  // Share2,
  ChevronRight,
  CircuitBoard,
  Sparkles,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import CredentialAppointment from './components/CredentialAppointment';
import WifiQRCode from './components/WifiQRCode';

const menuItems = [
  {
    id: 'student-id',
    title: 'Credencial Estudiantil',
    description: 'Agenda tu cita para credencial',
    icon: <Ticket className="w-6 h-6" />
  },
  {
    id: 'wifi',
    title: 'Acceso WiFi',
    description: 'Configura tu conexión WiFi',
    icon: <Wifi className="w-6 h-6" />
  },
  // {
  //   id: 'tech-support',
  //   title: 'Soporte Técnico',
  //   description: 'Asistencia con equipos y sistemas',
  //   icon: <Calendar className="w-5 h-5" />
  // },
  // {
  //   id: 'credentials',
  //   title: 'Credenciales',
  //   description: 'Gestiona tus accesos',
  //   icon: <Key className="w-5 h-5" />
  // },
  // {
  //   id: 'contact',
  //   title: 'Contacto',
  //   description: 'Información de contacto',
  //   icon: <Users className="w-5 h-5" />
  // },
  // {
  //   id: 'social',
  //   title: 'Redes Sociales',
  //   description: 'Síguenos en redes sociales',
  //   icon: <Share2 className="w-5 h-5" />
  // }
];

const TechSupportContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Soporte Técnico</h2>
    <p>Contenido de soporte técnico...</p>
  </div>
);

const CredentialsContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Credenciales</h2>
    <p>Contenido de gestión de credenciales...</p>
  </div>
);

const ContactContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Contacto</h2>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-blue-400" />
        <span>soporte@universidad.edu</span>
      </div>
      <div className="flex items-center gap-3">
        <Phone className="w-5 h-5 text-blue-400" />
        <span>+1 234 567 8900</span>
      </div>
      <div className="flex items-center gap-3">
        <Globe className="w-5 h-5 text-blue-400" />
        <span>www.universidad.edu</span>
      </div>
    </div>
  </div>
);

const SocialContent = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Redes Sociales</h2>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Instagram className="w-5 h-5 text-pink-400" />
        <span>@universidad</span>
      </div>
      <div className="flex items-center gap-3">
        <Facebook className="w-5 h-5 text-blue-400" />
        <span>Universidad Oficial</span>
      </div>
      <div className="flex items-center gap-3">
        <Twitter className="w-5 h-5 text-blue-400" />
        <span>@universidad</span>
      </div>
    </div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('student-id');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    setIsTransitioning(true);
    setActiveSection(sectionId);
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 50);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'student-id':
        return <CredentialAppointment />;
      case 'tech-support':
        return <TechSupportContent />;
      case 'wifi':
        return <WifiQRCode />;
      case 'credentials':
        return <CredentialsContent />;
      case 'contact':
        return <ContactContent />;
      case 'social':
        return <SocialContent />;
      default:
        return <CredentialAppointment />;
    }
  };

  return (
    <div className="w-[1080px] h-[800px] bg-[#0A0F1C] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#1a365d_0%,transparent_50%)] animate-rotate-slow"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.8),rgba(17,24,39,0.4))]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-0 m-0">
        {/* Header */}
        <header className="px-6 py-2 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border-b border-gray-700/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CircuitBoard className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-md font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Sistema de Tickets
              </h1>
              <p className="text-xs text-gray-400">Centro de Servicios Estudiantiles</p>
            </div>
          </div>
        </header>

        <div className="p-4 px-1 flex-1 m-0 overflow-hidden">
          <div className="h-full flex gap-4 px-3">
            {/* Sidebar Navigation */}
            <nav className="w-64 shrink-0">
              <div className="h-full bg-gray-900/40 backdrop-blur-2xl rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="p-3 bg-gradient-to-b from-gray-800/50 to-transparent border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold">Servicios Disponibles</span>
                  </div>
                </div>
                <div className="p-2 space-y-1.5 max-h-[650px] overflow-y-auto">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative
                        ${activeSection === item.id 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
                          : 'hover:bg-gray-800/50 hover:shadow-lg'}`}
                    >
                      {/* Glow effect for active item */}
                      {activeSection === item.id && (
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-xl -z-10"></div>
                      )}
                      
                      <div className={`transition-all duration-300
                        ${activeSection === item.id 
                          ? 'text-white scale-110' 
                          : 'text-gray-400 group-hover:text-gray-300 group-hover:scale-105'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`text-sm font-medium transition-colors duration-200
                          ${activeSection === item.id ? 'text-white' : 'text-gray-300'}`}>
                          {item.title}
                        </div>
                        <p className={`text-xs transition-colors duration-200
                          ${activeSection === item.id ? 'text-blue-200' : 'text-gray-500'}`}>
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight 
                        className={`w-5 h-5 transition-all duration-300
                          ${activeSection === item.id 
                            ? 'opacity-100 translate-x-0 text-white' 
                            : 'opacity-0 -translate-x-2 text-gray-400'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 bg-gray-900/40 backdrop-blur-2xl rounded-2xl border border-gray-700/50 overflow-hidden">             
              <div className="p-2">
                <div className="bg-gray-800/30 rounded-xl p-2 backdrop-blur-md">
                  <div key={activeSection} className={`fade-enter ${isTransitioning ? 'opacity-0' : ''}`}>
                    {renderContent()}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;