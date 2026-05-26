import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.js";
import "./db.js"; // dispara migraciones al cargar

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PAGES = path.join(ROOT, "pages");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// API
app.use("/api/auth", authRoutes);

// Redirects 301 desde URLs legacy (estructura plana) hacia la nueva por módulos.
const LEGACY_REDIRECTS = {
  "/programa-administracion": "/administracion/programa",
  "/programa-admin-bloque-1": "/administracion/bloque-1",
  "/programa-admin-bloque-2": "/administracion/bloque-2",
  "/reto-admin-techcorp": "/administracion/reto-techcorp",
  "/programa-economia": "/economia/programa",
  "/programa-eco-bloque-1": "/economia/bloque-1",
  "/programa-eco-bloque-2": "/economia/bloque-2",
  "/programa-eco-bloque-3": "/economia/bloque-3",
  "/programa-eco-bloque-4": "/economia/bloque-4",
  "/reto-eco-biopack": "/economia/reto-biopack",
  "/programa-negocios": "/negocios/programa",
  "/programa-neg-bloque-1": "/negocios/bloque-1",
  "/programa-neg-bloque-2": "/negocios/bloque-2",
  "/programa-neg-bloque-3": "/negocios/bloque-3",
  "/programa-neg-bloque-4": "/negocios/bloque-4",
  "/reto-neg-rutacafe": "/negocios/reto-rutacafe",
};

app.use((req, res, next) => {
  // Quitamos extensión .html y trailing slash para matchear la tabla.
  const key = req.path.replace(/\.html$/i, "").replace(/\/$/, "");
  const target = LEGACY_REDIRECTS[key];
  if (target && target !== req.path) return res.redirect(301, target);
  next();
});

// Rutas explícitas para los HTML de "core" (landing + app shell).
app.get(["/", "/index", "/index.html"], (_req, res) => {
  res.sendFile(path.join(PAGES, "core", "index.html"));
});
app.get(["/app", "/app.html"], (_req, res) => {
  res.sendFile(path.join(PAGES, "core", "app.html"));
});

// HTML por módulo: pages/<modulo>/<archivo>.html accesible como /<modulo>/<archivo>
app.use(
  express.static(PAGES, {
    extensions: ["html"],
    setHeaders: (res, filePath) => {
      if (process.env.NODE_ENV !== "production") {
        res.setHeader("Cache-Control", "no-store");
      } else if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);

// Archivos estáticos generales (assets, src/, styles.css, landing.css) servidos desde la raíz.
app.use(
  express.static(ROOT, {
    extensions: ["html"],
    setHeaders: (res, filePath) => {
      if (process.env.NODE_ENV !== "production") {
        res.setHeader("Cache-Control", "no-store");
      } else if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);

// 404 catch-all — NO devuelve HTML para requests de assets (JS/CSS/img),
// porque el browser intentaría parsear HTML como JS y crashearía.
app.use((req, res) => {
  const url = req.path.toLowerCase();
  const isAsset = /\.(js|css|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|mp4|json)$/.test(
    url,
  );
  if (isAsset) {
    console.warn(`[404] asset no encontrado: ${req.path}`);
    return res.status(404).type("text/plain").send(`Not found: ${req.path}`);
  }
  if (req.accepts("html")) {
    return res.status(404).sendFile(path.join(PAGES, "core", "index.html"));
  }
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`\n  UA · Ciencias Administrativas`);
  console.log(`  http://localhost:${PORT}\n`);
});
