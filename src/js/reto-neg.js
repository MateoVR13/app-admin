/* ============================================================
   RETO NEGOCIOS — RutaCafé · Simulador de exportación
   Identidad propia: mapa-mundi + pasaporte de mercado + sellos KPI
   ============================================================ */
(function initRetoNeg() {
  const STORAGE_KEY = "ua-reto-neg-v1";

  /* ============================================================
     DATA — Productos, mercados, incoterms, financiamiento
     Cada elemento aporta valores a 4 KPIs (encaje, costo, riesgo,
     cumplimiento) en escala 0–100. El score final depende también
     de SINERGIAS (ej. café especial × Alemania = bonus encaje).
     ============================================================ */
  const PRODUCTS = {
    verde: {
      label: "Café verde en grano",
      desc: "Commodity sin valor agregado",
      base: { encaje: 50, costo: 60, riesgo: 60, cumplimiento: 65 },
      reqs: ["ICA fitosanitario", "Empaque jute bags"],
    },
    especial: {
      label: "Café especial single-origin",
      desc: "Premium tostado con certificaciones",
      base: { encaje: 75, costo: 55, riesgo: 55, cumplimiento: 60 },
      reqs: ["Cert. Orgánico", "Comercio Justo", "Etiquetado origen"],
    },
    rtd: {
      label: "Café liofilizado / RTD",
      desc: "Innovación con planta procesadora",
      base: { encaje: 70, costo: 40, riesgo: 50, cumplimiento: 55 },
      reqs: ["INVIMA", "BPM (Buenas Prácticas Manufactura)", "Etiquetado nutricional"],
    },
    experiencia: {
      label: "Turismo cafetero (servicios)",
      desc: "Exportación de experiencia, no de bien",
      base: { encaje: 60, costo: 75, riesgo: 65, cumplimiento: 75 },
      reqs: ["Registro Nacional de Turismo", "Idioma inglés"],
    },
  };

  const MARKETS = {
    US: {
      label: "Estados Unidos",
      flag: "us",
      coords: "38.9°N · 77.0°W",
      tlc: "TLC vigente desde 2012",
      data: [
        ["Población", "335M"],
        ["PIB per cápita", "USD 80K"],
        ["Importa café", "USD 7.0B/año"],
        ["Arancel café", "0%"],
        ["Cert. mínimo", "FDA + USDA"],
      ],
      base: { encaje: 75, costo: 65, riesgo: 70, cumplimiento: 60 },
      synergyProduct: { especial: 15, rtd: 8 },
    },
    DE: {
      label: "Alemania",
      flag: "de",
      coords: "52.5°N · 13.4°E",
      tlc: "Acuerdo UE-Comunidad Andina (2013)",
      data: [
        ["Población", "84M"],
        ["PIB per cápita", "USD 52K"],
        ["Importa café", "USD 3.8B/año"],
        ["Arancel café", "0%"],
        ["Cert. mínimo", "EU Organic + GS1"],
      ],
      base: { encaje: 80, costo: 55, riesgo: 75, cumplimiento: 50 },
      synergyProduct: { especial: 18, verde: 5 },
    },
    KR: {
      label: "Corea del Sur",
      flag: "kr",
      coords: "37.5°N · 126.9°E",
      tlc: "TLC vigente desde 2016",
      data: [
        ["Población", "52M"],
        ["PIB per cápita", "USD 35K"],
        ["Importa café", "USD 1.1B/año"],
        ["Arancel café", "0% (con TLC)"],
        ["Cert. mínimo", "MFDS + K-Halal opc."],
      ],
      base: { encaje: 70, costo: 40, riesgo: 65, cumplimiento: 60 },
      synergyProduct: { especial: 12, rtd: 15 },
    },
    AE: {
      label: "Emiratos Árabes Unidos",
      flag: "ae",
      coords: "25.2°N · 55.3°E",
      tlc: "Sin TLC · arancel café crudo 0%",
      data: [
        ["Población", "10M"],
        ["PIB per cápita", "USD 53K"],
        ["Importa café", "USD 0.4B/año"],
        ["Arancel café", "0% crudo / 5% procesado"],
        ["Cert. mínimo", "ESMA + Halal"],
      ],
      base: { encaje: 65, costo: 50, riesgo: 55, cumplimiento: 45 },
      synergyProduct: { especial: 10, experiencia: 18 },
    },
  };

  const INCOTERMS = {
    EXW: {
      label: "EXW · Ex Works",
      desc: "Entrega en finca",
      base: { encaje: 50, costo: 35, riesgo: 80, cumplimiento: 80 },
    },
    FOB: {
      label: "FOB · Free On Board",
      desc: "Cargado en puerto Cartagena",
      base: { encaje: 70, costo: 60, riesgo: 65, cumplimiento: 70 },
    },
    CIF: {
      label: "CIF · Cost-Insurance-Freight",
      desc: "Entregado en puerto destino",
      base: { encaje: 75, costo: 70, riesgo: 55, cumplimiento: 65 },
    },
    DAP: {
      label: "DAP · Delivered At Place",
      desc: "Puerta del cliente",
      base: { encaje: 80, costo: 80, riesgo: 35, cumplimiento: 55 },
    },
  };

  const FINANCING = {
    bancoldex: {
      label: "Crédito Bancoldex",
      desc: "Banca pública exportadora",
      base: { encaje: 65, costo: 70, riesgo: 80, cumplimiento: 85 },
    },
    cooperacion: {
      label: "Cooperación internacional",
      desc: "Fondos no reembolsables (BID/USAID)",
      base: { encaje: 70, costo: 90, riesgo: 75, cumplimiento: 80 },
    },
    ecommerce: {
      label: "E-commerce directo D2C",
      desc: "Shopify/Amazon, sin intermediarios",
      base: { encaje: 80, costo: 75, riesgo: 50, cumplimiento: 65 },
    },
    multinacional: {
      label: "Alianza con multinacional",
      desc: "Vende a Nestlé/Starbucks/etc.",
      base: { encaje: 60, costo: 50, riesgo: 70, cumplimiento: 70 },
    },
  };

  /* ============================================================
     Estado + persistencia
     ============================================================ */
  const state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      const p = JSON.parse(raw);
      const cd = Number(p.currentStep);
      return {
        d1: p.d1 || null,
        d2: p.d2 || null,
        d3: p.d3 || null,
        d4: p.d4 || null,
        currentStep: [1, 2, 3, 4].includes(cd) ? cd : 1,
      };
    } catch {
      return defaults();
    }
  }
  function defaults() {
    return { d1: null, d2: null, d3: null, d4: null, currentStep: 1 };
  }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  /* ============================================================
     Cálculo de KPIs — combina las 4 decisiones con sinergias
     ============================================================ */
  function clamp(v) { return Math.max(0, Math.min(100, v)); }

  function computeKPIs() {
    const kpis = { encaje: 0, costo: 0, riesgo: 0, cumplimiento: 0 };
    let inputs = 0;

    function addBase(obj) {
      if (!obj || !obj.base) return;
      for (const k in obj.base) kpis[k] = (kpis[k] || 0) + obj.base[k];
      inputs++;
    }

    addBase(state.d1 ? PRODUCTS[state.d1] : null);
    addBase(state.d2 ? MARKETS[state.d2] : null);
    addBase(state.d3 ? INCOTERMS[state.d3] : null);
    addBase(state.d4 ? FINANCING[state.d4] : null);

    if (inputs === 0) return kpis;

    // Promedio de las decisiones tomadas
    for (const k in kpis) kpis[k] = Math.round(kpis[k] / inputs);

    // Sinergia producto × mercado (ej. especial × Alemania)
    if (state.d1 && state.d2) {
      const synergy = MARKETS[state.d2].synergyProduct?.[state.d1];
      if (synergy) kpis.encaje = clamp(kpis.encaje + synergy);
    }

    // Penalización si elegiste turismo (servicios) sin pasar por DAP/ecom
    if (state.d1 === "experiencia" && state.d3 && state.d3 !== "DAP") {
      kpis.cumplimiento = clamp(kpis.cumplimiento - 10);
    }

    // Bonus por usar cooperación + comercio justo (especial)
    if (state.d1 === "especial" && state.d4 === "cooperacion") {
      kpis.cumplimiento = clamp(kpis.cumplimiento + 10);
    }

    for (const k in kpis) kpis[k] = clamp(kpis[k]);
    return kpis;
  }

  function tone(v) {
    if (v >= 70) return "good";
    if (v >= 45) return "mid";
    if (v > 0) return "bad";
    return "empty";
  }

  /* ============================================================
     Render — fases, opciones, mapa, pasaporte, sellos
     ============================================================ */
  function renderActiveCard() {
    document.querySelectorAll(".neg-card").forEach((el) => {
      el.classList.toggle("is-active", Number(el.dataset.decision) === state.currentStep);
    });
  }

  function renderStepper() {
    const done = { 1: !!state.d1, 2: !!state.d2, 3: !!state.d3, 4: !!state.d4 };
    document.querySelectorAll("[data-stepper] .neg-step").forEach((el) => {
      const i = Number(el.dataset.goto);
      el.classList.remove("is-done", "is-current", "is-locked");
      el.disabled = !isStepUnlocked(i);
      if (!isStepUnlocked(i)) el.classList.add("is-locked");
      else if (i === state.currentStep) el.classList.add("is-current");
      else if (done[i]) el.classList.add("is-done");
    });
  }

  function renderOptions(faseKey) {
    const container = document.querySelector(`[data-options="${faseKey}"]`);
    if (!container) return;
    const selected = state[faseKey];
    container.querySelectorAll(".neg-option").forEach((btn) => {
      btn.classList.toggle("is-selected", btn.dataset.value === selected);
    });
  }

  /* ============================================================
     LEAFLET MAP — OpenStreetMap (tiles Carto Dark Matter)
     ============================================================ */
  const COORDS = {
    CO: [4.81, -75.69],   // Pereira, Risaralda
    US: [38.9, -77.0],    // Washington DC
    DE: [52.5, 13.4],     // Berlín
    KR: [37.5, 126.9],    // Seúl
    AE: [25.2, 55.3],     // Dubái
  };

  let leafletMap = null;
  let leafletMarkers = {};
  let leafletRoute = null;

  function initLeafletMap() {
    const el = document.querySelector("[data-leaflet-map]");
    if (!el || typeof L === "undefined") return;
    if (leafletMap) return; // ya inicializado

    leafletMap = L.map(el, {
      center: [25, -20],
      zoom: 2,
      minZoom: 2,
      maxZoom: 6,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false, // no hijackeamos el scroll de la página
      doubleClickZoom: false,
      worldCopyJump: true,
    });
    leafletMap.zoomControl.setPosition("topright");

    // Tiles oscuros (Carto Dark Matter) — gratis, mantiene la estética navy
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(leafletMap);

    // Pin de origen (Colombia) — siempre amarillo brillante
    L.circleMarker(COORDS.CO, {
      radius: 9,
      color: "#fff",
      weight: 2,
      fillColor: "#fbbf24",
      fillOpacity: 1,
      className: "neg-leaflet-pin is-origin",
    })
      .addTo(leafletMap)
      .bindTooltip("Colombia · RutaCafé", {
        permanent: true,
        direction: "top",
        className: "neg-leaflet-tooltip is-origin",
        offset: [0, -8],
      });

    // Pins de mercados destino
    ["US", "DE", "KR", "AE"].forEach((code) => {
      const marker = L.circleMarker(COORDS[code], {
        radius: 7,
        color: "#fff",
        weight: 1.5,
        fillColor: "rgba(255, 255, 255, 0.55)",
        fillOpacity: 0.8,
        className: "neg-leaflet-pin",
      })
        .addTo(leafletMap)
        .bindTooltip(MARKETS[code].label, {
          direction: "top",
          className: "neg-leaflet-tooltip",
          offset: [0, -6],
          permanent: true,
        });
      leafletMarkers[code] = marker;
    });
  }

  function renderMap() {
    if (!leafletMap) return;

    // Reset todos los markers de destino
    Object.entries(leafletMarkers).forEach(([code, marker]) => {
      marker.setStyle({
        radius: 7,
        fillColor: "rgba(255, 255, 255, 0.55)",
        fillOpacity: 0.8,
        weight: 1.5,
      });
      const tooltip = marker.getTooltip();
      if (tooltip) tooltip.options.className = "neg-leaflet-tooltip";
    });

    // Quitar ruta previa
    if (leafletRoute) {
      leafletMap.removeLayer(leafletRoute);
      leafletRoute = null;
    }

    if (!state.d2 || !leafletMarkers[state.d2]) return;

    // Highlight mercado activo
    const active = leafletMarkers[state.d2];
    active.setStyle({
      radius: 11,
      fillColor: "#a855f7",
      fillOpacity: 1,
      weight: 2,
    });
    const tooltip = active.getTooltip();
    if (tooltip) {
      tooltip.options.className = "neg-leaflet-tooltip is-active";
      tooltip._container?.classList.add("is-active");
    }

    // Ruta dashed Colombia → destino
    leafletRoute = L.polyline([COORDS.CO, COORDS[state.d2]], {
      color: "#a855f7",
      weight: 2.5,
      opacity: 0.85,
      dashArray: "8 8",
      className: "neg-leaflet-route",
    }).addTo(leafletMap);

    // Encuadrar para ver origen + destino con padding
    const bounds = L.latLngBounds([COORDS.CO, COORDS[state.d2]]);
    leafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 4, animate: true });
  }

  function renderPassport() {
    const empty = document.querySelector(".neg-passport-empty");
    const content = document.querySelector("[data-passport-content]");
    if (!state.d2) {
      if (empty) empty.style.display = "";
      if (content) content.hidden = true;
      return;
    }
    if (empty) empty.style.display = "none";
    if (content) content.hidden = false;

    const m = MARKETS[state.d2];
    document.querySelector("[data-passport-flag]").innerHTML =
      `<img class="neg-flag-img" src="https://flagcdn.com/${m.flag}.svg" alt="Bandera ${m.label}" loading="lazy" />`;
    document.querySelector("[data-passport-country]").textContent = m.label;
    document.querySelector("[data-passport-stamp]").textContent = m.tlc;

    const dl = document.querySelector("[data-passport-data]");
    dl.innerHTML = m.data.map(([k, v]) => `
      <div><dt>${k}</dt><dd>${v}</dd></div>
    `).join("");
  }

  function renderStamps() {
    const kpis = computeKPIs();
    document.querySelectorAll(".neg-stamp").forEach((el) => {
      const key = el.dataset.stamp;
      const v = kpis[key] || 0;
      const t = tone(v);
      el.classList.remove("is-good", "is-mid", "is-bad", "is-empty");
      el.classList.add("is-" + t);
      const valEl = el.querySelector("[data-stamp-value]");
      if (valEl) valEl.textContent = v > 0 ? v + "%" : "—";
    });
  }

  function renderProgress() {
    const done = [state.d1, state.d2, state.d3, state.d4].filter(Boolean).length;
    const progressEl = document.querySelector("[data-dashboard-progress]");
    if (progressEl) progressEl.textContent = done;
    const fillEl = document.querySelector("[data-progress-fill]");
    if (fillEl) fillEl.style.width = (done / 4) * 100 + "%";
  }

  function renderHowto() {
    const howto = document.querySelector("[data-howto]");
    if (howto) howto.classList.toggle("is-hidden", state.currentStep !== 1);
  }

  function renderCoords() {
    const tn = document.querySelector("[data-target-name]");
    const tc = document.querySelector("[data-target-coords]");
    if (!state.d2) {
      if (tn) tn.textContent = "Por definir";
      if (tc) tc.textContent = "—";
    } else {
      const m = MARKETS[state.d2];
      if (tn) tn.textContent = m.label;
      if (tc) tc.textContent = m.coords;
    }
  }

  function renderNavButtons() {
    document.querySelectorAll(".neg-card").forEach((card) => {
      const i = Number(card.dataset.decision);
      const prev = card.querySelector('[data-nav="prev"]');
      const next = card.querySelector('[data-nav="next"]');
      const finish = card.querySelector('[data-nav="finish"]');
      if (prev) prev.disabled = i === 1;
      if (next) next.disabled = !isStepUnlocked(i + 1);
      if (finish) finish.disabled = !state.d4;
    });
  }

  function renderAll() {
    renderActiveCard();
    renderStepper();
    renderOptions("d1");
    renderOptions("d2");
    renderOptions("d3");
    renderOptions("d4");
    renderMap();
    renderPassport();
    renderStamps();
    renderProgress();
    renderHowto();
    renderCoords();
    renderNavButtons();
  }

  /* ============================================================
     Navegación
     ============================================================ */
  function isStepUnlocked(n) {
    if (n === 1) return true;
    if (n === 2) return !!state.d1;
    if (n === 3) return !!state.d2;
    if (n === 4) return !!state.d3;
    return false;
  }

  function goToStep(n) {
    if (![1, 2, 3, 4].includes(n)) return;
    if (!isStepUnlocked(n)) return;
    state.currentStep = n;
    persist();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     Event handlers
     ============================================================ */
  function handleOptionClick(e) {
    const btn = e.currentTarget;
    const container = btn.closest("[data-options]");
    const key = container.dataset.options;
    const value = btn.dataset.value;
    state[key] = state[key] === value ? null : value;
    persist();
    renderAll();
  }
  function handleNavClick(e) {
    const dir = e.currentTarget.dataset.nav;
    if (dir === "finish") { showPlanModal(); return; }
    goToStep(state.currentStep + (dir === "next" ? 1 : -1));
  }
  function handleStepperClick(e) {
    const n = Number(e.currentTarget.dataset.goto);
    if (n) goToStep(n);
  }
  function handleReset() {
    if (!confirm("¿Reiniciar el simulador? Se perderán las decisiones.")) return;
    Object.assign(state, defaults());
    persist();
    closePlan();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     HOJA DE RUTA — modal final
     ============================================================ */
  function getVerdict() {
    const k = computeKPIs();
    const avg = (k.encaje + k.costo + k.riesgo + k.cumplimiento) / 4;
    if (avg >= 72) return {
      key: "estratega", tone: "good",
      cheerTitle: "¡Hoja de Ruta aprobada! Eres un Negociador Estratega Global",
      cheerSub: "RutaCafé sale a conquistar mercados con un plan robusto.",
      title: "Plan listo para ejecución inmediata",
      verdict: "Negociador Estratega Global",
      feedback: "<b>¡Felicitaciones!</b> Tu hoja de ruta integra producto, mercado, logística y financiamiento de forma coherente. <b>El encaje producto-mercado es alto</b>, los costos están controlados, los riesgos mitigados y el cumplimiento normativo cubierto. ProColombia firmaría este plan hoy mismo.",
    };
    if (avg >= 58) return {
      key: "solido", tone: "good",
      cheerTitle: "¡Hoja de Ruta emitida! Eres un Negociador Sólido",
      cheerSub: "Buen plan general, con espacio para refinar la propuesta.",
      title: "Plan aprobado con observaciones",
      verdict: "Negociador Sólido",
      feedback: "<b>¡Felicitaciones por completar el reto!</b> Tu plan funciona en lo esencial. <b>Hay margen para optimizar</b> en alguna dimensión —revisa qué sello quedó más bajo en la evaluación y ajusta esa decisión. Con esos cambios sería un plan de exportación de nivel exportador experto.",
    };
    if (avg >= 42) return {
      key: "aprendizaje", tone: "mid",
      cheerTitle: "¡Lo lograste! Negociador en Aprendizaje",
      cheerSub: "Plan viable, pero con riesgos importantes para gestionar.",
      title: "Plan con observaciones — requiere ajustes",
      verdict: "Negociador en Aprendizaje",
      feedback: "<b>¡Felicitaciones por completar el simulador!</b> Tu plan tiene <b>brechas serias</b> en al menos una dimensión. Antes de ejecutarlo, revisa especialmente el sello más débil. Recuerda: la regla de oro de exportar es que un solo eslabón débil arruina toda la cadena.",
    };
    return {
      key: "inicial", tone: "bad",
      cheerTitle: "¡Reto completado!",
      cheerSub: "Hay aprendizajes valiosos en este intento.",
      title: "Plan no viable — revisar y reintentar",
      verdict: "Negociador Inicial",
      feedback: "<b>¡Bien por terminar el simulador!</b> Tu plan tiene <b>varias dimensiones críticas</b>. Te recomendamos revisar la teoría de los 4 bloques (oferta exportable, documentación, costos de exportación, financiamiento) y volver a intentar. <i>Cada decisión es un aprendizaje — la próxima vez verás cómo encajan.</i>",
    };
  }

  function showPlanModal() {
    const modal = document.querySelector("[data-modal]");
    if (!modal) return;
    if (!state.d1 || !state.d2 || !state.d3 || !state.d4) return;

    const v = getVerdict();
    const k = computeKPIs();

    modal.querySelector("[data-modal-title]").textContent = v.title;
    modal.querySelector("[data-modal-verdict]").innerHTML = `Veredicto: <b>${v.verdict}</b>`;
    modal.querySelector("[data-modal-cheer-title]").textContent = v.cheerTitle;
    modal.querySelector("[data-modal-cheer-sub]").textContent = v.cheerSub;
    modal.dataset.tone = v.tone;

    // Ruta visual con las 4 decisiones
    const route = modal.querySelector("[data-plan-route]");
    route.innerHTML = `
      <div class="neg-plan-step is-product">
        <small>Producto</small>
        <b>${PRODUCTS[state.d1].label}</b>
        <span>${PRODUCTS[state.d1].desc}</span>
      </div>
      <div class="neg-plan-arrow">→</div>
      <div class="neg-plan-step is-market">
        <small>Mercado</small>
        <span class="neg-plan-flag"><img class="neg-flag-img" src="https://flagcdn.com/${MARKETS[state.d2].flag}.svg" alt="Bandera ${MARKETS[state.d2].label}" /></span>
        <b>${MARKETS[state.d2].label}</b>
      </div>
      <div class="neg-plan-arrow">→</div>
      <div class="neg-plan-step is-logistics">
        <small>Logística</small>
        <b>${INCOTERMS[state.d3].label}</b>
        <span>${INCOTERMS[state.d3].desc}</span>
      </div>
      <div class="neg-plan-arrow">→</div>
      <div class="neg-plan-step is-finance">
        <small>Financiamiento</small>
        <b>${FINANCING[state.d4].label}</b>
        <span>${FINANCING[state.d4].desc}</span>
      </div>
    `;

    // Scores: 4 sellos como en el dashboard, pero más grandes
    const scoresEl = modal.querySelector("[data-plan-scores]");
    const labels = {
      encaje: "Encaje producto-mercado",
      costo: "Costo logístico (margen)",
      riesgo: "Mitigación de riesgo",
      cumplimiento: "Cumplimiento normativo",
    };
    scoresEl.innerHTML = Object.entries(k).map(([key, val]) => {
      const t = tone(val);
      return `<div class="neg-plan-score is-${t}">
        <span>${labels[key]}</span>
        <div class="neg-plan-score-bar"><div class="neg-plan-score-fill" style="width:${val}%"></div></div>
        <b>${val}%</b>
      </div>`;
    }).join("");

    modal.querySelector("[data-plan-feedback]").innerHTML = `<p>${v.feedback}</p>`;

    modal.classList.add("is-open");
    document.body.classList.add("is-modal-open");

    // Forzar scroll a top (evita auto-scroll del browser al aria-labelledby)
    const content = modal.querySelector(".neg-plan-content");
    if (content) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        content.scrollTop = 0;
        modal.scrollTop = 0;
      }));
    }

    const intensity = v.tone === "good" ? 1 : v.tone === "mid" ? 0.6 : 0.35;
    fireConfetti(intensity);
  }

  function closePlan() {
    const modal = document.querySelector("[data-modal]");
    if (modal) modal.classList.remove("is-open");
    document.body.classList.remove("is-modal-open");
    stopConfetti();
  }

  /* ============================================================
     Confeti — paleta púrpura/turquesa para negocios
     ============================================================ */
  let confettiRAF = null;
  function fireConfetti(intensity = 1) {
    const canvas = document.querySelector("[data-confetti]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    const W = rect.width, H = rect.height;
    const colors = ["#7c3aed", "#a855f7", "#06b6d4", "#0ea5e9", "#fbbf24", "#22c55e", "#ec4899"];
    const N = Math.round(140 * intensity);
    const particles = [];

    function spawn(count, originX, vxBias) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * 0.6 - 0.3) - Math.PI / 2;
        const speed = 14 + Math.random() * 10;
        particles.push({
          x: originX, y: H * 0.95,
          vx: Math.cos(angle) * speed + vxBias,
          vy: Math.sin(angle) * speed,
          gravity: 0.32, drag: 0.992,
          size: 6 + Math.random() * 7,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.32,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() < 0.45 ? "rect" : Math.random() < 0.7 ? "circle" : "strip",
          life: 1,
        });
      }
    }
    spawn(N / 2, W * 0.15, 6);
    spawn(N / 2, W * 0.85, -6);
    setTimeout(() => {
      if (!document.querySelector("[data-modal].is-open")) return;
      spawn(Math.round(N * 0.4), W * 0.5, 0);
    }, 350);

    let frames = 0;
    const maxFrames = 280;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of particles) {
        if (p.y > H + 30) continue;
        alive++;
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx; p.y += p.vy; p.rot += p.vrot;
        p.life = Math.max(0, 1 - frames / maxFrames);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life * 1.3);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        else if (p.shape === "strip") ctx.fillRect(-p.size / 2, -1.5, p.size, 3);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
      frames++;
      if (alive > 0 && frames < maxFrames) confettiRAF = requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, W, H); confettiRAF = null; }
    }
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    confettiRAF = requestAnimationFrame(frame);
  }
  function stopConfetti() {
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    confettiRAF = null;
    const canvas = document.querySelector("[data-confetti]");
    if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    document.querySelectorAll(".neg-option").forEach((b) => b.addEventListener("click", handleOptionClick));
    document.querySelectorAll("[data-nav]").forEach((b) => b.addEventListener("click", handleNavClick));
    document.querySelectorAll("[data-stepper] .neg-step").forEach((b) => b.addEventListener("click", handleStepperClick));
    document.querySelectorAll("[data-reset]").forEach((b) => b.addEventListener("click", handleReset));
    document.querySelectorAll("[data-modal-close]").forEach((el) => el.addEventListener("click", closePlan));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePlan(); });
    initLeafletMap();
    renderAll();
    // Forzar invalidateSize después de que el layout esté listo (a veces
    // Leaflet calcula mal el tamaño inicial dentro de containers flex/grid)
    requestAnimationFrame(() => {
      if (leafletMap) leafletMap.invalidateSize();
    });
    // Re-calcular si se redimensiona la ventana
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
      }, 200);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
