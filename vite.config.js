import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite en modo "library" — empaqueta el modal de auth (React + CSS) en un
 * único bundle IIFE que se carga desde index.html con un <script> tag.
 *
 * Salida:
 *   src/js/auth-modal.js   (incluye React + ReactDOM + componentes)
 *   src/js/auth-modal.css  (estilos del modal)
 *
 * Expone: window.UAAuth.open(mode) / window.UAAuth.close()
 */
export default defineConfig({
  plugins: [react()],
  /**
   * Reemplaza referencias a process.env.NODE_ENV en el bundle.
   * React y varias libs lo usan internamente; sin esto el bundle
   * crashea en runtime con "process is not defined".
   */
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": JSON.stringify({ NODE_ENV: "production" }),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "client/src/main.jsx"),
      name: "UAAuth",
      formats: ["iife"],
      fileName: () => "auth-modal.js",
    },
    outDir: "src/js",
    emptyOutDir: false,
    cssCodeSplit: false,
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        exports: "named",
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith(".css")) return "auth-modal.css";
          return "auth-modal-[name][extname]";
        },
      },
    },
  },
});
