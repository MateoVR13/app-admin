-- ============================================================
-- Migración 002 — esquema de cuentas email + PIN
--
-- Define la tabla `users` con:
--   email    (identificador de login, único)
--   pin_hash (PIN de 4 dígitos hasheado, para recuperación)
--
-- Idempotente: solo crea la tabla si no existe. El "reset" del
-- esquema viejo (username + document_hash) lo maneja db.js antes
-- de correr migraciones, comparando columnas — así NO se borran
-- usuarios en cada arranque.
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  pin_hash      TEXT NOT NULL,
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
