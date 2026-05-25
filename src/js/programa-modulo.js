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
    initInfografiaLightbox();
    initTemaAccordion();
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
          if (isCorrect) celebrate(opt);
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
    // Animaciones de entrada deshabilitadas: todo se muestra apenas se carga.
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (typeof gsap !== "undefined") {
        gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      } else {
        el.style.opacity = 1;
        el.style.transform = "none";
      }
    });
  }

  /* ============================================================
     INFOGRAFIA LIGHTBOX — zoom + descarga para imágenes pedagógicas
     Aplica a todas las .module-infografia (no a hero ni a-ha icons)
     ============================================================ */
  function initInfografiaLightbox() {
    const figures = document.querySelectorAll(".module-infografia");
    if (!figures.length) return;

    // Construye el overlay una sola vez
    let lightbox = document.querySelector(".module-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "module-lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-hidden", "true");
      lightbox.innerHTML = `
        <button type="button" class="module-lightbox-close" aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="module-lightbox-stage">
          <img class="module-lightbox-img" alt="" />
        </div>
        <div class="module-lightbox-bar">
          <span class="module-lightbox-caption"></span>
          <a class="module-lightbox-download" download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar
          </a>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const imgEl = lightbox.querySelector(".module-lightbox-img");
    const captionEl = lightbox.querySelector(".module-lightbox-caption");
    const downloadEl = lightbox.querySelector(".module-lightbox-download");
    const closeBtn = lightbox.querySelector(".module-lightbox-close");

    function openLightbox(src, alt, caption) {
      imgEl.src = src;
      imgEl.alt = alt || "";
      captionEl.textContent = caption || alt || "";
      downloadEl.href = src;
      const filename = src.split("/").pop() || "infografia.png";
      downloadEl.setAttribute("download", filename);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-lightbox-open");
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-lightbox-open");
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".module-lightbox-stage") === lightbox.querySelector(".module-lightbox-stage") && e.target.tagName !== "IMG") {
        if (e.target.classList.contains("module-lightbox-stage") || e.target === lightbox) closeLightbox();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });

    // Inyecta controles en cada figure
    figures.forEach((fig) => {
      const wrap = fig.querySelector(".module-infografia-image");
      const img = wrap && wrap.querySelector("img");
      if (!wrap || !img || wrap.dataset.lightboxReady) return;
      wrap.dataset.lightboxReady = "true";

      const caption = (fig.querySelector(".module-infografia-text h5") || {}).textContent || img.alt;

      const actions = document.createElement("div");
      actions.className = "module-infografia-actions";
      actions.innerHTML = `
        <button type="button" class="module-infografia-btn" data-action="zoom" aria-label="Ampliar imagen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <span>Ampliar</span>
        </button>
        <a class="module-infografia-btn" href="${img.src}" download="${img.src.split("/").pop()}" aria-label="Descargar imagen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Descargar</span>
        </a>
      `;
      wrap.appendChild(actions);

      // Click sobre la imagen también abre el zoom
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openLightbox(img.src, img.alt, caption));
      actions.querySelector('[data-action="zoom"]').addEventListener("click", () => {
        openLightbox(img.src, img.alt, caption);
      });
    });
  }

  /* ============================================================
     ACCORDION — cada .module-tema colapsa al hacer click en el head.
     Tema 1 abierto por defecto. Múltiples pueden estar abiertos.
     ============================================================ */
  function initTemaAccordion() {
    const temas = Array.from(document.querySelectorAll(".module-tema"));
    if (!temas.length) return;

    const collapseTema = (t) => {
      t.classList.add("is-collapsed");
      t.classList.remove("is-open");
      const h = t.querySelector(".module-tema-head");
      if (h) h.setAttribute("aria-expanded", "false");
    };

    const expandTema = (t) => {
      t.classList.remove("is-collapsed");
      t.classList.add("is-open");
      const h = t.querySelector(".module-tema-head");
      if (h) h.setAttribute("aria-expanded", "true");
      t.querySelectorAll("[data-reveal]").forEach((el) => {
        if (el === h) return;
        if (typeof gsap !== "undefined") {
          gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
        } else {
          el.style.opacity = 1;
          el.style.transform = "none";
        }
      });
    };

    temas.forEach((tema, i) => {
      const head = tema.querySelector(".module-tema-head");
      if (!head) return;

      // Estado inicial: solo el primero abierto
      if (i === 0) {
        tema.classList.add("is-open");
      } else {
        tema.classList.add("is-collapsed");
      }

      head.setAttribute("role", "button");
      head.setAttribute("tabindex", "0");
      head.setAttribute("aria-expanded", i === 0 ? "true" : "false");
      head.classList.add("is-toggleable");

      const toggle = () => {
        const willOpen = tema.classList.contains("is-collapsed");
        if (willOpen) {
          // Modo acordeón: cierra todos los hermanos antes de abrir éste
          temas.forEach((other) => { if (other !== tema) collapseTema(other); });
          expandTema(tema);
          const top = tema.getBoundingClientRect().top + window.scrollY - 24;
          window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
        } else {
          collapseTema(tema);
        }
      };

      head.addEventListener("click", (e) => {
        if (e.target.closest("a, button")) return;
        toggle();
      });
      head.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });

    const expandExclusive = (target) => {
      if (!target || !target.classList.contains("module-tema")) return;
      temas.forEach((other) => { if (other !== target) collapseTema(other); });
      expandTema(target);
    };

    if (window.location.hash) {
      expandExclusive(document.querySelector(window.location.hash));
    }

    document.querySelectorAll('.bloque-toc-link[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        expandExclusive(document.querySelector(link.getAttribute("href")));
      });
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

  /* ============================================================
     CONFETTI · pequeña explosión de partículas para celebrar acierto.
     Crea un canvas overlay anclado al elemento objetivo y lo destruye
     cuando termina. Cero dependencias.
     ============================================================ */
  function celebrate(targetEl) {
    if (!targetEl || reducedMotion) return;
    const rect = targetEl.getBoundingClientRect();
    if (rect.width === 0) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const colors = ["#ff7900", "#4caf50", "#ffd21a", "#7223b7", "#00a4b5", "#e8523a"];
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const N = 80;
    const parts = Array.from({ length: N }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 7;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        size: 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60 + Math.random() * 40,
        age: 0,
      };
    });
    const gravity = 0.32;
    const drag = 0.985;
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      parts.forEach((p) => {
        if (p.age >= p.life) return;
        p.age++;
        p.vy += gravity;
        p.vx *= drag;
        p.vy *= drag;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        const alpha = Math.max(0, 1 - p.age / p.life);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
        alive++;
      });
      if (alive > 0) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  /* ============================================================
     DRAG & DROP · ordenar tarjetas en secuencia
     Estructura HTML:
       [data-dragdrop] con [data-dragdrop-items] (lista barajada)
       y [data-dragdrop-feedback]. Cada .module-dd-item tiene
       data-order="N" (orden correcto).
     ============================================================ */
  function initDragDrop() {
    document.querySelectorAll("[data-dragdrop]").forEach((root) => {
      const list = root.querySelector("[data-dragdrop-items]");
      const checkBtn = root.querySelector("[data-dragdrop-check]");
      const resetBtn = root.querySelector("[data-dragdrop-reset]");
      const feedback = root.querySelector("[data-dragdrop-feedback]");
      if (!list) return;

      // Barajar al iniciar (Fisher-Yates con garantía de orden distinto)
      const shuffle = () => {
        const all = Array.from(list.children);
        const original = all.slice();
        let attempt = 0;
        do {
          for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
          }
          attempt++;
        } while (attempt < 5 && all.every((el, i) => el === original[i]));
        all.forEach(el => list.appendChild(el));
        root.classList.remove("is-checked");
        list.querySelectorAll(".module-dd-item").forEach(i => i.classList.remove("is-correct", "is-wrong"));
        if (feedback) feedback.classList.remove("is-visible");
      };
      shuffle();
      resetBtn && resetBtn.addEventListener("click", shuffle);

      // Drag handlers
      let dragged = null;
      list.querySelectorAll(".module-dd-item").forEach(item => {
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (e) => {
          dragged = item;
          item.classList.add("is-dragging");
          e.dataTransfer.effectAllowed = "move";
        });
        item.addEventListener("dragend", () => {
          item.classList.remove("is-dragging");
          dragged = null;
          list.querySelectorAll(".module-dd-item").forEach(i => i.classList.remove("is-drop-target"));
        });
        item.addEventListener("dragover", (e) => {
          e.preventDefault();
          if (item !== dragged) item.classList.add("is-drop-target");
        });
        item.addEventListener("dragleave", () => item.classList.remove("is-drop-target"));
        item.addEventListener("drop", (e) => {
          e.preventDefault();
          item.classList.remove("is-drop-target");
          if (!dragged || dragged === item) return;
          const rect = item.getBoundingClientRect();
          const before = (e.clientY - rect.top) < rect.height / 2;
          list.insertBefore(dragged, before ? item : item.nextSibling);
        });
      });

      checkBtn && checkBtn.addEventListener("click", () => {
        const items = Array.from(list.querySelectorAll(".module-dd-item"));
        let allCorrect = true;
        items.forEach((item, idx) => {
          const expected = Number(item.dataset.order);
          const got = idx + 1;
          item.classList.remove("is-correct", "is-wrong");
          if (expected === got) item.classList.add("is-correct");
          else { item.classList.add("is-wrong"); allCorrect = false; }
        });
        root.classList.add("is-checked");
        if (feedback) {
          feedback.classList.add("is-visible");
          feedback.classList.toggle("is-correct", allCorrect);
          feedback.classList.toggle("is-wrong", !allCorrect);
          const msg = allCorrect
            ? (feedback.dataset.correctMsg || "¡Perfecto! Ese es el orden correcto.")
            : (feedback.dataset.wrongMsg || "Algunos pasos están fuera de lugar. Revisa los marcados en rojo.");
          feedback.innerHTML = `<small>${allCorrect ? "Correcto" : "Casi"}</small><p>${msg}</p>`;
        }
        if (allCorrect) celebrate(root);
      });
    });
  }

  /* ============================================================
     SCENARIO · mini-caso con 2-3 decisiones y consecuencias
     Estructura: [data-scenario] con .module-scenario-step (uno visible
     a la vez), cada step con .module-scenario-opt[data-next][data-effect].
     Steps tienen data-step="N" y se enlazan por data-next.
     ============================================================ */
  function initScenarios() {
    document.querySelectorAll("[data-scenario]").forEach((root) => {
      const steps = root.querySelectorAll(".module-scenario-step");
      const resetBtn = root.querySelector("[data-scenario-reset]");
      const showStep = (id) => {
        steps.forEach(s => s.classList.toggle("is-active", s.dataset.step === id));
      };
      const firstStep = steps[0] && steps[0].dataset.step;

      root.addEventListener("click", (e) => {
        const opt = e.target.closest(".module-scenario-opt");
        if (!opt) return;
        const next = opt.dataset.next;
        if (!next) return;
        // Marcar la opción elegida
        opt.closest(".module-scenario-step")
           .querySelectorAll(".module-scenario-opt")
           .forEach(o => {
             o.classList.toggle("is-picked", o === opt);
             o.disabled = true;
           });
        setTimeout(() => showStep(next), 280);
      });

      resetBtn && resetBtn.addEventListener("click", () => {
        root.querySelectorAll(".module-scenario-opt").forEach(o => {
          o.classList.remove("is-picked");
          o.disabled = false;
        });
        if (firstStep) showStep(firstStep);
      });
    });
  }

  /* ============================================================
     TRUE / FALSE rápido con justificación
     Estructura: [data-tf] con .module-tf-q + 2 botones
     [data-tf-answer="true|false"] y feedback con data-correct.
     ============================================================ */
  function initTrueFalse() {
    document.querySelectorAll("[data-tf]").forEach((root) => {
      const buttons = root.querySelectorAll("[data-tf-answer]");
      const feedback = root.querySelector("[data-tf-feedback]");
      const correct = root.dataset.correct; // "true" o "false"
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          if (root.dataset.answered === "true") return;
          root.dataset.answered = "true";
          const picked = btn.dataset.tfAnswer;
          const isCorrect = picked === correct;
          buttons.forEach(b => {
            b.disabled = true;
            const ans = b.dataset.tfAnswer;
            if (ans === correct) b.classList.add("is-correct");
            else if (b === btn) b.classList.add("is-wrong");
          });
          if (feedback) {
            feedback.classList.add("is-visible");
            feedback.classList.toggle("is-correct", isCorrect);
            feedback.classList.toggle("is-wrong", !isCorrect);
            const label = isCorrect ? "Correcto" : "No exactamente";
            feedback.innerHTML = `<small>${label}</small><p>${feedback.dataset.text || ""}</p>`;
          }
          if (isCorrect) celebrate(btn);
        });
      });
    });
  }

  /* ============================================================
     SLIDER DE IMPACTO · mover variable y ver KPIs en vivo
     [data-impact-slider] con input[type=range] data-impact-input
     y N celdas con data-impact-output="<formula>" (usa v como
     variable del slider). Opcional [data-impact-note] con template.
     Mismo motor que initSliderDemos pero con UI distinta.
     ============================================================ */
  function initImpactSliders() {
    document.querySelectorAll("[data-impact-slider]").forEach((root) => {
      const input = root.querySelector('input[type="range"]');
      const valueEl = root.querySelector("[data-impact-value]");
      const cells = root.querySelectorAll("[data-impact-output]");
      const noteEl = root.querySelector("[data-impact-note]");
      const noteTemplate = noteEl ? noteEl.dataset.template : "";
      if (!input) return;
      const update = () => {
        const v = Number(input.value);
        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const pct = ((v - min) / (max - min)) * 100;
        input.style.setProperty("--fill", pct + "%");
        if (valueEl) {
          const suffix = valueEl.dataset.suffix || "";
          valueEl.textContent = v + suffix;
        }
        cells.forEach((cell) => {
          const f = cell.dataset.impactOutput;
          const suffix = cell.dataset.suffix || "";
          const decimals = Number(cell.dataset.decimals || 0);
          const tone = cell.dataset.toneFormula;
          try {
            const result = Function("v", "return " + f)(v);
            const b = cell.querySelector("b");
            if (b) b.textContent = result.toLocaleString("es-CO", {
              minimumFractionDigits: decimals, maximumFractionDigits: decimals,
            }) + suffix;
            if (tone) {
              const t = Function("v", "return " + tone)(v); // "good" | "ok" | "bad"
              cell.dataset.tone = t;
            }
          } catch (e) {
            const b = cell.querySelector("b");
            if (b) b.textContent = "—";
          }
        });
        if (noteEl && noteTemplate) {
          noteEl.innerHTML = noteTemplate.replace(/\{([^}]+)\}/g, (_, expr) => {
            try {
              const r = Function("v", "return " + expr)(v);
              return typeof r === "number" ? r.toLocaleString("es-CO", { maximumFractionDigits: 2 }) : r;
            } catch { return "—"; }
          });
        }
      };
      input.addEventListener("input", update);
      update();
    });
  }

  /* ============================================================
     SPOT THE ISSUE · click sobre la palabra/frase problemática
     [data-spot] con .module-spot-text que contiene <span data-spot-target>
     (el correcto) y otros <span data-spot-distractor> (los incorrectos).
     ============================================================ */
  function initSpotIssue() {
    document.querySelectorAll("[data-spot]").forEach((root) => {
      const feedback = root.querySelector("[data-spot-feedback]");
      const reset = root.querySelector("[data-spot-reset]");
      const targets = root.querySelectorAll("[data-spot-target], [data-spot-distractor]");

      targets.forEach(t => {
        t.tabIndex = 0;
        t.setAttribute("role", "button");
      });

      const handle = (el) => {
        if (root.dataset.solved === "true") return;
        const isTarget = el.hasAttribute("data-spot-target");
        el.classList.add(isTarget ? "is-correct" : "is-wrong");
        if (isTarget) {
          root.dataset.solved = "true";
          // Marca también todos los targets si hay varios
          root.querySelectorAll("[data-spot-target]").forEach(t => t.classList.add("is-correct"));
        }
        if (feedback) {
          feedback.classList.add("is-visible");
          feedback.classList.toggle("is-correct", isTarget);
          feedback.classList.toggle("is-wrong", !isTarget);
          const txt = isTarget ? feedback.dataset.correctText : feedback.dataset.wrongText;
          const label = isTarget ? "Bien visto" : "No es ahí";
          feedback.innerHTML = `<small>${label}</small><p>${txt || ""}</p>`;
        }
        if (isTarget) celebrate(el);
      };

      root.addEventListener("click", (e) => {
        const t = e.target.closest("[data-spot-target], [data-spot-distractor]");
        if (t) handle(t);
      });
      root.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const t = e.target.closest("[data-spot-target], [data-spot-distractor]");
        if (t) { e.preventDefault(); handle(t); }
      });

      reset && reset.addEventListener("click", () => {
        root.dataset.solved = "false";
        targets.forEach(t => t.classList.remove("is-correct", "is-wrong"));
        feedback && feedback.classList.remove("is-visible");
      });
    });
  }

  /* ============================================================
     RANKING · ordenar items por prioridad (drag + check)
     Reutiliza el motor de drag&drop, sólo cambia el data-attr raíz.
     Casos especiales: feedback muestra el orden ideal con justificación.
     ============================================================ */
  function initRanking() {
    document.querySelectorAll("[data-ranking]").forEach((root) => {
      const list = root.querySelector("[data-ranking-items]");
      const checkBtn = root.querySelector("[data-ranking-check]");
      const resetBtn = root.querySelector("[data-ranking-reset]");
      const feedback = root.querySelector("[data-ranking-feedback]");
      if (!list) return;

      const shuffle = () => {
        // Fisher-Yates real: garantiza orden distinto al inicial
        const all = Array.from(list.children);
        const original = all.slice();
        let attempt = 0;
        do {
          for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
          }
          attempt++;
        } while (attempt < 5 && all.every((el, i) => el === original[i]));
        all.forEach(el => list.appendChild(el));
        list.querySelectorAll(".module-rank-item").forEach(i => {
          i.classList.remove("is-near", "is-far", "is-exact");
          const pos = i.querySelector(".module-rank-pos");
          if (pos) pos.textContent = "";
        });
        feedback && feedback.classList.remove("is-visible");
      };
      shuffle();
      resetBtn && resetBtn.addEventListener("click", shuffle);

      let dragged = null;
      list.querySelectorAll(".module-rank-item").forEach(item => {
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (e) => {
          dragged = item;
          item.classList.add("is-dragging");
          e.dataTransfer.effectAllowed = "move";
        });
        item.addEventListener("dragend", () => {
          item.classList.remove("is-dragging");
          dragged = null;
          list.querySelectorAll(".module-rank-item").forEach(i => i.classList.remove("is-drop-target"));
        });
        item.addEventListener("dragover", (e) => {
          e.preventDefault();
          if (item !== dragged) item.classList.add("is-drop-target");
        });
        item.addEventListener("dragleave", () => item.classList.remove("is-drop-target"));
        item.addEventListener("drop", (e) => {
          e.preventDefault();
          item.classList.remove("is-drop-target");
          if (!dragged || dragged === item) return;
          const rect = item.getBoundingClientRect();
          const before = (e.clientY - rect.top) < rect.height / 2;
          list.insertBefore(dragged, before ? item : item.nextSibling);
        });
      });

      checkBtn && checkBtn.addEventListener("click", () => {
        const items = Array.from(list.querySelectorAll(".module-rank-item"));
        let totalDiff = 0;
        items.forEach((item, idx) => {
          const expected = Number(item.dataset.rank);
          const got = idx + 1;
          const diff = Math.abs(expected - got);
          totalDiff += diff;
          item.classList.remove("is-near", "is-far", "is-exact");
          if (diff === 0) item.classList.add("is-exact");
          else if (diff === 1) item.classList.add("is-near");
          else item.classList.add("is-far");
          const pos = item.querySelector(".module-rank-pos");
          if (pos) pos.textContent = `Ideal: #${expected}`;
        });
        const great = totalDiff === 0;
        const close = totalDiff <= 2;
        if (feedback) {
          feedback.classList.add("is-visible");
          feedback.classList.toggle("is-correct", great || close);
          feedback.classList.toggle("is-wrong", !great && !close);
          const label = great ? "Ranking perfecto" : close ? "Muy cerca" : "Revisa el orden";
          const msg = great
            ? (feedback.dataset.correctMsg || "Ese es el orden recomendado.")
            : close
              ? (feedback.dataset.closeMsg || "Casi. Un par de posiciones desviadas — mira las etiquetas \"Ideal\".")
              : (feedback.dataset.wrongMsg || "Hay varias diferencias con el orden esperado. Cada item muestra su posición ideal.");
          feedback.innerHTML = `<small>${label}</small><p>${msg}</p>`;
        }
        if (great) celebrate(root);
      });
    });
  }

  /* ============================================================
     PESTEL · barras de intensidad por sector
     ============================================================ */
  function initPestelIntensity() {
    const root = document.querySelector(".module-pestel-intensity");
    if (!root) return;
    const tabs = root.querySelectorAll(".module-pestel-sector-tab");
    const rows = root.querySelectorAll(".module-pestel-bar-row");
    const note = root.querySelector("[data-pestel-note]");
    // Datos: cada sector -> peso 0-100 por variable
    const DATA = {
      alimentos: {
        weights: { political: 50, economic: 65, social: 70, tech: 35, ecological: 75, legal: 90 },
        note: "En <b>alimentos</b> manda la regulación legal (etiquetado, sanitario), seguido por lo ecológico (precio de insumos agrícolas). Lo tecnológico aún no es decisivo.",
      },
      software: {
        weights: { political: 35, economic: 55, social: 60, tech: 95, ecological: 25, legal: 70 },
        note: "En <b>software</b> el ritmo tecnológico es dominante. La regulación (Habeas Data, IA) crece rápido. Lo ecológico apenas pesa fuera de centros de datos.",
      },
      agro: {
        weights: { political: 70, economic: 65, social: 40, tech: 50, ecological: 95, legal: 65 },
        note: "En <b>agro</b> el factor ecológico (clima, agua, suelo) es decisivo. La política pública (subsidios, tierras) y los costos económicos pesan mucho.",
      },
      banca: {
        weights: { political: 60, economic: 90, social: 55, tech: 80, ecological: 35, legal: 95 },
        note: "En <b>banca</b> manda lo legal (regulación financiera) y lo económico (tasas, inflación). La transformación digital también es crítica.",
      },
    };
    const apply = (sector) => {
      const d = DATA[sector];
      if (!d) return;
      rows.forEach(row => {
        const fill = row.querySelector(".module-pestel-bar-fill");
        const value = row.querySelector(".module-pestel-bar-value");
        const key = fill.dataset.pestel;
        const w = d.weights[key];
        fill.style.setProperty("--w", w + "%");
        if (value) value.textContent = `${w}/100`;
      });
      if (note) note.innerHTML = d.note;
      tabs.forEach(t => t.classList.toggle("is-active", t.dataset.sector === sector));
    };
    tabs.forEach(t => t.addEventListener("click", () => apply(t.dataset.sector)));
    apply("alimentos");
  }

  function boot() {
    initModuleHead();
    initBloqueToc();
    initSmoothScroll();
    initTabs();
    initQuickChecks();
    initFlashcards();
    initSliderDemos();
    initInfografiaLightbox();
    initTemaAccordion();
    initDragDrop();
    initScenarios();
    initTrueFalse();
    initImpactSliders();
    initSpotIssue();
    initRanking();
    initPestelIntensity();
    initReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
