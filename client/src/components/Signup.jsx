import { useState } from "react";
import { Field } from "./Field.jsx";
import { api } from "../api.js";

export function Signup({ onSuccess, switchTo }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Solo dígitos, máximo 4
  const onPin = (v) => setPin(v.replace(/\D/g, "").slice(0, 4));

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      const data = await api.signup({ fullName, email, pin, password });
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
        label="Nombre completo"
        name="fullName"
        value={fullName}
        onChange={setFullName}
        error={errors.fullName}
        autoComplete="name"
        autoFocus
      />
      <Field
        label="Correo electrónico"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        autoComplete="email"
        placeholder="tucorreo@ejemplo.com"
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
        hint="4 números. Lo usarás para recuperar tu contraseña si la olvidas."
        tooltip="El PIN de seguridad es una clave de 4 números que TÚ ELIGES. Sirve solo para recuperar tu contraseña — anótalo en un lugar seguro porque sin él no podrás recuperar el acceso."
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        autoComplete="new-password"
        hint="Mínimo 8 caracteres."
      />

      {serverError && <div className="auth-server-error">{serverError}</div>}

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "Creando cuenta…" : "Crear cuenta"}
      </button>

      <div className="auth-meta">
        <span>¿Ya tienes cuenta?</span>
        <button
          type="button"
          className="auth-link"
          onClick={() => switchTo("login")}
        >
          Inicia sesión
        </button>
      </div>
    </form>
  );
}
