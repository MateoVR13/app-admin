/**
 * Hidrata el bloque de usuario en el sidebar (solo app.html / dashboard).
 *
 * Flujo:
 *   1. GET /api/auth/me  → si hay sesión, muestra primer nombre.
 *   2. Click "Cerrar sesión" → POST /api/auth/logout → redirect a /.
 *
 * Si /me devuelve 401, el bloque queda oculto y la página sigue navegable
 * (por ahora no forzamos redirect — el visitante anónimo puede ver el dash).
 */
(function () {
  const root = document.querySelector("[data-sidebar-user]");
  if (!root) return;

  const nameEl = root.querySelector("[data-sidebar-user-name]");
  const logoutBtn = root.querySelector("[data-sidebar-logout]");

  function displayName(fullName) {
    if (!fullName) return "";
    const tokens = String(fullName).trim().split(/\s+/);
    return tokens.slice(0, 2).join(" ");
  }

  async function hydrate() {
    try {
      const res = await fetch("/api/auth/me", { credentials: "same-origin" });
      if (!res.ok) return; // 401: sin sesión, dejamos el bloque oculto
      const data = await res.json();
      const name = displayName(data?.user?.fullName);
      if (!name) return;
      nameEl.textContent = name;
      root.hidden = false;
    } catch (err) {
      console.warn("[sidebar-user] no se pudo cargar /me:", err);
    }
  }

  async function doLogout() {
    logoutBtn.disabled = true;
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } catch (err) {
      console.warn("[sidebar-user] logout falló (continuamos):", err);
    }
    window.location.href = "/";
  }

  logoutBtn.addEventListener("click", doLogout);
  hydrate();
})();
