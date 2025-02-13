import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 5173, // Adjust for each branch
  },
});
