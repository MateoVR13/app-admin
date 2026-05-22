import { Router } from "express";
import { stmts } from "../db.js";
import {
  hash,
  verify,
  createSession,
  getSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  COOKIE_NAME,
} from "../auth.js";

const router = Router();

const trim = (s) => (typeof s === "string" ? s.trim() : "");

// ============================================================
// Validadores
// ============================================================
function validateSignup(body) {
  const fullName = trim(body.fullName);
  const username = trim(body.username).toLowerCase();
  const password = body.password ?? "";
  const document = trim(body.document);
  const errors = {};
  if (fullName.length < 3) errors.fullName = "Nombre completo demasiado corto.";
  if (!/^[a-z0-9_.\-]{3,30}$/.test(username))
    errors.username = "Usuario: 3-30 caracteres (letras, números, _ . -).";
  if (password.length < 8) errors.password = "La contraseña debe tener al menos 8 caracteres.";
  if (document.length < 5) errors.document = "Documento demasiado corto.";
  return { fullName, username, password, document, errors };
}

function validateLogin(body) {
  const username = trim(body.username).toLowerCase();
  const password = body.password ?? "";
  const errors = {};
  if (!username) errors.username = "Usuario requerido.";
  if (!password) errors.password = "Contraseña requerida.";
  return { username, password, errors };
}

function validateRecover(body) {
  const username = trim(body.username).toLowerCase();
  const document = trim(body.document);
  const newPassword = body.newPassword ?? "";
  const errors = {};
  if (!username) errors.username = "Usuario requerido.";
  if (!document) errors.document = "Documento requerido.";
  if (newPassword.length < 8) errors.newPassword = "Mínimo 8 caracteres.";
  return { username, document, newPassword, errors };
}

// ============================================================
// POST /api/auth/signup
// ============================================================
router.post("/signup", async (req, res) => {
  try {
    const { fullName, username, password, document, errors } = validateSignup(
      req.body || {},
    );
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    if (stmts.getUserByUsername.get(username)) {
      return res
        .status(409)
        .json({ errors: { username: "Ese usuario ya existe." } });
    }

    const passwordHash = await hash(password);
    const documentHash = await hash(document);
    const result = stmts.insertUser.run(
      fullName,
      username,
      passwordHash,
      documentHash,
    );

    // node:sqlite puede devolver BigInt; lo coercemos a Number para JSON
    const userId = Number(result.lastInsertRowid);
    const { token, expiresAt } = createSession(userId);
    setSessionCookie(res, token, expiresAt);

    res.json({
      user: { id: userId, fullName, username },
    });
  } catch (err) {
    console.error("[auth/signup]", err);
    res.status(500).json({ error: "Error interno." });
  }
});

// ============================================================
// POST /api/auth/login
// ============================================================
router.post("/login", async (req, res) => {
  try {
    const { username, password, errors } = validateLogin(req.body || {});
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const user = stmts.getUserByUsername.get(username);
    if (!user || !(await verify(password, user.password_hash))) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    const userId = Number(user.id);
    const { token, expiresAt } = createSession(userId);
    setSessionCookie(res, token, expiresAt);

    res.json({
      user: {
        id: userId,
        fullName: user.full_name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("[auth/login]", err);
    res.status(500).json({ error: "Error interno." });
  }
});

// ============================================================
// POST /api/auth/logout
// ============================================================
router.post("/logout", (req, res) => {
  destroySession(req.cookies?.[COOKIE_NAME]);
  clearSessionCookie(res);
  res.json({ ok: true });
});

// ============================================================
// POST /api/auth/recover
// Usa documento como secreto para restablecer contraseña
// ============================================================
router.post("/recover", async (req, res) => {
  try {
    const { username, document, newPassword, errors } = validateRecover(
      req.body || {},
    );
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const user = stmts.getUserByUsername.get(username);
    if (!user || !(await verify(document, user.document_hash))) {
      return res
        .status(401)
        .json({ error: "Usuario o documento incorrectos." });
    }

    const passwordHash = await hash(newPassword);
    stmts.updateUserPassword.run(passwordHash, user.id);
    // invalida cualquier sesión previa por seguridad
    stmts.deleteSessionsForUser.run(user.id);

    res.json({ ok: true });
  } catch (err) {
    console.error("[auth/recover]", err);
    res.status(500).json({ error: "Error interno." });
  }
});

// ============================================================
// GET /api/auth/me
// ============================================================
router.get("/me", (req, res) => {
  const sess = getSession(req.cookies?.[COOKIE_NAME]);
  if (!sess) return res.status(401).json({ error: "No autenticado" });
  res.json({ user: sess.user });
});

export default router;
