import { useState } from "react";
import { Field } from "./Field.jsx";
import { api } from "../api.js";

export function Signup({ onSuccess, switchTo }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      const data = await api.signup({ fullName, username, password, document });
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
        label="Nombre de usuario"
        name="username"
        value={username}
        onChange={setUsername}
        error={errors.username}
        autoComplete="username"
        hint="3-30 caracteres. Letras, números, _ . -"
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
      <Field
        label="Número de seguridad"
        name="document"
        value={document}
        onChange={setDocument}
        error={errors.document}
        autoComplete="off"
        hint="Lo usarás para recuperar tu contraseña si la olvidas."
        tooltip="El número de seguridad es una clave que TÚ ELIGES (mínimo 5 dígitos). No es tu cédula. Sirve solo para recuperar tu contraseña — anótalo en un lugar seguro porque sin él no podrás recuperar el acceso."
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
