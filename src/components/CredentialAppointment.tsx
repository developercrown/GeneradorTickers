import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import LogoSistemas from '../assets/logosistemas.svg';
import LogoUPN from '../assets/LogotipoOficialUPN164-2025.svg';

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
    carrera: 'Licenciatura en pedagogía',
    fecha: getCurrentDateTime().date,
    hora: getCurrentDateTime().time,
    folioRecibo: '',
    folioPago: '',
  });

  const canvasRef = useRef(null);

  const carreras = [
    "Licenciatura en intervención educativa",
    "Licenciatura en pedagogía",
    "Licenciatura en Desarrollo Comunitario",
    "Licenciatura de Nivelación",
    "Maestría en Educación Básica",
    "Maestría en Educación Media Superior"
  ];

  const grupos = ['A', 'B', 'C', 'D', 'E', 'F'];
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

  const handlePrint = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'cita-credencializacion.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Datos de la Cita</h2>
        <div className="space-y-4">
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
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Carrera</label>
            <select
              name="carrera"
              value={formData.carrera}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            >
              {carreras.map(carrera => (
                <option key={carrera} value={carrera}>{carrera}</option>
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
          <div className="actions w-full flex items-center justify-center">
              <button
                onClick={handlePrint}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Descargar / Imprimir
              </button>
            </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div ref={canvasRef} className="bg-white text-black p-8 rounded-xl mb-4 w-96 min-h-96">
          <header className='w-full flex flex-row items-center justify-center'>
            <img src={LogoSistemas} alt="logotiposistemas" className='w-48' />
            <img src={LogoUPN} alt="logotipoupn" className='relative w-36 -left-4' />
          </header>
          <div className="border-b-2 border-gray-200 pb-4 mb-4">
            <h3 className="text-2xl font-bold text-center">Cita para Credencialización</h3>
            <p className="text-center text-gray-600">UPN 164</p>
          </div>
          <div className="space-y-1">
            <p><strong>Nombre:</strong> {formData.nombre}</p>
            <p><strong>Grupo:</strong> {formData.grado}{formData.grupo}</p>
            <p><strong>Carrera:</strong> {formData.carrera}</p>
            <p><strong>Fecha:</strong> {formData.fecha}</p>
            <p><strong>Hora:</strong> {formData.hora}</p>
            <p><strong>Folio Recibo:</strong> {formData.folioRecibo}</p>
            <p><strong>Folio Pago:</strong> {formData.folioPago}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CredentialAppointment;