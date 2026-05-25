import { useState } from "react";
import { Field } from "./Field.jsx";
import { api } from "../api.js";

export function Recover({ switchTo }) {
  const [username, setUsername] = useState("");
  const [document, setDocument] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      await api.recover({ username, document, newPassword });
      setDone(true);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      else setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="auth-form">
        <div className="auth-success">
          <strong>Contraseña actualizada</strong>
          <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
        </div>
        <button
          className="auth-submit"
          type="button"
          onClick={() => switchTo("login")}
        >
          Ir al inicio de sesión
        </button>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <Field
        label="Usuario"
        name="username"
        value={username}
        onChange={setUsername}
        error={errors.username}
        autoComplete="username"
        autoFocus
      />
      <Field
        label="Número de seguridad"
        name="document"
        value={document}
        onChange={setDocument}
        error={errors.document}
        autoComplete="off"
        hint="El que registraste al crear tu cuenta."
        tooltip="El número de seguridad es la clave que elegiste al registrarte (mínimo 5 dígitos) para poder recuperar tu contraseña. No es tu cédula."
      />
      <Field
        label="Nueva contraseña"
        name="newPassword"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
        error={errors.newPassword}
        autoComplete="new-password"
        hint="Mínimo 8 caracteres."
      />

      {serverError && <div className="auth-server-error">{serverError}</div>}

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "Verificando…" : "Restablecer contraseña"}
      </button>

      <div className="auth-meta">
        <button
          type="button"
          className="auth-link"
          onClick={() => switchTo("login")}
        >
          ← Volver al inicio de sesión
        </button>
      </div>
    </form>
  );
}
