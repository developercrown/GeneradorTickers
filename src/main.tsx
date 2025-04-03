// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <div className="flex flex-row items-center justify-center p-0 m-0">
    <App />
  </div>
);
