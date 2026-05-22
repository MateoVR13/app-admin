import { createRoot } from "react-dom/client";
import { AuthModal } from "./AuthModal.jsx";
import "./styles/auth.css";

console.info("[UAAuth bundle] imports listos · iniciando setup");

let root = null;
let host = null;

function ensureHost() {
  if (host) return host;
  host = document.getElementById("auth-root");
  if (!host) {
    host = document.createElement("div");
    host.id = "auth-root";
    document.body.appendChild(host);
  }
  return host;
}

function openModal(mode = "login") {
  ensureHost();
  if (!root) root = createRoot(host);
  root.render(<AuthModal initialMode={mode} onClose={closeModal} />);
}

function closeModal() {
  if (!root) return;
  root.unmount();
  root = null;
  if (host && host.parentNode) {
    host.parentNode.removeChild(host);
  }
  host = null;
}

// Diagnóstico — si ves esto en consola, el bundle cargó correctamente
console.info("[UAAuth] modal de autenticación listo");

// Asignación EXPLÍCITA al global — no dependemos del IIFE de Vite
const api = { open: openModal, close: closeModal };
window.UAAuth = api;

// Hash-based open: index.html#auth=signup abre el modal al cargar
const hash = window.location.hash.match(/auth=(login|signup|recover)/);
if (hash) openModal(hash[1]);

// Solo named exports — evita el wrapping de "default" en el IIFE
export { openModal as open, closeModal as close };
