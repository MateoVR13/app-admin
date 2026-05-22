/* ============================================================
   LANDING — orquestador GSAP del aplicativo
   Sidebar + workspace · animaciones sobrias enfoque educativo
   ============================================================ */
(function initLanding() {
  if (typeof gsap === "undefined") {
    console.warn("[landing] GSAP no cargado — fallback estatico.");
    document.documentElement.classList.add("no-gsap");
    initFallback();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     SIDEBAR — active link spy + smooth scroll
     ============================================================ */
  function initNav() {
    const links = document.querySelectorAll("[data-nav-link]");
    const sections = Array.from(links)
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = "#" + entry.target.id;
            links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      sections.forEach((s) => spy.observe(s));
    }

    // Smooth scroll para anchors
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
  }

  /* ============================================================
     HERO (topbar title) — char reveal + accent underline
     ============================================================ */
  function initHero() {
    const eyebrow = document.querySelector("[data-hero-eyebrow]");
    const title   = document.querySelector("[data-hero-title]");
    const lede    = document.querySelector("[data-hero-lede]");
    const actions = document.querySelector("[data-hero-actions]");
    const accent  = document.querySelector("[data-hero-accent]");
    if (!title) return;

    // Helper: convierte un string en spans-char, dejando los espacios
    // como text nodes para evitar el colapso de espacios entre inline-block.
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

    // Split each .line into chars
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

    gsap.set([eyebrow, lede, actions], { opacity: 0, y: 18 });
    gsap.set(allChars, { yPercent: 110, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.12 });

    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6 })
      .to(allChars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: { each: 0.016, from: "start" },
      }, "-=0.3")
      .to(lede, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
      .to(actions, { opacity: 1, y: 0, duration: 0.45 }, "-=0.4");

    if (accent) {
      gsap.fromTo(
        accent,
        { "--accent-line": 0 },
        { "--accent-line": 1, duration: 0.7, delay: 1.0, ease: "expo.out" },
      );
    }
  }

  /* ============================================================
     REVEALS — fade-up [data-reveal] y line-up [data-reveal-text]
     ============================================================ */
  function initReveals() {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (reducedMotion) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0,
          duration: 0.75, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });

    document.querySelectorAll("[data-reveal-text]").forEach((el) => {
      const original = el.innerHTML;
      const lines = original.split(/<br\s*\/?>/i);
      el.innerHTML = lines
        .map((line) => `<span class="reveal-line" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.06em;"><span class="reveal-inner" style="display:inline-block;">${line.trim()}</span></span>`)
        .join("<br />");

      const inners = el.querySelectorAll(".reveal-inner");
      if (reducedMotion) {
        gsap.set(inners, { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.set(inners, { yPercent: 110, opacity: 0 });
      gsap.to(inners, {
        yPercent: 0, opacity: 1,
        duration: 0.75, ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 84%", once: true },
      });
    });
  }

  /* ============================================================
     PARALLAX — imagenes de program-card
     ============================================================ */
  function initParallax() {
    if (reducedMotion) return;
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const strength = parseFloat(el.dataset.parallax) || 0.05;
      gsap.fromTo(
        el,
        { yPercent: -strength * 100 },
        {
          yPercent: strength * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });
  }

  /* ============================================================
     MAGNETIC — botones siguen al cursor sutilmente
     ============================================================ */
  function initMagnetic() {
    if (reducedMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const move = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.18, y: y * 0.18, duration: 0.4, ease: "power3.out" });
      };
      const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
    });
  }

  /* ============================================================
     PROGRAM CARDS — micro-parallax de imagen al hover
     ============================================================ */
  function initProgramCards() {
    if (reducedMotion) return;
    document.querySelectorAll("[data-program-card]").forEach((card) => {
      const media = card.querySelector(".program-card-media-bg");
      if (!media) return;

      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
        gsap.to(media, { x, y, duration: 0.6, ease: "power3.out" });
      });
      card.addEventListener("pointerleave", () => {
        gsap.to(media, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" });
      });
    });
  }

  /* ============================================================
     FALLBACK
     ============================================================ */
  function initFallback() {
    document.querySelectorAll("[data-reveal], [data-reveal-text]").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
  }

  function boot() {
    initNav();
    initHero();
    initReveals();
    initParallax();
    initMagnetic();
    initProgramCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
