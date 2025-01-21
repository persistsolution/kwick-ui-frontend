import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5177, // Explicitly set the port for development
  },
  build: {
    outDir: 'dist', // Output directory for build files
    rollupOptions: {
      input: './src/main.tsx', // Entry point for your React app
    },
  },
  plugins: [react()],
});
