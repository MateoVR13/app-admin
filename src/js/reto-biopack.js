/* ============================================================
   RETO BIOPACK — tablero interactivo de decisiones
   Estado simple: { fase1: string|null, fase2: string[], fase3: string|null }
   Render reactivo: cada selección recalcula impactos + resumen.
   Persistencia: localStorage para no perder progreso al recargar.
   ============================================================ */
(function initRetoBioPack() {
  const STORAGE_KEY = "ua-reto-biopack-v1";

  /* ============================================================
     Datos del reto — separados de la UI para legibilidad
     ============================================================ */

  // Choque base: euro sube 20% → inflación importada bruta ≈ 10% sobre el
  // costo total (porque 50% del costo viene en euros). Cada opción mitiga
  // ese impacto en distinta proporción.
  const FASE1 = {
    forward: {
      label: "Asegurar el precio del euro con el banco",
      badge: "Bajo riesgo",
      tone: "ok",
      stats: [
        { k: "Utilidad final", v: "37%", tone: "ok" },
        { k: "Subida de costos absorbida", v: "1.5%", tone: "ok" },
        { k: "Protección dura", v: "6 meses", tone: "" },
      ],
      text: [
        "Funciona como una <b>reserva del precio</b>: el banco te promete venderte euros a un precio fijo durante 6 meses. La subida que iba a golpear tus costos (10%) se reduce a casi nada (1.5%) y recuperas casi toda la utilidad.",
        "Hay un detalle: si el euro bajara, no te beneficias tampoco — estás amarrado al precio que pactaste. Y al cabo de 6 meses la protección termina y hay que renegociar.",
      ],
      robustness: 8,
    },
    local: {
      label: "Buscar proveedores en Colombia",
      badge: "Riesgo medio",
      tone: "warn",
      stats: [
        { k: "Utilidad final", v: "34%", tone: "warn" },
        { k: "Subida de costos absorbida", v: "3%", tone: "warn" },
        { k: "Tiempo para cambiar", v: "3–6 meses", tone: "" },
      ],
      text: [
        "Reemplazar parte de los materiales importados por nacionales ataca el problema de raíz: dejas de depender del euro <b>para siempre</b>, no solo unos meses.",
        "El riesgo es real: cambiar de proveedor puede afectar la calidad y la regularidad, dos cosas que el cliente europeo valora mucho. Toca hacer pruebas antes y aún así queda una parte expuesta a la subida.",
      ],
      robustness: 7,
    },
    natural: {
      label: "Vender al cliente europeo también en euros",
      badge: "Bajo riesgo",
      tone: "ok",
      stats: [
        { k: "Utilidad final", v: "39%", tone: "ok" },
        { k: "Subida de costos absorbida", v: "0%", tone: "ok" },
        { k: "Depende del cliente", v: "Sí", tone: "warn" },
      ],
      text: [
        "Si compras en euros y también cobras en euros, los movimientos del tipo de cambio se cancelan solos: cuando el euro sube, tus costos suben pero tus ingresos también. Es la <b>protección más barata</b> que existe.",
        "La condición: necesitas que el cliente acepte pagarte en euros. En ventas grandes a empresas esto suele ser normal; conviene confirmarlo cuando recolectes evidencia del mercado.",
      ],
      robustness: 9,
    },
    nada: {
      label: "Esperar a que la tasa baje sola",
      badge: "Alto riesgo",
      tone: "warn",
      stats: [
        { k: "Utilidad final", v: "28%", tone: "warn" },
        { k: "Subida de costos absorbida", v: "10%", tone: "warn" },
        { k: "Que vuelva el precio normal", v: "Incierto", tone: "warn" },
      ],
      text: [
        "Absorbes <b>el golpe completo</b> de la subida (≈10% sobre el costo total). Apostar a que la tasa vuelva a su nivel anterior solo tiene sentido si hay señales claras de que va a pasar pronto — y en Colombia entre 2020 y 2024 eso no ocurrió.",
        "Si la situación se mantiene 12 meses o más, la utilidad se erosiona tanto que <b>pone en duda el plan de exportar a Europa</b>. Vas a terminar tomando la misma decisión, pero ya bajo presión y con menos opciones.",
      ],
      robustness: 3,
    },
  };

  // Fase 2: cada fuente tiene un peso. La calidad de la evidencia
  // se calcula con bonus si combinas fuentes que se complementan.
  const FASE2_METHODS = {
    encuesta: { label: "Encuesta a compradores",     weight: 3 },
    scraping: { label: "Precios online recogidos",   weight: 2 },
    ab:       { label: "Prueba con dos precios",     weight: 4 },
    focus:    { label: "Conversaciones grupales",    weight: 1 },
    eurostat: { label: "Estadísticas oficiales UE",  weight: 2 },
  };

  // Combinaciones que se refuerzan entre sí
  const FASE2_SYNERGIES = [
    { keys: ["encuesta", "ab"], bonus: 2,
      note: "Combinaste lo que la gente <b>dice</b> que pagaría (encuesta) con lo que <b>hace</b> en una tienda real (prueba con dos precios). Es la mejor combinación: cruza intención con comportamiento." },
    { keys: ["scraping", "eurostat"], bonus: 1,
      note: "Los precios online + los datos oficiales te dan un mapa rápido y barato de cómo se vende lo «verde» en Europa, sin gastar en estudios propios." },
    { keys: ["encuesta", "focus"], bonus: 1,
      note: "La encuesta te dice <b>cuántos</b> pagarían más; las conversaciones grupales te dicen <b>por qué</b>. Juntas dan números con explicación." },
  ];

  // Triple impacto = económico + social + ambiental.
  // Costo de oportunidad = qué dejas de ganar al elegir esta opción.
  const FASE3 = {
    A: {
      label: "Pagar el impuesto",
      badge: "Solución de corto plazo",
      tone: "warn",
      stats: [
        { k: "Utilidad", v: "−15 puntos", tone: "warn" },
        { k: "Qué tienes que invertir", v: "Nada", tone: "ok" },
        { k: "Qué dejas de ganar", v: "Mucho", tone: "warn" },
        { k: "Impacto en planeta y gente", v: "Bajo", tone: "warn" },
      ],
      text: [
        "Sigues vendiendo desde mañana, pero <b>el impuesto se queda contigo para siempre</b>. La idea del impuesto era empujarte a mejorar; al pagarlo y seguir igual, nunca mejoras y nunca dejas de pagarlo.",
        "<b>Te pierdes mucho:</b> el precio extra que la gente paga por productos certificados, las compras de gobiernos europeos que solo le compran a empresas con sello verde, y la imagen ecológica que era justamente la razón de existir de BioPack.",
      ],
      robustness: 3,
      tripleImpact: 3,
    },
    B: {
      label: "Invertir en certificar la planta",
      badge: "Decisión estratégica",
      tone: "ok",
      stats: [
        { k: "Recuperas lo invertido en", v: "~24 meses", tone: "" },
        { k: "Puedes cobrar de más", v: "+8 a 12%", tone: "ok" },
        { k: "Qué dejas de ganar", v: "Poco", tone: "ok" },
        { k: "Impacto en planeta y gente", v: "Alto", tone: "ok" },
      ],
      text: [
        "Inviertes una vez y resuelves el problema para siempre: la UE deja de cobrarte el impuesto, puedes cobrar un poco más por el sello oficial y entras a las licitaciones públicas europeas que solo aceptan productos certificados.",
        "<b>Es la opción que más cuida el negocio en todas sus dimensiones:</b> mejora la utilidad (premium + nuevos canales), mejora las condiciones laborales (la certificación lo exige) y mejora el ambiente (cierra el ciclo del producto). Construyes capacidad que sirve hoy y en cualquier regulación futura.",
      ],
      robustness: 9,
      tripleImpact: 9,
    },
    C: {
      label: "Cambiar de mercado",
      badge: "Decisión defensiva",
      tone: "warn",
      stats: [
        { k: "Mantienes la utilidad", v: "Sí", tone: "ok" },
        { k: "Imagen ecológica premium", v: "Se pierde", tone: "warn" },
        { k: "Qué dejas de ganar", v: "Muchísimo", tone: "warn" },
        { k: "Impacto en planeta y gente", v: "Bajo", tone: "warn" },
      ],
      text: [
        "Salvas la utilidad ahora, pero <b>renuncias a la razón por la que naciste</b>: BioPack existe porque su producto es biodegradable. Si te vas a mercados donde nadie valora eso, esa ventaja se vuelve invisible y la empresa pierde su sello distintivo.",
        "Además, los países con regulación más floja hoy suelen apretarla en 3 a 5 años (es lo que pasa cuando Europa marca la pauta). Vas a tener que volver a tomar esta misma decisión más adelante, pero sin la planta certificada que pudiste construir ahora.",
      ],
      robustness: 4,
      tripleImpact: 3,
    },
  };

  /* ============================================================
     Estado + persistencia
     ============================================================ */
  const state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { fase1: null, fase2: [], fase3: null, currentPhase: 1 };
      const parsed = JSON.parse(raw);
      const cp = Number(parsed.currentPhase);
      return {
        fase1: parsed.fase1 || null,
        fase2: Array.isArray(parsed.fase2) ? parsed.fase2 : [],
        fase3: parsed.fase3 || null,
        currentPhase: cp >= 1 && cp <= 3 ? cp : 1,
      };
    } catch {
      return { fase1: null, fase2: [], fase3: null, currentPhase: 1 };
    }
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  /* ============================================================
     Renderers
     ============================================================ */

  function renderOptions(faseKey) {
    const container = document.querySelector(`[data-options="${faseKey}"]`);
    if (!container) return;
    const isMulti = container.dataset.multi === "true";
    const selected = state[faseKey];

    container.querySelectorAll(".reto-option").forEach((btn) => {
      const v = btn.dataset.value;
      const isSel = isMulti ? selected.includes(v) : selected === v;
      btn.classList.toggle("is-selected", isSel);
    });
  }

  /* ============================================================
     Impacto en dashboard — un solo panel reactivo a la fase actual
     ============================================================ */
  const IMPACT_TITLES = {
    1: "Impacto de tu decisión",
    2: "Calidad de tu evidencia",
    3: "Evaluación de tu alternativa",
  };
  const IMPACT_PROMPTS = {
    1: "Elige una opción en la fase 1 para ver su efecto sobre BioPack.",
    2: "Selecciona al menos una fuente para evaluar la calidad de la evidencia.",
    3: "Escoge un camino en la fase 3 para ver su impacto integral.",
  };

  function buildImpactFase1() {
    const choice = state.fase1;
    if (!choice) return null;
    const d = FASE1[choice];
    return {
      badge: d.badge,
      gridHTML: d.stats.map((s) => `
        <div class="reto-dashboard-impact-stat ${s.tone ? "is-" + s.tone : ""}">
          <small>${s.k}</small>
          <b>${s.v}</b>
        </div>`).join(""),
      textHTML: d.text.map((t) => `<p>${t}</p>`).join(""),
    };
  }

  function buildImpactFase2() {
    const picks = state.fase2;
    if (picks.length === 0) return null;

    const baseScore = picks.reduce((acc, k) => acc + (FASE2_METHODS[k]?.weight || 0), 0);
    let synergyBonus = 0;
    const notes = [];

    if (picks.length < 2) {
      notes.push("Una sola fuente no permite triangular evidencia. Suma al menos otra metodología para reforzar la decisión.");
    } else {
      FASE2_SYNERGIES.forEach((s) => {
        if (s.keys.every((k) => picks.includes(k))) {
          synergyBonus += s.bonus;
          notes.push(s.note);
        }
      });
    }

    const score = Math.min(10, baseScore + synergyBonus);
    let label, tone;
    if (score >= 9)      { label = "Evidencia robusta";  tone = "ok"; }
    else if (score >= 6) { label = "Evidencia sólida";   tone = "ok"; }
    else if (score >= 4) { label = "Evidencia parcial";  tone = "warn"; }
    else                 { label = "Evidencia débil";    tone = "warn"; }

    const chosenList = picks.map((k) => FASE2_METHODS[k].label).join(", ");
    return {
      badge: label,
      gridHTML: `
        <div class="reto-dashboard-impact-stat is-${tone}">
          <small>Score</small>
          <b>${score}/10</b>
        </div>
        <div class="reto-dashboard-impact-stat">
          <small>Fuentes</small>
          <b>${picks.length}</b>
        </div>
        <div class="reto-dashboard-impact-stat ${synergyBonus > 0 ? "is-ok" : ""}">
          <small>Sinergias</small>
          <b>${synergyBonus > 0 ? "+" + synergyBonus : "0"}</b>
        </div>`,
      textHTML: `
        <p><b>Fuentes seleccionadas:</b> ${chosenList}.</p>
        ${notes.map((n) => `<p>${n}</p>`).join("")}
        ${picks.length >= 4 ? "<p>Cuidado: agregar más fuentes tiene <b>retornos decrecientes</b>.</p>" : ""}`,
    };
  }

  function buildImpactFase3() {
    const choice = state.fase3;
    if (!choice) return null;
    const d = FASE3[choice];
    return {
      badge: d.badge,
      gridHTML: d.stats.map((s) => `
        <div class="reto-dashboard-impact-stat ${s.tone ? "is-" + s.tone : ""}">
          <small>${s.k}</small>
          <b>${s.v}</b>
        </div>`).join(""),
      textHTML: d.text.map((t) => `<p>${t}</p>`).join(""),
    };
  }

  function renderDashboardImpact() {
    const panel = document.querySelector("[data-dashboard-impact]");
    if (!panel) return;
    const titleEl = panel.querySelector("[data-impact-title]");
    const badgeEl = panel.querySelector("[data-impact-badge]");
    const gridEl  = panel.querySelector("[data-impact-grid]");
    const textEl  = panel.querySelector("[data-impact-text]");

    const phase = state.currentPhase;
    titleEl.textContent = `Fase ${phase} · ${IMPACT_TITLES[phase]}`;

    const builder = phase === 1 ? buildImpactFase1
                  : phase === 2 ? buildImpactFase2
                  : buildImpactFase3;
    const impact = builder();

    if (!impact) {
      panel.classList.add("is-visible");
      badgeEl.textContent = "Sin decisión";
      gridEl.innerHTML = "";
      textEl.innerHTML = `<p class="reto-dashboard-impact-empty">${IMPACT_PROMPTS[phase]}</p>`;
      return;
    }

    panel.classList.add("is-visible");
    badgeEl.textContent = impact.badge;
    gridEl.innerHTML = impact.gridHTML;
    textEl.innerHTML = impact.textHTML;
  }

  /* ============================================================
     Visibilidad de fases — solo una activa a la vez
     ============================================================ */
  function renderActivePhase() {
    document.querySelectorAll(".reto-phase").forEach((el) => {
      const n = Number(el.dataset.phase);
      el.classList.toggle("is-active", n === state.currentPhase);
    });
  }

  function isPhaseUnlocked(n) {
    if (n === 1) return true;
    if (n === 2) return !!state.fase1;
    if (n === 3) return state.fase2.length >= 1;
    return false;
  }

  function goToPhase(n) {
    const clamped = Math.max(1, Math.min(3, n));
    if (clamped === state.currentPhase) return;
    if (!isPhaseUnlocked(clamped)) return;
    state.currentPhase = clamped;
    persist();
    renderAll();
    const stepper = document.querySelector("[data-progress]");
    const stepperH = stepper ? stepper.getBoundingClientRect().height : 0;
    const phaseEl = document.querySelector(`.reto-phase[data-phase="${clamped}"]`);
    if (phaseEl) {
      const top = phaseEl.getBoundingClientRect().top + window.scrollY - stepperH - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  /* ============================================================
     Dashboard reactivo — 5 indicadores con colores
     (sin veredicto explícito: solo señales)
     ============================================================ */

  // Cada opción aporta un nivel (0-3) por dimensión.
  // 0 = sin dato · 1 = malo (rojo) · 2 = medio (naranja) · 3 = bueno (verde)
  const FASE1_LEVELS = {
    forward: { utilidad: 3, riesgo: 3 },
    local:   { utilidad: 2, riesgo: 2 },
    natural: { utilidad: 3, riesgo: 3 },
    nada:    { utilidad: 1, riesgo: 1 },
  };
  const FASE3_LEVELS = {
    A: { utilidad: 2, ambiental: 1, posicionamiento: 2, riesgo: 1 },
    B: { utilidad: 3, ambiental: 3, posicionamiento: 3, riesgo: 3 },
    C: { utilidad: 2, ambiental: 1, posicionamiento: 1, riesgo: 1 },
  };

  // Mapas para mostrar etiqueta y porcentaje según nivel
  const LEVEL_LABEL = { 0: "—", 1: "Bajo", 2: "Medio", 3: "Alto" };
  const LEVEL_PCT   = { 0: 0,   1: 28,    2: 62,     3: 92 };
  const LEVEL_TONE  = { 0: "empty", 1: "bad", 2: "mid", 3: "good" };

  // Promedia 2 niveles (>0), redondeando hacia arriba si hay datos parciales
  function combine(a, b) {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return b;
    if (b === undefined) return a;
    return Math.round((a + b) / 2);
  }

  function computeIndicators() {
    const f1 = state.fase1 ? FASE1_LEVELS[state.fase1] : {};
    const f3 = state.fase3 ? FASE3_LEVELS[state.fase3] : {};

    // Utilidad: combina f1.utilidad + f3.utilidad
    const utilidad = combine(f1.utilidad, f3.utilidad);

    // Evidencia: derivada del score 0-10 de fase 2
    let evidencia = 0;
    if (state.fase2.length > 0) {
      const base = state.fase2.reduce((acc, k) => acc + (FASE2_METHODS[k]?.weight || 0), 0);
      let bonus = 0;
      if (state.fase2.length >= 2) {
        FASE2_SYNERGIES.forEach((s) => {
          if (s.keys.every((k) => state.fase2.includes(k))) bonus += s.bonus;
        });
      }
      const score = Math.min(10, base + bonus);
      if (score >= 8) evidencia = 3;
      else if (score >= 5) evidencia = 2;
      else evidencia = 1;
    }

    // Ambiental: solo desde fase 3
    const ambiental = f3.ambiental || 0;

    // Riesgo: combina f1.riesgo + f3.riesgo (qué tan PROTEGIDO está)
    const riesgo = combine(f1.riesgo, f3.riesgo);

    // Posicionamiento: solo desde fase 3
    const posicionamiento = f3.posicionamiento || 0;

    return { utilidad, evidencia, ambiental, riesgo, posicionamiento };
  }

  /* ============================================================
     Gráfica radar — 5 ejes (utilidad, evidencia, posición, ambiental, riesgo)
     Layout pentagonal anti-horario empezando arriba.
     ============================================================ */
  const SVG_NS = "http://www.w3.org/2000/svg";
  const RADAR_AXES = [
    { key: "utilidad" },
    { key: "evidencia" },
    { key: "posicionamiento" },
    { key: "ambiental" },
    { key: "riesgo" },
  ];
  const RADAR_LABELS = {
    utilidad: "Utilidad",
    evidencia: "Evidencia",
    posicionamiento: "Posición",
    ambiental: "Ambiental",
    riesgo: "Riesgo",
  };
  const RADAR_CX = 160;
  const RADAR_CY = 130;
  const RADAR_RMAX = 80;
  const RING_CIRC = 2 * Math.PI * 9; // ≈ 56.55 (r=9, stroke-width=3)

  function radarVertex(r, i) {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return [RADAR_CX + r * Math.cos(a), RADAR_CY + r * Math.sin(a)];
  }

  function initRadar() {
    const svg = document.querySelector(".reto-radar-svg");
    if (!svg) return;

    // 3 rings de fondo (1/3, 2/3, full)
    const ringsG = svg.querySelector(".radar-rings");
    [0.34, 0.67, 1].forEach((s) => {
      const poly = document.createElementNS(SVG_NS, "polygon");
      const pts = RADAR_AXES.map((_, i) => radarVertex(RADAR_RMAX * s, i).join(",")).join(" ");
      poly.setAttribute("points", pts);
      ringsG.appendChild(poly);
    });

    // 5 líneas de ejes
    const axesG = svg.querySelector(".radar-axes");
    RADAR_AXES.forEach((_, i) => {
      const [x, y] = radarVertex(RADAR_RMAX, i);
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", RADAR_CX);
      line.setAttribute("y1", RADAR_CY);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      axesG.appendChild(line);
    });

    // Etiquetas
    const labelsG = svg.querySelector(".radar-labels");
    RADAR_AXES.forEach(({ key }, i) => {
      const [x, y] = radarVertex(RADAR_RMAX + 22, i);
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      const anchor = i === 0 ? "middle"
                   : i === 1 ? "start"
                   : i === 4 ? "end"
                   : "middle";
      const baseline = i === 0 ? "auto"
                     : (i === 2 || i === 3) ? "hanging"
                     : "middle";
      text.setAttribute("text-anchor", anchor);
      text.setAttribute("dominant-baseline", baseline);
      text.textContent = RADAR_LABELS[key];
      labelsG.appendChild(text);
    });

    // Vértices placeholders (dots por indicador)
    const vertG = svg.querySelector("[data-radar-vertices]");
    RADAR_AXES.forEach(({ key }, i) => {
      const [x, y] = radarVertex(0, i);
      const dot = document.createElementNS(SVG_NS, "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("data-vertex", key);
      dot.setAttribute("data-tone", "empty");
      vertG.appendChild(dot);
    });
  }

  function renderRadar(ind) {
    const svg = document.querySelector(".reto-radar-svg");
    if (!svg) return;

    const pts = RADAR_AXES.map(({ key }, i) => {
      const lvl = ind[key] || 0;
      const r = (lvl / 3) * RADAR_RMAX;
      return radarVertex(r, i).join(",");
    }).join(" ");

    const shape = svg.querySelector("[data-radar-shape]");
    if (shape) {
      shape.setAttribute("points", pts);
      const hasAny = RADAR_AXES.some(({ key }) => (ind[key] || 0) > 0);
      shape.style.opacity = hasAny ? "1" : "0";
    }

    RADAR_AXES.forEach(({ key }, i) => {
      const lvl = ind[key] || 0;
      const r = (lvl / 3) * RADAR_RMAX;
      const [x, y] = radarVertex(r, i);
      const dot = svg.querySelector(`[data-vertex="${key}"]`);
      if (dot) {
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("data-tone", LEVEL_TONE[lvl]);
      }
    });
  }

  function renderDashboard() {
    const ind = computeIndicators();

    // Gráfica radar
    renderRadar(ind);

    // Anillos donut por indicador (legend)
    document.querySelectorAll("[data-indicator]").forEach((el) => {
      const key = el.dataset.indicator;
      const lvl = ind[key] ?? 0;
      const tone = LEVEL_TONE[lvl];

      el.classList.remove("is-empty", "is-bad", "is-mid", "is-good");
      el.classList.add(`is-${tone}`);

      const valueEl = el.querySelector(".reto-legend-value");
      if (valueEl) valueEl.textContent = LEVEL_LABEL[lvl];

      const fillEl = el.querySelector(".ring-fill");
      if (fillEl) {
        const pct = LEVEL_PCT[lvl] / 100;
        fillEl.setAttribute("stroke-dashoffset", (RING_CIRC * (1 - pct)).toFixed(2));
      }
    });

    // Barra de avance + contador
    const done = [state.fase1, state.fase2.length > 0, state.fase3].filter(Boolean).length;
    const progressEl = document.querySelector("[data-dashboard-progress]");
    if (progressEl) progressEl.innerHTML = `<b>${done}</b> / 3`;
    const fillEl = document.querySelector("[data-progress-fill]");
    if (fillEl) fillEl.style.width = (done / 3) * 100 + "%";
  }

  /* ============================================================
     Progress stepper — marca fase actual y completadas
     ============================================================ */
  function renderProgress() {
    const steps = document.querySelectorAll("[data-progress] .reto-progress-step");
    const done = {
      1: !!state.fase1,
      2: state.fase2.length > 0,
      3: !!state.fase3,
    };

    steps.forEach((step) => {
      const i = Number(step.dataset.goto);
      step.classList.remove("is-done", "is-current", "is-locked");
      step.disabled = !isPhaseUnlocked(i);
      if (!isPhaseUnlocked(i)) {
        step.classList.add("is-locked");
      } else if (i === state.currentPhase) {
        step.classList.add("is-current");
      } else if (done[i]) {
        step.classList.add("is-done");
      }
    });
  }

  /* ============================================================
     Nav buttons — habilitar/deshabilitar prev/next por fase
     ============================================================ */
  function renderPhaseNav() {
    document.querySelectorAll(".reto-phase").forEach((phaseEl) => {
      const n = Number(phaseEl.dataset.phase);
      const prevBtn = phaseEl.querySelector('[data-nav="prev"]');
      const nextBtn = phaseEl.querySelector('[data-nav="next"]');
      if (prevBtn) prevBtn.disabled = n === 1;
      if (nextBtn) {
        if (n === 3) nextBtn.disabled = true;
        else nextBtn.disabled = !isPhaseUnlocked(n + 1);
      }
    });
  }

  /* ============================================================
     Event handlers
     ============================================================ */

  let autoAdvanceTimer = null;
  function handleOptionClick(e) {
    const btn = e.currentTarget;
    const container = btn.closest("[data-options]");
    const faseKey = container.dataset.options;
    const isMulti = container.dataset.multi === "true";
    const value = btn.dataset.value;

    if (isMulti) {
      const arr = state[faseKey];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(value);
    } else {
      state[faseKey] = state[faseKey] === value ? null : value;
    }

    persist();
    renderAll();

    // Auto-avance: fase 1 (single-select) → fase 2 después de que el usuario
    // vea el feedback en el dashboard. Fase 2 requiere clic explícito en
    // Siguiente porque es multi-select. Fase 3 es la última.
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
    if (faseKey === "fase1" && state.fase1 && state.currentPhase === 1) {
      autoAdvanceTimer = setTimeout(() => goToPhase(2), 850);
    }
  }

  function handleReset() {
    if (!confirm("¿Reiniciar el reto y borrar todas las decisiones?")) return;
    state.fase1 = null;
    state.fase2 = [];
    state.fase3 = null;
    state.currentPhase = 1;
    persist();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNavClick(e) {
    const dir = e.currentTarget.dataset.nav;
    goToPhase(state.currentPhase + (dir === "next" ? 1 : -1));
  }

  function handleStepperClick(e) {
    const n = Number(e.currentTarget.dataset.goto);
    if (n) goToPhase(n);
  }

  /* ============================================================
     Render orchestrator
     ============================================================ */
  function renderAll() {
    renderActivePhase();
    renderOptions("fase1");
    renderOptions("fase2");
    renderOptions("fase3");
    renderDashboard();
    renderDashboardImpact();
    renderProgress();
    renderPhaseNav();
  }

  function boot() {
    document.querySelectorAll(".reto-option").forEach((btn) => {
      btn.addEventListener("click", handleOptionClick);
    });
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", handleNavClick);
    });
    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", handleStepperClick);
    });
    document.querySelector("[data-reset]")?.addEventListener("click", handleReset);
    initRadar();
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
