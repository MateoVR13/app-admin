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
     YouTube IFrame API — empuja calidad HD del video de fondo
     YouTube ya no respeta &vq= como parámetro forzado, así que
     hay que pedir HD vía API al cargar y cuando cambie la calidad.
     ============================================================ */
  window.onYouTubeIframeAPIReady = function () {
    if (typeof YT === "undefined" || !YT.Player) return;
    const el = document.getElementById("landingHeroVideo");
    if (!el) return;

    new YT.Player("landingHeroVideo", {
      events: {
        onReady: (e) => {
          try {
            e.target.mute();
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
          } catch (err) {
            /* silencio: algunos navegadores bloquean autoplay */
          }
        },
        onPlaybackQualityChange: (e) => {
          const ok = ["hd1080", "hd1440", "hd2160", "highres"];
          if (!ok.includes(e.data)) {
            try { e.target.setPlaybackQuality("hd1080"); } catch (err) {}
          }
        },
      },
    });
  };

  function boot() {
    bootHero();
    bootCounters();
    bootCTA();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
