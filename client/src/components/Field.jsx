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
}) {
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
      <input
        className={`auth-input ${error ? "is-error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        spellCheck={false}
      />
      {hint && !error && <span className="auth-field-hint">{hint}</span>}
      {error && <span className="auth-field-error">{error}</span>}
    </label>
  );
}
