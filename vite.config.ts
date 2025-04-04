import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // Carpeta donde se generará el build
    emptyOutDir: true, // Limpia la carpeta antes de cada build
    assetsInlineLimit: 4096 // Tamaño límite para inline assets (4KB)
  },
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']
});
