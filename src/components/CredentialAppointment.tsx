import { useRef, useState, useEffect } from 'react';

import TicketPrinter from './TicketPrinter';
import { ArrowDownToDotIcon, CalendarPlus } from 'lucide-react';

const ticketData = {
  title: "Cita para Credencialización",
  subtitle: "CORONA TICKET SYSTEM 1.0",
};

const CredentialAppointment = () => {
  const nombreInputRef = useRef<HTMLInputElement>(null);

  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5)
    };
  };

  const [formData, setFormData] = useState({
    nombre: '',
    grupo: 'A',
    grado: '1',
    carrera: 'LIE',
    fecha: getCurrentDateTime().date,
    hora: getCurrentDateTime().time,
    folioRecibo: '',
    folioPago: '',
  });

  const carreras = [
    {
      label: "Licenciatura en intervención educativa",
      value: "LIE"
    },
    {
      label: "Licenciatura en pedagogía",
      value: "LP"
    },
    {
      label: "Licenciatura en Desarrollo Comunitario",
      value: "LDC"
    },
    {
      label: "Licenciatura de Nivelación",
      value: "LINI"
    },
    {
      label: "Maestría en Educación Básica",
      value: "MEB"
    },
    {
      label: "Maestría en Educación Media Superior",
      value: "MEMS"
    },
    {
      label: "Maestría en Educación con Campo en Práctica Docente",
      value: "MECPD"
    }
  ]

  const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const grados = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  useEffect(() => {
    if (nombreInputRef.current) {
      nombreInputRef.current.focus();
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parseGrupo = (grado: string = "", grupo: string = "") => {
    return (`${grado}${grupo}`).toUpperCase();
  }

  const addMinutesToTime = (timeString: string, minutesToAdd: number): string =>{
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  const handleNewAppointment = () => {
    let id: string | number = formData.folioRecibo;
    const newTime = addMinutesToTime(formData.hora, 15);
    if(isNaN(parseInt(id))){
      id="";
    } else {
      id = parseInt(id) + 1;
    }
    setFormData({
      nombre: '',
      grupo: formData.grupo,
      grado: formData.grado,
      carrera: formData.carrera,
      fecha: formData.fecha,
      hora: newTime,
      folioRecibo: id+"",
      folioPago: "",
    })
  }

  return (
    <div className="m-0 p-0 flex flex-col lg:flex-row">
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30 w-full lg:w-8/12">
        <h2 className="text-2xl font-bold mb-6 text-center">Datos de la Cita</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Folio Recibo</label>
            <div className="icontrols flex flex-row gap-2 items-center justify-center">
              <button className="bg-orange-500 w-12 h-10 flex items-center justify-center rounded-lg" onClick={handleNewAppointment}>
                <CalendarPlus size={24} />
              </button>
              <input
                type="text"
                name="folioRecibo"
                value={formData.folioRecibo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Folio Pago</label>
            <input
              type="text"
              name="folioPago"
              value={formData.folioPago}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input
              ref={nombreInputRef}
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Grado</label>
              <select
                name="grado"
                value={formData.grado}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {grados.map(grado => (
                  <option key={grado} value={grado}>{grado}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grupo</label>
              <select
                name="grupo"
                value={formData.grupo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                {grupos.map(grupo => (
                  <option key={grupo} value={grupo}>{grupo}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Carrera</label>
            <select
              name="carrera"
              value={formData.carrera}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              {carreras.map((carrera, key) => (
                <option key={key} value={carrera.value}>{carrera.label}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900/50 rounded border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>


        </div>
      </div>

      <div className="w-full lg:w-4/12 overflow-hidden flex flex-col justify-center items-center">
        <TicketPrinter
          title={ticketData.title}
          subtitle={ticketData.subtitle}
          ticketContent={[
            { label: "Folio Recibo", value: `${formData.folioRecibo}`, type: "string" },
            { label: "Folio Pago", value: `${formData.folioPago}`, type: "string" },
            { label: "Nombre", value: formData.nombre, type: "string" },
            { label: "Grupo", value: parseGrupo(formData.grado, formData.grupo), type: "string" },
            { label: "Carrera", value: (formData.carrera).toUpperCase(), type: "string" }
          ]}
          highlightContent={[
            { label: "Fecha", value: formData.fecha, type: "string" },
            { label: "Hora", value: `${formData.hora} hrs`, type: "string" }
          ]}
          footerContent={[
            { value: "INSTRUCCIONES IMPORTANTES:", classNames: "mb-1 font-bold" },
            { value: "1. Presentar este ticket el día de la cita." },
            { value: "2. Llevar identificación oficial." },
            { value: "3. Debes estar listo para la toma fotográfica." },
            { value: "Departamento de Sistemas y Tecnologias de la información", classNames: "mt-4" },
          ]}
          showPreview={true}
          showDownload={true}
          showPrint={true}
          onPrint={() => console.log("Impresión iniciada")}
        />
      </div>
    </div>
  );
};

export default CredentialAppointment;