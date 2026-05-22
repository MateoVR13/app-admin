---
name: diseno-instruccional-software-educativo
description: >
  Skill para diseñar y desarrollar software educativo web standalone alineado con principios
  sólidos de diseño instruccional. Activa SIEMPRE que el usuario mencione: construir, planear,
  estructurar, diseñar o desarrollar un aplicativo educativo, curso virtualizado, reto interactivo,
  simulador, microcurso, learning object, demo educativa, pieza promocional con componente
  pedagógico, o cualquier pieza de software cuyo propósito sea enseñar, evaluar conocimientos o
  generar interés académico (lead generation educativo). También activa cuando se hablen de:
  arquitectura pedagógica de un aplicativo, secuenciación de contenido teórico + reto interactivo,
  integración de recursos multiformato (videos, podcasts, infografías, quizzes, animaciones),
  experiencia de aprendizaje (LX), engagement educativo, gamificación, scaffolding interactivo,
  feedback formativo en aplicaciones, o cuando el usuario pida componentes/módulos/pantallas
  que entreguen contenido educativo. No esperes que el usuario diga "diseño instruccional"
  explícitamente — si está construyendo cualquier pieza de software cuya función central sea
  enseñar o evaluar aprendizaje, esta skill es relevante. Aplica especialmente para programas
  de pregrado con énfasis en captación de estudiantes a través de demos pedagógicas.
---

# Diseño Instruccional para Software Educativo Web

Skill para diseñar la **arquitectura pedagógica** de aplicativos web educativos standalone:
virtualizaciones de cursos, retos interactivos, simuladores, microexperiencias de captación
y, en general, cualquier software cuyo propósito central sea enseñar, evaluar o generar
interés académico.

El foco de esta skill es **el puente entre la pedagogía y el producto de software**: cómo
traducir objetivos de aprendizaje, recursos multiformato y estrategias didácticas en
componentes, pantallas, flujos de interacción y patrones de UX educativos concretos.

---

## Cuándo usar esta skill vs. otras skills relacionadas

| Situación | Usar |
|---|---|
| Diseñar la lógica pedagógica de un aplicativo web (componentes, flujo, interacciones) | **esta skill** |
| Virtualizar un curso completo en LMS (Moodle/Canvas) con syllabus formal | `diseno-instruccional` (posgrados LMS) |
| Crear un reto interactivo standalone, simulador o demo educativa | **esta skill** |
| Diseñar el sílabo, rúbricas o documentos curriculares formales | `diseno-instruccional` |
| Implementar el frontend del aplicativo (HTML/React/CSS) | combinar **esta skill** + `frontend-design` |
| Generar un syllabus o guía docente como entregable Word | `academic-content-generator` + `docx` |

Esta skill no reemplaza a `frontend-design`: la complementa aportando el "qué" pedagógico
antes del "cómo" visual. Si el usuario está construyendo código frontend, lee también
`/mnt/skills/public/frontend-design/SKILL.md`.

---

## Filosofía de diseño

El software educativo difiere de un curso virtual tradicional en aspectos críticos que
condicionan todo el diseño:

- **Sesiones cortas y autocontenidas**: el usuario rara vez vuelve; cada visita debe ser
  significativa en sí misma. Diseñar para retención inmediata, no para acumulación.
- **Sin docente sincrónico**: toda la mediación pedagógica está en la interfaz. El producto
  ES el docente.
- **Engagement es prerrequisito del aprendizaje**: si no hay enganche en los primeros 15
  segundos, no hay aprendizaje posible. La motivación no es un "extra" sino estructural.
- **Multiformato es la norma**: video, audio, texto, interactivos y evaluación conviven en
  el mismo flujo; el diseño debe orquestar estos formatos, no acumularlos.
- **Doble propósito en marketing educativo**: el aplicativo debe enseñar real y, a la vez,
  generar deseo de profundizar (matrícula, lead). Estos dos objetivos no se contradicen: una
  experiencia que enseña bien es la mejor pieza de captación.
- **Mobile-first y baja fricción**: muchos usuarios llegan desde redes sociales en móvil;
  el diseño asume ese contexto.

---

## Marcos pedagógicos de referencia

Los modelos clásicos de DI (ADDIE, ASSURE, Dick & Carey, Gagné, Jonassen) siguen siendo
válidos pero requieren adaptación al contexto de software standalone. Esta skill toma
elementos de varios marcos:

- **9 eventos de Gagné**: especialmente útiles para estructurar microexperiencias (cada
  evento se mapea a un componente o sección del aplicativo).
- **ADDIE**: como ciclo macro de proceso (Análisis → Diseño → Desarrollo → Implementación
  → Evaluación), aplicado iterativamente al producto.
- **Diseño tecnopedagógico** (Coll, 2008): dimensión tecnológica y pedagógica son
  inseparables en software educativo.
- **Teoría del Aprendizaje Multimedia** (Mayer): principios para combinar texto, imagen,
  audio sin sobrecarga cognitiva.
- **Constructivismo y aprender haciendo** (Jonassen): el reto interactivo como núcleo de
  la experiencia, no como apéndice.
- **Microlearning y chunking**: contenido en unidades pequeñas, completables en 3-10 min.
- **Gamificación con propósito**: progreso visible, feedback inmediato, recompensas
  intrínsecas alineadas con el aprendizaje (no badges huecos).

Para profundización teórica, consulta `references/marcos-pedagogicos-software.md`.

---

## Proceso de diseño — Flujo de trabajo

### FASE 1 — ANÁLISIS pedagógico-de-producto

Antes de proponer cualquier componente o pantalla, recoge esta información. Si parte ya
está en la conversación, **no vuelvas a preguntar lo que ya se sabe**:

**Preguntas de diagnóstico obligatorias:**

1. **Tipo de aplicativo**: ¿virtualización de curso? ¿reto interactivo standalone?
   ¿simulador? ¿microexperiencia de captación? ¿otro?
2. **Propósito dual**: ¿es puramente educativo o también busca captar leads/matrículas?
   Si es lo segundo: ¿qué CTA final tiene?
3. **Audiencia**: ¿estudiantes de pregrado prospectos? ¿matriculados? ¿edad/perfil
   típico? ¿nivel de conocimiento previo asumido?
4. **Tema y disciplina**: ¿qué se va a enseñar específicamente? ¿es contenido conceptual,
   procedimental, actitudinal?
5. **Duración objetivo de la experiencia**: ¿5 min? ¿30 min? ¿1 hora? ¿modular?
6. **Recursos disponibles**: ¿se cuenta con videos, podcasts, infografías existentes?
   ¿hay que producirlos? ¿quién los produce?
7. **Restricciones técnicas**: ¿stack frontend? ¿integraciones (analytics, CRM, LMS)?
   ¿dispositivos objetivo (móvil/escritorio)?
8. **Métricas de éxito**: ¿cómo se medirá si el aplicativo funciona? (completion rate,
   tiempo en página, conversión a lead, puntaje en quiz, NPS, etc.)

Cuando falten datos críticos, plantea las preguntas usando `ask_user_input_v0` si está
disponible, agrupando 1-3 preguntas máximo por turno.

---

### FASE 2 — DISEÑO pedagógico

#### 2.1 Definir el Resultado de Aprendizaje (RA) núcleo

Todo aplicativo educativo debe poder responder en una frase:
**"Al terminar esta experiencia el usuario será capaz de _______."**

- Para experiencias cortas (≤15 min): **un solo RA** claro, en nivel Comprender/Aplicar.
- Para experiencias modulares: un RA por módulo, máx. 5 módulos.
- Verbo observable de Bloom; evitar "conocer", "entender", "saber" sin más.

En aplicativos de marketing educativo, además del RA pedagógico hay un **resultado de
producto**: "y querrá saber más sobre [programa académico]". Diseñar ambos en paralelo.

---

#### 2.2 Arquitectura pedagógica del aplicativo

Selecciona un patrón estructural según el tipo de aplicativo. Estos son arquetipos
genéricos que se combinan y adaptan:

**Patrón A — Microexperiencia teoría + reto (recomendado para captación)**
```
1. Hook (10-30s)         → enganche + promesa de valor
2. Contexto/problema     → ¿por qué importa esto?
3. Contenido teórico     → multiformato, máx. 3-5 min por bloque
4. Quiz de afianzamiento → preguntas cortas, feedback inmediato
5. Reto interactivo      → aplicación auténtica del concepto
6. Síntesis + CTA        → cierre pedagógico + invitación a profundizar
```

**Patrón B — Virtualización de curso modular**
```
Módulo 0: Inducción (qué vas a aprender, cómo navegar, qué evalúa)
Módulo N (repetir):
  ├── Activación de conocimientos previos (1-2 min)
  ├── Contenido nuclear (multiformato, chunks de 3-7 min)
  ├── Práctica guiada (ejemplos resueltos, scaffolding)
  ├── Práctica autónoma (quiz, ejercicio, mini-reto)
  └── Cierre y conexión con siguiente módulo
Cierre del curso: integración, evaluación final, certificación o CTA
```

**Patrón C — Simulador / sandbox**
```
1. Onboarding mínimo viable (tutorial in-context, no muros de texto)
2. Estado inicial con objetivo claro visible
3. Espacio de manipulación con feedback en tiempo real
4. Retos progresivos opcionales (de fácil a desafiante)
5. Modo libre / exploración
6. Reflexión guiada al final (¿qué aprendiste manipulando?)
```

**Patrón D — Reto interactivo standalone (gamificado)**
```
1. Pantalla de bienvenida con narrativa/contexto
2. Reglas claras y ejemplo demostrativo
3. Serie de retos progresivos (3-7 niveles)
4. Sistema de feedback inmediato (acierto/error + por qué)
5. Pantalla de resultados con métricas significativas
6. Compartir + CTA (si aplica)
```

Para casos no contemplados, combina elementos o crea un patrón híbrido justificándolo
pedagógicamente.

---

#### 2.3 Mapeo: eventos de Gagné → componentes de software

Esta tabla es la herramienta práctica más útil para traducir pedagogía a UI:

| Evento de Gagné | Componente/sección sugerida |
|---|---|
| 1. Captar atención | Hero con video/animación, pregunta provocadora, dato impactante |
| 2. Informar objetivo | Tarjeta "qué vas a lograr" visible desde el inicio |
| 3. Recordar prerrequisitos | Quiz diagnóstico opcional, glosario expandible, "lo que ya sabes" |
| 4. Presentar contenido | Bloques multiformato: video + texto + infografía intercalados |
| 5. Guiar aprendizaje | Ejemplos resueltos, scaffolding, hints expandibles, paso-a-paso |
| 6. Provocar respuesta | Interactivos, quizzes, simulaciones, drag-and-drop, inputs |
| 7. Feedback | Validación inmediata + explicación (no solo correcto/incorrecto) |
| 8. Evaluar desempeño | Reto final integrador, autoevaluación, puntaje |
| 9. Promover transferencia | "¿Cómo aplicarías esto en X?", casos cercanos, CTA accionable |

---

#### 2.4 Estrategia de recursos multiformato

Cada formato tiene una función pedagógica específica. Usar uno por defecto es perder
oportunidades; usar todos en cada bloque es saturación. Heurística por propósito:

| Si quieres... | Usa preferentemente |
|---|---|
| Explicar un proceso o procedimiento | Video corto (2-4 min) o animación |
| Construir narrativa o caso | Audio/podcast + transcripción |
| Sintetizar información compleja | Infografía interactiva o estática |
| Profundizar conceptos | Texto bien estructurado con jerarquía visual |
| Verificar comprensión | Quiz de selección múltiple, V/F, emparejar |
| Aplicar lo aprendido | Reto interactivo, simulador, caso a resolver |
| Reflexionar | Pregunta abierta con campo de texto (sin evaluación rígida) |

**Reglas de combinación (basadas en Mayer):**
- No duplicar misma información en texto y audio simultáneo (efecto redundancia).
- Texto explicativo cerca de la imagen que ilustra (principio de contigüidad).
- Audio narrativo + visual relacionado funciona mejor que texto + visual simultáneo.
- Eliminar elementos decorativos sin función pedagógica (principio de coherencia).

---

#### 2.5 Diseño de quizzes y preguntas cortas

Las preguntas de selección múltiple bien diseñadas son una de las herramientas más
poderosas del software educativo. Reglas no negociables:

- **Pregunta clara y completa** en el enunciado (no completar al leer las opciones).
- **3-4 opciones** óptimo (5+ es ruido, 2 es V/F encubierto).
- **Distractores plausibles**: cada opción incorrecta debe representar un error
  conceptual real, no una opción absurda.
- **Feedback explicativo por opción**, no solo "correcto/incorrecto". Idealmente
  explicar por qué cada distractor es incorrecto.
- **Evaluar comprensión, no memoria literal** del texto leído arriba.
- **Permitir reintento** en contexto formativo; bloquear avance solo si es evaluación
  sumativa real.

Estructura mínima en datos:
```json
{
  "id": "q1",
  "enunciado": "...",
  "opciones": [
    { "texto": "...", "correcta": true, "feedback": "Correcto porque..." },
    { "texto": "...", "correcta": false, "feedback": "No, este error suele venir de..." }
  ],
  "concepto_evaluado": "...",
  "nivel_bloom": "Comprender"
}
```

---

#### 2.6 Diseño del reto interactivo

El reto interactivo es el corazón del aprendizaje aplicado. No es un quiz más sofisticado:
exige que el usuario **haga algo** con el conocimiento. Diseñar siempre con:

- **Contexto auténtico**: situación verosímil de la disciplina, no abstracta.
- **Objetivo claro y visible**: el usuario sabe en todo momento qué debe lograr.
- **Manipulación significativa**: la interacción cambia el estado de forma observable.
- **Feedback gradual**: hints antes de mostrar la solución; solución solo tras intentar.
- **Múltiples caminos válidos** cuando sea pedagógicamente posible (no una sola respuesta).
- **Cierre reflexivo**: pregunta o síntesis que conecta el reto con el concepto general.

Antipatrones a evitar:
- Reto que es solo "haz clic en el botón correcto" disfrazado.
- Gamificación sin contenido (puntos por hacer scroll).
- Castigar el error con pérdidas de progreso (anti-aprendizaje).
- Tutoriales largos antes de poder hacer cualquier cosa.

---

#### 2.7 Integración educación-marketing (para piezas de captación)

Cuando el aplicativo tiene propósito de generación de leads para pregrado, el CTA y la
captura de datos deben respetar la experiencia pedagógica. Principios:

- **Ganarse el CTA**: pedir datos solo después de entregar valor real (no en la pantalla 1).
- **CTA contextual y específico**: "¿Quieres aprender a hacer X profesionalmente? Conoce el
  programa de Y" > "Suscríbete a nuestro boletín".
- **Capturar mínimo viable**: nombre + correo para iniciar; el resto progresivamente.
- **Ofrecer valor adicional asociado**: PDF resumen, masterclass, asesoría — no solo
  "información del programa".
- **Permitir continuar sin convertir**: no bloquear contenido tras formulario, salvo en
  la sección "+profundización" final.
- **Trackear eventos pedagógicos relevantes**: completion de bloques, intentos de quiz,
  tiempo en reto. Estas métricas informan tanto producto como ventas.

---

### FASE 3 — ESPECIFICACIÓN para desarrollo

Cuando el diseño pedagógico esté claro, traducirlo a una especificación que el equipo de
desarrollo pueda implementar. Entregables típicos según necesidad:

**A. Mapa de la experiencia (flowmap pedagógico)**
Diagrama que muestra: pantallas/secciones, transiciones, puntos de decisión, momentos de
feedback. Útil generarlo como diagrama visual usando la herramienta de visualización.

**B. Especificación de componentes pedagógicos**
Para cada componente educativo (bloque de video, quiz, reto interactivo), documentar:
- Propósito pedagógico (qué evento de Gagné cubre, qué del RA construye)
- Inputs/outputs
- Estados (inicial, durante, post-feedback, completado)
- Datos requeridos (contenido, opciones, feedback)
- Interacciones esperadas
- Criterio de "completado"

**C. Guion de contenido por pantalla/módulo**
Texto/copy de cada bloque, especificaciones de los recursos (qué video, qué duración,
qué se ve), preguntas de quiz con feedback, instrucciones de retos.

**D. Modelo de datos pedagógico**
Estructura JSON/schema para representar el contenido del aplicativo de forma que sea:
- Editable por equipo pedagógico sin tocar código
- Versionable
- Reutilizable entre aplicativos

Plantilla básica en `references/modelo-datos-contenido.md`.

**E. Especificación de métricas y eventos**
Lista de eventos a trackear (analytics) alineados con momentos pedagógicos clave:
inicio_experiencia, completion_bloque_N, intento_quiz, acierto_quiz, completion_reto,
conversion_cta, etc.

---

### FASE 4 — REVISIÓN Y CALIDAD

Antes de entregar cualquier diseño, verifica:

**Lista de verificación pedagógica:**
- [ ] ¿Hay un RA claro, observable y verificable?
- [ ] ¿Cada componente del aplicativo tiene una función pedagógica explícita?
- [ ] ¿Los recursos multiformato están justificados (no decorativos)?
- [ ] ¿Los quizzes evalúan comprensión, no memoria?
- [ ] ¿El feedback es explicativo, no solo correctivo?
- [ ] ¿El reto interactivo exige aplicación real del concepto?
- [ ] ¿La duración estimada es realista para el público y el contexto?
- [ ] ¿Funciona en móvil tan bien como en escritorio?
- [ ] ¿Hay onboarding mínimo viable, sin saturación inicial?
- [ ] (Si aplica marketing) ¿El CTA se gana, no se impone?

**Lista de verificación de producto:**
- [ ] ¿El modelo de datos permite editar contenido sin tocar código?
- [ ] ¿Las métricas definidas permiten iterar el diseño?
- [ ] ¿Hay estados de error, vacío, carga definidos?
- [ ] ¿La experiencia es completable en una sesión típica del usuario objetivo?

---

## Formato de entrega

Adapta la forma del entregable al estado del proyecto:

- **En fase de ideación o concepto**: respuesta conversacional con estructura clara,
  posiblemente acompañada de un diagrama visual del flujo (usar Visualizer).
- **Para especificación de componentes**: tablas Markdown bien estructuradas, código de
  ejemplo del modelo de datos en JSON.
- **Para documento entregable formal** (handover a desarrollo o cliente): usa el skill
  `docx`. Estructura: contexto → RA → arquitectura → especificación de componentes →
  modelo de datos → métricas.
- **Para prototipos visuales o demos rápidas**: combina esta skill con `frontend-design`
  para generar un prototipo HTML/React funcional del componente educativo.
- **Para presentaciones a stakeholders**: usa `pptx`.

---

## Tono y estilo de comunicación

Al trabajar con un equipo de desarrollo de software educativo:

- Hablar simultáneamente el lenguaje del producto y de la pedagogía. Traducir entre ambos.
- No imponer la teoría: invocar marcos pedagógicos solo cuando aportan a la decisión
  concreta, no como ornamento.
- Ser pragmático: el mejor diseño es el que se puede implementar, mantener e iterar.
- Cuando exista tensión entre "pedagógicamente ideal" y "técnicamente viable", proponer
  el camino que conserve el valor pedagógico nuclear y diferir el resto a futuras
  iteraciones.
- Reconocer la dimensión de captación cuando aplique: no es "ensuciar" la pedagogía, es
  parte del propósito real del producto.
- Ofrecer alternativas con tradeoffs explícitos en vez de una sola "solución correcta".

---

## Referencias rápidas

- `references/marcos-pedagogicos-software.md` — Marcos teóricos detallados aplicados a
  software educativo (Gagné, Mayer, Jonassen, ADDIE, microlearning, gamificación).
- `references/patrones-arquitectura.md` — Catálogo extendido de patrones de arquitectura
  pedagógica con casos de ejemplo.
- `references/banco-componentes.md` — Componentes pedagógicos reutilizables con
  especificación técnica y pedagógica.
- `references/modelo-datos-contenido.md` — Plantillas de modelo de datos para representar
  contenido educativo de forma editable.
- `references/heuristicas-evaluacion.md` — Heurísticas de revisión de calidad para
  software educativo (basadas en Quality Matters adaptadas y Nielsen pedagógico).
