import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Mail, Phone } from 'lucide-react';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });

  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrint = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'datos-contacto.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Datos de Contacto</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              placeholder="ejemplo@dominio.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
      </div>

      <div>
        <div ref={canvasRef} className="bg-white text-black p-8 rounded-xl mb-4">
          <div className="border-b-2 border-gray-200 pb-4 mb-4">
            <h3 className="text-2xl font-bold text-center">Información de Contacto</h3>
            <p className="text-center text-gray-600">UPN 164</p>
          </div>
          <div className="space-y-6">
            {formData.email && (
              <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                <Mail className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium">Correo Electrónico:</p>
                  <p className="text-blue-600">{formData.email}</p>
                </div>
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                <Phone className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium">Teléfono:</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Descargar / Imprimir
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;