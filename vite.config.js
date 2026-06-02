import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Cambiá 'mi-portafolio' por el nombre exacto de tu repo en GitHub
  base: '/mi-portafolio/',
});
