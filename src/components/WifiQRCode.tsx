import { useRef, useState, useEffect } from 'react';
import { QrCode, History, Trash2, Key } from 'lucide-react';

import TicketPrinter from './TicketPrinter';
import Sidebar from './Sidebar';

const ticketData = {
  title: "WIFI UPN164",
  subtitle: "CORONA TICKET SYSTEM 1.0",
};

interface WifiQRCodeInterface {
  requester: string;
  ssid: string;
  password: string;
  hidden: string;
  expiration: string;
  timedate: string;
  qrCode: string;
}

const EXPIRATION_OPTIONS = [
  { label: '1 hora', value: '1 hr' },
  { label: '2 horas', value: '2 hrs' },
  { label: '4 horas', value: '4 hrs' },
  { label: '6 horas', value: '6hrs' },
  { label: '8 horas', value: '8 hrs' },
  { label: '12 horas', value: '12 hrs' },
  { label: '24 horas', value: '24 hrs' },
  { label: '1 semana', value: '1 semana' },
  { label: '1 mes', value: '1 mes' },
  { label: 'Permanente', value: 'permanente' },
];

const AVAILABLE_SSID_MAP = [
  {
    label: "Invitados - UPN Edificio D",
    value: "Invitados - UPN Edificio D"
  },
  {
    label: "Invitados - UPN Biblioteca",
    value: "Invitados - UPN Biblioteca"
  },
  {
    label: "Invitados - UPN Edificio E",
    value: "Invitados - UPN Edificio E"
  },
  {
    label: "Invitados - UPN Computo",
    value: "Invitados"
  },
  {
    label: "Invitados - UPN Aula Invertida",
    value: "Invitados - UPN Aula Invertida"
  },
  {
    label: "Invitados - UPN Edificio A",
    value: "Invitados - UPN Edificio A"
  },
  {
    label: "Invitados - UPN Edificio B",
    value: "Invitados - UPN Edificio B"
  },
  {
    label: "Invitados - UPN Edificio C",
    value: "Invitados - UPN Edificio C"
  },
  {
    label: "Invitados - UPN Edificio F",
    value: "Invitados - UPN Edificio F"
  }
];

const PRIVACY_OPTIONS = [
  { label: 'Público', value: 'Red Pública' },
  { label: 'Reservada', value: 'Reservada' },
  { label: 'Oculto', value: 'Oculto' }
];

const mezclarString = (str: string): string => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

const createPasswordWiFi = (opciones: {
  letras?: number,
  numeros?: number,
  caracteresEsp?: number,
  mayusculas?: boolean,
}): string => {

  const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  const letras = opciones.mayusculas ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
  const nums = '0123456789';
  const especiales = '!@#$%&*?+-_=';

  const partes = [
    ...Array(opciones.letras || 0).fill(0).map(() => getRandomChar(letras)),
    ...Array(opciones.numeros || 0).fill(0).map(() => getRandomChar(nums)),
    ...Array(opciones.caracteresEsp || 0).fill(0).map(() => getRandomChar(especiales))
  ];

  return mezclarString(partes.join(''));
}

const WifiQRCode = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [qrCode, setQRCode] = useState('');
  const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(false);

  const generateQRCode = async () => {
    if (!formData.ssid || !formData.password) {
      alert('Por favor ingrese SSID y contraseña');
      return;
    }

    try {
      const QRCode = await import('qrcode');
      const wifiString = `WIFI:T:WPA;S:${formData.ssid};P:${formData.password};H:${formData.hidden === "Oculto" ? 'true' : 'false'};`;
      console.log(wifiString);

      const qrCodeDataURL = await QRCode.toDataURL(wifiString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });

      setQRCode(qrCodeDataURL);

      const newQRCode: WifiQRCodeInterface = {
        requester: formData.requester,
        ssid: formData.ssid,
        password: formData.password,
        hidden: formData.hidden,
        expiration: formData.expiration,
        timedate: new Date().toISOString(),
        qrCode: qrCodeDataURL,
      };
      console.log(newQRCode);

    } catch (err) {
      console.error('Error generating QR code:', err);
      alert('Error al generar el código QR');
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5)
    };
  };

  const resetForm = () => {
    setQRCode('');
  };

  const [formData, setFormData] = useState<WifiQRCodeInterface>({
    requester: '',
    ssid: 'Invitados',
    password: createPasswordWiFi({ letras: 2, numeros: 4 }),
    hidden: "public",
    expiration: '12h',
    timedate: `${getCurrentDateTime().date} ${getCurrentDateTime().time}`,
    qrCode: ''
  });

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const restorePassword = () => {
    const newPass = createPasswordWiFi({ letras: 2, numeros: 4 });
    setFormData(prev => ({ ...prev, ["password"]: newPass }));
  }

  const handleHideSidebar = () => {
    setSidebarVisibility(false);
  }

  return <>
    { sidebarVisibility && <Sidebar onHide={handleHideSidebar}/>}
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="bg-gray-800/50 border border-gray-700/30  rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Emsión de enlace Inalambrico</h2>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Solicitante</label>
            <input
              ref={nameInputRef}
              type="text"
              name="requester"
              value={formData.requester}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SSID</label>
            <select
              name="ssid"
              value={formData.ssid}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              {AVAILABLE_SSID_MAP.map((item, key) => (
                <option key={key} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-11/12 bg-transparent border-none outline-none"
              />
              <button onClick={restorePassword} className="w-1/12 h-8 transition-all rounded-full hover:scale-105 active:scale-95 hover:bg-slate-300 hover:bg-opacity-25 flex items-center justify-center"><Key size={20} /></button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Visibilidad:</label>
            <select
              name="hidden"
              value={formData.hidden}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              {PRIVACY_OPTIONS.map((item, key) => (
                <option key={key} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tiempo activo:</label>
            <select
              name="expiration"
              value={formData.expiration}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              {EXPIRATION_OPTIONS.map((item, key) => (
                <option key={key} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha de emisión: {formData.timedate}</label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-center gap-2">
          <button className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 p-2 rounded-sm w-1/3 mt-4" onClick={generateQRCode}>Crear Código</button>
          <button className="bg-orange-700 hover:bg-orange-600 active:bg-orange-800 p-2 rounded-sm w-1/3 mt-4" onClick={()=>setSidebarVisibility(true)}>Ver Historial</button>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <TicketPrinter
          title={ticketData.title}
          subtitle={ticketData.subtitle}
          ticketContent={[
            { label: "Solicitante", value: formData.requester, type: "string" },
            { label: "SSID", value: `${formData.ssid}`, type: "string" },
            { label: "Password", value: `${formData.password}`, type: "string" },
            { label: "Visibilidad", value: formData.hidden, type: "string" },
            { label: "Vigencia", value: formData.expiration, type: "string" },
            { label: "Fecha", value: formData.timedate, type: "string" }
          ]}
          highlightContent={[
            { label: "Código", value: qrCode ? qrCode : null, type: "qr" },
            // { label: "Hora", value: `${formData.hora} hrs`, type: "string" }
          ]}
          footerContent={[
            {
              value: "RESPONSABILIDADES DEL USO WIFI:",
              classNames: "mb-1 font-bold text-sm"
            },
            {
              value: "1. Las Credenciales de acceso y el Código QR exclusivo (no compartir con externos o no autorizados).",
              classNames: "text-xs font-bold"
            },
            {
              value: "2. Eres responsable del uso dado a esta red durante el tiempo reservado.",
              classNames: "text-xs font-bold"
            },
            {
              value: "3. Actividades ilícitas serán rastreadas.",
              classNames: "text-xs font-bold"
            },
            {
              value: "4. Reportar uso no autorizado.",
              classNames: "text-xs font-bold"
            }
          ]}
          showPreview={true}
          showDownload={true}
          showPrint={true}
          onPrint={() => console.log("Impresión iniciada")}
        />
      </div>
    </div>
  </>;
};

export default WifiQRCode;