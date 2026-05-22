import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.js";
import "./db.js"; // dispara migraciones al cargar

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// API
app.use("/api/auth", authRoutes);

// Archivos estáticos: landing (index.html), app (app.html), assets, src/, CSS
app.use(
  express.static(ROOT, {
    extensions: ["html"],
    setHeaders: (res, filePath) => {
      // En desarrollo no cacheamos NADA para que rebuilds se vean al recargar
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
    return res.status(404).sendFile(path.join(ROOT, "index.html"));
  }
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`\n  UA · Ciencias Administrativas`);
  console.log(`  http://localhost:${PORT}\n`);
});
