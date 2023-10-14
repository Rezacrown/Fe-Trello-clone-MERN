import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
    
  },
  build: {
    assetsDir: "resource",
    cssMinify: "esbuild",
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
