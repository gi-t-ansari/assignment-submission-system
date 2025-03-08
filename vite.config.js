import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { API_URL } from "./src/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: API_URL.ASSIGNMENTS,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
