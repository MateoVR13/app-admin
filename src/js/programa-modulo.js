/* ============================================================
   PROGRAMA MÓDULO — orquestador GSAP
   Soporta:
   · página overview (header con char-reveal + index de bloques)
   · página de bloque (TOC sticky con scroll-spy + reveals)
   ============================================================ */
(function initProgramaModulo() {
  if (typeof gsap === "undefined") {
    console.warn("[programa] GSAP no cargado — fallback estatico.");
    document.documentElement.classList.add("no-gsap");
    initFallback();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     CHAR REVEAL — para el título de la overview (.module-title)
     ============================================================ */
  function initModuleHead() {
    const title  = document.querySelector("[data-module-title]");
    const accent = document.querySelector("[data-module-accent]");
    if (!title) return;

    function appendChars(target, str) {
      str.split("").forEach((ch) => {
        if (ch === " ") {
          target.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = ch;
          target.appendChild(span);
        }
      });
    }

    const lines = title.querySelectorAll(".line");
    const allChars = [];
    lines.forEach((line) => {
      const nodes = Array.from(line.childNodes);
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          appendChars(frag, node.textContent);
          node.replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const inner = node.textContent;
          node.textContent = "";
          appendChars(node, inner);
        }
      });
      allChars.push(...line.querySelectorAll(".char"));
    });

    if (reducedMotion) return;

    gsap.set(allChars, { yPercent: 110, opacity: 0 });

    gsap.to(allChars, {
      yPercent: 0, opacity: 1,
      duration: 0.7, ease: "expo.out",
      stagger: { each: 0.018, from: "start" },
      delay: 0.18,
    });

    if (accent) {
      gsap.fromTo(
        accent,
        { "--accent-line": 0 },
        { "--accent-line": 1, duration: 0.7, delay: 0.9, ease: "expo.out" },
      );
    }
  }

  /* ============================================================
     TOC SPY — resalta el tema visible en el índice del bloque
     ============================================================ */
  function initBloqueToc() {
    const toc = document.querySelector("[data-toc]");
    if (!toc) return;

    const links = toc.querySelectorAll(".bloque-toc-link");
    const sections = Array.from(links)
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
      let activeId = null;

      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = "#" + entry.target.id;
            if (id === activeId) return;
            activeId = id;
            links.forEach((l) =>
              l.classList.toggle("is-active", l.getAttribute("href") === id),
            );
          });
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
      );
      sections.forEach((s) => spy.observe(s));
    }
  }

  /* ============================================================
     SMOOTH SCROLL — para todos los anchors internos
     Si hay un TOC horizontal sticky, descuenta su altura del offset.
     ============================================================ */
  function initSmoothScroll() {
    const horizontalToc = document.querySelector(".bloque-toc.is-horizontal");

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const tocH = horizontalToc ? horizontalToc.getBoundingClientRect().height : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - tocH - 24;
        window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
  }

  /* ============================================================
     TABS — switcher de paneles dentro de un mismo bloque
     ============================================================ */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((tabsRoot) => {
      const buttons = tabsRoot.querySelectorAll("[data-tab]");
      const panels  = tabsRoot.querySelectorAll("[data-panel]");

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-tab");
          buttons.forEach((b) => {
            const isActive = b.getAttribute("data-tab") === target;
            b.classList.toggle("is-active", isActive);
            b.setAttribute("aria-selected", isActive ? "true" : "false");
          });
          panels.forEach((p) => {
            p.classList.toggle("is-active", p.getAttribute("data-panel") === target);
          });
        });
      });
    });
  }

  /* ============================================================
     QUICK-CHECK — mini quiz con feedback inmediato
     ============================================================ */
  function initQuickChecks() {
    document.querySelectorAll("[data-quickcheck]").forEach((qc) => {
      const opts = qc.querySelectorAll(".module-quickcheck-opt");
      const feedback = qc.querySelector(".module-quickcheck-feedback");

      opts.forEach((opt) => {
        opt.addEventListener("click", () => {
          if (qc.dataset.answered === "true") return;
          qc.dataset.answered = "true";

          const isCorrect = opt.dataset.correct === "true";
          opts.forEach((o) => {
            o.disabled = true;
            if (o.dataset.correct === "true") o.classList.add("is-correct");
            else if (o === opt) o.classList.add("is-wrong");
          });

          if (feedback) {
            feedback.classList.add("is-visible");
            feedback.classList.toggle("is-correct", isCorrect);
            feedback.classList.toggle("is-wrong", !isCorrect);
            const msg = isCorrect
              ? feedback.dataset.correctMsg || "¡Correcto!"
              : feedback.dataset.wrongMsg || "No es esa. Mira la respuesta correcta arriba.";
            const label = isCorrect ? "Correcto" : "Casi";
            feedback.innerHTML = `<small>${label}</small><p>${msg}</p>`;
          }
        });
      });
    });
  }

  /* ============================================================
     FLASHCARD — pregunta visible, respuesta al click
     ============================================================ */
  function initFlashcards() {
    document.querySelectorAll(".module-flashcard").forEach((fc) => {
      const btn = fc.querySelector(".module-flashcard-reveal");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const revealed = fc.classList.toggle("is-revealed");
        btn.textContent = revealed ? "Ocultar respuesta" : "Ver respuesta";
      });
    });
  }

  /* ============================================================
     SLIDER DEMO — slider con cálculo en vivo
     Estructura HTML:
       data-slider, data-min, data-max, data-value
       data-formula = JSON con { suffix, decimals, outputs: [{label, calc}] }
     calc es una expresión que usa 'v' como variable del slider
     ============================================================ */
  function initSliderDemos() {
    document.querySelectorAll("[data-slider-demo]").forEach((demo) => {
      const input  = demo.querySelector('input[type="range"]');
      const valueEl = demo.querySelector("[data-slider-value]");
      const outputCells = demo.querySelectorAll("[data-slider-output]");
      const noteEl = demo.querySelector("[data-slider-note]");
      const noteTemplate = noteEl ? noteEl.dataset.template : "";
      if (!input) return;

      function update() {
        const v = Number(input.value);
        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const pct = ((v - min) / (max - min)) * 100;
        input.style.setProperty("--fill", pct + "%");
        if (valueEl) {
          const suffix = valueEl.dataset.suffix || "";
          valueEl.textContent = v + suffix;
        }
        outputCells.forEach((cell) => {
          const formula = cell.dataset.sliderOutput;
          const suffix = cell.dataset.suffix || "";
          const decimals = Number(cell.dataset.decimals || 0);
          try {
            // eslint-disable-next-line no-new-func
            const result = Function("v", "return " + formula)(v);
            cell.querySelector("b").textContent = result.toLocaleString("es-CO", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix;
          } catch {
            cell.querySelector("b").textContent = "—";
          }
        });
        if (noteEl && noteTemplate) {
          // Reemplaza {expr} en el template evaluando expr con 'v'
          noteEl.innerHTML = noteTemplate.replace(/\{([^}]+)\}/g, (_, expr) => {
            try {
              // eslint-disable-next-line no-new-func
              const r = Function("v", "return " + expr)(v);
              return typeof r === "number" ? r.toLocaleString("es-CO", { maximumFractionDigits: 2 }) : r;
            } catch {
              return "—";
            }
          });
        }
      }

      input.addEventListener("input", update);
      update();
    });
  }

  /* ============================================================
     REVEALS — fade-up para [data-reveal]
     ============================================================ */
  function initReveals() {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (reducedMotion) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });
  }

  /* ============================================================
     FALLBACK
     ============================================================ */
  function initFallback() {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
  }

  function boot() {
    initModuleHead();
    initBloqueToc();
    initSmoothScroll();
    initTabs();
    initQuickChecks();
    initFlashcards();
    initSliderDemos();
    initReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
