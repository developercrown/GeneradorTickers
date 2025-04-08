import { useEffect, useState } from 'react';
import { 
  Ticket,
  Wifi,
  CircuitBoard,
  Mail,
  Phone,
  Globe,
  Loader,
  Loader2Icon
} from 'lucide-react';
import CredentialAppointment from './components/CredentialAppointment';
import WifiQRCode from './components/WifiQRCode';
import { precacheImages } from './utils/ImageUtils';

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
  }
];


function App() {
  const [imagesReady, setImagesReady] = useState(false);
  const [activeSection, setActiveSection] = useState('student-id');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await precacheImages();
        setImagesReady(true);
      } catch (error) {
        console.error('Error al precargar imágenes:', error);
        setImagesReady(true); // Continuar aunque falle
      }
    };

    loadImages();
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setIsTransitioning(true);
    setActiveSection(sectionId);
    setTimeout(() => setIsTransitioning(false), 50);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'student-id':
        return <CredentialAppointment />;
      case 'wifi':
        return <WifiQRCode />;
      default:
        return <CredentialAppointment />;
    }
  };

  const handleReload = () => {
    window.electron.ipcRenderer.invoke('soft-reboot');
  }

  if (!imagesReady) {
    return <div className="w-screen h-screen flex flex-row items-center justify-center">
      <Loader2Icon size={32} className="text-white animate-spin"/>
      <h1 className="text-center text-white text-lg">Cargando Recursos...</h1>
    </div>; // Mostrar loading mientras se cargan
  }

  return (
    <div className="w-screen h-screen p-0 m-0 bg-[#0A0F1C] relative opacity-0 animate-in-window">

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#1a365d_0%,transparent_50%)] animate-rotate-slow"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.8),rgba(17,24,39,0.4))]"></div>
      </div>

      {/* Main content */}
      <>
        {/* Header */}
        <header className="z-10 px-6 py-2 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border-b border-gray-700/50 backdrop-blur-xl w-full sticky top-0 text-white">
          <div className="flex items-center gap-3">
            <CircuitBoard className="w-8 h-8 text-blue-400" />
            <div className='flex flex-col w-4/12'>
              <h1 className="text-md font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Sistema de Tickets
              </h1>
              <p className="text-xs text-gray-400">Centro de Servicios Del Área de Sistemas</p>
            </div>
            <div className="p-2 space-y-1.5 max-h-[650px] overflow-y-auto flex flex-row justify-center w-8/12">
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
                    </button>
                  ))}
                </div>
                <button className="text-red-500 fixed bottom-0 -right-1 w-10 h-8 flex items-center justify-center rounded-sm hover:text-yellow-600 hover:scale-110 active:scale-95 active:text-red-400 transition-all cursor-pointer" onClick={handleReload}><Loader size={18} className='hover:animate-spin' /></button>
          </div>
        </header>

        <div className="p-4 px-1 flex-1 m-0 overflow-hidden text-white">
          <div className="h-full flex gap-4 px-3">
            {/* Main Content Area */}
            <main className="flex-1 bg-gray-900/40 backdrop-blur-2xl rounded-2xl border border-gray-700/50 overflow-hidden max-h-[1080px] h-full">             
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
      </>
    </div>
  );
}

export default App;