import { useEffect, useState, useCallback } from "react";
import { Login } from "./components/Login.jsx";
import { Signup } from "./components/Signup.jsx";
import { Recover } from "./components/Recover.jsx";

const titles = {
  login: {
    h1: "Iniciar sesión en el",
    h2: "Simulador Inteligente de Experiencias Empresariales y Económicas",
    sub: "Bienvenido de nuevo",
  },
  signup: {
    h1: "Crear cuenta en el",
    h2: "Simulador Inteligente de Experiencias Empresariales y Económicas",
    sub: "Únete al simulador",
  },
  recover: {
    h1: "Recuperar acceso al",
    h2: "Simulador Inteligente de Experiencias Empresariales y Económicas",
    sub: "Verifica tu identidad con tu PIN de seguridad",
  },
};

export function AuthModal({ initialMode = "login", onClose }) {
  const [mode, setMode] = useState(initialMode);

  // Cierre con Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Tras login/signup exitoso → al dashboard
  const onSuccess = useCallback(() => {
    window.location.href = "/app";
  }, []);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const t = titles[mode];

  return (
    <div className="auth-overlay" onClick={onBackdrop}>
      <div
        className="auth-card"
        role="dialog"
        aria-modal="true"
        aria-label={t.h1}
      >
        <button
          className="auth-close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
        </button>

        <header className="auth-head">
          <div className="auth-logo-wrap">
            <img
              className="auth-logo"
              src="assets/brand/favicon.ico"
              alt="Universidad de América"
            />
          </div>
          <h2 className="auth-title">
            {t.h1} <span className="auth-title-accent">{t.h2}</span>
          </h2>
          <p className="auth-sub">{t.sub}</p>
        </header>

        {mode === "login" && <Login onSuccess={onSuccess} switchTo={setMode} />}
        {mode === "signup" && <Signup onSuccess={onSuccess} switchTo={setMode} />}
        {mode === "recover" && <Recover switchTo={setMode} />}
      </div>
    </div>
  );
}
