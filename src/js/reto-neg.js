/* ============================================================
   RETO NEGOCIOS INTERNACIONALES · RutaCafé Mundo
   Simulador de exportación en 4 fases:
     1. Comparador de mercados (radar + barras)
     2. SWOT del mercado elegido
     3. Cadena Incoterm interactiva + financiamiento con timelines
     4. Ejecución con cash flow proyectado + benchmark
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     1 · DATOS
     ============================================================ */
  const ORIGEN = { code: "co", name: "Risaralda, Colombia", lat: 4.8133, lng: -75.6961 };

  const MERCADOS = [
    {
      id: "us", name: "Estados Unidos", short: "USA",
      lat: 39.5, lng: -98.35, capital: "Washington D.C.",
      aranceles: 0, tlc: "TLC vigente (TPA)",
      consumoPerCapita: 4.2, demanda: 92, distancia: 4200, dificultad: 35,
      transporte: "Marítimo a Miami + terrestre",
      transitoDias: 7,
      barreras: "FDA, FSMA, etiquetado bilingüe inglés/español",
      premio: { margen: 28, riesgo: 25, retornoMeses: 4, sostenibilidad: 60 },
      descripcion: "El mercado más grande del mundo en consumo de café. Compradores especializados pagan premio por trazabilidad y origen único. Competencia feroz: necesitas storytelling fuerte.",
      benchmarkMargen: 26,
      swot: {
        fortalezas: ["TLC sin aranceles para café", "Distancia logística manejable (7 días)", "Cuotas grandes por contenedor"],
        debilidades: ["Compites con todo Centroamérica y África", "FDA exige documentación rigurosa", "Necesitas marketing en inglés"],
        oportunidades: ["Especialty coffee crece 12% anual", "Diáspora colombiana valida origen", "Marketplaces directos (DTC) crecen"],
        amenazas: ["Cambios de política comercial entre administraciones", "Inflación afecta consumo premium", "Cadenas grandes presionan precios"],
      },
    },
    {
      id: "uk", name: "Reino Unido", short: "UK",
      lat: 54.0, lng: -2.0, capital: "Londres",
      aranceles: 0, tlc: "Acuerdo Andino-UK",
      consumoPerCapita: 2.8, demanda: 78, distancia: 8500, dificultad: 45,
      transporte: "Marítimo a Felixstowe",
      transitoDias: 32,
      barreras: "UKCA marking, UKAS, certificación post-Brexit",
      premio: { margen: 32, riesgo: 30, retornoMeses: 6, sostenibilidad: 75 },
      descripcion: "Cultura emergente de café de especialidad. Cafeterías independientes pagan muy bien por orígenes con historia. Logística post-Brexit añade complejidad documental.",
      benchmarkMargen: 28,
      swot: {
        fortalezas: ["Acuerdo bilateral elimina aranceles", "Cultura premium de especialty crece", "Inglés como segundo idioma del equipo"],
        debilidades: ["32 días de tránsito marítimo", "Documentación post-Brexit duplicada", "Compradores exigen certificaciones específicas"],
        oportunidades: ["Café como ritual urbano profesional", "Cadenas de tercera ola pagan premium", "Ecommerce DTC con buena penetración"],
        amenazas: ["Libra esterlina volátil", "Regulación FSA puede endurecerse", "Competencia de orígenes africanos directos"],
      },
    },
    {
      id: "es", name: "España", short: "ES",
      lat: 40.0, lng: -3.7, capital: "Madrid",
      aranceles: 7.5, tlc: "Sin TLC bilateral (UE arancel general)",
      consumoPerCapita: 3.5, demanda: 70, distancia: 8000, dificultad: 30,
      transporte: "Marítimo a Valencia",
      transitoDias: 18,
      barreras: "UE: REACH, etiquetado en español, registro EORI",
      premio: { margen: 22, riesgo: 20, retornoMeses: 5, sostenibilidad: 78 },
      descripcion: "Mercado culturalmente cercano. Idioma común y diáspora colombiana en grandes ciudades. Arancel UE encarece pero red de distribución es ágil.",
      benchmarkMargen: 20,
      swot: {
        fortalezas: ["Idioma común facilita negociación", "Diáspora colombiana valida producto", "Red de distribución madura"],
        debilidades: ["Arancel UE 7.5% reduce margen", "Mercado más conservador en precios", "Competencia de café italiano consolidado"],
        oportunidades: ["Cafeterías de especialidad crecen en Madrid y Barcelona", "Turismo internacional como vitrina", "Crecimiento de DTC en Iberia"],
        amenazas: ["Política UE cambiante (EUDR)", "Crisis económica afecta consumo premium", "Inflación encarece logística europea"],
      },
    },
    {
      id: "nl", name: "Países Bajos", short: "NL",
      lat: 52.13, lng: 5.29, capital: "Ámsterdam",
      aranceles: 7.5, tlc: "Sin TLC bilateral (UE arancel general)",
      consumoPerCapita: 8.4, demanda: 88, distancia: 8500, dificultad: 40,
      transporte: "Marítimo a Rotterdam",
      transitoDias: 22,
      barreras: "UE: trazabilidad EUDR 2024, etiquetado holandés",
      premio: { margen: 35, riesgo: 28, retornoMeses: 5, sostenibilidad: 92 },
      descripcion: "Mayor consumo per cápita del mundo. Cliente sofisticado que premia sostenibilidad certificada (EUDR, Rainforest, orgánico). Rotterdam es puerta a toda Europa.",
      benchmarkMargen: 31,
      swot: {
        fortalezas: ["Mayor consumo per cápita del mundo (8.4 kg)", "Rotterdam abre puerta a toda la UE", "Cliente sofisticado paga premium"],
        debilidades: ["Arancel UE 7.5%", "EUDR 2024 exige trazabilidad costosa", "Necesitas certificación Rainforest/Orgánico"],
        oportunidades: ["Mercado premia historia + sostenibilidad", "Distribuidores europeos centralizan en NL", "Posición geográfica como hub continental"],
        amenazas: ["Regulación EUDR endurecida 2025+", "Holandeses negocian fuerte el precio", "Competencia de café brasileño masivo"],
      },
    },
    {
      id: "jp", name: "Japón", short: "JP",
      lat: 36.2, lng: 138.25, capital: "Tokio",
      aranceles: 0, tlc: "TLC vigente Colombia-Japón",
      consumoPerCapita: 3.6, demanda: 82, distancia: 14500, dificultad: 70,
      transporte: "Marítimo a Yokohama o aéreo a Narita",
      transitoDias: 38,
      barreras: "MAFF, JAS Organic, etiquetado en japonés obligatorio",
      premio: { margen: 42, riesgo: 22, retornoMeses: 8, sostenibilidad: 80 },
      descripcion: "Mercado premium con consumidores exigentes en calidad y consistencia. Los compradores valoran el café de origen único y pagan muy bien si entregas calidad estable. Distancia y barreras documentales son altas.",
      benchmarkMargen: 34,
      swot: {
        fortalezas: ["TLC sin aranceles", "Comprador premium paga 30%+ vs mercado promedio", "Relaciones de largo plazo (5-10 años)"],
        debilidades: ["14.500 km de distancia", "Documentación en japonés", "Estándares de calidad inflexibles"],
        oportunidades: ["Cafeterías de tercera ola en Tokio y Osaka", "Especialty pagando por origen único", "E-commerce premium creciente"],
        amenazas: ["Tránsito marítimo 38 días afecta frescura", "Yen volátil", "Demografía japonesa decrece"],
      },
    },
    {
      id: "kr", name: "Corea del Sur", short: "KR",
      lat: 36.5, lng: 127.85, capital: "Seúl",
      aranceles: 0, tlc: "TLC vigente Colombia-Corea",
      consumoPerCapita: 2.7, demanda: 85, distancia: 14800, dificultad: 60,
      transporte: "Marítimo a Busan + aéreo opcional",
      transitoDias: 40,
      barreras: "KFDA, etiquetado coreano, certificación HACCP",
      premio: { margen: 38, riesgo: 25, retornoMeses: 7, sostenibilidad: 70 },
      descripcion: "Mercado en explosión: el consumo creció 70% en 5 años. Cafeterías de tercera ola son referentes mundiales. Distancia es desafío pero TLC elimina aranceles.",
      benchmarkMargen: 32,
      swot: {
        fortalezas: ["TLC sin aranceles", "Consumo creció 70% en 5 años", "Cultura de cafeterías de élite"],
        debilidades: ["40 días de tránsito marítimo", "Documentación en coreano + HACCP", "Mercado pequeño pero competitivo"],
        oportunidades: ["Cafés especiales como tendencia juvenil", "K-culture exporta consumo a otros mercados", "Seúl es referente asiático"],
        amenazas: ["Won coreano dependiente del dólar", "KFDA puede pedir certificaciones extra", "Café vietnamita gana espacio bajo precio"],
      },
    },
  ];

  // Matriz Incoterms 2020 · 5 puntos de la cadena (0..4).
  // stop = punto hasta donde el VENDEDOR es responsable (riesgo transfiere ahí).
  const INCOTERMS = [
    { value: "EXW", stop: 0, title: "EXW · Ex Works",                  desc: "Entregas en fábrica. El comprador asume todo el transporte, aduana y riesgos.",            riesgo: -25, margen: -8 },
    { value: "FOB", stop: 2, title: "FOB · Free On Board",             desc: "Entregas en el barco en puerto colombiano. El comprador maneja transporte internacional.", riesgo: -10, margen: 0  },
    { value: "CIF", stop: 3, title: "CIF · Cost, Insurance & Freight", desc: "Pagas transporte y seguro hasta el puerto destino.",                                       riesgo: 5,   margen: 8  },
    { value: "DDP", stop: 4, title: "DDP · Delivered Duty Paid",       desc: "Tú entregas en bodega del cliente con todo pagado. Máximo control y margen.",              riesgo: 20,  margen: 18 },
  ];

  // 5 puntos de la cadena para la matriz
  const CHAIN_STOPS = [
    "Fábrica",
    "Puerto origen",
    "Sobre el barco",
    "Puerto destino",
    "Bodega cliente",
  ];

  const FINANCIAMIENTO = [
    {
      value: "anticipo",  title: "Pago anticipado 100%",
      desc: "El cliente paga todo antes de embarcar. Cero riesgo financiero pero pocos clientes lo aceptan.",
      riesgo: -20, margen: 0,
      timeline: [{ day: 0, amount: 100, label: "Pago total", type: "in" }],
    },
    {
      value: "carta", title: "Carta de crédito (LC) confirmada",
      desc: "Banco garantiza el pago al cumplir términos. Estándar de oro en exportación. Costo bancario ~2%.",
      riesgo: -10, margen: -2,
      timeline: [
        { day: -5, amount: -2, label: "Comisión banco", type: "out" },
        { day: 25, amount: 98, label: "Cobro al embarcar (BL)", type: "in" },
      ],
    },
    {
      value: "factoring", title: "Factoring internacional (Bancóldex)",
      desc: "Vendes la factura a un banco con descuento. Caja inmediata pero pierdes 4-6% del valor.",
      riesgo: 0, margen: -5,
      timeline: [
        { day: 25, amount: -5, label: "Descuento factoring", type: "out" },
        { day: 28, amount: 95, label: "Caja inmediata", type: "in" },
      ],
    },
    {
      value: "credito", title: "Crédito directo (60-90 días)",
      desc: "Le das plazo al comprador. Construye relación de largo plazo pero asumes riesgo de impago.",
      riesgo: 25, margen: 5,
      timeline: [
        { day: 25, amount: 0, label: "Embarque (factura)", type: "neutral" },
        { day: 85, amount: 100, label: "Cobro a 60 días", type: "in" },
      ],
    },
  ];

  const FLAGS = { co: "🇨🇴", us: "🇺🇸", uk: "🇬🇧", es: "🇪🇸", nl: "🇳🇱", jp: "🇯🇵", kr: "🇰🇷" };
  const flagEmoji = (id) => FLAGS[id] || "📍";

  /* ============================================================
     LUCIDE ICONS — SVGs inline (banderas se mantienen como emoji)
     ============================================================ */
  const LUCIDE = {
    coffee:     '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
    plane:      '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    barChart:   '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M11 16v-9"/><path d="M15 16v-7"/><path d="M19 16v-3"/>',
    target:     '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    package:    '<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>',
    factory:    '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
    ship:       '<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    anchor:     '<circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>',
    warehouse:  '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/>',
    wallet:     '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    trendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    sprout:     '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    mapPin:     '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock:      '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    landmark:   '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    clipboard:  '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    info:       '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    check:      '<polyline points="20 6 9 17 4 12"/>',
    plus:       '<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>',
  };
  function lu(name, size = 18) {
    const path = LUCIDE[name];
    if (!path) return "";
    return `<svg class="lu lu-${name}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  /* ============================================================
     2 · ESTADO
     ============================================================ */
  const STORAGE_KEY = "ua-reto-neg-state-v2";
  function initState() {
    return {
      phase: 1,
      comparing: [],      // ids de mercados en el comparador
      selectedMarket: null,
      incoterm: null,
      financing: null,
      results: null,
      onboardingSeen: false,
    };
  }
  function loadState() {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : initState(); }
    catch (e) { return initState(); }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function resetState() {
    const seen = state.onboardingSeen;
    state = initState();
    state.onboardingSeen = seen;
    saveState();
    destroyCharts();
    if (window._raneg_route) { map?.removeLayer(window._raneg_route); window._raneg_route = null; }
    if (window._raneg_plane) { map?.removeLayer(window._raneg_plane); window._raneg_plane = null; }
    render();
  }
  let state = loadState();

  /* ============================================================
     3 · UTIL
     ============================================================ */
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

  // Registry de gráficos para destruirlos al re-render
  const charts = {};
  function destroyCharts() {
    Object.values(charts).forEach(c => { try { c.destroy(); } catch (e) {} });
    Object.keys(charts).forEach(k => delete charts[k]);
  }

  /* ============================================================
     4 · MAPA
     ============================================================ */
  let map = null;
  let mapResult = null;
  const marketMarkers = {};

  function initMap() {
    if (typeof L === "undefined") return;
    const el = document.getElementById("rn-map");
    if (!el || el._leaflet_id) return;

    map = L.map(el, {
      center: [20, -30], zoom: 2, minZoom: 2, maxZoom: 6,
      zoomControl: true, scrollWheelZoom: false, attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
      maxZoom: 19, subdomains: "abcd",
    }).addTo(map);

    const origenIcon = L.divIcon({
      className: "rn-marker rn-marker--origen",
      html: `<div class="rn-marker-pin"><span class="rn-marker-pin-inner">${lu("coffee", 18)}</span></div><div class="rn-marker-label">Risaralda</div>`,
      iconSize: [40, 56], iconAnchor: [20, 56],
    });
    L.marker([ORIGEN.lat, ORIGEN.lng], { icon: origenIcon, interactive: false }).addTo(map);

    MERCADOS.forEach(m => {
      const icon = L.divIcon({
        className: "rn-marker rn-marker--dest",
        html: `<div class="rn-marker-pin"><span>${flagEmoji(m.id)}</span></div><div class="rn-marker-label">${m.short}</div>`,
        iconSize: [40, 56], iconAnchor: [20, 56],
      });
      const marker = L.marker([m.lat, m.lng], { icon, title: m.name }).addTo(map);
      marker.on("click", () => toggleCompare(m.id));
      marketMarkers[m.id] = marker;
    });

    highlightComparingMarkers();

    if (!initMap._resizeBound) {
      initMap._resizeBound = true;
      let resizeTO;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTO);
        resizeTO = setTimeout(() => {
          if (map) map.invalidateSize();
          if (mapResult) mapResult.invalidateSize();
        }, 150);
      });
    }
  }

  function initMapResult() {
    if (typeof L === "undefined") return;
    const el = document.getElementById("rn-map-result");
    if (!el || el._leaflet_id) return;

    mapResult = L.map(el, {
      center: [20, -30], zoom: 2, minZoom: 2, maxZoom: 6,
      zoomControl: false, scrollWheelZoom: false, attributionControl: false, dragging: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
      maxZoom: 19, subdomains: "abcd",
    }).addTo(mapResult);

    const origenIcon = L.divIcon({
      className: "rn-marker rn-marker--origen",
      html: `<div class="rn-marker-pin"><span class="rn-marker-pin-inner">${lu("coffee", 18)}</span></div>`,
      iconSize: [40, 40], iconAnchor: [20, 40],
    });
    L.marker([ORIGEN.lat, ORIGEN.lng], { icon: origenIcon, interactive: false }).addTo(mapResult);

    if (state.selectedMarket) {
      const m = MERCADOS.find(x => x.id === state.selectedMarket);
      const destIcon = L.divIcon({
        className: "rn-marker rn-marker--dest is-selected",
        html: `<div class="rn-marker-pin"><span>${flagEmoji(m.id)}</span></div>`,
        iconSize: [40, 40], iconAnchor: [20, 40],
      });
      L.marker([m.lat, m.lng], { icon: destIcon, interactive: false }).addTo(mapResult);

      const points = greatCirclePoints([ORIGEN.lat, ORIGEN.lng], [m.lat, m.lng], 48);
      L.polyline(points, {
        color: "#7223b7", weight: 3, opacity: 0.85, dashArray: "8 6", className: "rn-route-line",
      }).addTo(mapResult);

      const planeIcon = L.divIcon({
        className: "rn-plane",
        html: `<div class="rn-plane-icon">${lu("plane", 22)}</div>`,
        iconSize: [32, 32], iconAnchor: [16, 16],
      });
      const plane = L.marker(points[0], { icon: planeIcon, interactive: false }).addTo(mapResult);

      let i = 0;
      const step = () => {
        if (i >= points.length) return;
        plane.setLatLng(points[i]);
        i++;
        setTimeout(step, 30);
      };
      step();

      // Ajustar bounds para ver todo
      mapResult.fitBounds(L.latLngBounds([[ORIGEN.lat, ORIGEN.lng], [m.lat, m.lng]]).pad(0.3));
    }
  }

  function highlightComparingMarkers() {
    Object.entries(marketMarkers).forEach(([id, marker]) => {
      const el = marker.getElement();
      if (!el) return;
      el.classList.toggle("is-comparing", state.comparing.includes(id));
      el.classList.toggle("is-selected", id === state.selectedMarket);
    });
  }

  function greatCirclePoints(start, end, n) {
    const lat1 = toRad(start[0]), lng1 = toRad(start[1]);
    const lat2 = toRad(end[0]), lng2 = toRad(end[1]);
    const d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng2 - lng1) / 2), 2)));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const f = i / n;
      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d) / Math.sin(d);
      const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
      const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);
      pts.push([toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), toDeg(Math.atan2(y, x))]);
    }
    return pts;
  }
  const toRad = v => v * Math.PI / 180;
  const toDeg = v => v * 180 / Math.PI;

  /* ============================================================
     5 · TOGGLE COMPARADOR
     ============================================================ */
  function toggleCompare(id) {
    if (state.phase !== 1) return;
    const idx = state.comparing.indexOf(id);
    if (idx >= 0) {
      state.comparing.splice(idx, 1);
    } else {
      if (state.comparing.length >= 4) {
        // Reemplazar el más antiguo
        state.comparing.shift();
      }
      state.comparing.push(id);
    }
    saveState();
    renderPhase1();
    highlightComparingMarkers();
  }

  /* ============================================================
     6 · RENDER POR FASE
     ============================================================ */
  function render() {
    renderProgress();
    renderPhaseNav();
    renderActivePanel();
  }

  function renderProgress() {
    const fill = $("[data-progress-fill]");
    const label = $("[data-progress-label]");
    const pct = ((state.phase - 1) / 3) * 100;
    if (fill) fill.style.width = pct.toFixed(0) + "%";
    if (label) {
      const labels = ["Compara mercados", "SWOT del destino", "Configura logística", "Plan ejecutado"];
      label.textContent = `Fase ${state.phase} de 4 · ${labels[state.phase - 1]}`;
    }
  }

  function renderPhaseNav() {
    $$("[data-phase-btn]").forEach(btn => {
      const n = +btn.dataset.phaseBtn;
      btn.classList.toggle("is-active", n === state.phase);
      btn.classList.toggle("is-done", n < state.phase);
      btn.disabled = n > state.phase;
    });
  }

  function renderActivePanel() {
    $$("[data-phase-panel]").forEach(p => p.hidden = (+p.dataset.phasePanel !== state.phase));
    destroyCharts();
    if (state.phase === 1) renderPhase1();
    else if (state.phase === 2) renderPhase2();
    else if (state.phase === 3) renderPhase3();
    else if (state.phase === 4) renderPhase4();
  }

  /* ============================================================
     6.1 · FASE 1 · Comparador
     ============================================================ */
  function renderPhase1() {
    // Asegura que el mapa se inicialice cuando el panel se muestra
    setTimeout(() => {
      initMap();
      if (map) map.invalidateSize();
    }, 50);

    const chipsEl = $("[data-comparator-chips]");
    if (chipsEl) {
      chipsEl.innerHTML = MERCADOS.map(m => {
        const on = state.comparing.includes(m.id);
        return `<button type="button" class="rn-comp-chip ${on ? "is-on" : ""}" data-toggle-compare="${m.id}">
          <span class="rn-comp-chip-flag">${flagEmoji(m.id)}</span>
          <b>${m.short}</b>
          <span class="rn-comp-chip-mark" aria-hidden="true">${on ? lu("check", 12) : lu("plus", 12)}</span>
        </button>`;
      }).join("");
      $$("[data-toggle-compare]", chipsEl).forEach(btn => {
        btn.addEventListener("click", () => toggleCompare(btn.dataset.toggleCompare));
      });
    }

    const hintEl = $("[data-comparator-hint]");
    const summaryEl = $("[data-comparator-summary]");
    const nextBtn = $("[data-go-phase-2]");

    if (state.comparing.length < 2) {
      hintEl && (hintEl.textContent = `Selecciona al menos 2 mercados arriba. Actualmente: ${state.comparing.length}.`);
      summaryEl && (summaryEl.textContent = "Selecciona un mercado final para continuar.");
      if (nextBtn) nextBtn.disabled = true;
    } else {
      hintEl && (hintEl.textContent = `Comparando ${state.comparing.length} mercados. Cuando estés listo, elige uno como tu destino final.`);
      const summary = summarizeComparison();
      summaryEl && (summaryEl.innerHTML = summary);
      if (nextBtn) nextBtn.disabled = !state.selectedMarket || !state.comparing.includes(state.selectedMarket);
    }

    // Re-render: si hay 2+ mercados, dibujar barras + insights + radar
    if (state.comparing.length >= 2) {
      renderComparatorBars();
      renderComparatorInsights();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            try { renderRadarChart(); } catch (e) {}
          }, 80);
        });
      });
    } else {
      $("[data-radar-chart]")?.replaceChildren();
      $("[data-comparator-bars]")?.replaceChildren();
      $("[data-comparator-insights]")?.replaceChildren();
    }
  }

  /* ---- Insights bajo el radar ---- */
  function renderComparatorInsights() {
    const el = $("[data-comparator-insights]");
    if (!el) return;

    const items = state.comparing.map(id => MERCADOS.find(m => m.id === id));
    const best = (key, invert) => {
      const sorted = [...items].sort((a, b) =>
        invert ? (a[key] - b[key]) : (b[key] - a[key])
      );
      return sorted[0];
    };
    const bestMargen     = best("premio") || items.reduce((a, b) => a.premio.margen > b.premio.margen ? a : b);
    const winnerMargen   = items.reduce((a, b) => a.premio.margen > b.premio.margen ? a : b);
    const winnerCercano  = items.reduce((a, b) => a.transitoDias < b.transitoDias ? a : b);
    const winnerDemanda  = items.reduce((a, b) => a.demanda > b.demanda ? a : b);
    const winnerSostenib = items.reduce((a, b) => a.premio.sostenibilidad > b.premio.sostenibilidad ? a : b);

    const selected = state.selectedMarket
      ? MERCADOS.find(m => m.id === state.selectedMarket)
      : null;

    el.innerHTML = `
      <div class="rn-insights-grid">
        ${insightCard(lu("wallet", 20), "Mejor margen", winnerMargen, `${winnerMargen.premio.margen}%`)}
        ${insightCard(lu("plane", 20),  "Más cercano",  winnerCercano, `${winnerCercano.transitoDias} días`)}
        ${insightCard(lu("trendingUp", 20), "Mayor demanda", winnerDemanda, `${winnerDemanda.demanda}/100`)}
        ${insightCard(lu("sprout", 20), "Más sostenible", winnerSostenib, `${winnerSostenib.premio.sostenibilidad}/100`)}
      </div>
      ${selected ? `
        <div class="rn-insights-selected">
          <small class="rn-insights-selected-title">Tu mercado elegido</small>
          <div class="rn-insights-selected-body">
            <span class="rn-insights-selected-flag">${flagEmoji(selected.id)}</span>
            <b class="rn-insights-selected-name">${selected.name}</b>
            <p class="rn-insights-selected-desc">${selected.descripcion}</p>
            <div class="rn-insights-tags">
              <span>${lu("mapPin", 14)} ${selected.distancia.toLocaleString("es")} km</span>
              <span>${lu("clock", 14)} ${selected.transitoDias} días tránsito</span>
              <span>${lu("landmark", 14)} Aranceles ${selected.aranceles}%</span>
              <span>${lu("clipboard", 14)} ${selected.tlc}</span>
            </div>
          </div>
        </div>
      ` : `
        <div class="rn-insights-hint">
          <b>${lu("info", 16)} ¿Cómo leer este panel?</b>
          <p>El <b>radar</b> compara mercados en 5 dimensiones (área más grande = mejor). Las tarjetas de arriba muestran el ganador en cada dimensión. Cuando elijas un mercado abajo, aquí aparecerá su ficha completa.</p>
        </div>
      `}
    `;
  }

  function insightCard(icon, label, market, value) {
    return `
      <div class="rn-insight-card">
        <small class="rn-insight-title">${label}</small>
        <div class="rn-insight-body">
          <div class="rn-insight-icon">${icon}</div>
          <b class="rn-insight-market">${flagEmoji(market.id)} ${market.short}</b>
          <span class="rn-insight-value">${value}</span>
        </div>
      </div>`;
  }

  function summarizeComparison() {
    if (state.comparing.length < 2) return "—";
    const items = state.comparing.map(id => MERCADOS.find(m => m.id === id));
    const best = items.reduce((a, b) => (a.premio.margen > b.premio.margen ? a : b));
    return `<b>${flagEmoji(best.id)} ${best.name}</b> tiene el mejor margen potencial (${best.premio.margen}%). Haz click en cualquier mercado del radar para elegirlo como destino final.`;
  }

  function renderRadarChart() {
    const el = $("[data-radar-chart]");
    if (!el || typeof Chart === "undefined") return;

    const axes = ["Demanda", "Aranceles", "Sostenibilidad", "Facilidad", "Margen"];
    const palette = ["#7223b7", "#00a4b5", "#ff7900", "#4caf50"];
    const data = state.comparing.map((id, i) => {
      const m = MERCADOS.find(x => x.id === id);
      return {
        id: m.id,
        name: m.short,
        color: palette[i % palette.length],
        values: [
          m.demanda,
          Math.max(0, 100 - m.aranceles * 8),
          m.premio.sostenibilidad,
          100 - m.dificultad,
          Math.min(100, m.premio.margen * 2),
        ],
      };
    });

    const legend = data.map(d =>
      `<button type="button" class="rn-radar-legend-item" data-select-final="${d.id}">
        <span class="rn-radar-legend-dot" style="background:${d.color}"></span>
        <b>${d.name}</b>
      </button>`
    ).join("");

    el.innerHTML = `
      <div class="rn-radar-stage">
        <canvas data-radar-canvas></canvas>
      </div>
      <div class="rn-radar-legend">${legend}</div>
    `;

    const canvas = el.querySelector("[data-radar-canvas]");
    if (charts.radar) { try { charts.radar.destroy(); } catch (e) {} }

    const hexA = (hex, a) => {
      const h = hex.replace("#", "");
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    charts.radar = new Chart(canvas, {
      type: "radar",
      data: {
        labels: axes,
        datasets: data.map(d => ({
          label: d.name,
          data: d.values,
          backgroundColor: hexA(d.color, 0.18),
          borderColor: d.color,
          borderWidth: 2,
          pointBackgroundColor: d.color,
          pointBorderColor: "#fff",
          pointBorderWidth: 1.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          _marketId: d.id,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(20,20,30,0.94)",
            titleFont: { family: "Inter, system-ui, sans-serif", weight: 700 },
            bodyFont: { family: "JetBrains Mono, monospace", size: 12 },
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => `${ctx.dataset.label} · ${ctx.label}: ${ctx.parsed.r}/100`,
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, display: false, backdropColor: "transparent" },
            grid: { color: "rgba(0,0,0,0.08)" },
            angleLines: { color: "rgba(0,0,0,0.08)" },
            pointLabels: {
              font: { family: "Inter, system-ui, sans-serif", size: 12, weight: 600 },
              color: "#555",
            },
          },
        },
        onClick: (evt, items) => {
          if (!items.length) return;
          const ds = charts.radar.data.datasets[items[0].datasetIndex];
          const id = ds && ds._marketId;
          if (id) selectFinalMarket(id);
        },
      },
    });

    $$("[data-select-final]", el).forEach(b => {
      b.addEventListener("click", () => selectFinalMarket(b.dataset.selectFinal));
    });
  }

  function renderComparatorBars() {
    const el = $("[data-comparator-bars]");
    if (!el) return;
    const metrics = [
      { key: "consumoPerCapita", label: "Consumo per cápita (kg/año)", scale: 10 },
      { key: "transitoDias",     label: "Días de tránsito",            scale: 50, invert: true },
      { key: "demanda",          label: "Demanda (0-100)",             scale: 100 },
    ];
    el.innerHTML = `
      <div class="rn-comp-bars-list">
        ${metrics.map(metric => {
          return `
            <div class="rn-comp-bar-group">
              <h5>${metric.label}</h5>
              ${state.comparing.map((id, i) => {
                const m = MERCADOS.find(x => x.id === id);
                const v = m[metric.key];
                const pct = clamp((v / metric.scale) * 100, 4, 100);
                const tone = metric.invert
                  ? (v <= 15 ? "good" : v <= 30 ? "ok" : "bad")
                  : (v >= 70 ? "good" : v >= 40 ? "ok" : "bad");
                return `
                  <div class="rn-comp-bar">
                    <span class="rn-comp-bar-label">${flagEmoji(m.id)} ${m.short}</span>
                    <div class="rn-comp-bar-track">
                      <div class="rn-comp-bar-fill is-${tone}" style="width:${pct}%">
                        <span>${v}</span>
                      </div>
                    </div>
                  </div>`;
              }).join("")}
            </div>`;
        }).join("")}
      </div>

      <div class="rn-comp-select-final">
        <h5>Elige tu destino final</h5>
        <div class="rn-comp-final-grid">
          ${state.comparing.map(id => {
            const m = MERCADOS.find(x => x.id === id);
            const sel = state.selectedMarket === id;
            return `
              <button type="button" class="rn-comp-final-card ${sel ? "is-selected" : ""}" data-select-final="${id}">
                <span class="rn-comp-final-flag">${flagEmoji(m.id)}</span>
                <b>${m.name}</b>
                <small>Margen base: ${m.premio.margen}%</small>
                ${sel ? `<span class="rn-comp-final-check">${lu("check", 12)} Elegido</span>` : ""}
              </button>`;
          }).join("")}
        </div>
      </div>`;

    $$("[data-select-final]", el).forEach(btn => {
      btn.addEventListener("click", () => selectFinalMarket(btn.dataset.selectFinal));
    });
  }

  function selectFinalMarket(id) {
    state.selectedMarket = id;
    saveState();
    renderPhase1();
    highlightComparingMarkers();
  }

  /* ============================================================
     6.2 · FASE 2 · SWOT
     ============================================================ */
  function renderPhase2() {
    const m = MERCADOS.find(x => x.id === state.selectedMarket);
    if (!m) return;
    const el = $("[data-swot]");
    if (!el) return;
    el.innerHTML = `
      <div class="rn-swot-head">
        <div class="rn-swot-head-flag">${flagEmoji(m.id)}</div>
        <div>
          <small>Destino confirmado</small>
          <h3>${m.name}</h3>
          <p>${m.descripcion}</p>
        </div>
        <div class="rn-swot-stats">
          <div><small>Aranceles</small><b>${m.aranceles}%</b></div>
          <div><small>Distancia</small><b>${m.distancia.toLocaleString("es")} km</b></div>
          <div><small>Tránsito</small><b>${m.transitoDias} días</b></div>
          <div><small>Demanda</small><b>${m.demanda}/100</b></div>
        </div>
      </div>

      <div class="rn-swot-matrix">
        <div class="rn-swot-cell is-f">
          <header><span>🟢</span><h4>Fortalezas</h4><small>Internas, controlas tú</small></header>
          <ul>${m.swot.fortalezas.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
        <div class="rn-swot-cell is-o">
          <header><span>🔵</span><h4>Oportunidades</h4><small>Externas del mercado</small></header>
          <ul>${m.swot.oportunidades.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
        <div class="rn-swot-cell is-d">
          <header><span>🟠</span><h4>Debilidades</h4><small>Internas a mejorar</small></header>
          <ul>${m.swot.debilidades.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
        <div class="rn-swot-cell is-a">
          <header><span>🔴</span><h4>Amenazas</h4><small>Externas que vigilar</small></header>
          <ul>${m.swot.amenazas.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>
      </div>`;
  }

  /* ============================================================
     6.3 · FASE 3 · Cadena Incoterm + Financiamiento
     ============================================================ */
  function renderPhase3() {
    renderChain();
    renderFinancingGrid();
    refreshPhase3CTA();
  }

  function renderChain() {
    const rowsEl = $("[data-matrix-rows]");
    if (!rowsEl) return;
    const N = CHAIN_STOPS.length; // 5 puntos
    const selected = state.incoterm;

    rowsEl.innerHTML = INCOTERMS.map(inc => {
      const isSel = inc.value === selected;
      // El vendedor cubre desde 0 hasta inc.stop (inclusive).
      // Barra: el segmento del vendedor va del 0 al (stop + 0.5),
      // el comprador del (stop + 0.5) al N-1.
      const splitPct = ((inc.stop + 0.5) / (N - 1)) * 100;
      const sellerWidth = Math.min(100, Math.max(0, splitPct));
      const buyerLeft = sellerWidth;
      const buyerWidth = 100 - sellerWidth;

      return `
        <button type="button" class="rn-matrix-row ${isSel ? "is-selected" : ""}" data-matrix-incoterm="${inc.value}" role="row">
          <span class="rn-matrix-row-label" role="rowheader">
            <b>${inc.value}</b>
          </span>
          <div class="rn-matrix-row-bar" role="cell">
            <div class="rn-matrix-bar-seller" style="width:${sellerWidth}%"></div>
            <div class="rn-matrix-bar-buyer" style="left:${buyerLeft}%; width:${buyerWidth}%"></div>
            <div class="rn-matrix-risk" style="left:${sellerWidth}%" title="Punto de transferencia de riesgo">
              <span>!</span>
            </div>
            <div class="rn-matrix-bar-label rn-matrix-bar-label--seller" style="width:${sellerWidth}%">
              <span>${inc.title.split(" · ")[1] || inc.value}</span>
            </div>
          </div>
        </button>`;
    }).join("");

    // Explainer
    const inc = INCOTERMS.find(i => i.value === selected);
    const explainer = $("[data-chain-explainer]");
    if (explainer) {
      if (!inc) {
        explainer.innerHTML = `<b>Aún no has elegido.</b> Haz click en una fila para seleccionar tu Incoterm.`;
      } else {
        explainer.innerHTML = `
          <b>Has elegido ${inc.value}:</b> ${inc.desc}
          <span class="rn-chain-impact">
            <em>Impacto:</em>
            Margen <b class="${inc.margen >= 0 ? "is-pos" : "is-neg"}">${inc.margen >= 0 ? "+" : ""}${inc.margen}%</b>
            · Riesgo operativo <b class="${inc.riesgo <= 0 ? "is-pos" : "is-neg"}">${inc.riesgo >= 0 ? "+" : ""}${inc.riesgo}</b>
          </span>`;
      }
    }

    // Bind clicks en filas
    $$(".rn-matrix-row", rowsEl).forEach(row => {
      row.addEventListener("click", () => {
        const val = row.dataset.matrixIncoterm;
        state.incoterm = val;
        saveState();
        renderChain();
        refreshPhase3CTA();
      });
    });
  }

  function renderFinancingGrid() {
    const grid = $("[data-financing-grid]");
    if (!grid) return;
    grid.innerHTML = FINANCIAMIENTO.map(f => {
      const sel = state.financing === f.value;
      return `
        <article class="rn-fin-card ${sel ? "is-selected" : ""}" data-financing="${f.value}">
          <header class="rn-fin-card-head">
            <h5>${f.title}</h5>
            ${sel ? `<span class="rn-fin-check">${lu("check", 12)} Elegido</span>` : ""}
          </header>
          <p>${f.desc}</p>
          <div class="rn-fin-impact">
            <span>Margen <b class="${f.margen >= 0 ? "is-pos" : "is-neg"}">${f.margen >= 0 ? "+" : ""}${f.margen}%</b></span>
            <span>Riesgo <b class="${f.riesgo <= 0 ? "is-pos" : "is-neg"}">${f.riesgo >= 0 ? "+" : ""}${f.riesgo}</b></span>
          </div>
          ${renderFinTimelineSVG(f)}
        </article>`;
    }).join("");

    $$("[data-financing]", grid).forEach(card => {
      card.addEventListener("click", () => {
        state.financing = card.dataset.financing;
        saveState();
        renderFinancingGrid();
        refreshPhase3CTA();
      });
    });
  }

  function renderFinTimelineSVG(f) {
    // Timeline HTML puro — sin SVG (la fuente se rompe en SVG)
    const minDay = -5, maxDay = 90;
    const dayToPct = d => ((d - minDay) / (maxDay - minDay)) * 100;

    const ticks = [0, 30, 60, 90];
    const tickElems = ticks.map(d => `
      <span class="rn-fin-tick" style="left:${dayToPct(d)}%">
        <span class="rn-fin-tick-bar"></span>
        <span class="rn-fin-tick-label">D${d}</span>
      </span>`).join("");

    const payments = f.timeline.map(t => {
      const sign = t.amount > 0 ? "+" : "";
      const label = `${sign}${t.amount}%`;
      return `
        <span class="rn-fin-payment rn-fin-payment--${t.type}" style="left:${dayToPct(t.day)}%">
          <span class="rn-fin-payment-amount">${label}</span>
          <span class="rn-fin-payment-dot"></span>
        </span>`;
    }).join("");

    return `
      <div class="rn-fin-timeline-wrap">
        <div class="rn-fin-timeline-track">
          <div class="rn-fin-timeline-line"></div>
          ${tickElems}
          ${payments}
        </div>
        <div class="rn-fin-timeline-legend">
          ${f.timeline.map(t => `<span class="rn-fin-tl-item rn-fin-tl-${t.type}">D${t.day} · ${t.label}</span>`).join("")}
        </div>
      </div>`;
  }

  function refreshPhase3CTA() {
    const btn = $("[data-execute]");
    if (btn) btn.disabled = !(state.incoterm && state.financing);
  }

  /* ============================================================
     6.4 · FASE 4 · Cash flow + benchmark
     ============================================================ */
  function computeResults() {
    if (!state.selectedMarket || !state.incoterm || !state.financing) return null;
    const m = MERCADOS.find(x => x.id === state.selectedMarket);
    const inc = INCOTERMS.find(x => x.value === state.incoterm);
    const fin = FINANCIAMIENTO.find(x => x.value === state.financing);
    const base = m.premio;
    return {
      margen:         clamp(base.margen + inc.margen + fin.margen),
      riesgo:         clamp(base.riesgo + inc.riesgo + fin.riesgo),
      retorno:        base.retornoMeses + Math.round(m.transitoDias / 30),
      sostenibilidad: base.sostenibilidad,
      market: m.name, incoterm: inc.title, financing: fin.title,
      benchmarkMargen: m.benchmarkMargen,
    };
  }

  function renderPhase4() {
    if (!state.results) state.results = computeResults();
    setTimeout(() => initMapResult(), 80);

    const r = state.results;
    const m = MERCADOS.find(x => x.id === state.selectedMarket);

    const kpisEl = $("[data-results-kpis]");
    if (kpisEl) {
      const margenTone = r.margen >= 35 ? "good" : r.margen >= 20 ? "ok" : "bad";
      const riesgoTone = r.riesgo <= 30 ? "good" : r.riesgo <= 55 ? "ok" : "bad";
      kpisEl.innerHTML = `
        <div class="rn-result rn-result--${margenTone}">
          <small>Margen estimado</small>
          <b>${r.margen}%</b>
          <span>EBITDA por contenedor</span>
        </div>
        <div class="rn-result rn-result--${riesgoTone}">
          <small>Riesgo integral</small>
          <b>${r.riesgo}/100</b>
          <span>${riesgoTone === "good" ? "Manejable" : riesgoTone === "ok" ? "Vigilar" : "Alto"}</span>
        </div>
        <div class="rn-result">
          <small>Retorno</small>
          <b>${r.retorno} m</b>
          <span>Primer cobro neto</span>
        </div>
        <div class="rn-result">
          <small>Sostenibilidad</small>
          <b>${r.sostenibilidad}/100</b>
          <span>Trazabilidad + huella</span>
        </div>`;
    }

    renderCashflowChart(r);
    renderBenchmarkChart(r, m);

    const narrativeEl = $("[data-results-narrative]");
    if (narrativeEl) narrativeEl.innerHTML = narrativeFor(r, m);
  }

  function renderCashflowChart(r) {
    const el = $("[data-cashflow-chart]");
    const note = $("[data-cashflow-note]");
    if (!el || typeof Chart === "undefined") return;

    const margenFrac = r.margen / 100;
    const monthlyRevenue = 50;
    const N = 13;
    const labels = Array.from({ length: N }, (_, i) => `M${i}`);
    const ingresos = labels.map((_, i) => i === 0 ? 0 : monthlyRevenue);
    const costos = labels.map((_, i) => i === 0 ? 0 : monthlyRevenue * (1 - margenFrac));
    const ebitdaAcum = ingresos.reduce((acc, v, i) => {
      acc.push((acc[i - 1] || 0) + (v - costos[i]));
      return acc;
    }, []);

    el.innerHTML = `<canvas data-cashflow-canvas></canvas>`;
    const canvas = el.querySelector("[data-cashflow-canvas]");
    if (charts.cashflow) { try { charts.cashflow.destroy(); } catch (e) {} }

    charts.cashflow = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Ingresos mensuales",
            data: ingresos,
            borderColor: "#4caf50",
            backgroundColor: "rgba(76,175,80,0.18)",
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: "Costos mensuales",
            data: costos,
            borderColor: "#e8523a",
            backgroundColor: "rgba(232,82,58,0.14)",
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: "EBITDA acumulado",
            data: ebitdaAcum,
            borderColor: "#7223b7",
            backgroundColor: "rgba(114,35,183,0.1)",
            fill: false,
            tension: 0.25,
            pointRadius: 4,
            pointHoverRadius: 7,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: { family: "Inter, system-ui, sans-serif", size: 12, weight: 600 },
              usePointStyle: true,
              pointStyle: "circle",
              padding: 18,
            },
          },
          tooltip: {
            backgroundColor: "rgba(20,20,30,0.94)",
            titleFont: { family: "Inter, system-ui, sans-serif", weight: 700 },
            bodyFont: { family: "JetBrains Mono, monospace", size: 12 },
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => `${ctx.dataset.label}: COP ${ctx.parsed.y.toFixed(1)} M`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { font: { family: "JetBrains Mono, monospace", size: 11 }, color: "#666" },
          },
          y: {
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: {
              font: { family: "JetBrains Mono, monospace", size: 11 },
              color: "#666",
              callback: v => `${v} M`,
            },
            beginAtZero: true,
          },
        },
      },
    });

    if (note) {
      const final = ebitdaAcum[ebitdaAcum.length - 1].toFixed(0);
      note.innerHTML = `Tu EBITDA acumulado a 12 meses sería de aproximadamente <b>COP ${final} millones</b> con un volumen referencia de 12 contenedores. Asume precios estables.`;
    }
  }

  function renderBenchmarkChart(r, m) {
    const el = $("[data-benchmark-chart]");
    if (!el || typeof Chart === "undefined") return;

    el.innerHTML = `<canvas data-benchmark-canvas></canvas>`;
    const canvas = el.querySelector("[data-benchmark-canvas]");
    if (charts.benchmark) { try { charts.benchmark.destroy(); } catch (e) {} }

    charts.benchmark = new Chart(canvas, {
      type: "bar",
      data: {
        labels: [`Margen a ${m.short}`],
        datasets: [
          {
            label: "Tu plan",
            data: [r.margen],
            backgroundColor: "#7223b7",
            borderRadius: 6,
            barPercentage: 0.5,
            categoryPercentage: 0.6,
          },
          {
            label: "Benchmark",
            data: [r.benchmarkMargen],
            backgroundColor: "#999",
            borderRadius: 6,
            barPercentage: 0.5,
            categoryPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: { family: "Inter, system-ui, sans-serif", size: 12, weight: 600 },
              usePointStyle: true,
              pointStyle: "rectRounded",
              padding: 18,
            },
          },
          tooltip: {
            backgroundColor: "rgba(20,20,30,0.94)",
            titleFont: { family: "Inter, system-ui, sans-serif", weight: 700 },
            bodyFont: { family: "JetBrains Mono, monospace", size: 12 },
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: "Inter, system-ui, sans-serif", size: 12, weight: 700 } },
          },
          y: {
            beginAtZero: true,
            max: Math.max(r.margen, r.benchmarkMargen, 40) * 1.2,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: {
              font: { family: "JetBrains Mono, monospace", size: 11 },
              color: "#666",
              callback: v => `${v}%`,
            },
          },
        },
      },
    });
  }

  function narrativeFor(r, m) {
    if (r.margen >= 35 && r.riesgo <= 30) {
      return `<b>Excelente ruta.</b> Tu margen del ${r.margen}% supera el benchmark de exportadores a ${m.short} (${r.benchmarkMargen}%) y el riesgo está bajo control. <b>RutaCafé puede escalar a este mercado</b> con un plan de 12-18 meses.`;
    }
    if (r.margen >= 25 && r.riesgo <= 50) {
      return `<b>Plan razonable.</b> Tu margen del ${r.margen}% es competitivo (benchmark ${r.benchmarkMargen}%) y el riesgo es manejable. Vale la pena enviar el primer contenedor de prueba y ajustar términos con datos reales.`;
    }
    if (r.riesgo > 60) {
      return `<b>Riesgo alto.</b> La combinación elegida deja a RutaCafé expuesta — riesgo ${r.riesgo}/100. Reconsidera el Incoterm (asumir menos tramos) o el financiamiento (carta de crédito en vez de crédito directo).`;
    }
    return `<b>Plan viable pero ajustado.</b> Tu margen del ${r.margen}% queda por debajo del benchmark (${r.benchmarkMargen}%). Renegocia el Incoterm para asumir más responsabilidad y capturar más margen, o considera otro mercado donde tus capacidades brillen más.`;
  }

  /* ============================================================
     7 · NAVEGACIÓN DE FASES
     ============================================================ */
  function goToPhase(n) {
    if (n < 1 || n > 4) return;
    state.phase = n;
    if (n === 4 && !state.results) state.results = computeResults();
    saveState();
    render();
    // Scroll a la parte superior del reto al cambiar de fase
    requestAnimationFrame(() => {
      const top = document.querySelector(".rn-head") || document.body;
      const y = top.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }

  /* ============================================================
     8 · MODAL DE CIERRE (plan completo)
     ============================================================ */
  function showReport() {
    if (!state.results || !state.selectedMarket) return;
    const m = MERCADOS.find(x => x.id === state.selectedMarket);
    const r = state.results;
    const modal = $("[data-modal]");
    if (!modal) return;

    const set = (sel, val, html) => { const el = $(sel); if (el) { if (html) el.innerHTML = val; else el.textContent = val; } };
    set("[data-modal-cheer-title]", "¡Plan de exportación trazado!");
    set("[data-modal-cheer-sub]", `Tu primer contenedor sale de Risaralda hacia ${m.name}.`);
    set("[data-modal-title]", `Risaralda → ${m.name}`);
    const verdictLabel = r.margen >= 35 && r.riesgo <= 30 ? "Plan recomendado por ProColombia"
                       : r.margen >= 25 && r.riesgo <= 50 ? "Plan viable con seguimiento mensual"
                       : r.riesgo > 60 ? "Plan de alto riesgo · revisar Incoterm"
                       : "Plan viable con margen ajustado";
    set("[data-modal-verdict]", `Veredicto: <b>${verdictLabel}</b>`, true);

    const tone = r.margen >= 35 && r.riesgo <= 30 ? "good"
               : r.margen >= 25 && r.riesgo <= 50 ? "ok" : "bad";
    modal.dataset.tone = tone;

    const routeEl = $("[data-plan-route]");
    if (routeEl) routeEl.innerHTML = `
      <div class="rn-plan-route-track">
        <div class="rn-plan-route-node is-origin">
          <span>${flagEmoji("co")}</span><b>Risaralda</b><small>Colombia · Origen</small>
        </div>
        <div class="rn-plan-route-arrow">
          <span class="rn-plan-route-arrow-line"></span>
          <span class="rn-plan-route-arrow-tag">${m.distancia.toLocaleString("es")} km · ${m.transitoDias} días</span>
        </div>
        <div class="rn-plan-route-node is-dest">
          <span>${flagEmoji(m.id)}</span><b>${m.short}</b><small>${m.name}</small>
        </div>
      </div>`;

    const scoresEl = $("[data-plan-scores]");
    if (scoresEl) {
      const items = [
        { label: "Margen estimado",   value: `${r.margen}%`,            tone: r.margen >= 35 ? "good" : r.margen >= 20 ? "ok" : "bad" },
        { label: "Riesgo integral",   value: `${r.riesgo}/100`,         tone: r.riesgo <= 30 ? "good" : r.riesgo <= 55 ? "ok" : "bad" },
        { label: "Tiempo de retorno", value: `${r.retorno} meses`,      tone: r.retorno <= 6 ? "good" : r.retorno <= 9 ? "ok" : "bad" },
        { label: "Sostenibilidad",    value: `${r.sostenibilidad}/100`, tone: r.sostenibilidad >= 70 ? "good" : r.sostenibilidad >= 50 ? "ok" : "bad" },
      ];
      scoresEl.innerHTML = items.map(i => `
        <div class="rn-plan-score rn-plan-score--${i.tone}">
          <b>${i.value}</b>
          <small>${i.label}</small>
        </div>`).join("");
    }

    const fbEl = $("[data-plan-feedback]");
    if (fbEl) fbEl.innerHTML = `
      <p><b>Mercado:</b> ${m.name}. ${m.descripcion}</p>
      <p><b>Incoterm:</b> ${r.incoterm}</p>
      <p><b>Financiamiento:</b> ${r.financing}</p>
      <p>${narrativeFor(r, m)}</p>`;

    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
  }

  /* ============================================================
     9 · ONBOARDING
     ============================================================ */
  function showOnboarding() {
    const ob = $("[data-onboarding]");
    if (!ob) return;
    ob.hidden = false;
  }
  function hideOnboarding() {
    const ob = $("[data-onboarding]");
    if (!ob) return;
    ob.hidden = true;
    state.onboardingSeen = true;
    saveState();
  }

  /* ============================================================
     10 · INIT
     ============================================================ */
  function init() {
    render();

    // Onboarding al primer ingreso
    if (!state.onboardingSeen) showOnboarding();

    $$("[data-onboarding-close], [data-onboarding-start]").forEach(b => {
      b.addEventListener("click", hideOnboarding);
    });

    $$("[data-phase-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = +btn.dataset.phaseBtn;
        if (btn.disabled) return;
        goToPhase(n);
      });
    });

    $$("[data-phase-back]").forEach(b => {
      b.addEventListener("click", () => goToPhase(+b.dataset.phaseBack));
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-go-phase-2]")) {
        if (!state.selectedMarket) return;
        goToPhase(2);
      }
      if (e.target.closest("[data-go-phase-3]")) goToPhase(3);
      if (e.target.closest("[data-execute]")) {
        if (!(state.incoterm && state.financing)) return;
        state.results = computeResults();
        goToPhase(4);
      }
      if (e.target.closest("[data-reset]")) {
        if (confirm("¿Probar otra ruta? Perderás el plan actual.")) resetState();
      }
      if (e.target.closest("[data-show-report]")) showReport();
      if (e.target.closest("[data-modal-reset]")) resetState();
    });

    $$("[data-modal-close]").forEach(b => b.addEventListener("click", () => {
      const m = $("[data-modal]");
      m?.setAttribute("aria-hidden", "true");
      m?.classList.remove("is-open");
    }));

    window.addEventListener("pageshow", () => { document.body.style.opacity = "1"; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
