/* ============================================================
   MOBILE NAV — botón hamburguesa global que abre/cierra la sidebar
   en móvil. Inyectado dinámicamente para no tener que editar 15+ HTMLs.
   Se activa solo cuando hay .sidebar en la página.
   ============================================================ */
(function initMobileNav() {
  function boot() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    // Botón hamburguesa
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mobile-nav-toggle";
    btn.setAttribute("aria-label", "Abrir menú");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "ua-sidebar");
    btn.innerHTML = `
      <span class="mobile-nav-toggle-bars" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
    `;

    // Backdrop oscuro para cerrar tocando fuera
    const backdrop = document.createElement("div");
    backdrop.className = "mobile-nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");

    sidebar.id = sidebar.id || "ua-sidebar";
    document.body.appendChild(btn);
    document.body.appendChild(backdrop);

    function setOpen(open) {
      document.body.classList.toggle("is-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      btn.classList.toggle("is-active", open);
    }

    btn.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("is-nav-open"));
    });
    backdrop.addEventListener("click", () => setOpen(false));

    // ESC cierra
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("is-nav-open")) {
        setOpen(false);
      }
    });

    // Click en cualquier link de la sidebar cierra (navegación natural)
    sidebar.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    // Si la ventana crece más de mobile, cerramos por si quedó abierto
    const mq = window.matchMedia("(min-width: 641px)");
    mq.addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
