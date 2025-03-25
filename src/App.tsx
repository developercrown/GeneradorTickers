import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import WifiQR from './components/WifiQR';
import CredentialAppointment from './components/CredentialAppointment';
import UserCredentials from './components/UserCredentials';
import ContactInfo from './components/ContactInfo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wifi-qr" element={<WifiQR />} />
            <Route path="/credential-appointment" element={<CredentialAppointment />} />
            <Route path="/user-credentials" element={<UserCredentials />} />
            <Route path="/contact-info" element={<ContactInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;