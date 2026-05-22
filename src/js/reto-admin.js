/* ============================================================
   RETO ADMIN — Simulador del COO de TechCorp · 90 días
   Estado: { d1, d2[], d3, d4, currentDay }
   Identidad propia: bandeja de entrada + timeline + team mood + BSC bars
   El modal final es un "acta de Junta Directiva", no celebración.
   ============================================================ */
(function initRetoAdmin() {
  const STORAGE_KEY = "ua-reto-admin-v2";

  /* ============================================================
     DECISIÓN 1 · Día 1 — CFO: dilema productividad
     ============================================================ */
  const D1 = {
    taylor: {
      label: "Aprobé el software de control de tiempos",
      sender: "CFO",
      reply: "Andrés agradece la velocidad de tu respuesta. Karen Mendoza guarda silencio.",
      bscDelta: { financiera: +20, procesos: +25, clientes: 0, aprendizaje: -15 },
      moodDelta: { AC: +1, JM: -2, AR: -1, DS: -1, MR: -1, KM: -2 },
    },
    mayo: {
      label: "Empoderé a los líderes intermedios",
      sender: "Tech leads",
      reply: "Karen aplaude la decisión. Andrés pide que demuestres impacto en 60 días.",
      bscDelta: { financiera: -5, procesos: +10, clientes: +5, aprendizaje: +25 },
      moodDelta: { AC: -1, JM: +2, AR: +2, DS: +1, MR: +1, KM: +2, LV: +1 },
    },
    hibrido: {
      label: "Métricas por equipo + autonomía interna",
      sender: "Toda la dirección",
      reply: "La síntesis convence al CFO (datos) y a Talento (cultura). Buena lectura organizacional.",
      bscDelta: { financiera: +10, procesos: +20, clientes: +5, aprendizaje: +20 },
      moodDelta: { AC: +1, JM: +1, AR: +1, DS: +1, MR: +1, KM: +1, LV: +1 },
    },
    esquivar: {
      label: "Tercericé las áreas con peor desempeño",
      sender: "Proveedor externo",
      reply: "Andrés está conforme con el ahorro inmediato. El equipo interno percibe la jugada como un voto de no confianza.",
      bscDelta: { financiera: +15, procesos: +5, clientes: -10, aprendizaje: -25 },
      moodDelta: { AC: 0, JM: -2, AR: -2, DS: -2, MR: -1, KM: -1 },
    },
  };

  /* ============================================================
     DECISIÓN 2 · Día 30 — Tech Lead: retención talento (multi)
     ============================================================ */
  const D2_FACTORS = {
    carrera: {
      label: "Plan de carrera + mentoría",
      kind: "motivacional",
      weight: 4,
      bsc: { aprendizaje: +20 },
    },
    autonomia: {
      label: "Autonomía + flexibilidad",
      kind: "motivacional",
      weight: 4,
      bsc: { procesos: +15, aprendizaje: +10 },
    },
    reconocimiento: {
      label: "Reconocimiento y visibilidad",
      kind: "motivacional",
      weight: 3,
      bsc: { aprendizaje: +15 },
    },
    proyectos: {
      label: "Proyectos de alto impacto",
      kind: "motivacional",
      weight: 4,
      bsc: { clientes: +15, aprendizaje: +10 },
    },
    oficina: {
      label: "Oficina y beneficios físicos",
      kind: "higienico",
      weight: 1,
      bsc: { financiera: -8 },
    },
  };

  const D2_SYNERGIES = [
    {
      keys: ["carrera", "proyectos"],
      bonus: 8,
      note: "Combinaste desarrollo profesional con responsabilidad real — la dupla más fuerte para retener talento técnico.",
    },
    {
      keys: ["autonomia", "reconocimiento"],
      bonus: 5,
      note: "Autonomía + reconocimiento: profesionales que se sienten dueños de su trabajo Y vistos por la organización.",
    },
    {
      keys: ["carrera", "autonomia"],
      bonus: 4,
      note: "Crecimiento sin paternalismo. La gente sabe a dónde va y cómo llegar sin que tú lo dictes.",
    },
  ];

  /* ============================================================
     DECISIÓN 3 · Día 60 — CEO: recorte de personal (BSC)
     ============================================================ */
  const D3 = {
    aceptar: {
      label: "Acepté el recorte del 30%",
      sender: "Junta directiva",
      reply: "La junta queda satisfecha con la disciplina financiera. El equipo restante entra en modo supervivencia.",
      bscDelta: { financiera: +35, procesos: -25, clientes: -20, aprendizaje: -30 },
      moodDelta: { AC: +2, JM: -3, AR: -3, DS: -3, MR: -3, KM: -3, LV: -2, CR: +1 },
    },
    selectivo: {
      label: "Recorte selectivo del 10%",
      sender: "Junta directiva",
      reply: "La junta acepta tu propuesta a regañadientes. El equipo agradece el ajuste quirúrgico.",
      bscDelta: { financiera: +15, procesos: -5, clientes: -5, aprendizaje: -10 },
      moodDelta: { AC: +1, JM: -1, AR: -1, DS: -1, MR: -1, KM: 0, CR: 0 },
    },
    voluntario: {
      label: "Reducción salarial voluntaria temporal",
      sender: "Todo el equipo",
      reply: "El equipo te respeta por la transparencia. Algunos seniors aceptan, otros piden tiempo.",
      bscDelta: { financiera: +18, procesos: +5, clientes: +5, aprendizaje: +15 },
      moodDelta: { AC: +1, JM: +1, AR: +1, DS: +1, MR: +1, KM: +2, CR: 0 },
    },
    vender: {
      label: "Vendí la línea de consultoría",
      sender: "Junta directiva",
      reply: "La junta valora el foco. El equipo de consultoría se va con buena indemnización, el resto queda intacto.",
      bscDelta: { financiera: +25, procesos: +10, clientes: -5, aprendizaje: +5 },
      moodDelta: { AC: +1, JM: +1, AR: +1, DS: +1, MR: +1, KM: +1, CR: +1, LV: +1 },
    },
  };

  /* ============================================================
     DECISIÓN 4 · Día 90 — HR: comunicación post-crisis
     ============================================================ */
  const D4 = {
    memo: {
      label: "Comuniqué por memorando formal",
      sender: "Toda la organización",
      reply: "El mensaje llegó. Nadie respondió. Los rumores siguen corriendo en los chats privados.",
      bscDelta: { procesos: +5, clientes: 0, aprendizaje: -10 },
      moodDelta: { JM: -1, AR: -1, DS: -1, MR: -1, KM: -2, LV: -1 },
    },
    townhall: {
      label: "Town halls semanales con preguntas abiertas",
      sender: "Todo el equipo",
      reply: "Las preguntas difíciles te ponen a prueba pero la confianza se reconstruye. El equipo se enciende.",
      bscDelta: { procesos: +10, clientes: +15, aprendizaje: +25 },
      moodDelta: { JM: +2, AR: +2, DS: +2, MR: +2, KM: +3, LV: +2, AC: +1, CR: +1 },
    },
    coaching: {
      label: "Coaching ejecutivo + reportes trimestrales",
      sender: "Líderes intermedios",
      reply: "Los líderes intermedios crecen, pero el equipo extraña comunicación directa del COO.",
      bscDelta: { procesos: +10, clientes: +5, aprendizaje: +20 },
      moodDelta: { JM: 0, AR: 0, DS: 0, MR: 0, KM: +1, LV: +1 },
    },
    silencio: {
      label: "Decidí no comunicar nada por ahora",
      sender: "—",
      reply: "El silencio del COO es interpretado como mala señal. El equipo empieza a actualizar su CV.",
      bscDelta: { procesos: -10, clientes: -15, aprendizaje: -25 },
      moodDelta: { JM: -3, AR: -3, DS: -3, MR: -3, KM: -3, LV: -3, AC: -1 },
    },
  };

  /* ============================================================
     Personajes y mood inicial (50 = neutral)
     ============================================================ */
  const TEAM_MOOD_INIT = { AC: 50, JM: 35, CR: 50, KM: 55, AR: 50, LV: 50, DS: 50, MR: 50 };
  const BSC_INIT = { financiera: 25, procesos: 35, clientes: 40, aprendizaje: 30 };

  /* ============================================================
     Estado + persistencia
     ============================================================ */
  const state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      const p = JSON.parse(raw);
      const cd = Number(p.currentDay);
      return {
        d1: p.d1 || null,
        d2: Array.isArray(p.d2) ? p.d2 : [],
        d3: p.d3 || null,
        d4: p.d4 || null,
        currentDay: [1, 30, 60, 90].includes(cd) ? cd : 1,
      };
    } catch {
      return defaults();
    }
  }

  function defaults() {
    return { d1: null, d2: [], d3: null, d4: null, currentDay: 1 };
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  /* ============================================================
     Compute — BSC values y team mood basados en decisiones
     ============================================================ */
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function computeBSC() {
    const b = { ...BSC_INIT };
    function apply(delta) {
      if (!delta) return;
      for (const k in delta) b[k] = clamp((b[k] || 0) + delta[k], 0, 100);
    }
    if (state.d1) apply(D1[state.d1]?.bscDelta);
    if (state.d2.length) {
      state.d2.forEach((k) => apply(D2_FACTORS[k]?.bsc));
      // sinergias también suman al aprendizaje
      D2_SYNERGIES.forEach((s) => {
        if (s.keys.every((k) => state.d2.includes(k))) {
          b.aprendizaje = clamp(b.aprendizaje + s.bonus, 0, 100);
        }
      });
    }
    if (state.d3) apply(D3[state.d3]?.bscDelta);
    if (state.d4) apply(D4[state.d4]?.bscDelta);
    return b;
  }

  function computeTeamMood() {
    const m = { ...TEAM_MOOD_INIT };
    function apply(delta) {
      if (!delta) return;
      for (const k in delta) {
        if (m[k] !== undefined) m[k] = clamp(m[k] + delta[k] * 12, 0, 100);
      }
    }
    if (state.d1) apply(D1[state.d1]?.moodDelta);
    if (state.d3) apply(D3[state.d3]?.moodDelta);
    if (state.d4) apply(D4[state.d4]?.moodDelta);
    // Talento (JM, AR, MR, DS) reacciona también a D2 — motivacionales suben mood
    if (state.d2.length > 0) {
      const motivCount = state.d2.filter((k) => D2_FACTORS[k]?.kind === "motivacional").length;
      const hygieneOnly = state.d2.every((k) => D2_FACTORS[k]?.kind === "higienico");
      const delta = hygieneOnly ? -8 : motivCount * 6;
      ["JM", "AR", "MR", "DS", "LV"].forEach((id) => {
        m[id] = clamp(m[id] + delta, 0, 100);
      });
      // Karen (HR) sube siempre que activas motivacionales
      if (motivCount >= 2) m.KM = clamp(m.KM + 10, 0, 100);
    }
    return m;
  }

  function moodTone(v) {
    if (v >= 70) return "good";
    if (v >= 45) return "mid";
    return "bad";
  }
  function moodLabel(v) {
    if (v >= 80) return "muy bien";
    if (v >= 65) return "comprometido";
    if (v >= 50) return "neutral";
    if (v >= 35) return "incómodo";
    if (v >= 20) return "frustrado";
    return "a punto de irse";
  }

  function bscTone(v) {
    if (v >= 60) return "good";
    if (v >= 35) return "mid";
    return "bad";
  }
  function bscLabel(v) {
    if (v >= 75) return "Excelente";
    if (v >= 55) return "Bueno";
    if (v >= 35) return "Atención";
    if (v >= 15) return "Riesgo";
    return "Crítico";
  }

  /* ============================================================
     Renderers
     ============================================================ */
  function renderActiveDecision() {
    const map = { 1: "1", 30: "2", 60: "3", 90: "4" };
    const active = map[state.currentDay];
    document.querySelectorAll(".coo-message").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.decision === active);
    });
  }

  function renderOptions(faseKey) {
    const container = document.querySelector(`[data-options="${faseKey}"]`);
    if (!container) return;
    const isMulti = container.dataset.multi === "true";
    const stateKey = faseKey.replace("d", "d"); // "d1" → "d1"
    const selected = state[stateKey];
    container.querySelectorAll(".coo-option").forEach((btn) => {
      const v = btn.dataset.value;
      const isSel = isMulti ? selected.includes(v) : selected === v;
      btn.classList.toggle("is-selected", isSel);
    });
  }

  function renderTimeline() {
    const fill = document.querySelector("[data-timeline-fill]");
    const idx = [1, 30, 60, 90].indexOf(state.currentDay);
    const pct = idx <= 0 ? 0 : (idx / 3) * 100;
    if (fill) fill.style.width = pct + "%";

    document.querySelectorAll("[data-timeline] .coo-timeline-mark").forEach((el) => {
      const d = Number(el.dataset.day);
      el.classList.remove("is-active", "is-done");
      if (d === state.currentDay) {
        el.classList.add("is-active");
      } else if (d < state.currentDay) {
        el.classList.add("is-done");
      } else {
        // Bloqueado si no se desbloqueó aún
        if (!isDayUnlocked(d)) el.classList.add("is-locked");
        else el.classList.remove("is-locked");
      }
    });
  }

  function renderTeam() {
    const mood = computeTeamMood();
    document.querySelectorAll("[data-team] .coo-team-member").forEach((el) => {
      const id = el.dataset.member;
      const v = mood[id] ?? 50;
      const tone = moodTone(v);
      el.classList.remove("is-good", "is-mid", "is-bad");
      el.classList.add("is-" + tone);
      const label = el.querySelector("[data-mood-label]");
      if (label) label.textContent = moodLabel(v);
    });
  }

  function renderBSC() {
    const b = computeBSC();
    document.querySelectorAll("[data-bsc]").forEach((el) => {
      const key = el.dataset.bsc;
      const v = b[key] ?? 0;
      const tone = bscTone(v);
      el.classList.remove("is-good", "is-mid", "is-bad");
      el.classList.add("is-" + tone);
      const fill = el.querySelector("[data-bar-fill]");
      const val = el.querySelector("[data-bar-value]");
      if (fill) fill.style.height = v + "%";
      if (val) val.textContent = Math.round(v) + "%";
    });
  }

  function renderLog() {
    const log = document.querySelector("[data-log]");
    if (!log) return;
    const entries = [];

    if (state.d1) entries.push({
      day: 1,
      who: "CFO Andrés Castro",
      what: D1[state.d1].label,
      tone: D1[state.d1].bscDelta.aprendizaje >= 15 ? "good" : D1[state.d1].bscDelta.aprendizaje <= -15 ? "bad" : "mid",
    });

    if (state.d2.length) {
      const labels = state.d2.map((k) => D2_FACTORS[k].label).join(", ");
      const motivCount = state.d2.filter((k) => D2_FACTORS[k]?.kind === "motivacional").length;
      entries.push({
        day: 30,
        who: "Tech Lead Javier Mora",
        what: "Activé: " + labels,
        tone: motivCount >= 2 ? "good" : motivCount === 1 ? "mid" : "bad",
      });
    }

    if (state.d3) entries.push({
      day: 60,
      who: "CEO Carolina Restrepo",
      what: D3[state.d3].label,
      tone: D3[state.d3].bscDelta.aprendizaje >= 0 ? "good" : D3[state.d3].bscDelta.aprendizaje <= -20 ? "bad" : "mid",
    });

    if (state.d4) entries.push({
      day: 90,
      who: "Directora de Talento Karen",
      what: D4[state.d4].label,
      tone: D4[state.d4].bscDelta.aprendizaje >= 15 ? "good" : D4[state.d4].bscDelta.aprendizaje <= -15 ? "bad" : "mid",
    });

    if (entries.length === 0) {
      log.innerHTML = `<li class="coo-log-empty">Aún no has tomado decisiones. La primera es del CFO.</li>`;
      return;
    }
    log.innerHTML = entries.map((e) => `
      <li class="coo-log-item is-${e.tone}">
        <span class="coo-log-day">Día ${e.day}</span>
        <div class="coo-log-text">
          <small>${e.who}</small>
          <p>${e.what}</p>
        </div>
      </li>
    `).join("");
  }

  function renderHowto() {
    const howto = document.querySelector("[data-howto]");
    if (!howto) return;
    // La instrucción se mantiene durante TODO el día 1 (incluso después
    // de elegir, hasta que el usuario avance al día 30). Una vez que
    // navega a otro día, no vuelve a aparecer.
    const show = state.currentDay === 1;
    howto.classList.toggle("is-hidden", !show);
  }

  function renderNavButtons() {
    document.querySelectorAll(".coo-message").forEach((msg) => {
      const decisionN = Number(msg.dataset.decision);
      const day = [null, 1, 30, 60, 90][decisionN];
      const dayKey = "d" + decisionN;
      const prev = msg.querySelector('[data-nav="prev"]');
      const next = msg.querySelector('[data-nav="next"]');
      const finish = msg.querySelector('[data-nav="finish"]');

      if (prev) prev.disabled = decisionN === 1;

      if (next) {
        const nextDay = [null, 30, 60, 90][decisionN];
        next.disabled = nextDay ? !isDayUnlocked(nextDay) : true;
      }
      if (finish) {
        finish.disabled = !state.d4;
      }
    });
  }

  function renderAll() {
    renderActiveDecision();
    renderOptions("d1");
    renderOptions("d2");
    renderOptions("d3");
    renderOptions("d4");
    renderTimeline();
    renderTeam();
    renderBSC();
    renderLog();
    renderHowto();
    renderNavButtons();
  }

  /* ============================================================
     Navegación y desbloqueo
     ============================================================ */
  function isDayUnlocked(day) {
    if (day === 1) return true;
    if (day === 30) return !!state.d1;
    if (day === 60) return state.d2.length >= 1;
    if (day === 90) return !!state.d3;
    return false;
  }

  function goToDay(day) {
    if (![1, 30, 60, 90].includes(day)) return;
    if (!isDayUnlocked(day)) return;
    state.currentDay = day;
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
  }

  function handleNavClick(e) {
    const dir = e.currentTarget.dataset.nav;
    if (dir === "finish") {
      showBoardReport();
      return;
    }
    const order = [1, 30, 60, 90];
    const idx = order.indexOf(state.currentDay);
    const newDay = dir === "next" ? order[idx + 1] : order[idx - 1];
    if (newDay) goToDay(newDay);
  }

  function handleTimelineClick(e) {
    const day = Number(e.currentTarget.dataset.day);
    if (day) goToDay(day);
  }

  function handleReset() {
    if (!confirm("¿Reiniciar el simulador? Se perderán las decisiones tomadas.")) return;
    Object.assign(state, defaults());
    persist();
    closeBoard();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     BOARD REPORT — modal de cierre estilo junta directiva
     ============================================================ */
  function getVerdict() {
    const b = computeBSC();
    const mood = computeTeamMood();
    const bscAvg = Object.values(b).reduce((a, c) => a + c, 0) / 4;
    const moodAvg = Object.values(mood).reduce((a, c) => a + c, 0) / Object.keys(mood).length;
    const score = (bscAvg + moodAvg) / 2;

    if (score >= 70) return {
      key: "transformacional",
      cheerTitle: "¡Magnífico! Eres un Líder Transformacional",
      cheerSub: "TechCorp sale del trimestre más fuerte de lo que entró — la Junta te aplaude.",
      title: "La Junta aprueba tu gestión con felicitación pública",
      verdict: "Líder Transformacional",
      feedback: "<b>¡Felicitaciones!</b> Combinaste rigor financiero, retención de talento y comunicación honesta. TechCorp sale del trimestre con cultura sana, BSC equilibrado y un equipo que confía en ti. <b>Es exactamente el liderazgo que necesitábamos.</b> La Junta te ratifica como COO y abre conversación sobre tu paso futuro a CEO.",
      tone: "good",
    };
    if (score >= 55) return {
      key: "equilibrado",
      cheerTitle: "¡Bien hecho! Eres un Director Equilibrado",
      cheerSub: "Cuidaste las cuatro perspectivas del BSC — la Junta te ratifica.",
      title: "La Junta aprueba tu gestión con observaciones",
      verdict: "Director Equilibrado",
      feedback: "<b>¡Felicitaciones por completar tu primer trimestre!</b> Tomaste decisiones razonables que cuidan las cuatro perspectivas BSC sin destruir ninguna. <b>Hay margen para profundizar la diferenciación cultural</b> que haría a TechCorp imbatible. La Junta te ratifica y pide un plan de mejora a 6 meses.",
      tone: "good",
    };
    if (score >= 40) return {
      key: "correctivo",
      cheerTitle: "¡Lo lograste! Completaste los 90 días",
      cheerSub: "Resolviste lo urgente, pero hay aprendizajes importantes en el camino.",
      title: "La Junta solicita un plan de remediación",
      verdict: "Director Correctivo",
      feedback: "<b>¡Felicitaciones por terminar tu primer trimestre!</b> Resolviste lo urgente, pero la transformación profunda quedó pendiente. <b>Cultura y talento están vulnerables</b> y eso es una bomba de tiempo. La Junta te da 90 días más con seguimiento mensual estrecho — la próxima vez verás cómo afinar.",
      tone: "mid",
    };
    return {
      key: "formacion",
      cheerTitle: "¡Completaste el reto!",
      cheerSub: "Cada decisión es un aprendizaje. Los detalles están en el acta.",
      title: "La Junta considera reasignar el rol",
      verdict: "Director en formación",
      feedback: "<b>¡Bien por terminar el simulador!</b> Varias decisiones priorizaron lo financiero de corto plazo a costa de las otras tres perspectivas del BSC. <b>El equipo perdió la confianza</b>. La Junta sugiere reasignar el rol o un proceso intensivo de coaching antes de continuar. <i>Buenas noticias: cada decisión es un aprendizaje. Reintenta con la lente de Herzberg, Mayo y BSC — vas a brillar en la próxima.</i>",
      tone: "bad",
    };
  }

  function showBoardReport() {
    const ready = state.d1 && state.d2.length >= 1 && state.d3 && state.d4;
    const modal = document.querySelector("[data-modal]");
    if (!ready || !modal) return;

    const v = getVerdict();
    const b = computeBSC();
    const mood = computeTeamMood();

    modal.querySelector("[data-modal-title]").textContent = v.title;
    const verdictEl = modal.querySelector("[data-modal-verdict]");
    if (verdictEl) verdictEl.innerHTML = `Veredicto: <b>${v.verdict}</b>`;
    const cheerTitleEl = modal.querySelector("[data-modal-cheer-title]");
    const cheerSubEl   = modal.querySelector("[data-modal-cheer-sub]");
    if (cheerTitleEl) cheerTitleEl.textContent = v.cheerTitle;
    if (cheerSubEl)   cheerSubEl.textContent   = v.cheerSub;
    modal.dataset.tone = v.tone;

    // Team retrato
    const teamEl = modal.querySelector("[data-modal-team]");
    const teamData = [
      ["AC", "Andrés Castro", "CFO"],
      ["JM", "Javier Mora", "Tech Lead"],
      ["CR", "Carolina R.", "CEO"],
      ["KM", "Karen M.", "Talento"],
      ["AR", "Ana Ruiz", "Frontend"],
      ["LV", "Laura Vega", "PM"],
      ["DS", "Diego Sánchez", "DevOps"],
      ["MR", "María Rodríguez", "QA"],
    ];
    teamEl.innerHTML = teamData.map(([id, name, role]) => {
      const m = mood[id] ?? 50;
      const tone = moodTone(m);
      return `<div class="coo-board-member is-${tone}">
        <b>${id}</b>
        <span class="coo-board-member-name">${name}</span>
        <small>${role} · ${moodLabel(m)}</small>
      </div>`;
    }).join("");

    // BSC scorecard
    const bscEl = modal.querySelector("[data-modal-bsc]");
    const bscData = [
      ["financiera", "Financiera"],
      ["procesos", "Procesos internos"],
      ["clientes", "Clientes"],
      ["aprendizaje", "Aprendizaje y crecimiento"],
    ];
    bscEl.innerHTML = bscData.map(([key, name]) => {
      const val = b[key] ?? 0;
      const tone = bscTone(val);
      return `<div class="coo-board-score is-${tone}">
        <span>${name}</span>
        <div class="coo-board-score-bar">
          <div class="coo-board-score-fill" style="width:${val}%"></div>
        </div>
        <b>${Math.round(val)}%<em>${bscLabel(val)}</em></b>
      </div>`;
    }).join("");

    // Decisiones
    const decEl = modal.querySelector("[data-modal-decisions]");
    const d2Labels = state.d2.map((k) => D2_FACTORS[k].label).join(", ");
    decEl.innerHTML = `
      <li><span>Día 1 · CFO</span><b>${D1[state.d1].label}</b></li>
      <li><span>Día 30 · Tech Lead</span><b>${d2Labels}</b></li>
      <li><span>Día 60 · CEO</span><b>${D3[state.d3].label}</b></li>
      <li><span>Día 90 · Talento</span><b>${D4[state.d4].label}</b></li>
    `;

    // Feedback
    modal.querySelector("[data-modal-feedback]").innerHTML = `<p>${v.feedback}</p>`;

    modal.classList.add("is-open");
    document.body.classList.add("is-modal-open");

    // Forzar scroll al top: el browser intenta auto-scroll al h2 con
    // aria-labelledby, lo que oculta el banner celebrativo de arriba.
    const content = modal.querySelector(".coo-board-content");
    if (content) {
      // Doble RAF para asegurar que el render del modal haya ocurrido
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          content.scrollTop = 0;
          // Si el modal completo es scrolleable (viewport bajo), también ahí
          modal.scrollTop = 0;
        });
      });
    }

    // Confeti — intensidad según veredicto (más fuerte si es transformacional)
    const intensity = v.tone === "good" ? 1.0
                    : v.tone === "mid"  ? 0.6
                    :                     0.35;
    fireConfetti(intensity);
  }

  function closeBoard() {
    const modal = document.querySelector("[data-modal]");
    if (modal) modal.classList.remove("is-open");
    document.body.classList.remove("is-modal-open");
    stopConfetti();
  }

  /* ============================================================
     Confeti — canvas vanilla, paleta ámbar/azul corporativa
     ============================================================ */
  let confettiRAF = null;
  function fireConfetti(intensity = 1) {
    const canvas = document.querySelector("[data-confetti]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    // Paleta admin: ámbar, naranja, azul navy, púrpura corporativo
    const colors = [
      "#f97316", "#ea580c", "#fbbf24", "#facc15",
      "#0ea5e9", "#7c3aed", "#16a34a", "#475569",
    ];
    const N = Math.round(140 * intensity);
    const particles = [];

    function spawn(count, originX, vxBias) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * 0.6 - 0.3) - Math.PI / 2;
        const speed = 14 + Math.random() * 10;
        particles.push({
          x: originX,
          y: H * 0.95,
          vx: Math.cos(angle) * speed + vxBias,
          vy: Math.sin(angle) * speed,
          gravity: 0.32,
          drag: 0.992,
          size: 6 + Math.random() * 7,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.32,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() < 0.45 ? "rect" : Math.random() < 0.7 ? "circle" : "strip",
          life: 1,
        });
      }
    }
    spawn(N / 2, W * 0.15,  6);
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
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        p.life = Math.max(0, 1 - frames / maxFrames);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life * 1.3);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        } else if (p.shape === "strip") {
          ctx.fillRect(-p.size / 2, -1.5, p.size, 3);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      frames++;
      if (alive > 0 && frames < maxFrames) {
        confettiRAF = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, W, H);
        confettiRAF = null;
      }
    }
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    confettiRAF = requestAnimationFrame(frame);
  }

  function stopConfetti() {
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    confettiRAF = null;
    const canvas = document.querySelector("[data-confetti]");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    document.querySelectorAll(".coo-option").forEach((btn) => {
      btn.addEventListener("click", handleOptionClick);
    });
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", handleNavClick);
    });
    document.querySelectorAll("[data-timeline] .coo-timeline-mark").forEach((el) => {
      el.addEventListener("click", handleTimelineClick);
    });
    document.querySelectorAll("[data-reset]").forEach((btn) => {
      btn.addEventListener("click", handleReset);
    });
    document.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeBoard);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeBoard();
    });
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
