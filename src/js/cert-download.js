/* ============================================================
   Certificado de participación · captura de usuario + descarga PDF
   Se incluye en los 3 retos (techcorp, biopack, rutacafe).
   Espera encontrar:
     - .coo-board-cert-frame  → contenedor del certificado
     - data-cert-name (opcional) → span donde inyectar el nombre
     - [data-cert-download] (opcional) → botón disparador
   Si no existe el botón, lo crea dinámicamente debajo del marco.
   ============================================================ */
(function initCertDownload() {
  "use strict";

  const STATE = { user: null, modulo: null };

  async function fetchUser() {
    try {
      const res = await fetch("/api/auth/me", { credentials: "same-origin" });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user || null;
    } catch (e) {
      console.warn("[cert] No se pudo obtener el usuario:", e);
      return null;
    }
  }

  function inferModulo() {
    const path = location.pathname;
    if (path.includes("reto-admin-techcorp")) return "administracion";
    if (path.includes("reto-eco-biopack"))    return "economia";
    if (path.includes("reto-neg-rutacafe"))   return "negocios";
    return "programa";
  }

  function setNombre(name) {
    document.querySelectorAll("[data-cert-name]").forEach((el) => {
      el.textContent = name;
    });
  }

  function fechaTexto() {
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const d = new Date();
    return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  }

  function setFecha() {
    document.querySelectorAll("[data-cert-date]").forEach((el) => {
      el.textContent = fechaTexto();
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error("No se pudo cargar " + src));
      document.head.appendChild(s);
    });
  }

  async function downloadCertPDF(btn) {
    const frame = document.querySelector(".coo-board-cert-frame");
    if (!frame) return;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Generando…";
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      // Ocultamos el botón durante la captura para que no aparezca en el PDF
      frame.classList.add("is-capturing");
      const canvas = await window.html2canvas(frame, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      frame.classList.remove("is-capturing");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let w, h;
      if (ratio > pageW / pageH) {
        w = pageW - 60;
        h = w / ratio;
      } else {
        h = pageH - 60;
        w = h * ratio;
      }
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", (pageW - w) / 2, (pageH - h) / 2, w, h);
      const filename = `certificado_${STATE.modulo}_${(STATE.user?.fullName || "usuario").replace(/\s+/g, "_")}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("[cert] Error generando PDF:", err);
      alert("No se pudo generar el PDF. Intenta de nuevo.");
    } finally {
      frame.classList.remove("is-capturing");
      btn.disabled = false;
      btn.textContent = original;
    }
  }

  function ensureDownloadButton() {
    let btn = document.querySelector("[data-cert-download]");
    if (btn) return btn;
    const frame = document.querySelector(".coo-board-cert-frame");
    if (!frame) return null;
    btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-cert-download", "");
    btn.className = "coo-board-cert-download";
    btn.innerHTML = "↓ Descargar certificado PDF";
    frame.appendChild(btn);
    return btn;
  }

  async function init() {
    STATE.modulo = inferModulo();
    STATE.user = await fetchUser();
    const name = STATE.user?.fullName || "Aspirante";
    setNombre(name);
    setFecha();
    const btn = ensureDownloadButton();
    if (btn) btn.addEventListener("click", () => downloadCertPDF(btn));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
