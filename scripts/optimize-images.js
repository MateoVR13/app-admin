#!/usr/bin/env node
/**
 * Optimiza imágenes de assets/ in-place.
 *
 * Reglas:
 *  - JPG existentes  → recomprime a max 1920px ancho, calidad 82 (mozjpeg).
 *  - PNG sin alpha   → convierte a JPG (mismo nombre base, ext .jpg) y borra el .png.
 *  - PNG con alpha   → recomprime PNG (palette + Z9) sin cambiar formato.
 *  - assets/brand/   → SKIP (logos UA, no se tocan).
 *  - Si la nueva versión es más pesada que la original → mantiene la original.
 *
 * Imprime al final una tabla de PNG→JPG renombrados para que sed actualice los HTMLs.
 */
import sharp from "sharp";
import { readdir, stat, rename, unlink, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const TARGETS = [
  path.join(ROOT, "assets/images/new-images"),
  path.join(ROOT, "assets/modules"),
];
const MAX_WIDTH = 1920;
const JPG_QUALITY = 82;

const renamed = []; // { from: "...png", to: "...jpg" } — relativos a ROOT
let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let kept = 0;

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KB";
  return bytes + " B";
}

async function processFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const beforeSize = (await stat(absPath)).size;
  const img = sharp(absPath, { failOn: "none" });
  const meta = await img.metadata();

  const resize = meta.width && meta.width > MAX_WIDTH
    ? { width: MAX_WIDTH, withoutEnlargement: true }
    : null;

  let pipeline = sharp(absPath, { failOn: "none" });
  if (resize) pipeline = pipeline.resize(resize);

  const isPng = ext === ".png";
  const hasAlpha = !!meta.hasAlpha;
  const convertToJpg = isPng && !hasAlpha;

  const tmpPath = absPath + ".tmp";
  let finalPath = absPath;

  if (convertToJpg) {
    finalPath = absPath.replace(/\.png$/i, ".jpg");
    await pipeline
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
      .toFile(tmpPath);
  } else if (isPng) {
    await pipeline
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(tmpPath);
  } else {
    await pipeline
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
      .toFile(tmpPath);
  }

  const afterSize = (await stat(tmpPath)).size;

  // Solo aplicar si realmente ahorramos.
  if (afterSize >= beforeSize && !convertToJpg) {
    await unlink(tmpPath);
    kept++;
    console.log(
      `  KEEP   ${path.relative(ROOT, absPath)}  (${fmt(beforeSize)} — sin ahorro)`,
    );
    totalBefore += beforeSize;
    totalAfter += beforeSize;
    return;
  }

  if (convertToJpg) {
    // Borrar el PNG original y dejar el nuevo JPG.
    await rename(tmpPath, finalPath);
    if (finalPath !== absPath) await unlink(absPath);
    renamed.push({
      from: path.relative(ROOT, absPath),
      to: path.relative(ROOT, finalPath),
    });
  } else {
    await rename(tmpPath, absPath);
  }

  totalBefore += beforeSize;
  totalAfter += afterSize;
  processed++;
  const pct = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
  console.log(
    `  OK     ${path.relative(ROOT, finalPath)}  (${fmt(beforeSize)} → ${fmt(afterSize)}, -${pct}%)`,
  );
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // Recurse pero salta carpetas de backup o temporales.
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      await walk(full);
    } else if (e.isFile()) {
      try {
        await processFile(full);
      } catch (err) {
        console.error(`  FAIL   ${path.relative(ROOT, full)}: ${err.message}`);
      }
    }
  }
}

async function main() {
  console.log(`Optimizando imágenes (max ${MAX_WIDTH}px, JPG q${JPG_QUALITY}, mozjpeg)\n`);

  for (const dir of TARGETS) {
    console.log(`\n[${path.relative(ROOT, dir)}]`);
    await walk(dir);
  }

  console.log(`\n── Resumen ──`);
  console.log(`  Procesadas:  ${processed}`);
  console.log(`  Sin cambio:  ${kept}`);
  console.log(`  Antes:       ${fmt(totalBefore)}`);
  console.log(`  Después:     ${fmt(totalAfter)}`);
  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    const pct = ((saved / totalBefore) * 100).toFixed(1);
    console.log(`  Ahorro:      ${fmt(saved)} (-${pct}%)`);
  }

  if (renamed.length) {
    console.log(`\n── PNG → JPG renombrados (${renamed.length}) ──`);
    console.log(`Estos cambios de extensión deben aplicarse a los HTMLs:`);
    for (const { from, to } of renamed) {
      const fromBase = path.basename(from);
      const toBase = path.basename(to);
      console.log(`  ${fromBase}  →  ${toBase}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
