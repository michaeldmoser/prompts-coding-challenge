/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  publicDir: "./public",
  root: "./",
  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: "./src/main.tsx",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    origin: `http://localhost:5173`,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: false,
    // setupFiles: "./src/testing/setup.js",
    include: [
      "src/**/__tests__/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
  },
});
