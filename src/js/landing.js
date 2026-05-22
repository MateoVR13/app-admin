/* ============================================================
   LANDING — animaciones de la pantalla de entrada
   GSAP para el headline (char reveal) y los counters de stats
   ============================================================ */
(function initLanding() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function bootHero() {
    if (typeof gsap === "undefined") return;

    const title = document.querySelector("[data-landing-title]");
    if (!title) return;

    // Split into chars (preservando espacios como text nodes)
    function appendChars(target, str) {
      str.split("").forEach((ch) => {
        if (ch === " ") {
          target.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.className = "char";
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          span.textContent = ch;
          target.appendChild(span);
        }
      });
    }

    title.querySelectorAll(".line").forEach((line) => {
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
    });

    if (reducedMotion) return;

    const allChars = title.querySelectorAll(".char");
    gsap.set(allChars, { yPercent: 110, opacity: 0 });

    gsap.to(allChars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.7,
      ease: "expo.out",
      stagger: { each: 0.022, from: "start" },
      delay: 0.25,
    });
  }

  function bootCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const animate = (el) => {
      const target = Number(el.dataset.target || el.textContent);
      if (Number.isNaN(target)) return;
      if (reducedMotion) {
        el.textContent = target.toLocaleString("es-CO");
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * ease(t)).toLocaleString("es-CO");
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((el) => obs.observe(el));
    } else {
      counters.forEach(animate);
    }
  }

  function bootCTA() {
    document.querySelectorAll("[data-open-auth]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const mode = btn.dataset.openAuth || "login"; // 'login' | 'signup' | 'recover'
        if (window.UAAuth && typeof window.UAAuth.open === "function") {
          window.UAAuth.open(mode);
          return;
        }
        // Falla visible (en vez de redirigir silenciosamente)
        console.error(
          "[landing] UAAuth no esta disponible.\n" +
          "Falta el bundle src/js/auth-modal.js.\n" +
          "Solucion: ejecuta `npm run build` en la raiz del proyecto.",
        );
        alert(
          "El modulo de autenticacion no esta compilado.\n\n" +
          "Ejecuta en la terminal:\n  npm run build\n\n" +
          "Y luego recarga la pagina con Ctrl+F5.",
        );
      });
    });
  }

  /* ============================================================
     PARTÍCULAS — canvas con puntos flotantes (paleta UA)
     ============================================================ */
  function bootParticles() {
    if (reducedMotion) return;
    const canvas = document.querySelector("[data-particles]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let W, H, particles;
    const COLORS = [
      "rgba(117, 195, 62, 0.6)",   // #75c33e — landing accent
      "rgba(167, 220, 130, 0.45)", // verde lima más claro
      "rgba(255, 255, 255, 0.4)",  // blanco suave
    ];
    const COUNT = 60;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25 - 0.08, // ligera deriva hacia arriba
          r: 0.8 + Math.random() * 2.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;

        // Wrap-around: reaparece por el lado contrario
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const flicker = 0.5 + 0.5 * Math.sin(p.twinkle);
        ctx.globalAlpha = 0.4 + flicker * 0.6;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    init();
    requestAnimationFrame(frame);

    // Re-init al redimensionar (debounced)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    });
  }

  function boot() {
    bootHero();
    bootCounters();
    bootCTA();
    bootParticles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
