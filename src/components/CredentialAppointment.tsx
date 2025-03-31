import { useRef, useState, useEffect } from 'react';

import TicketPrinter from './TicketPrinter';

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

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Datos de la Cita</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Folio Recibo</label>
            <input
              type="text"
              name="folioRecibo"
              value={formData.folioRecibo}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Folio Pago</label>
            <input
              type="text"
              name="folioPago"
              value={formData.folioPago}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Grado</label>
              <select
                name="grado"
                value={formData.grado}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
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
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
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
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora</label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              />
            </div>
          </div>


        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
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