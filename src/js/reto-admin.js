/* ============================================================
   RETO ADMINISTRACIÓN · TechCorp 360
   Simulador de los primeros 90 días como COO.
   3 tabs (Bandeja / Personal / Empresa) + 8 correos con:
   · datos adjuntos visuales (ApexCharts)
   · marco teórico aplicado
   · confirmación previa de decisión
   · onboarding inicial
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     1 · EQUIPO
     ============================================================ */
  const TEAM = {
    AC: { name: "Andrés Castro",     role: "CFO",                 avatar: "assets/images/team/avatar-ac.png" },
    JM: { name: "Javier Mora",       role: "Tech Lead Backend",   avatar: "assets/images/team/avatar-jm.png" },
    CR: { name: "Carolina Restrepo", role: "CEO",                 avatar: "assets/images/team/avatar-cr.png" },
    KM: { name: "Karen Mendoza",     role: "Directora de Talento",avatar: "assets/images/team/avatar-km.png" },
    AR: { name: "Ana Ruiz",          role: "Frontend Senior",     avatar: "assets/images/team/avatar-ar.png" },
    LV: { name: "Laura Vega",        role: "Product Manager",     avatar: "assets/images/team/avatar-lv.png" },
    DS: { name: "Diego Sánchez",     role: "DevOps & Seguridad",  avatar: "assets/images/team/avatar-ds.png" },
    MR: { name: "María Rodríguez",   role: "QA Lead",             avatar: "assets/images/team/avatar-mr.png" },
  };

  const TEAM_INIT = {
    AC: { mood: 50, productivity: 70, loyalty: 60 },
    JM: { mood: 35, productivity: 55, loyalty: 35 },
    CR: { mood: 50, productivity: 70, loyalty: 70 },
    KM: { mood: 55, productivity: 65, loyalty: 70 },
    AR: { mood: 50, productivity: 60, loyalty: 55 },
    LV: { mood: 50, productivity: 65, loyalty: 60 },
    DS: { mood: 50, productivity: 70, loyalty: 60 },
    MR: { mood: 50, productivity: 60, loyalty: 55 },
  };

  const METRICS_INIT = {
    bsc:        { financiera: 25, procesos: 35, clientes: 40, aprendizaje: 30 },
    finances:   { revenue: 2400, costs: 1850, runway: 14 },
    wellbeing:  { eNPS: 12, rotation: 8, satisfaction: 50 },
    quarterDay: 1,
  };

  /* ============================================================
     2 · CATÁLOGO DE EMAILS — 8 decisiones con datos + teoría
     ============================================================ */
  const EMAILS = [
    /* ── 1 · Día 1 — Productividad ── */
    {
      id: "e1", day: 1, from: "AC",
      subject: "Caída del 15% en productividad — propuesta urgente",
      preview: "Vamos directo al punto. La productividad cayó 15% en los últimos 6 meses...",
      body: `
        <p>Bienvenido al equipo, COO. Vamos directo al punto.</p>
        <p>La productividad cayó <b>15% en los últimos 6 meses</b>. El comité financiero ya tiene una propuesta: instalar un software de control de tiempos y movimientos para los desarrolladores (enfoque tipo Taylor). Yo creo que es lo más rápido. La directora de talento, Karen, opina diferente.</p>
        <p><b>¿Qué decides hacer?</b></p>
      `,
      attachment: {
        title: "Productividad por sprint · últimos 6 meses",
        type: "line",
        data: {
          categories: ["Hace 6m", "5m", "4m", "3m", "2m", "1m", "Hoy"],
          series: [{ name: "Story points entregados", data: [100, 96, 92, 88, 85, 84, 85] }],
          target: 100,
        },
        note: "La caída del 15% es real y sostenida. La pregunta es <b>qué la causa</b>: ¿desmotivación, complejidad técnica, deuda acumulada?",
      },
      theory: {
        name: "Taylor vs. Mayo · Administración Científica vs. Relaciones Humanas",
        principle: "Frederick Taylor (1911) propuso eficiencia por medición rigurosa. Elton Mayo (1932) descubrió que la productividad sube cuando los trabajadores se sienten escuchados. Tu decisión te ubica en este espectro.",
        applies: "Estás eligiendo entre <b>control</b> (medir todo) o <b>autonomía</b> (confiar en el equipo). Cada extremo tiene costos.",
      },
      multi: false,
      options: [
        {
          value: "taylor", tag: "Administración científica",
          title: "Aprobar el software de control de tiempos",
          desc: "Métricas duras, dashboards de productividad por persona. La jugada de Taylor: maximizar eficiencia midiendo todo. Acelera resultados visibles, tensiona la cultura.",
          feedback: "Andrés agradece la velocidad. Karen guarda silencio incómodo. Los desarrolladores reciben la noticia con tensión visible.",
          impactSummary: "Sube finanzas y procesos, baja moral del equipo y aprendizaje.",
          bsc: { financiera: 20, procesos: 25, clientes: 0, aprendizaje: -15 },
          mood: { AC: 1, JM: -2, AR: -1, DS: -1, MR: -1, KM: -2, LV: 0, CR: 0 },
        },
        {
          value: "mayo", tag: "Relaciones humanas",
          title: "Empoderar a los líderes intermedios",
          desc: "Le das autonomía a los tech leads para diagnosticar causas y abres espacios de retroalimentación. Tarda más, pero construye base sólida.",
          feedback: "Karen aplaude la decisión. Andrés pide impacto medible en 60 días. El equipo respira.",
          impactSummary: "Pequeña pérdida financiera a cambio de gran ganancia en aprendizaje y moral.",
          bsc: { financiera: -5, procesos: 10, clientes: 5, aprendizaje: 25 },
          mood: { AC: -1, JM: 2, AR: 2, DS: 1, MR: 1, KM: 2, LV: 1, CR: 0 },
        },
        {
          value: "hibrido", tag: "Síntesis moderna",
          title: "Métricas por equipo + autonomía interna",
          desc: "Defines indicadores de resultado por equipo (no por persona). Mides el «qué», respetas el «cómo».",
          feedback: "Síntesis que convence al CFO y a Talento. Una lectura madura del problema.",
          impactSummary: "Balance equilibrado en las 4 perspectivas del BSC.",
          bsc: { financiera: 10, procesos: 20, clientes: 5, aprendizaje: 20 },
          mood: { AC: 1, JM: 1, AR: 1, DS: 1, MR: 1, KM: 1, LV: 1, CR: 1 },
        },
        {
          value: "esquivar", tag: "Tercerización",
          title: "Tercerizar las áreas con peor desempeño",
          desc: "Mover el problema fuera del balance contratando un proveedor externo. Pierdes conocimiento interno y quedas dependiente.",
          feedback: "Andrés satisfecho con el ahorro. El equipo lo percibe como voto de no confianza. La rotación sube.",
          impactSummary: "Ahorro financiero a costa de cultura y aprendizaje organizacional.",
          bsc: { financiera: 15, procesos: 5, clientes: -10, aprendizaje: -25 },
          mood: { AC: 0, JM: -2, AR: -2, DS: -2, MR: -1, KM: -1, LV: -1, CR: 0 },
        },
      ],
    },

    /* ── 2 · Día 15 — Presupuesto Q1 ── */
    {
      id: "e2", day: 15, from: "CR",
      subject: "Presupuesto Q1: dónde apuestas tus primeros COP 800M",
      preview: "El Q1 acaba de empezar. Tienes COP 800 millones disponibles para asignar entre 4 frentes...",
      body: `
        <p>Hola COO, espero que la primera semana haya estado intensa pero llevadera.</p>
        <p>El Q1 acaba de empezar y tienes <b>COP 800 millones</b> disponibles para asignar. No alcanza para todo. Necesito tu propuesta de prioridad sobre <b>cuatro frentes posibles</b>. Tu elección marca dónde estará el foco del trimestre.</p>
        <p><b>¿En qué frente apuestas la inversión principal?</b></p>
      `,
      attachment: {
        title: "Gasto histórico Q4 vs presupuesto Q1 disponible",
        type: "donut",
        data: {
          labels: ["Salarios", "Infraestructura cloud", "Marketing", "Operación general"],
          series: [62, 18, 8, 12],
        },
        note: "Hoy 62% del gasto se va en salarios. Solo te quedan <b>COP 800M</b> de discrecional para apostar a un frente que cambie la trayectoria.",
      },
      theory: {
        name: "Asignación estratégica de recursos (Porter)",
        principle: "Michael Porter argumenta que la ventaja competitiva nace de <b>elegir qué NO hacer</b>. Una empresa que intenta cubrir todos los frentes no destaca en ninguno.",
        applies: "Vas a apostar 800M a un solo frente. Tu elección define la <b>identidad estratégica</b> del trimestre.",
      },
      multi: false,
      options: [
        {
          value: "infra", tag: "Infraestructura",
          title: "Modernizar infraestructura técnica",
          desc: "Migrar a cloud, automatizar deploy, reducir incidentes. Diego lleva 8 meses pidiéndolo.",
          feedback: "Diego respira de alivio. Los deploys se vuelven predecibles. Andrés pregunta cuándo verá ROI.",
          impactSummary: "Procesos mejoran fuerte. Costo financiero a corto plazo.",
          bsc: { financiera: -10, procesos: 25, clientes: 10, aprendizaje: 15 },
          mood: { DS: 4, MR: 2, JM: 2, AR: 1, AC: -1, KM: 0, LV: 1, CR: 0 },
        },
        {
          value: "talento", tag: "Talento",
          title: "Contratar 4 ingenieros senior + retención",
          desc: "Cubrir el hueco de los seniors que renunciaron y atraer talento. Demora 2-3 meses en materializarse.",
          feedback: "Karen se ilumina. El equipo siente que la dirección apuesta por ellos.",
          impactSummary: "Gran ganancia en aprendizaje y ánimo del equipo.",
          bsc: { financiera: -8, procesos: 10, clientes: 5, aprendizaje: 25 },
          mood: { KM: 4, JM: 3, AR: 2, MR: 1, DS: 1, AC: -1, LV: 1, CR: 1 },
        },
        {
          value: "producto", tag: "Producto",
          title: "Acelerar el roadmap de producto",
          desc: "Apostar por crecimiento de ingresos vía producto. Laura tiene los user research listos.",
          feedback: "Laura activa el roadmap. Clientes ven novedades pronto. El equipo siente la presión.",
          impactSummary: "Clientes y finanzas suben fuerte. Riesgo de quemar al equipo.",
          bsc: { financiera: 15, procesos: 5, clientes: 25, aprendizaje: -5 },
          mood: { LV: 4, CR: 2, AC: 1, JM: -2, AR: -2, DS: -1, MR: -1, KM: -1 },
        },
        {
          value: "marketing", tag: "Marketing",
          title: "Inversión agresiva en marketing y ventas",
          desc: "Subir cuota de mercado con campañas pagas. Riesgo si el producto no está listo.",
          feedback: "Las ventas se mueven. El equipo de ingeniería entra en modo apagar incendios.",
          impactSummary: "Crecimiento de ingresos pero estrés operativo alto.",
          bsc: { financiera: 20, procesos: -10, clientes: 15, aprendizaje: -10 },
          mood: { AC: 2, CR: 2, LV: 0, JM: -3, AR: -2, DS: -2, MR: -2, KM: -2 },
        },
      ],
    },

    /* ── 3 · Día 30 — Retención (Herzberg, multi) ── */
    {
      id: "e3", day: 30, from: "JM",
      subject: "1:1 — quiero hablarte de mi futuro aquí",
      preview: "Tres ingenieros senior renunciaron este mes. Yo también recibí oferta...",
      body: `
        <p>Hola COO, me tomo 5 minutos de tu calendario.</p>
        <p>Tres ingenieros senior renunciaron este mes, todos para multinacionales que pagan 2× más. Yo también recibí oferta.</p>
        <p>Sé que no hay caja para subir salarios (<b>factor higiénico</b> según Herzberg), pero hay <b>factores motivacionales</b> que sí podemos activar. Te pido que elijas <b>al menos 2</b>.</p>
        <p><b>¿Qué factores motivacionales activas?</b></p>
      `,
      attachment: {
        title: "Salarios TechCorp vs mercado · seniors backend",
        type: "bar",
        data: {
          categories: ["Junior", "Mid", "Senior", "Staff"],
          series: [
            { name: "TechCorp (COP M/año)",  data: [42, 65, 95, 120] },
            { name: "Mercado p75 (COP M/año)", data: [50, 80, 130, 180] },
          ],
        },
        note: "El gap salarial con el mercado es claro y estructural. <b>No puedes cerrarlo con dinero</b> (no hay caja). Tienes que ganar con motivacionales según Herzberg.",
      },
      theory: {
        name: "Teoría bifactorial de Herzberg (1959)",
        principle: "Herzberg distinguió <b>factores higiénicos</b> (sueldo, oficina, beneficios) que solo evitan insatisfacción, de <b>factores motivacionales</b> (logro, reconocimiento, autonomía, desarrollo) que sí generan compromiso. Subir solo los higiénicos no motiva, solo deja de molestar.",
        applies: "No puedes igualar salarios (higiénico). Tu única ruta es activar motivacionales reales: desarrollo, autonomía, proyectos retadores, reconocimiento. Combinarlos amplifica el efecto.",
      },
      multi: true, minSelections: 2,
      options: [
        {
          value: "carrera", tag: "Motivacional",
          title: "Plan de carrera + mentoría técnica",
          desc: "Ruta clara junior → senior → staff con mentor asignado.",
          bsc: { aprendizaje: 20 },
          mood: { JM: 3, AR: 3, MR: 2, DS: 2, KM: 3, LV: 1 },
        },
        {
          value: "autonomia", tag: "Motivacional",
          title: "Autonomía + flexibilidad horaria",
          desc: "Dueños de su trabajo y de cómo lo organizan.",
          bsc: { procesos: 15, aprendizaje: 10 },
          mood: { JM: 3, AR: 3, DS: 3, MR: 2, LV: 2, KM: 2 },
        },
        {
          value: "reconocimiento", tag: "Motivacional",
          title: "Reconocimiento y visibilidad pública",
          desc: "Espacios para mostrar trabajo, menciones en town halls.",
          bsc: { aprendizaje: 15 },
          mood: { JM: 2, AR: 2, MR: 2, DS: 2, LV: 2, KM: 2 },
        },
        {
          value: "proyectos", tag: "Motivacional",
          title: "Proyectos de alto impacto",
          desc: "Asignación a iniciativas que se ven en la calle.",
          bsc: { clientes: 15, aprendizaje: 10 },
          mood: { JM: 3, AR: 2, LV: 3, DS: 2, MR: 1, KM: 2 },
        },
        {
          value: "oficina", tag: "Higiénico",
          title: "Renovar oficina y beneficios físicos",
          desc: "Mejor espacio físico. Resuelve incomodidad pero no genera motivación.",
          bsc: { financiera: -8 },
          mood: { JM: 0, AR: 1, DS: 0, MR: 0, KM: -1, LV: 0 },
        },
      ],
      synergies: [
        { keys: ["carrera", "proyectos"], bonus: { aprendizaje: 8 }, note: "Desarrollo profesional con responsabilidad real." },
        { keys: ["autonomia", "reconocimiento"], bonus: { aprendizaje: 5 }, note: "Dueños del trabajo + vistos." },
        { keys: ["carrera", "autonomia"], bonus: { aprendizaje: 4 }, note: "Crecimiento sin paternalismo." },
      ],
    },

    /* ── 4 · Día 45 — Cliente abusivo ── */
    {
      id: "e4", day: 45, from: "KM",
      subject: "Tensión grave con el cliente Acueducto Norte",
      preview: "Hay un problema serio con uno de nuestros clientes principales. El equipo está al límite...",
      body: `
        <p>COO, necesito tu criterio urgente.</p>
        <p>Acueducto Norte representa el <b>25% de los ingresos del año</b> pero su gerente está tratando al equipo de forma irrespetuosa: gritos en reuniones, mensajes a las 11pm, comentarios despectivos hacia las mujeres del equipo. Tres personas vinieron a hablarme esta semana. Una piensa renunciar.</p>
        <p>El CFO Andrés me dice que perder ese contrato es <b>perder el 25% del trimestre</b>.</p>
      `,
      attachment: {
        title: "Incidentes registrados con Acueducto Norte · últimos 3 meses",
        type: "bar",
        data: {
          categories: ["Hace 3m", "Hace 2m", "Hace 1m", "Este mes"],
          series: [{ name: "Incidentes documentados", data: [1, 3, 5, 9] }],
        },
        note: "La tendencia es clara: el problema escala mes a mes. <b>Esperar más es elegir empeorar.</b>",
      },
      theory: {
        name: "Liderazgo de servicio vs. cortoplacismo financiero",
        principle: "Robert Greenleaf (1970) postuló que el líder verdadero sirve primero a su equipo. La literatura moderna (Sinek, Edmondson) muestra que la <b>seguridad psicológica</b> es el factor #1 de equipos de alto rendimiento.",
        applies: "Aquí estás eligiendo entre proteger ingresos o proteger personas. La decisión define tu marca de liderazgo dentro de la empresa.",
      },
      multi: false,
      options: [
        {
          value: "aguantar", tag: "Pragmatismo financiero",
          title: "Aguantar y reasignar al equipo más resiliente",
          desc: "Priorizar el contrato a corto plazo. Asignar a personas más curtidas.",
          feedback: "Andrés respira tranquilo. Karen guarda silencio. Una persona renuncia tres semanas después.",
          impactSummary: "Ingresos a corto plazo pero costo cultural y de talento devastador.",
          bsc: { financiera: 10, procesos: -5, clientes: 5, aprendizaje: -25 },
          mood: { AC: 1, KM: -3, JM: -2, AR: -3, MR: -3, DS: -1, LV: -2, CR: 0 },
        },
        {
          value: "conversar", tag: "Asertividad",
          title: "Reunión franca con el cliente: lineamientos no negociables",
          desc: "Conversación directa con el gerente del cliente: código de conducta y reglas profesionales.",
          feedback: "El gerente reacciona mal al inicio, pero a los 10 días llega un correo de disculpa pública. El equipo recupera dignidad.",
          impactSummary: "Costo financiero menor a cambio de gran ganancia cultural.",
          bsc: { financiera: -5, procesos: 5, clientes: 10, aprendizaje: 20 },
          mood: { KM: 4, JM: 2, AR: 3, MR: 3, DS: 1, LV: 2, AC: 0, CR: 1 },
        },
        {
          value: "terminar", tag: "Cultura primero",
          title: "Terminar el contrato y absorber el impacto",
          desc: "Romper con el cliente. Mantener intacta la cultura. Implica buscar reemplazo del 25% de ingresos.",
          feedback: "El equipo escribe un mensaje colectivo de gratitud. Andrés exige plan B en 30 días. La narrativa cambia: «aquí nos cuidamos».",
          impactSummary: "Pérdida financiera severa, máxima ganancia cultural y de aprendizaje.",
          bsc: { financiera: -20, procesos: 5, clientes: -5, aprendizaje: 30 },
          mood: { KM: 5, JM: 3, AR: 4, MR: 4, DS: 2, LV: 2, AC: -2, CR: 1 },
        },
        {
          value: "delegar", tag: "Evasión",
          title: "Pedirle a Karen que «maneje el tema»",
          desc: "Delegar sin posición clara. Karen queda sola con el problema.",
          feedback: "Karen presenta su renuncia dos semanas después. La salida pega fuerte en el equipo.",
          impactSummary: "Desastre cultural: pierdes a tu directora de Talento.",
          bsc: { financiera: 0, procesos: -10, clientes: 0, aprendizaje: -30 },
          mood: { KM: -8, JM: -3, AR: -3, MR: -3, DS: -2, LV: -2, AC: 0, CR: -1 },
        },
      ],
    },

    /* ── 5 · Día 60 — Recorte 30% ── */
    {
      id: "e5", day: 60, from: "CR",
      subject: "La junta exige un plan de recorte del 30%",
      preview: "La junta directiva se reunió ayer. El runway nos da 8 meses. Necesito propuesta antes del viernes...",
      body: `
        <p>COO, esto es difícil.</p>
        <p>La junta directiva se reunió ayer. Con el runway actual nos quedan <b>8 meses de caja</b>. Han pedido <b>un plan de recorte del 30%</b> antes del viernes. No es opcional, es directriz.</p>
        <p>Tengo cuatro alternativas sobre la mesa. Cada una tiene un precio distinto.</p>
      `,
      attachment: {
        title: "Proyección de caja · escenarios a 12 meses",
        type: "area",
        data: {
          categories: ["M0", "M2", "M4", "M6", "M8", "M10", "M12"],
          series: [
            { name: "Sin recorte (línea de base)", data: [100, 85, 68, 50, 30, 8, -15] },
            { name: "Con recorte 30%",            data: [100, 92, 84, 76, 70, 65, 62] },
          ],
        },
        note: "Sin acción, en mes 11 nos quedamos sin caja. <b>Esta no es una decisión sobre <em>si</em> recortar, sino <em>cómo</em>.</b>",
      },
      theory: {
        name: "Gestión de crisis · Trade-off financiero vs. talento",
        principle: "En crisis de caja, los manuales de turnaround (Hamel, Sull) recomiendan acciones quirúrgicas y comunicación transparente. El recorte indiscriminado destruye más valor del que ahorra.",
        applies: "Tu elección entre <b>ejecutar lo pedido</b>, <b>negociar matices</b>, o <b>buscar alternativas creativas</b> define tu sello como líder. La junta mide los números; el equipo mide la humanidad del proceso.",
      },
      multi: false,
      options: [
        {
          value: "aceptar", tag: "Ejecución pura",
          title: "Recorte directo del 30% — último entrar, primero salir",
          desc: "Cumplir lo pedido sin matices. Resultados visibles ya. Cultura en modo supervivencia.",
          feedback: "Junta satisfecha. Equipo en shock. Los que se quedan trabajan asustados.",
          impactSummary: "Máximo ahorro financiero, daño cultural y de aprendizaje devastador.",
          bsc: { financiera: 35, procesos: -25, clientes: -20, aprendizaje: -30 },
          mood: { AC: 2, JM: -3, AR: -3, DS: -3, MR: -3, KM: -3, LV: -2, CR: 1 },
        },
        {
          value: "selectivo", tag: "Cirugía",
          title: "Recorte selectivo del 10% basado en desempeño",
          desc: "Análisis riguroso por persona. Cierras el gap con otros recortes (oficina, viajes, herramientas).",
          feedback: "Junta acepta a regañadientes. El equipo agradece el ajuste quirúrgico.",
          impactSummary: "Ahorro moderado, daño cultural contenido.",
          bsc: { financiera: 15, procesos: -5, clientes: -5, aprendizaje: -10 },
          mood: { AC: 1, JM: -1, AR: -1, DS: -1, MR: -1, KM: 0, LV: 0, CR: 0 },
        },
        {
          value: "voluntario", tag: "Solidaridad",
          title: "Reducción salarial voluntaria escalonada",
          desc: "Directivos bajan 25%, seniors 15%, juniors 5%. Mantienes 100% del headcount.",
          feedback: "El equipo respeta la transparencia. Algunos seniors piden tiempo. «Aquí estamos juntos» se vuelve real.",
          impactSummary: "Solidaridad estructural: ahorro razonable + máximo respeto cultural.",
          bsc: { financiera: 18, procesos: 5, clientes: 5, aprendizaje: 15 },
          mood: { AC: 1, JM: 1, AR: 1, DS: 1, MR: 1, KM: 2, LV: 1, CR: 0 },
        },
        {
          value: "vender", tag: "Foco estratégico",
          title: "Vender la línea de consultoría (no-core)",
          desc: "Desprenderse de la unidad menos rentable como activo. Captura caja inmediata sin despidos forzados.",
          feedback: "Junta valora el foco. La consultoría queda en buenas manos. El equipo central queda intacto.",
          impactSummary: "Decisión madura: ahorro fuerte sin tocar al equipo central.",
          bsc: { financiera: 25, procesos: 10, clientes: -5, aprendizaje: 5 },
          mood: { AC: 1, JM: 1, AR: 1, DS: 1, MR: 1, KM: 1, LV: 1, CR: 1 },
        },
      ],
    },

    /* ── 6 · Día 70 — Brecha de seguridad ── */
    {
      id: "e6", day: 70, from: "DS",
      subject: "[CRÍTICO] Brecha de seguridad detectada en producción",
      preview: "Detectamos hace 4 horas un acceso no autorizado en producción. 12.000 registros expuestos...",
      body: `
        <p>COO, esto es crítico. No te lo mando en chat por trazabilidad.</p>
        <p>Detectamos hace 4 horas un <b>acceso no autorizado a la base de datos de producción</b>. Estimamos <b>12.000 registros de clientes</b> expuestos (nombres, correos, no datos financieros). El atacante salió hace 2 horas. Tenemos el log completo.</p>
        <p>La <b>Ley 1581 de protección de datos</b> exige notificar a la SIC en 72 horas. Tenemos esta noche para decidir.</p>
      `,
      attachment: {
        title: "Ventana legal · Ley 1581 protección de datos",
        type: "radial",
        data: { value: 72, label: "Horas para notificar", subtext: "Después de descubierto" },
        note: "<b>El reloj corre desde hace 4 horas.</b> Cada hora sin acción cuenta. Tres opciones: comunicación transparente, contenida o ninguna.",
      },
      theory: {
        name: "Gestión de crisis · Modelo de comunicación de Coombs (SCCT)",
        principle: "La Situational Crisis Communication Theory (Coombs, 2007) muestra que <b>la velocidad y honestidad</b> en una crisis predicen la recuperación reputacional mucho mejor que la severidad del incidente.",
        applies: "Una brecha de datos es una crisis. Tu respuesta — su velocidad y transparencia — definirá si TechCorp sale fortalecida o herida del incidente.",
      },
      multi: false,
      options: [
        {
          value: "transparente", tag: "Transparencia total",
          title: "Notificar SIC 24h + correo proactivo a TODOS los clientes",
          desc: "Mensaje claro + monitoreo gratuito de identidad por 12 meses. Costo alto, confianza preservada.",
          feedback: "Cobertura mediática moderada. Cancelación 3%. Tres clientes nuevos llegan citando «la forma honesta de manejarlo».",
          impactSummary: "Costo financiero alto a cambio de captura de confianza estructural.",
          bsc: { financiera: -10, procesos: 15, clientes: 20, aprendizaje: 20 },
          mood: { DS: 3, MR: 3, JM: 2, AR: 1, KM: 3, LV: 1, AC: -1, CR: 2 },
        },
        {
          value: "minimizar", tag: "Comunicación medida",
          title: "Notificar SIC + correo solo a los 12.000 afectados",
          desc: "Cumples la ley sin amplificar. Balance legal-reputacional.",
          feedback: "Cumplimiento completo. Algunos afectados reaccionan mal en redes pero el ruido es contenido.",
          impactSummary: "Cumplimiento mínimo legal, sin captura de oportunidad reputacional.",
          bsc: { financiera: -3, procesos: 10, clientes: 5, aprendizaje: 5 },
          mood: { DS: 1, MR: 1, JM: 0, AR: 0, KM: 0, LV: 0, AC: 1, CR: 0 },
        },
        {
          value: "demorar", tag: "Demora calculada",
          title: "Esperar 48h más para análisis forense completo",
          desc: "Cumples justo en el límite legal. Más datos en mano pero menos margen ante reguladores.",
          feedback: "La SIC abre investigación adicional por «notificación tardía aparente». 3 meses de requerimientos.",
          impactSummary: "Riesgo regulatorio amplificado por falta de proactividad.",
          bsc: { financiera: -5, procesos: -10, clientes: -5, aprendizaje: -10 },
          mood: { DS: -2, MR: -1, JM: -1, AR: -1, KM: -2, LV: -1, AC: 0, CR: -1 },
        },
        {
          value: "ocultar", tag: "Ocultamiento",
          title: "No notificar — esperar a ver si alguien lo nota",
          desc: "Incumplimiento legal flagrante de la Ley 1581. Multas y reputación se desploman si se sabe.",
          feedback: "Tres meses después, un afectado escala el caso. Multa de 1.500 SMMLV. Renuncias en cadena.",
          impactSummary: "Catástrofe total: legal, financiera, cultural.",
          bsc: { financiera: -30, procesos: -20, clientes: -30, aprendizaje: -40 },
          mood: { DS: -6, MR: -4, JM: -4, AR: -4, KM: -5, LV: -3, AC: -2, CR: -3 },
        },
      ],
    },

    /* ── 7 · Día 80 — Cliente clave ── */
    {
      id: "e7", day: 80, from: "LV",
      subject: "Banco Cordillera amenaza con cancelar el contrato anual",
      preview: "Acabo de salir de reunión con el CIO de Banco Cordillera. La renovación está en duda...",
      body: `
        <p>COO, urgente pero no de pánico.</p>
        <p>Acabo de salir de reunión con el CIO de <b>Banco Cordillera</b>. El contrato anual (vence en 3 semanas) está en duda. Su argumento: «ustedes prometieron 4 features para Q3 y entregaron 2».</p>
        <p>Banco Cordillera representa <b>18% de los ingresos recurrentes</b>. ¿Qué hacemos?</p>
      `,
      attachment: {
        title: "Features prometidos vs entregados a Banco Cordillera",
        type: "bar",
        data: {
          categories: ["Pagos digitales", "Dashboards CRM", "API de fraude", "Reportería avanzada"],
          series: [
            { name: "Prometido", data: [100, 100, 100, 100] },
            { name: "Entregado", data: [100, 100, 30, 0] },
          ],
        },
        note: "Entregamos 2.3 de 4 features. <b>Uno de los faltantes (API de fraude) resultó 3× más complejo de lo estimado.</b> El cliente tiene razón parcial.",
      },
      theory: {
        name: "Perspectiva del cliente del BSC + gestión de expectativas",
        principle: "El Balanced Scorecard (Kaplan & Norton, 1992) coloca al cliente como una de las 4 perspectivas críticas. Heskett (Service Profit Chain) demuestra que la retención cuesta 5× menos que la adquisición.",
        applies: "Perder un cliente del 18% es severo, pero forzar al equipo para recuperar promesas mal estimadas tampoco es sostenible. Hay que ser honesto y proactivo.",
      },
      multi: false,
      options: [
        {
          value: "honestidad", tag: "Reset honesto",
          title: "Reunión de reset: replantear roadmap con timelines reales",
          desc: "Tú + CEO + tech lead. Mostrar lo aprendido, ofrecer descuento del 15%.",
          feedback: "El CIO valora la franqueza. Renuevan a 18 meses con cláusulas más claras. El equipo aprende a estimar.",
          impactSummary: "Costo financiero menor a cambio de relación de largo plazo + aprendizaje.",
          bsc: { financiera: -5, procesos: 15, clientes: 25, aprendizaje: 20 },
          mood: { LV: 3, JM: 2, AR: 2, DS: 1, MR: 2, KM: 1, AC: 0, CR: 2 },
        },
        {
          value: "sprint", tag: "Sprint heroico",
          title: "Sprint de 3 semanas para entregar los 2 features faltantes",
          desc: "Movilizar al equipo. Cumplir aunque sea contra reloj.",
          feedback: "Entregamos. El cliente renueva pero el equipo termina exhausto. Dos personas piden vacaciones.",
          impactSummary: "Cumples a corto plazo a costa de la salud del equipo.",
          bsc: { financiera: 10, procesos: -10, clientes: 15, aprendizaje: -10 },
          mood: { LV: 1, JM: -3, AR: -3, DS: -2, MR: -2, KM: -2, AC: 1, CR: 0 },
        },
        {
          value: "premium", tag: "Upgrade comercial",
          title: "Ofrecer plan premium con AM dedicado a +30%",
          desc: "Subir precio y dar account manager exclusivo + soporte prioritario.",
          feedback: "Acepta a regañadientes. El AM se vuelve cuello de botella en 2 meses.",
          impactSummary: "Ingresos suben pero la relación se enrarece.",
          bsc: { financiera: 15, procesos: -5, clientes: 5, aprendizaje: 0 },
          mood: { LV: -1, JM: 0, AR: 0, DS: 0, MR: 0, KM: 0, AC: 2, CR: 0 },
        },
        {
          value: "dejar", tag: "Dejar ir",
          title: "Dejar que se vaya y enfocarse en clientes más alineados",
          desc: "Reasignar al equipo al pipeline de nuevos contratos. Pierdes 18% de ingresos.",
          feedback: "El equipo siente alivio. El pipeline pierde 2 trimestres en compensar. Andrés lo registra en su lista negra.",
          impactSummary: "Decisión drástica que prioriza salud del equipo.",
          bsc: { financiera: -15, procesos: 10, clientes: -10, aprendizaje: 15 },
          mood: { LV: 1, JM: 2, AR: 2, DS: 1, MR: 1, KM: 2, AC: -3, CR: -1 },
        },
      ],
    },

    /* ── 8 · Día 90 — Town hall ── */
    {
      id: "e8", day: 90, from: "KM",
      subject: "Cierre del trimestre: ¿cómo comunicamos lo que pasó?",
      preview: "Antes de que la junta evalúe tu gestión, tenemos que decidir cómo el equipo cierra este trimestre...",
      body: `
        <p>COO, último mensaje del trimestre.</p>
        <p>Antes de que la junta evalúe tu gestión (mañana), tenemos que decidir cómo <b>el equipo cierra este trimestre</b>. Pasaron muchas cosas: la crisis de productividad, el recorte, la brecha de seguridad, el cliente difícil. La gente necesita una narrativa.</p>
      `,
      attachment: {
        title: "Estado del equipo al cierre del trimestre",
        type: "heatmap",
        data: {
          // Se rellena en runtime con state.team
          dynamic: true,
        },
        note: "Tu equipo entra al cierre del trimestre así. La forma en que cierres define si el ánimo se recupera o se desploma.",
      },
      theory: {
        name: "Comunicación organizacional en cierre · Edgar Schein",
        principle: "Edgar Schein (Organizational Culture and Leadership) muestra que la <b>cultura se construye en los momentos cruciales</b>: cómo el líder comunica en una crisis define la narrativa interna por años.",
        applies: "El último mensaje del trimestre se vuelve memoria organizacional. Comunicar mal aquí borra lo bueno hecho antes. Comunicar bien amplifica el efecto.",
      },
      multi: false,
      options: [
        {
          value: "memo", tag: "Comunicación formal",
          title: "Memorando corporativo + métricas del trimestre",
          desc: "Documento formal con números y compromisos. Llega a todos pero no abre conversación.",
          feedback: "El mensaje llega. Nadie responde. Rumores persisten.",
          impactSummary: "Cumple lo mínimo, no construye.",
          bsc: { financiera: 0, procesos: 5, clientes: 0, aprendizaje: -10 },
          mood: { JM: -1, AR: -1, DS: -1, MR: -1, KM: -2, LV: -1, AC: 0, CR: 0 },
        },
        {
          value: "townhall", tag: "Comunicación abierta",
          title: "Town hall + sesión de preguntas sin filtro",
          desc: "Tú al frente respondiendo lo que sea. Sin equipo de comunicaciones moderando.",
          feedback: "Preguntas difíciles. Honestidad. La confianza se reconstruye visiblemente.",
          impactSummary: "Máxima ganancia cultural y de aprendizaje organizacional.",
          bsc: { financiera: 0, procesos: 10, clientes: 15, aprendizaje: 25 },
          mood: { JM: 2, AR: 2, DS: 2, MR: 2, KM: 3, LV: 2, AC: 1, CR: 1 },
        },
        {
          value: "coaching", tag: "Comunicación mediada",
          title: "Coaching ejecutivo a líderes + reporte trimestral por canal",
          desc: "Cada líder hace su propio town hall. Distribuyes el peso comunicacional.",
          feedback: "Los líderes crecen. Algunos equipos extrañan la voz directa del COO.",
          impactSummary: "Ganancia organizacional sostenida pero desigual entre equipos.",
          bsc: { financiera: 0, procesos: 10, clientes: 5, aprendizaje: 20 },
          mood: { JM: 0, AR: 0, DS: 0, MR: 0, KM: 1, LV: 1, AC: 0, CR: 0 },
        },
        {
          value: "silencio", tag: "Sin comunicación",
          title: "No comunicar nada — esperar a que pase el trimestre",
          desc: "Evitar el tema. Confiar en que los resultados hablen solos.",
          feedback: "El silencio es leído como mala señal. El equipo entra al Q2 actualizando CVs.",
          impactSummary: "Erosión grave de la cultura.",
          bsc: { financiera: 0, procesos: -10, clientes: -15, aprendizaje: -25 },
          mood: { JM: -3, AR: -3, DS: -3, MR: -3, KM: -3, LV: -3, AC: -1, CR: -1 },
        },
      ],
    },
  ];

  /* ============================================================
     3 · ESTADO
     ============================================================ */
  const STORAGE_KEY = "ua-reto-admin-state-v2";
  const deepClone = (o) => JSON.parse(JSON.stringify(o));

  function initState() {
    return {
      emailsAnswered: {},
      currentEmailId: "e1",
      currentTab: "inbox",
      team: deepClone(TEAM_INIT),
      metrics: deepClone(METRICS_INIT),
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
    render();
  }
  let state = loadState();

  /* ============================================================
     4 · MOTOR DE EFECTOS
     ============================================================ */
  const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

  function applyEffects(email, value) {
    if (email.multi) {
      const selected = (value || []).filter(v => email.options.some(o => o.value === v));
      selected.forEach(v => {
        const o = email.options.find(opt => opt.value === v);
        if (o) applyOptionEffects(o);
      });
      if (email.synergies) {
        email.synergies.forEach(syn => {
          if (syn.keys.every(k => selected.includes(k))) applyBSCDelta(syn.bonus);
        });
      }
    } else {
      const o = email.options.find(opt => opt.value === value);
      if (o) applyOptionEffects(o);
    }
    state.metrics.quarterDay = email.day;
    recalcDerived();
  }
  function applyOptionEffects(o) {
    if (o.bsc) applyBSCDelta(o.bsc);
    if (o.mood) {
      Object.entries(o.mood).forEach(([code, d]) => {
        if (!state.team[code]) return;
        state.team[code].mood         = clamp(state.team[code].mood         + d * 3);
        state.team[code].productivity = clamp(state.team[code].productivity + d * 2);
        state.team[code].loyalty      = clamp(state.team[code].loyalty      + d * 2);
      });
    }
  }
  function applyBSCDelta(deltas) {
    Object.entries(deltas).forEach(([k, v]) => {
      if (typeof state.metrics.bsc[k] === "number") {
        state.metrics.bsc[k] = clamp(state.metrics.bsc[k] + v);
      }
    });
  }
  function avgMood() {
    const codes = Object.keys(state.team);
    return codes.reduce((s, c) => s + state.team[c].mood, 0) / codes.length;
  }
  function avgBSC() {
    const b = state.metrics.bsc;
    return (b.financiera + b.procesos + b.clientes + b.aprendizaje) / 4;
  }
  function recalcDerived() {
    const b = state.metrics.bsc, am = avgMood();
    state.metrics.finances.revenue = Math.round(1800 + (b.financiera + b.clientes) * 6);
    state.metrics.finances.costs   = Math.round(1500 + (100 - am) * 5);
    const burn = Math.max(50, state.metrics.finances.costs - state.metrics.finances.revenue * 0.55);
    state.metrics.finances.runway  = Math.max(2, Math.round(state.metrics.finances.revenue / burn * 0.9));
    state.metrics.wellbeing.satisfaction = Math.round(am);
    state.metrics.wellbeing.eNPS         = Math.round(am - 50);
    state.metrics.wellbeing.rotation     = Math.max(0, Math.round(20 - am / 5));
  }

  /* ============================================================
     5 · CHARTS REGISTRY
     ============================================================ */
  const charts = {};
  function destroyCharts() {
    Object.values(charts).forEach(c => { try { c.destroy(); } catch (e) {} });
    Object.keys(charts).forEach(k => delete charts[k]);
  }

  /* ============================================================
     6 · RENDER
     ============================================================ */
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  function render() {
    renderTabs();
    renderHeader();
    destroyCharts();
    if (state.currentTab === "inbox") renderInbox();
    else if (state.currentTab === "team") renderTeam();
    else if (state.currentTab === "company") renderCompany();
  }
  function renderTabs() {
    $$("[data-tab-btn]").forEach(b => b.classList.toggle("is-active", b.dataset.tabBtn === state.currentTab));
    $$("[data-tab-panel]").forEach(p => p.hidden = p.dataset.tabPanel !== state.currentTab);
  }
  function renderHeader() {
    const answered = Object.keys(state.emailsAnswered).length;
    const total = EMAILS.length;
    const fill = $("[data-progress-fill]");
    const label = $("[data-progress-label]");
    if (fill) fill.style.width = ((answered / total) * 100).toFixed(0) + "%";
    if (label) label.textContent = `${answered} de ${total} decisiones · Día ${state.metrics.quarterDay}`;
  }

  /* -------- Inbox -------- */
  function renderInbox() {
    const list = $("[data-inbox-list]");
    if (!list) return;
    list.innerHTML = EMAILS.map(email => {
      const answered = !!state.emailsAnswered[email.id];
      const isCurrent = email.id === state.currentEmailId;
      const accessible = answered || isCurrent;
      const sender = TEAM[email.from];
      return `
        <button type="button" class="ra-inbox-item ${answered ? "is-read" : "is-unread"} ${isCurrent ? "is-current" : ""} ${accessible ? "" : "is-locked"}"
                data-email-id="${email.id}" ${accessible ? "" : "disabled"}>
          <span class="ra-inbox-item-avatar"><span>${email.from}</span></span>
          <div class="ra-inbox-item-meta">
            <div class="ra-inbox-item-from">
              <b>${sender.name}</b>
              <span class="ra-inbox-item-day">Día ${email.day}</span>
            </div>
            <div class="ra-inbox-item-subject">${email.subject}</div>
            <div class="ra-inbox-item-preview">${email.preview}</div>
          </div>
          <div class="ra-inbox-item-status">
            ${answered ? '<span class="ra-badge is-done">Respondido</span>' :
              isCurrent ? '<span class="ra-badge is-pending">Pendiente</span>' :
              '<span class="ra-badge is-locked">Bloqueado</span>'}
          </div>
        </button>`;
    }).join("");
    renderEmailDetail(state.currentEmailId);
  }

  function renderEmailDetail(emailId) {
    const detail = $("[data-inbox-detail]");
    if (!detail) return;
    const email = EMAILS.find(e => e.id === emailId);
    if (!email) {
      detail.innerHTML = `<div class="ra-empty"><p>Selecciona un correo de la bandeja.</p></div>`;
      return;
    }
    const sender = TEAM[email.from];
    const answered = state.emailsAnswered[email.id];
    const isMulti = email.multi;
    const isLast = email.id === EMAILS[EMAILS.length - 1].id;
    const allAnswered = Object.keys(state.emailsAnswered).length === EMAILS.length;

    let optionsHTML;
    if (answered) {
      if (isMulti) {
        optionsHTML = email.options.map(opt => {
          const picked = (answered || []).includes(opt.value);
          return `
            <div class="ra-option ${picked ? "is-picked" : "is-dimmed"}">
              <span class="ra-option-tag">${opt.tag}</span>
              <strong>${opt.title}</strong>
              <p>${opt.desc}</p>
              ${picked ? '<span class="ra-option-check">✓ Elegido</span>' : ""}
            </div>`;
        }).join("");
      } else {
        const chosen = email.options.find(o => o.value === answered);
        optionsHTML = email.options.map(opt => {
          const picked = opt.value === answered;
          return `
            <div class="ra-option ${picked ? "is-picked" : "is-dimmed"}">
              <span class="ra-option-tag">${opt.tag}</span>
              <strong>${opt.title}</strong>
              <p>${opt.desc}</p>
              ${picked ? `<div class="ra-option-feedback"><b>Resultado:</b> ${chosen.feedback}</div>` : ""}
            </div>`;
        }).join("");
      }
    } else {
      optionsHTML = email.options.map(opt => `
        <button type="button" class="ra-option is-interactive" data-option-value="${opt.value}">
          <span class="ra-option-mark" aria-hidden="true"></span>
          <span class="ra-option-tag">${opt.tag}</span>
          <strong>${opt.title}</strong>
          <p>${opt.desc}</p>
        </button>`).join("");
    }

    const senderEmail = (sender.name || "").toLowerCase().replace(/[^a-z]+/g, ".") + "@techcorp.co";
    const dateStr = `Día ${email.day} · Q1 · 09:${(email.day % 60).toString().padStart(2, "0")} a.m.`;

    detail.innerHTML = `
      <article class="ra-email ra-email--corporate">
        <div class="ra-email-banner">
          <div class="ra-email-brand">
            <div class="ra-email-brand-mark">TC</div>
            <div class="ra-email-brand-text">
              <b>TechCorp</b>
              <small>Comunicación interna</small>
            </div>
          </div>
          <div class="ra-email-date">${dateStr}</div>
        </div>

        <h2 class="ra-email-subject">${email.subject}</h2>

        <header class="ra-email-head">
          <div class="ra-email-avatar"><span>${email.from}</span></div>
          <div class="ra-email-meta">
            <div class="ra-email-from">
              <b>${sender.name}</b>
              <span class="ra-email-address">&lt;${senderEmail}&gt;</span>
            </div>
            <div class="ra-email-to">
              <span>Para:</span> COO &lt;coo@techcorp.co&gt;
            </div>
          </div>
        </header>

        <div class="ra-email-body">${email.body}</div>

        ${email.attachment ? `
          <section class="ra-attachment">
            <header class="ra-attachment-head">
              <span class="ra-attachment-tag">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                Datos adjuntos
              </span>
              <h4>${email.attachment.title}</h4>
            </header>
            <div class="ra-attachment-chart" data-attachment-chart></div>
            <p class="ra-attachment-note">${email.attachment.note}</p>
          </section>
        ` : ""}

        ${email.theory ? `
          <section class="ra-theory">
            <header class="ra-theory-head">
              <span class="ra-theory-tag">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Marco teórico aplicado
              </span>
              <h4>${email.theory.name}</h4>
            </header>
            <p class="ra-theory-principle"><b>Principio:</b> ${email.theory.principle}</p>
            <p class="ra-theory-applies"><b>En esta decisión:</b> ${email.theory.applies}</p>
          </section>
        ` : ""}

        <div class="ra-email-options" data-multi="${isMulti}">${optionsHTML}</div>

        <footer class="ra-email-signature">
          <span class="ra-email-sig-label">Atentamente,</span>
          <b>${sender.name}</b>
          <span>${sender.role} · TechCorp</span>
        </footer>

        ${!answered ? `
          <footer class="ra-email-foot">
            ${isMulti ? `<small class="ra-email-hint">Selecciona al menos ${email.minSelections || 1} ${(email.minSelections || 1) > 1 ? "opciones" : "opción"}.</small>` : ""}
            <button type="button" class="ra-btn-primary" data-send disabled>Enviar respuesta →</button>
          </footer>
        ` : (isLast || allAnswered) ? `
          <footer class="ra-email-foot">
            <button type="button" class="ra-btn-primary" data-board>Ver informe de la Junta Directiva →</button>
          </footer>
        ` : ""}
      </article>`;

    bindEmailDetailEvents(email);

    // Render del attachment chart
    if (email.attachment) {
      setTimeout(() => renderAttachment(email), 30);
    }
  }

  function bindEmailDetailEvents(email) {
    const detail = $("[data-inbox-detail]");
    if (!detail) return;
    if (email.multi) {
      const selected = new Set();
      $$("[data-option-value]", detail).forEach(btn => {
        btn.addEventListener("click", () => {
          const v = btn.dataset.optionValue;
          if (selected.has(v)) { selected.delete(v); btn.classList.remove("is-selected"); }
          else { selected.add(v); btn.classList.add("is-selected"); }
          const send = $("[data-send]", detail);
          if (send) {
            send.disabled = selected.size < (email.minSelections || 1);
            send.dataset.value = JSON.stringify([...selected]);
          }
        });
      });
    } else {
      $$("[data-option-value]", detail).forEach(btn => {
        btn.addEventListener("click", () => {
          $$("[data-option-value]", detail).forEach(b => b.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          const send = $("[data-send]", detail);
          if (send) { send.disabled = false; send.dataset.value = btn.dataset.optionValue; }
        });
      });
    }
    const sendBtn = $("[data-send]", detail);
    if (sendBtn) sendBtn.addEventListener("click", () => {
      const raw = sendBtn.dataset.value;
      if (!raw) return;
      const value = email.multi ? JSON.parse(raw) : raw;
      showConfirm(email, value);
    });
    const boardBtn = $("[data-board]", detail);
    if (boardBtn) boardBtn.addEventListener("click", showBoardReport);
  }

  /* ============================================================
     7 · ATTACHMENT CHARTS (ApexCharts)
     ============================================================ */
  function renderAttachment(email) {
    if (typeof Chart === "undefined") return;
    const el = $("[data-attachment-chart]");
    if (!el) return;
    if (charts.attachment) { try { charts.attachment.destroy(); } catch (e) {} charts.attachment = null; }
    el.innerHTML = "";

    const a = email.attachment;
    const palette = ["#ff7900", "#4DC3FF", "#FFD700", "#BA55D3", "#4caf50", "#e8523a"];
    const baseFont = { family: "Inter, system-ui, sans-serif", size: 11 };

    const commonScales = (yFmt) => ({
      x: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { font: baseFont, color: "#666" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { font: baseFont, color: "#666", callback: yFmt },
      },
    });
    const commonTooltip = {
      backgroundColor: "rgba(20,20,30,0.94)",
      titleFont: { family: "Inter, system-ui, sans-serif", weight: 700 },
      bodyFont: { family: "JetBrains Mono, monospace", size: 12 },
      padding: 10,
      cornerRadius: 6,
    };
    const commonLegend = {
      position: "top",
      labels: {
        font: { family: "Inter, system-ui, sans-serif", size: 12, weight: 600 },
        usePointStyle: true,
        pointStyle: "circle",
        padding: 14,
      },
    };

    // Crea canvas
    el.innerHTML = `<canvas data-attachment-canvas></canvas>`;
    const canvas = el.querySelector("[data-attachment-canvas]");

    let config = null;

    if (a.type === "line") {
      const datasets = a.data.series.map((s, i) => ({
        label: s.name,
        data: s.data,
        borderColor: palette[i % palette.length],
        backgroundColor: palette[i % palette.length] + "22",
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
      }));
      if (a.data.target) {
        datasets.push({
          label: `Meta: ${a.data.target}`,
          data: a.data.categories.map(() => a.data.target),
          borderColor: "#999",
          borderWidth: 1.5,
          borderDash: [6, 6],
          pointRadius: 0,
          fill: false,
        });
      }
      config = {
        type: "line",
        data: { labels: a.data.categories, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: { legend: commonLegend, tooltip: commonTooltip },
          scales: commonScales(v => v),
        },
      };
    } else if (a.type === "area") {
      const datasets = a.data.series.map((s, i) => ({
        label: s.name,
        data: s.data,
        borderColor: i === 0 ? "#e8523a" : "#4caf50",
        backgroundColor: (i === 0 ? "rgba(232,82,58," : "rgba(76,175,80,") + "0.32)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
        fill: true,
      }));
      config = {
        type: "line",
        data: { labels: a.data.categories, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: { legend: commonLegend, tooltip: commonTooltip },
          scales: commonScales(v => `${v}%`),
        },
      };
    } else if (a.type === "bar") {
      const datasets = a.data.series.map((s, i) => ({
        label: s.name,
        data: s.data,
        backgroundColor: i === 0 ? "#ff7900" : "#9aa0a6",
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.65,
      }));
      config = {
        type: "bar",
        data: { labels: a.data.categories, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: commonLegend, tooltip: commonTooltip },
          scales: commonScales(v => v),
        },
      };
    } else if (a.type === "donut") {
      config = {
        type: "doughnut",
        data: {
          labels: a.data.labels,
          datasets: [{
            data: a.data.series,
            backgroundColor: palette,
            borderColor: "#fff",
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "62%",
          plugins: {
            legend: { ...commonLegend, position: "bottom" },
            tooltip: {
              ...commonTooltip,
              callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` },
            },
          },
        },
      };
    } else if (a.type === "radial") {
      const pct = Math.min(100, Math.round((a.data.value / 72) * 100));
      const centerText = {
        id: "centerText",
        afterDraw(chart) {
          const { ctx, chartArea: { left, right, top, bottom } } = chart;
          const cx = (left + right) / 2;
          const cy = (top + bottom) / 2;
          ctx.save();
          ctx.font = "800 28px Inter, system-ui, sans-serif";
          ctx.fillStyle = "#1a1f1a";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${a.data.value}h`, cx, cy - 6);
          ctx.font = "600 12px Inter, system-ui, sans-serif";
          ctx.fillStyle = "#666";
          ctx.fillText(a.data.label, cx, cy + 16);
          ctx.restore();
        },
      };
      config = {
        type: "doughnut",
        data: {
          labels: [a.data.label, "Restante"],
          datasets: [{
            data: [pct, 100 - pct],
            backgroundColor: ["#e8523a", "#eef0f2"],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "72%",
          rotation: -90,
          circumference: 360,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        },
        plugins: [centerText],
      };
    } else if (a.type === "heatmap") {
      // Convertimos heatmap a bar agrupado coloreado por umbral.
      // La leyenda refleja los 4 niveles (Crítico / Inquieto / Estable / Comprometido)
      // porque los colores de las barras NO dependen del dataset (Ánimo/Productividad/Lealtad)
      // sino del valor en sí.
      const codes = Object.keys(state.team);
      const metrics = [
        { key: "mood", label: "Ánimo" },
        { key: "productivity", label: "Productividad" },
        { key: "loyalty", label: "Lealtad" },
      ];
      const levels = [
        { name: "Crítico (<35)",      color: "#e8523a" },
        { name: "Inquieto (35-54)",   color: "#ff9800" },
        { name: "Estable (55-74)",    color: "#ffc107" },
        { name: "Comprometido (75+)", color: "#4caf50" },
      ];
      const colorFor = (v) => v < 35 ? levels[0].color : v < 55 ? levels[1].color : v < 75 ? levels[2].color : levels[3].color;
      const datasets = metrics.map(m => ({
        label: m.label,
        data: codes.map(c => state.team[c][m.key]),
        backgroundColor: codes.map(c => colorFor(state.team[c][m.key])),
        borderRadius: 3,
        barPercentage: 0.8,
        categoryPercentage: 0.85,
      }));
      config = {
        type: "bar",
        data: { labels: codes, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: { family: "Inter, system-ui, sans-serif", size: 11, weight: 600 },
                usePointStyle: true,
                pointStyle: "circle",
                padding: 12,
                boxWidth: 10,
                generateLabels: () => levels.map(l => ({
                  text: l.name,
                  fillStyle: l.color,
                  strokeStyle: l.color,
                  pointStyle: "circle",
                  hidden: false,
                })),
              },
              onClick: () => {},
            },
            tooltip: {
              ...commonTooltip,
              callbacks: {
                title: ctx => `${ctx[0].label} · ${ctx[0].dataset.label}`,
                label: ctx => `${ctx.parsed.y}/100`,
              },
            },
          },
          scales: {
            x: { stacked: false, grid: { display: false }, ticks: { font: baseFont, color: "#666" } },
            y: { beginAtZero: true, max: 100, grid: { color: "rgba(0,0,0,0.05)" }, ticks: { font: baseFont, color: "#666", callback: v => `${v}` } },
          },
        },
      };
    }

    if (config) {
      charts.attachment = new Chart(canvas, config);
    }
  }

  /* ============================================================
     8 · CONFIRMACIÓN PREVIA
     ============================================================ */
  function showConfirm(email, value) {
    const modal = $("[data-confirm]");
    const body = $("[data-confirm-body]");
    if (!modal || !body) return;

    const isMulti = email.multi;
    let summary;

    const iconImpact = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M11 16v-9"/><path d="M15 16v-7"/><path d="M19 16v-3"/></svg>`;
    const iconWarn = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    const iconCheck = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

    if (isMulti) {
      const picked = email.options.filter(o => (value || []).includes(o.value));
      summary = `
        <p class="ra-confirm-question">Activarás <b>${picked.length} ${picked.length === 1 ? "factor" : "factores"}</b>:</p>
        <ul class="ra-confirm-list">
          ${picked.map(o => `<li><span class="ra-confirm-bullet">${iconCheck}</span><div><b>${o.title}</b><small>${o.tag}</small></div></li>`).join("")}
        </ul>
      `;
    } else {
      const o = email.options.find(opt => opt.value === value);
      summary = `
        <p class="ra-confirm-question">Tu decisión:</p>
        <div class="ra-confirm-decision">
          <span class="ra-confirm-tag">${o.tag}</span>
          <b>${o.title}</b>
          <p>${o.desc}</p>
        </div>
        <div class="ra-confirm-impact">
          <span class="ra-confirm-impact-label">${iconImpact} Impacto esperado</span>
          <p>${o.impactSummary || "Esta decisión cambiará el ánimo del equipo y las métricas del BSC."}</p>
        </div>
      `;
    }

    body.innerHTML = `
      <div class="ra-confirm-email-tag">
        <span class="ra-confirm-email-label">Asunto del correo</span>
        ${email.subject}
      </div>
      ${summary}
      <p class="ra-confirm-warning">${iconWarn}<span><b>No podrás cambiarla.</b> Lee con atención antes de confirmar.</span></p>
    `;

    // Almacenar pendiente
    modal._pending = { email, value };
    modal.hidden = false;
  }

  function hideConfirm() {
    const modal = $("[data-confirm]");
    if (modal) { modal.hidden = true; modal._pending = null; }
  }

  function confirmAnswer() {
    const modal = $("[data-confirm]");
    if (!modal || !modal._pending) return;
    const { email, value } = modal._pending;
    hideConfirm();
    answerEmail(email, value);
  }

  function answerEmail(email, value) {
    state.emailsAnswered[email.id] = value;
    applyEffects(email, value);
    const idx = EMAILS.findIndex(e => e.id === email.id);
    const next = EMAILS[idx + 1];
    if (next) state.currentEmailId = next.id;
    saveState();
    render();
    // En móvil, regresar al inicio de la bandeja para que el usuario no tenga
    // que hacer scroll buscando el siguiente correo
    if (window.matchMedia("(max-width: 880px)").matches) {
      requestAnimationFrame(() => {
        const list = document.querySelector("[data-inbox-list]");
        const anchor = list || document.querySelector(".ra-inbox");
        if (anchor) {
          const top = anchor.getBoundingClientRect().top + window.scrollY - 16;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    }
    if (!next) {
      setTimeout(showBoardReport, 600);
    } else {
      // Recordatorio para revisar Personal y Empresa después de cada decisión
      setTimeout(showReminder, 400);
    }
  }

  /* ============================================================
     10.1 · REMINDER — recordatorio post-decisión
     ============================================================ */
  function showReminder() {
    const modal = $("[data-reminder]");
    if (modal) modal.hidden = false;
  }
  function hideReminder() {
    const modal = $("[data-reminder]");
    if (modal) modal.hidden = true;
  }
  function gotoTabFromReminder(tab) {
    state.currentTab = tab;
    saveState();
    hideReminder();
    render();
    requestAnimationFrame(() => {
      const panels = document.querySelector(".ra-panels");
      if (panels) {
        const top = panels.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  }

  /* -------- Team -------- */
  function renderTeam() {
    const grid = $("[data-team-grid]");
    if (!grid) return;
    grid.innerHTML = Object.entries(state.team).map(([code, st]) => {
      const t = TEAM[code];
      const m = moodStatus(st.mood);
      return `
        <article class="ra-person ra-person--${m.cls}">
          <div class="ra-person-avatar"><span>${code}</span></div>
          <div class="ra-person-meta">
            <b class="ra-person-name">${t.name}</b>
            <span class="ra-person-role">${t.role}</span>
            <span class="ra-person-status">${m.text}</span>
          </div>
          <div class="ra-person-bars">
            ${bar("Ánimo", st.mood, "mood")}
            ${bar("Productividad", st.productivity, "prod")}
            ${bar("Lealtad", st.loyalty, "loy")}
          </div>
        </article>`;
    }).join("");
  }
  function bar(label, v, k) {
    return `
      <div class="ra-bar">
        <div class="ra-bar-label">${label} <em>${v}</em></div>
        <div class="ra-bar-track"><div class="ra-bar-fill is-${k}" style="width:${v}%"></div></div>
      </div>`;
  }
  function moodStatus(m) {
    if (m >= 75) return { cls: "good",  text: "Comprometido" };
    if (m >= 55) return { cls: "ok",    text: "Estable" };
    if (m >= 35) return { cls: "warn",  text: "Inquieto" };
    return                { cls: "bad", text: "En riesgo" };
  }

  /* -------- Company -------- */
  function renderCompany() {
    const root = $("[data-company-root]");
    if (!root) return;
    const m = state.metrics;
    const avgB = avgBSC().toFixed(0);
    const avgM = avgMood().toFixed(0);
    const fmtCOP = (millions) => "COP " + (millions * 1_000_000).toLocaleString("es-CO");

    root.innerHTML = `
      <div class="ra-company-kpis">
        ${kpi("Ingresos Q1", fmtCOP(m.finances.revenue), financeTone(m.finances.revenue, 2200))}
        ${kpi("Costos Q1",   fmtCOP(m.finances.costs),   costsTone(m.finances.costs, m.finances.revenue))}
        ${kpi("Runway",      `${m.finances.runway} meses`,  runwayTone(m.finances.runway))}
        ${kpi("Día / 90",    `${m.quarterDay}`,             "neutral")}
      </div>

      <div class="ra-company-row">
        <section class="ra-company-section">
          <h3>Balanced Scorecard</h3>
          <div class="ra-bsc-grid">
            ${gauge("Financiera",       m.bsc.financiera)}
            ${gauge("Procesos",         m.bsc.procesos)}
            ${gauge("Clientes",         m.bsc.clientes)}
            ${gauge("Aprendizaje",      m.bsc.aprendizaje)}
          </div>
        </section>

        <section class="ra-company-section">
          <h3>Bienestar del equipo</h3>
          <div class="ra-wellbeing-grid">
            ${well("eNPS",            m.wellbeing.eNPS,         m.wellbeing.eNPS >= 30 ? "good" : m.wellbeing.eNPS >= 0 ? "ok" : "bad", "Recomendación", "Employee Net Promoter Score · mide la probabilidad de que tus empleados recomienden la empresa como lugar de trabajo. Va de −100 (todos detractores) a +100 (todos promotores). En el reto sube cuando empoderas y baja con decisiones que rompen confianza.")}
            ${well("Rotación %",      m.wellbeing.rotation,     m.wellbeing.rotation <= 5 ? "good" : m.wellbeing.rotation <= 12 ? "ok" : "bad", "Anual", "Porcentaje estimado de empleados que se irían en un año si la tendencia actual se mantiene. Bajo 5 % es saludable; sobre 12 % indica fuga de talento. En el reto crece con decisiones de control rígido o recortes.")}
            ${well("Ánimo",           avgM,                     avgM >= 65 ? "good" : avgM >= 45 ? "ok" : "bad", "Media equipo", "Promedio del ánimo de las 8 personas del equipo (0 a 100). Es la métrica más sensible: cambia inmediatamente con cada decisión que tomas en la bandeja.")}
            ${well("BSC",             avgB,                     avgB >= 65 ? "good" : avgB >= 45 ? "ok" : "bad", "Salud 4 perspectivas", "Balanced Scorecard · marco de Kaplan & Norton (1992). Mide la empresa desde 4 ángulos: Financiera, Procesos, Clientes y Aprendizaje. Este indicador es el promedio de las 4. Una buena gestión equilibra los cuatro.")}
          </div>
        </section>
      </div>

      <section class="ra-company-section">
        <h3>Línea de tiempo</h3>
        <ol class="ra-timeline ra-timeline--horizontal">
          ${EMAILS.map(e => {
            const done = !!state.emailsAnswered[e.id];
            const current = e.id === state.currentEmailId && !done;
            return `
              <li class="ra-timeline-mark ${done ? "is-done" : current ? "is-current" : ""}">
                <span class="ra-timeline-dot"></span>
                <div class="ra-timeline-meta"><b>Día ${e.day}</b><span>${e.subject}</span></div>
              </li>`;
          }).join("")}
        </ol>
      </section>
    `;
  }
  function kpi(label, value, tone) {
    return `<div class="ra-kpi ra-kpi--${tone}"><small>${label}</small><b>${value}</b></div>`;
  }
  function gauge(label, value) {
    const r = 38, c = 2 * Math.PI * r;
    const offset = c - (value / 100) * c;
    const tone = value >= 65 ? "good" : value >= 45 ? "ok" : "bad";
    return `
      <div class="ra-gauge ra-gauge--${tone}">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="${r}" class="ra-gauge-track"/>
          <circle cx="50" cy="50" r="${r}" class="ra-gauge-arc"
                  style="stroke-dasharray:${c.toFixed(2)};stroke-dashoffset:${offset.toFixed(2)}"/>
        </svg>
        <div class="ra-gauge-center"><b>${value}</b><small>${label}</small></div>
      </div>`;
  }
  function well(label, v, tone, hint, tooltip) {
    const tipIcon = tooltip ? `<button type="button" class="ra-well-info" aria-label="¿Qué significa ${label}?" data-tooltip="${tooltip.replace(/"/g, "&quot;")}"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></button>` : "";
    return `<div class="ra-well ra-well--${tone}"><div class="ra-well-head"><span>${label}</span>${tipIcon}</div><b>${v}</b><small>${hint}</small></div>`;
  }
  function renderAlerts() {
    const a = [];
    if (state.metrics.finances.runway <= 6) a.push({ tone: "bad", text: `⚠ Runway crítico: solo ${state.metrics.finances.runway} meses de caja.` });
    if (avgMood() < 35) a.push({ tone: "bad", text: `⚠ Ánimo del equipo bajo: alto riesgo de renuncias.` });
    if (avgMood() >= 70) a.push({ tone: "good", text: `✓ Equipo altamente motivado: aprovecha el momentum.` });
    if (state.metrics.bsc.financiera >= 70 && state.metrics.bsc.aprendizaje <= 30) a.push({ tone: "warn", text: `⚠ Cuidas el dinero pero descuidas el aprendizaje.` });
    if (state.metrics.bsc.clientes >= 70) a.push({ tone: "good", text: `✓ Clientes muy satisfechos.` });
    const content = a.length
      ? `<div class="ra-alerts">${a.map(x => `<div class="ra-alert ra-alert--${x.tone}">${x.text}</div>`).join("")}</div>`
      : `<p class="ra-alerts-empty">Sin alertas activas. Las métricas están en rangos saludables.</p>`;
    return `<section class="ra-company-section"><h3>Alertas activas</h3>${content}</section>`;
  }
  const financeTone = (r, t) => r >= t ? "good" : r >= t * 0.8 ? "ok" : "bad";
  const costsTone   = (c, r) => c <= r ? "good" : c <= r * 1.15 ? "ok" : "bad";
  const runwayTone  = (r)    => r >= 10 ? "good" : r >= 6 ? "ok" : "bad";

  /* ============================================================
     9 · INFORME DE LA JUNTA
     ============================================================ */
  function showBoardReport() {
    const v = computeVerdict();
    const modal = $("[data-modal]");
    if (!modal) return;
    const set = (sel, val, html) => { const el = $(sel); if (el) { if (html) el.innerHTML = val; else el.textContent = val; } };
    set("[data-modal-title]", v.title);
    set("[data-modal-verdict]", `Veredicto: <b>${v.label}</b>`, true);
    set("[data-modal-cheer-title]", v.cheerTitle);
    set("[data-modal-cheer-sub]", v.cheerSub);
    modal.dataset.tone = v.tone;

    const teamEl = $("[data-modal-team]");
    if (teamEl) teamEl.innerHTML = Object.entries(state.team).map(([code, st]) => {
      const t = TEAM[code], m = moodStatus(st.mood);
      return `<div class="coo-board-member is-${m.cls}">
        <b>${code}</b>
        <span class="coo-board-member-name">${t.name}</span>
        <small>${t.role} · ${m.text}</small>
      </div>`;
    }).join("");

    const bscEl = $("[data-modal-bsc]");
    if (bscEl) {
      const labels = { financiera: "Financiera", procesos: "Procesos internos", clientes: "Clientes", aprendizaje: "Aprendizaje" };
      bscEl.innerHTML = Object.entries(state.metrics.bsc).map(([k, val]) => {
        const tone = val >= 65 ? "good" : val >= 45 ? "mid" : "bad";
        return `<div class="coo-board-bsc-row is-${tone}">
          <b>${labels[k]}</b>
          <div class="coo-board-bsc-bar"><div class="coo-board-bsc-fill" style="width:${val}%"></div></div>
          <span>${val}</span>
        </div>`;
      }).join("");
    }

    const dEl = $("[data-modal-decisions]");
    if (dEl) dEl.innerHTML = EMAILS.filter(e => state.emailsAnswered[e.id]).map(e => {
      const val = state.emailsAnswered[e.id];
      let label;
      if (e.multi) label = (val || []).map(x => e.options.find(o => o.value === x)?.title).filter(Boolean).join(" · ");
      else         label = e.options.find(o => o.value === val)?.title || "—";
      return `<li><b>Día ${e.day}</b><div class="coo-board-decisions-body"><p class="coo-board-decisions-subject">${e.subject}</p><span>${label}</span></div></li>`;
    }).join("");

    const fb = $("[data-modal-feedback]");
    if (fb) fb.innerHTML = `<p>${v.feedback}</p>`;

    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
  }

  function computeVerdict() {
    const score = (avgBSC() + avgMood()) / 2;
    if (score >= 70) return {
      title: "Líder Transformacional",
      label: "Ratificada como COO",
      tone: "good",
      cheerTitle: "¡Magnífico! Completaste tu primer trimestre",
      cheerSub: "La Junta no solo te ratifica — abre conversación para tu paso a CEO.",
      feedback: "<b>Líder Transformacional.</b> Combinaste rigor financiero, retención de talento y comunicación honesta. TechCorp sale del trimestre con cultura sana, BSC equilibrado y un equipo que confía en ti.",
    };
    if (score >= 55) return {
      title: "Director Equilibrado",
      label: "Ratificada con plan de mejora",
      tone: "good",
      cheerTitle: "¡Bien hecho! Cerraste un trimestre sólido",
      cheerSub: "La Junta te ratifica y pide un plan de mejora a 6 meses.",
      feedback: "<b>Director Equilibrado.</b> Cuidaste las cuatro perspectivas BSC sin destruir ninguna. Hay margen para profundizar la diferenciación cultural.",
    };
    if (score >= 40) return {
      title: "Director Correctivo",
      label: "Período de prueba extendido",
      tone: "mid",
      cheerTitle: "¡Completaste tu primer trimestre!",
      cheerSub: "La Junta te extiende 90 días más con seguimiento mensual.",
      feedback: "<b>Director Correctivo.</b> Resolviste lo urgente, pero la transformación profunda quedó pendiente.",
    };
    return {
      title: "Director en formación",
      label: "Reasignación recomendada",
      tone: "bad",
      cheerTitle: "Cerraste tu primer trimestre",
      cheerSub: "La Junta sugiere coaching intensivo antes de reasignarte.",
      feedback: "<b>Director en formación.</b> Las decisiones priorizaron el corto plazo financiero. Te recomendamos reintentar aplicando los marcos de Herzberg, Mayo y BSC.",
    };
  }

  /* ============================================================
     10 · ONBOARDING
     ============================================================ */
  function showOnboarding() {
    const ob = $("[data-onboarding]");
    if (ob) ob.hidden = false;
  }
  function hideOnboarding() {
    const ob = $("[data-onboarding]");
    if (ob) ob.hidden = true;
    state.onboardingSeen = true;
    saveState();
  }

  /* ============================================================
     11 · INIT
     ============================================================ */
  function init() {
    recalcDerived();
    render();
    if (!state.onboardingSeen) showOnboarding();

    $$("[data-onboarding-close], [data-onboarding-start]").forEach(b => b.addEventListener("click", hideOnboarding));
    $$("[data-show-onboarding]").forEach(b => b.addEventListener("click", showOnboarding));

    $$("[data-tab-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.currentTab = btn.dataset.tabBtn;
        saveState();
        render();
      });
    });

    document.addEventListener("click", (e) => {
      const item = e.target.closest("[data-email-id]");
      if (item && !item.disabled) {
        state.currentEmailId = item.dataset.emailId;
        saveState();
        renderEmailDetail(state.currentEmailId);
        $$("[data-email-id]").forEach(i => i.classList.remove("is-selected"));
        item.classList.add("is-selected");
      }
      if (e.target.closest("[data-confirm-cancel]")) hideConfirm();
      if (e.target.closest("[data-confirm-ok]")) confirmAnswer();
      const reminderClose = e.target.closest("[data-reminder-close]");
      if (reminderClose) hideReminder();
      const reminderGoto = e.target.closest("[data-reminder-goto]");
      if (reminderGoto) gotoTabFromReminder(reminderGoto.dataset.reminderGoto);
    });

    $$("[data-reset]").forEach(b => b.addEventListener("click", () => {
      if (confirm("¿Reiniciar el simulador? Perderás el progreso actual.")) {
        resetState();
        const m = $("[data-modal]");
        m?.setAttribute("aria-hidden", "true");
        m?.classList.remove("is-open");
      }
    }));

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
