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

// Validación de email razonable (no exhaustiva — el RFC completo es absurdo).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// PIN: exactamente 4 dígitos.
const PIN_RE = /^\d{4}$/;

// ============================================================
// Validadores
// ============================================================
function validateSignup(body) {
  const fullName = trim(body.fullName);
  const email = trim(body.email).toLowerCase();
  const pin = trim(body.pin);
  const password = body.password ?? "";
  const errors = {};
  if (fullName.length < 3) errors.fullName = "Nombre completo demasiado corto.";
  if (!EMAIL_RE.test(email)) errors.email = "Correo electrónico inválido.";
  if (!PIN_RE.test(pin)) errors.pin = "El PIN debe ser exactamente 4 números.";
  if (password.length < 8) errors.password = "La contraseña debe tener al menos 8 caracteres.";
  return { fullName, email, pin, password, errors };
}

function validateLogin(body) {
  const email = trim(body.email).toLowerCase();
  const password = body.password ?? "";
  const errors = {};
  if (!email) errors.email = "Correo requerido.";
  if (!password) errors.password = "Contraseña requerida.";
  return { email, password, errors };
}

function validateRecover(body) {
  const email = trim(body.email).toLowerCase();
  const pin = trim(body.pin);
  const newPassword = body.newPassword ?? "";
  const errors = {};
  if (!email) errors.email = "Correo requerido.";
  if (!PIN_RE.test(pin)) errors.pin = "El PIN debe ser exactamente 4 números.";
  if (newPassword.length < 8) errors.newPassword = "Mínimo 8 caracteres.";
  return { email, pin, newPassword, errors };
}

// ============================================================
// POST /api/auth/signup
// ============================================================
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, pin, password, errors } = validateSignup(
      req.body || {},
    );
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    if (stmts.getUserByEmail.get(email)) {
      return res
        .status(409)
        .json({ errors: { email: "Ya existe una cuenta con ese correo." } });
    }

    const passwordHash = await hash(password);
    const pinHash = await hash(pin);
    const result = stmts.insertUser.run(
      fullName,
      email,
      passwordHash,
      pinHash,
    );

    // node:sqlite puede devolver BigInt; lo coercemos a Number para JSON
    const userId = Number(result.lastInsertRowid);
    const { token, expiresAt } = createSession(userId);
    setSessionCookie(res, token, expiresAt);

    res.json({
      user: { id: userId, fullName, email },
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
    const { email, password, errors } = validateLogin(req.body || {});
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const user = stmts.getUserByEmail.get(email);
    if (!user || !(await verify(password, user.password_hash))) {
      return res
        .status(401)
        .json({ error: "Correo o contraseña incorrectos." });
    }

    const userId = Number(user.id);
    const { token, expiresAt } = createSession(userId);
    setSessionCookie(res, token, expiresAt);

    res.json({
      user: {
        id: userId,
        fullName: user.full_name,
        email: user.email,
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
// Usa el PIN de 4 dígitos como secreto para restablecer contraseña
// ============================================================
router.post("/recover", async (req, res) => {
  try {
    const { email, pin, newPassword, errors } = validateRecover(
      req.body || {},
    );
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const user = stmts.getUserByEmail.get(email);
    if (!user || !(await verify(pin, user.pin_hash))) {
      return res
        .status(401)
        .json({ error: "Correo o PIN incorrectos." });
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
