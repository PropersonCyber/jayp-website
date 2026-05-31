import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import path from "path";

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@sections": path.resolve(__dirname, "./src/components/sections"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@composables": path.resolve(__dirname, "./src/composables"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
    strictPort: true,
  },
});
