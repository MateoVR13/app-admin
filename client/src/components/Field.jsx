import { useState } from "react";

export function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  autoFocus,
  placeholder,
  hint,
  tooltip,
  inputMode,
  maxLength,
}) {
  const isPassword = type === "password";
  const [reveal, setReveal] = useState(false);
  const inputType = isPassword && reveal ? "text" : type;

  return (
    <label className="auth-field">
      <span className="auth-field-label">
        {label}
        {tooltip && (
          <button
            type="button"
            className="auth-field-info"
            aria-label="Más información"
            data-tooltip={tooltip}
            tabIndex={0}
          >
            ?
          </button>
        )}
      </span>
      <span className={`auth-input-wrap ${isPassword ? "has-toggle" : ""}`}>
        <input
          className={`auth-input ${error ? "is-error" : ""}`}
          type={inputType}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          spellCheck={false}
        />
        {isPassword && (
          <button
            type="button"
            className="auth-input-toggle"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={reveal}
            tabIndex={0}
          >
            {reveal ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19M6.61 6.61A18.5 18.5 0 0 0 2 12s3 8 10 8a9.12 9.12 0 0 0 5.39-1.61" />
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M2 2l20 20" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </span>
      {hint && !error && <span className="auth-field-hint">{hint}</span>}
      {error && <span className="auth-field-error">{error}</span>}
    </label>
  );
}
