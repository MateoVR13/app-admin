import { useState } from "react";
import { Field } from "./Field.jsx";
import { api } from "../api.js";

export function Recover({ switchTo }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Solo dígitos, máximo 4
  const onPin = (v) => setPin(v.replace(/\D/g, "").slice(0, 4));

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      await api.recover({ email, pin, newPassword });
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
        label="PIN de seguridad"
        name="pin"
        type="password"
        value={pin}
        onChange={onPin}
        error={errors.pin}
        autoComplete="off"
        inputMode="numeric"
        maxLength={4}
        hint="El PIN de 4 números que registraste al crear tu cuenta."
        tooltip="El PIN de seguridad es la clave de 4 números que elegiste al registrarte para poder recuperar tu contraseña."
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
