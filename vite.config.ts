import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: "/kwickbill", // Ensures correct asset paths
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 5174, // Adjust for each branch
  },
});
