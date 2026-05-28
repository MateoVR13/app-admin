-- ============================================================
-- Migración inicial — sessions
--
-- NOTA: la tabla `users` la define ahora la migración 002
-- (esquema email + pin). Aquí solo queda `sessions`, que no
-- cambió. Como las migraciones se reejecutan en cada arranque,
-- crear `users` aquí con el esquema viejo entraría en conflicto
-- con el DROP/CREATE de 002 ("no such column: username").
-- ============================================================

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user    ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
