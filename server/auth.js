import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { stmts } from "./db.js";

const COST = 12;
const SESSION_DAYS = 7;
export const COOKIE_NAME = "ua_session";

export const hash = (s) => bcrypt.hash(s, COST);
export const verify = (s, h) => bcrypt.compare(s, h);

export function newToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function createSession(userId) {
  const token = newToken();
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * SESSION_DAYS;
  stmts.insertSession.run(token, userId, expiresAt);
  return { token, expiresAt };
}

export function getSession(token) {
  if (!token) return null;
  const now = Math.floor(Date.now() / 1000);
  const row = stmts.getSession.get(token, now);
  if (!row) return null;
  return {
    token: row.token,
    user: {
      id: Number(row.uid),
      fullName: row.full_name,
      email: row.email,
    },
  };
}

export function destroySession(token) {
  if (token) stmts.deleteSession.run(token);
}

export function setSessionCookie(res, token, expiresAt) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: (expiresAt - Math.floor(Date.now() / 1000)) * 1000,
    path: "/",
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

export function requireAuth(req, res, next) {
  const sess = getSession(req.cookies?.[COOKIE_NAME]);
  if (!sess) return res.status(401).json({ error: "No autenticado" });
  req.session = sess;
  next();
}
