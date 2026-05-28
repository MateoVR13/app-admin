import { useState } from "react";
import { Field } from "./Field.jsx";
import { api } from "../api.js";

export function Login({ onSuccess, switchTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      const data = await api.login({ email, password });
      onSuccess(data.user);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      else setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <Field
        label="Correo electrónico"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        autoComplete="email"
        placeholder="tucorreo@ejemplo.com"
        autoFocus
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        autoComplete="current-password"
      />

      {serverError && <div className="auth-server-error">{serverError}</div>}

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "Entrando…" : "Iniciar sesión"}
      </button>

      <div className="auth-meta">
        <button
          type="button"
          className="auth-link"
          onClick={() => switchTo("recover")}
        >
          ¿Olvidaste tu contraseña?
        </button>
        <span className="auth-meta-sep">·</span>
        <button
          type="button"
          className="auth-link"
          onClick={() => switchTo("signup")}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
}
