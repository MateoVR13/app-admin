/* ============================================================
   ACCESSIBILITY — control de tamaño de fuente, contraste y daltonismo
   Persistencia: localStorage
   ============================================================ */
(function initAccessibility() {
  const STORAGE_KEY = "ua-a11y-prefs";

  const defaults = {
    textSize: "md",      // sm | md | lg | xl
    contrast: "default", // default | high
    colorMode: "default", // default | protanopia | deuteranopia | tritanopia | achromatopsia
  };

  function load() {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
    } catch (e) {
      return { ...defaults };
    }
  }

  function save(prefs) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) { /* noop */ }
  }

  function apply(prefs) {
    const html = document.documentElement;
    html.setAttribute("data-text-size", prefs.textSize);
    html.setAttribute("data-contrast", prefs.contrast);
    html.setAttribute("data-color-mode", prefs.colorMode);
  }

  let prefs = load();
  apply(prefs);

  document.addEventListener("DOMContentLoaded", () => {
    const fab = document.querySelector("[data-a11y-fab]");
    const panel = document.querySelector("[data-a11y-panel]");
    if (!fab || !panel) return;

    function openPanel() {
      panel.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
    }
    function closePanel() {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    }
    function togglePanel() {
      const open = panel.classList.contains("is-open");
      open ? closePanel() : openPanel();
    }

    fab.addEventListener("click", togglePanel);
    panel.querySelector("[data-a11y-close]")?.addEventListener("click", closePanel);

    // close on outside click
    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("is-open")) return;
      if (panel.contains(e.target) || fab.contains(e.target)) return;
      closePanel();
    });

    // close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePanel();
    });

    function sync() {
      panel.querySelectorAll("[data-pref]").forEach((btn) => {
        const key = btn.dataset.pref;
        const val = btn.dataset.value;
        btn.classList.toggle("is-active", prefs[key] === val);
      });
    }

    // Click handlers for option buttons
    panel.querySelectorAll("[data-pref]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.pref;
        const val = btn.dataset.value;
        prefs[key] = val;
        save(prefs);
        apply(prefs);
        sync();
      });
    });

    // Reset
    panel.querySelector("[data-a11y-reset]")?.addEventListener("click", () => {
      prefs = { ...defaults };
      save(prefs);
      apply(prefs);
      sync();
    });

    sync();
  });
})();
