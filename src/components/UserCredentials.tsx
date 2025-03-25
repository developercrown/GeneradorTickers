import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const UserCredentials = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    platform: 'https://plataforma.upn164.edu.mx'
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
      link.download = 'credenciales-usuario.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Reposición de Credenciales</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plataforma</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
            >
              <option value="https://plataforma.upn164.edu.mx">Plataforma UPN</option>
              <option value="https://sia.upn164.edu.mx">SIA UPN</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div ref={canvasRef} className="bg-white text-black p-8 rounded-xl mb-4">
          <div className="border-b-2 border-gray-200 pb-4 mb-4">
            <h3 className="text-2xl font-bold text-center">Credenciales de Acceso</h3>
            <p className="text-center text-gray-600">UPN 164</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">URL de Acceso:</p>
              <p className="text-blue-600">{formData.platform}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Usuario:</p>
              <p>{formData.username}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Contraseña:</p>
              <p>{formData.password}</p>
            </div>
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

export default UserCredentials;