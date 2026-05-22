/**
 * DB layer — usa node:sqlite (integrado en Node 22.5+), sin dependencias nativas.
 * En Node 22-23 requiere --experimental-sqlite (ver scripts en package.json).
 * En Node 24+ es estable.
 */
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "data.sqlite");

export const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

// Aplica migraciones (idempotente — usan IF NOT EXISTS)
const migrationsDir = path.join(__dirname, "migrations");
fs.readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort()
  .forEach((f) => {
    const sql = fs.readFileSync(path.join(migrationsDir, f), "utf8");
    db.exec(sql);
  });

// ============================================================
// Prepared statements
// ============================================================
export const stmts = {
  getUserByUsername: db.prepare("SELECT * FROM users WHERE username = ?"),
  insertUser: db.prepare(`
    INSERT INTO users (full_name, username, password_hash, document_hash)
    VALUES (?, ?, ?, ?)
  `),
  updateUserPassword: db.prepare(`
    UPDATE users SET password_hash = ?, updated_at = unixepoch() WHERE id = ?
  `),

  getSession: db.prepare(`
    SELECT s.token, s.user_id, s.expires_at,
           u.id AS uid, u.full_name, u.username
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?
  `),
  insertSession: db.prepare(`
    INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)
  `),
  deleteSession: db.prepare("DELETE FROM sessions WHERE token = ?"),
  deleteSessionsForUser: db.prepare("DELETE FROM sessions WHERE user_id = ?"),
  cleanupExpiredSessions: db.prepare(
    "DELETE FROM sessions WHERE expires_at <= ?",
  ),
};

// Limpieza periódica de sesiones expiradas (cada hora)
setInterval(
  () => {
    try {
      stmts.cleanupExpiredSessions.run(Math.floor(Date.now() / 1000));
    } catch (e) {
      console.error("[db] cleanup error", e);
    }
  },
  60 * 60 * 1000,
).unref();
