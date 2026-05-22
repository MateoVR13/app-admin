# Catálogo de imágenes — Aplicativo Ciencias Administrativas y Económicas

Documento maestro con todos los prompts para generar imágenes del aplicativo.
**Ruta de destino:** todas las imágenes generadas van a `assets/images/`.
**Formato preferido:** PNG con transparencia (cuando aplique) o JPG (para fotografía e infografías densas).

---

## 1. Convenciones de estilo (léelo primero)

Estas reglas aplican a **todas** las imágenes del aplicativo para que el conjunto se vea coherente.

### Paleta institucional

| Token | HEX | Uso |
|---|---|---|
| UA verde institucional | `#003d28` | Color principal de marca |
| UA verde 700 | `#007442` | Acento institucional |
| UA amarillo | `#ffd21a` | Acento de atención y resaltado |
| UA crema (paper) | `#fdf9ec` | Fondo neutro de imágenes |
| UA naranja | `#ff7900` | Programa de Administración |
| UA teal | `#00a4b5` | Programa de Economía |
| UA púrpura | `#7223b7` | Programa de Negocios Internacionales |
| Texto principal | `#0a1c16` | Texto sobre fondos claros |

### Estilo visual general

- **Tipo:** ilustración editorial moderna semi-plana, con sombras suaves y formas geométricas limpias. Estilo similar a las ilustraciones de Stripe, Linear, Notion blog o publicaciones de The Pudding. **No** estilo Corporate Memphis (figuras desproporcionadas), **no** estilo infantil, **no** fotorealismo 3D.
- **Composición:** centrada, con respiración alrededor, sin elementos cortados en bordes. Mínima cantidad de elementos: comunica una idea por imagen.
- **Personajes:** adultos jóvenes y adultos (18-50 años), diversos en género y tono de piel, en ropa profesional casual. Sin caras detalladas (rasgos simplificados, geométricos).
- **Fondo:** color crema cálido (`#fdf9ec` o similar). No fondos blancos puros, no fondos saturados.
- **Acentos de color:** usa el color del programa correspondiente (naranja/teal/púrpura) como detalle, no como inundación. El verde institucional puede aparecer como detalle también.
- **Líneas:** trazos limpios, grosor consistente (~2px), sin contornos negros gruesos tipo cómic.
- **Texto en imágenes:** evitar texto. Si se necesita, español.

### Negative prompts comunes (incluir en todos)

```
no childish cartoon, no Corporate Memphis style, no exaggerated proportions,
no detailed faces, no white pure background, no neon colors, no 3D render,
no AI artifacts, no text watermarks, no logos, no pixelation
```

### Convención de nombres de archivo

`{tipo}-{programa}-{tema}-{descriptor}.png`

- `tipo`: `hero` | `aha` | `infografia` | `ilus`
- `programa`: `admin` | `eco` | `neg` | `reto` | `general`
- `tema`: numérico (b1, b2) o palabra clave
- `descriptor`: 1-3 palabras kebab-case

Ejemplos: `hero-eco-b1-microeconomia.png`, `aha-admin-b1-panaderia.png`, `infografia-eco-b2-canasta-familiar.png`

---

## 2. Heroes de bloque (banner lateral derecho del header)

**Ubicación:** lado derecho del header de cada bloque, junto al título.
**Aspect ratio:** **4:3 (1200×900 px)** — funciona bien en desktop y se ajusta en móvil.
**Marca alfa:** PNG con fondo crema sólido (NO transparente), para que se vea siempre el frame completo.

---

### 2.1 `hero-admin-b1-fundamentos.png`

**Archivo:** `programa-admin-bloque-1.html` (Fundamentos de la administración)
**Aspect ratio:** 4:3

> Editorial modern illustration of a small bakery seen from above, with three workers coordinating: one at the oven, one at the cash register, one organizing the display case. Warm cream background (#fdf9ec), with orange accents (#ff7900) on the bakery items (bread loaves, awning). Soft shadows, flat geometric style, no detailed faces. The scene communicates "coordination and decisions in a real-world organization." Negative: no childish cartoon, no Corporate Memphis, no 3D render, no detailed faces, no text.

---

### 2.2 `hero-admin-b2-proceso.png`

**Archivo:** `programa-admin-bloque-2.html` (Proceso administrativo)
**Aspect ratio:** 4:3

> Editorial illustration of a circular process diagram with four large steps shown as connected sections: a notebook (planning), a network of people (organizing), a person speaking with a microphone (directing), and a dashboard chart (controlling). Each step in a different shade of orange (#ff7900 darker to lighter). Cream background. Modern flat geometric style, professional adult workplace aesthetic. No childish cartoon, no 3D, no text labels on the elements.

---

### 2.3 `hero-eco-b1-microeconomia.png`

**Archivo:** `programa-eco-bloque-1.html` (Microeconomía)
**Aspect ratio:** 4:3

> Editorial illustration of a young adult standing in front of two paths that fork: one path leads to a coffee shop, the other to a savings jar with coins. The person is mid-decision, holding a single coin between fingers. Cream background. Teal accents (#00a4b5) on the paths and the coin. Modern flat illustration, soft shadows, no detailed face. Communicates "to choose is to give up". Negative: no childish style, no Memphis cartoon, no text.

---

### 2.4 `hero-eco-b2-macroeconomia.png`

**Archivo:** `programa-eco-bloque-2.html` (Macroeconomía)
**Aspect ratio:** 4:3

> Editorial illustration of a Colombian urban skyline (recognizable Bogotá silhouette with cerros orientales in the background) seen behind a giant transparent dashboard with floating indicators: inflation %, interest rate %, exchange rate USD/COP and GDP growth arrow. Teal (#00a4b5) accents on the indicators. Cream sky. Flat editorial style, no detailed faces (no people visible). Communicates "country-level signals you must read".

---

### 2.5 `hero-eco-b3-modelacion.png`

**Archivo:** `programa-eco-bloque-3.html` (Modelación y analítica)
**Aspect ratio:** 4:3

> Editorial illustration of a person seen from over their shoulder, working on a laptop screen that shows a clean scatter plot and a trend line. Around the laptop, geometric data icons float: a magnifying glass, a clean filter funnel, a question mark, and a small flag (decision). Teal (#00a4b5) accent on the trend line. Cream background. Flat modern style, no detailed face. Communicates "data as a compass".

---

### 2.6 `hero-eco-b4-sostenibilidad.png`

**Archivo:** `programa-eco-bloque-4.html` (Desarrollo sostenible)
**Aspect ratio:** 4:3

> Editorial illustration of three interlocking circular elements representing economic (a coin), social (a group of people), and environmental (a leaf) dimensions, balanced on a horizontal line like a sturdy three-legged stool seen from front. Teal (#00a4b5) and a touch of UA institutional green (#003d28) on the leaf. Cream background. Flat geometric editorial style. Communicates "triple impact balance".

---

### 2.7 `hero-neg-b1-identificacion.png`

**Archivo:** `programa-neg-bloque-1.html` (Identificación de oportunidad)
**Aspect ratio:** 4:3

> Editorial illustration of a magnifying glass hovering over a stylized map of Colombia with subtle topography, highlighting three regions with different products coming out: a coffee bean, a flower, and a textile spool. Purple (#7223b7) accent on the magnifying glass frame and the highlighted regions. Cream background. Modern flat editorial style, no text labels on the map. Communicates "spotting opportunities in a territory".

---

### 2.8 `hero-neg-b2-documentacion.png`

**Archivo:** `programa-neg-bloque-2.html` (Documentación con fuentes oficiales)
**Aspect ratio:** 4:3

> Editorial illustration of three official-looking documents arranged in a fan layout, each labeled with a faint generic government seal (no real institution names). One has a small checkmark, another a small chart, another a small handshake icon. A pair of hands at the bottom organizes them. Purple (#7223b7) accents on the seals. Cream background. Flat editorial style, professional, no detailed faces. Communicates "triangulating evidence from official sources".

---

### 2.9 `hero-neg-b3-costos.png`

**Archivo:** `programa-neg-bloque-3.html` (Simulación de costos)
**Aspect ratio:** 4:3

> Editorial illustration of a shipping container with its side opened, revealing icons of cost components inside: a small calculator, a stamp, a truck, a plane and a percent sign. Above the container, a clean spreadsheet outline floats showing four cost rows summing up. Purple (#7223b7) on the container details. Cream background. Modern flat illustration style, no text labels. Communicates "all the costs of exporting before you start".

---

### 2.10 `hero-neg-b4-financiamiento.png`

**Archivo:** `programa-neg-bloque-4.html` (Financiamiento y cooperación)
**Aspect ratio:** 4:3

> Editorial illustration of a handshake centered, with two arms in professional sleeves (one with subtle Colombian regional pattern detail) shaking hands. Around them, coins and small icons of growth float: a sprouting plant, a graph going up, a small certification ribbon. Purple (#7223b7) on the ribbon and arrow. Cream background. Flat editorial style, no detailed faces, no real brand logos. Communicates "resources that turn opportunity into reality".

---

### 2.11 `hero-reto-biopack.png`

**Archivo:** `reto-eco-biopack.html` (Reto integrador Economía)
**Aspect ratio:** 4:3

> Editorial illustration of a biodegradable food container open and showing a gentle plant sprout growing from inside it. Around the container, three small circular icons orbit: a currency symbol (€/$), a leaf, and a globe. Cream background with subtle warm gradient. Teal (#00a4b5) and UA institutional green (#003d28) accents. Modern flat illustration style, no text. Communicates "an emerging Colombian company with a sustainable product preparing to go global".

---

## 3. Aha-box ilustraciones (cuadritos «Para entenderlo»)

**Ubicación:** dentro del componente `.module-aha-icon` (actualmente muestra emoji 💡).
**Aspect ratio:** **1:1 (256×256 px)**, contenido centrado.
**Importante:** estas son **pictogramas pequeños** (no escenas complejas). Se ven a ~44px en la página.

---

### 3.1 `aha-eco-b1-cuatro-horas.png`

**Donde se usa:** Eco Bloque 1, Tema 1 (introducción).
**Concepto:** elegir es renunciar.

> Minimal flat pictogram of a clock showing 4 hours, with four small symbols around it representing competing options: a book, a soccer ball, a bed, and a laptop. Each connected to the clock with a thin teal (#00a4b5) line. Cream background. Single illustration centered, square format. Simple, fast to read at small size.

---

### 3.2 `aha-eco-b1-netflix-domingo.png`

**Donde se usa:** Eco Bloque 1, Tema 3 (costo de oportunidad).
**Concepto:** maratón de Netflix dominical.

> Minimal flat pictogram of a person seen from behind in profile, slouched on a couch watching a TV screen with a play icon visible. A small clock above them showing 4 hours elapsed. Teal (#00a4b5) accent on the TV screen. Cream background. Square format, simple iconic illustration.

---

### 3.3 `aha-eco-b1-boleta-concierto.png`

**Donde se usa:** Eco Bloque 1, Tema 5 (oferta y demanda).
**Concepto:** boleta de concierto que se revende caro.

> Minimal flat pictogram of a concert ticket stub with stars and music notes around it. A small "SOLD OUT" stamp diagonally. Below, an upward price arrow. Teal (#00a4b5) accent on the ticket. Cream background. Iconic, fast to read.

---

### 3.4 `aha-eco-b2-almuerzo-fonda.png`

**Donde se usa:** Eco Bloque 2, Tema 2 (inflación).
**Concepto:** almuerzo de fonda que sube de precio.

> Minimal flat pictogram of a plate with traditional Colombian "almuerzo corriente" (rice, beans, plantain, meat) viewed from above. A small price tag floating next to it with an upward arrow. Teal (#00a4b5) accent on the price tag. Cream background. Iconic, square.

---

### 3.5 `aha-eco-b3-transmilenio.png`

**Donde se usa:** Eco Bloque 3, Tema 1 (modelación).
**Concepto:** mapa simplificado de TransMilenio.

> Minimal flat pictogram of a stylized subway-style map with 4-5 connected colored lines on a clean cream background. No text labels, just colored lines and round stops. Teal (#00a4b5) as the dominant line color, plus secondary lines in muted gray, green and yellow. Iconic, square format.

---

### 3.6 `aha-eco-b3-cucharada-sopa.png`

**Donde se usa:** Eco Bloque 3, Tema 2 (inferencia estadística).
**Concepto:** probar una cucharada de sopa.

> Minimal flat pictogram of a bowl of soup viewed from a slight three-quarter angle, with a spoon coming out of it holding a small amount. Subtle steam lines rising. Teal (#00a4b5) on the spoon. Cream background. Iconic, square, fast to read.

---

### 3.7 `aha-eco-b3-moneda-aire.png`

**Donde se usa:** Eco Bloque 3, Tema 3 (riesgo).
**Concepto:** moneda al aire.

> Minimal flat pictogram of a coin spinning mid-air, showing both sides simultaneously with motion lines. A 50/50 split visual hint below. Teal (#00a4b5) on the coin highlights. Cream background. Square iconic format.

---

### 3.8 `aha-eco-b3-netflix-algoritmo.png`

**Donde se usa:** Eco Bloque 3, Tema 5 (big data).
**Concepto:** Netflix recomendando series.

> Minimal flat pictogram of a generic streaming app screen on a tablet/laptop with 4 thumbnails in a row, one highlighted with a star indicating "recommended". No real brand identifiers. Teal (#00a4b5) accent on the highlighted thumbnail and the connecting lines from a data icon below. Cream background.

---

### 3.9 `aha-eco-b4-fabrica-rio.png`

**Donde se usa:** Eco Bloque 4, Tema 2 (externalidades).
**Concepto:** fábrica que contamina un río.

> Minimal flat pictogram of a small factory silhouette with a chimney emitting subtle smoke, and a winding river flowing past it. The river has a darker tint near the factory representing pollution. Teal (#00a4b5) on the river upstream, muted gray downstream. Cream background. Iconic, square.

---

### 3.10 `aha-eco-b4-botella-circular.png`

**Donde se usa:** Eco Bloque 4, Tema 3 (economía circular).
**Concepto:** ciclo de la botella de plástico.

> Minimal flat pictogram of a plastic bottle inside a circular arrow that loops back to the bottle, with three small icons along the loop: a person using the bottle, a recycle bin, a factory. Teal (#00a4b5) on the circular arrow. Cream background. Iconic, square.

---

### 3.11 `aha-admin-b1-panaderia.png`

**Donde se usa:** Admin Bloque 1, Tema 1 (introducción).
**Concepto:** panadería del barrio.

> Minimal flat pictogram of a small bakery storefront facade with a sign "PAN" (just those three letters), bread loaves visible in the window, and an awning above. A person silhouette inside behind the counter. Orange (#ff7900) accent on the awning and the bread highlights. Cream background. Iconic, square format.

---

### 3.12 `aha-admin-b1-contratacion.png`

**Donde se usa:** Admin Bloque 1, Tema 3 (recursos).
**Concepto:** contratar diseñadores mueve varios recursos.

> Minimal flat pictogram of two silhouetted figures shaking hands across a small table, with 5 small connected resource icons floating above them: a clock, a coin, a person, a chip and an info bubble. Orange (#ff7900) accents. Cream background. Iconic, square.

---

### 3.13 `aha-admin-b2-juan-valdez.png`

**Donde se usa:** Admin Bloque 2, Tema 1 (planeación).
**Concepto:** Juan Valdez misión/visión/valores/objetivos.

> Minimal flat pictogram of a coffee bag with a generic coffee plant logo on it (NO real Juan Valdez brand or logo), with four small icons orbiting it: a heart (mission), a star (vision), a shield (values), and a target (objectives). Orange (#ff7900) on the icons. Cream background. Iconic, square.

---

### 3.14 `aha-admin-b2-evolucion-estructura.png`

**Donde se usa:** Admin Bloque 2, Tema 4 (organización).
**Concepto:** la estructura evoluciona con la empresa.

> Minimal flat pictogram of three small org charts arranged horizontally with arrows between them, going from simple (one node with three below) to medium (divisional, with three regional groups) to complex (matrix grid). Orange (#ff7900) on the connection lines. Cream background. Iconic, square.

---

### 3.15 `aha-admin-b2-tablero-carro.png`

**Donde se usa:** Admin Bloque 2, Tema 6 (control / BSC).
**Concepto:** tablero del carro con 4 indicadores.

> Minimal flat pictogram of a car dashboard cluster viewed straight on, with four circular gauges: speedometer, fuel gauge, temperature, and odometer (km). Orange (#ff7900) accents on the needles and dial details. Cream background. Iconic, square.

---

## 4. Infografías (recursos recomendados dentro de los bloques)

**Ubicación:** componente `.module-resource`. Estas son **piezas educativas completas**, no íconos.
**Aspect ratio:** **16:9 (1600×900 px)** para máxima legibilidad.
**Texto:** sí permite texto (en español), pero conciso y legible. Tipografía sans serif moderna.

---

### 4.1 `infografia-eco-b1-precio-vs-costo.png`

**Donde se usa:** Eco Bloque 1, recurso del Tema 3.
**Concepto:** mapa visual «precio visible vs. costo económico» con 3 casos.

> Editorial infographic on a cream background showing three real-life decisions in three vertical columns: "Estudiar un posgrado", "Comprar carro" and "Aceptar un empleo". Each column has two horizontal bars: the upper bar in dark gray labeled "Precio visible" with a money amount, and the lower bar in teal (#00a4b5) labeled "Costo económico" with text about what is given up. Clear typography, modern editorial style. At the top, the title in dark green: "Lo que pagas vs. lo que dejas de ganar". Bottom right: small "Universidad de América" wordmark.

---

### 4.2 `infografia-eco-b2-canasta-familiar.png`

**Donde se usa:** Eco Bloque 2, recurso del Tema 2.
**Concepto:** evolución del precio de productos básicos 2010-2025.

> Editorial infographic showing a horizontal timeline at the top with three year markers: 2010, 2017, 2025. Below, four product icons (a rice grain, a milk carton, a transport bus token, and a smartphone signal icon for "datos móviles") each with three price tags showing the price evolution. The lines connecting prices ascend dramatically. Cream background, teal (#00a4b5) for the rising lines, dark green for the year labels. Title at top: "La canasta familiar en Colombia: 15 años de inflación". Editorial flat style.

---

### 4.3 `infografia-eco-b3-correlaciones-absurdas.png`

**Donde se usa:** Eco Bloque 3, recurso del Tema 4.
**Concepto:** galería de correlaciones que no implican causalidad.

> Editorial infographic on a cream background with three small humorous correlation charts arranged horizontally. Each chart has two ascending lines plotted together, labeled with absurd pairings: "Consumo de queso / Muertes por enredarse con las sábanas", "Películas con Nicolas Cage / Ahogamientos en piscinas", "Lanzamientos de cohetes / Doctorados en sociología". Title at top: "Correlación ≠ causalidad". Subtle teal (#00a4b5) on the lines. Editorial style with clean axes but no detailed numbers.

---

### 4.4 `infografia-admin-b1-mapa-recursos.png`

**Donde se usa:** Admin Bloque 1, recurso del Tema 3.
**Concepto:** plantilla descargable «mapa de los seis recursos».

> Editorial worksheet-style infographic on cream background. A central company icon in the middle. Six radial sections fan out, each with a labeled circle: Tiempo (clock), Talento (people), Capital (coin), Tecnología (chip), Información (info bubble), Reputación (shield). Each section has space for two short notes: "Qué tiene" and "Qué falta". Orange (#ff7900) accents on the icons. Title at top: "Los seis recursos de tu empresa: diagnóstico rápido". Has a feel of being a printable template.

---

### 4.5 `infografia-admin-b1-sintesis-bloque.png`

**Donde se usa:** Admin Bloque 1, recurso del Tema 6 (cierre).
**Concepto:** síntesis visual de los 6 temas del bloque en una página.

> Editorial summary poster on cream background, divided into six labeled sections in a clean 3×2 grid. Each section has a small icon and a 2-3 word headline: "Administrar = decidir bien", "3 conceptos: Admón / Organización / Gestión", "6 recursos por gestionar", "Taylor + Fayol + Mayo", "Diagnostica / Diseña / Decide / Movilizas", "Clasifica un problema real". Orange (#ff7900) accents throughout. Header at top: "Fundamentos de la administración · síntesis". Modern editorial flat style.

---

### 4.6 `infografia-admin-b2-planeacion-pagina.png`

**Donde se usa:** Admin Bloque 2, recurso del Tema 1.
**Concepto:** plantilla descargable de planeación en una página.

> Editorial template-style infographic on cream background, organized as four labeled blank rectangles in a 2×2 grid, each with a header and space for the user to write: "Misión · qué somos hoy", "Visión · qué queremos ser en 5 años", "Valores · qué no negociamos", "Objetivos · qué vamos a lograr este año". Orange (#ff7900) accents on the headers and dividers. Title at top: "Tu documento de planeación en una página". Subtle dashed lines indicate fillable areas.

---

### 4.7 `infografia-admin-b2-bsc-ejemplo.png`

**Donde se usa:** Admin Bloque 2, recurso del Tema 6.
**Concepto:** ejemplo de tablero Balanced Scorecard real.

> Editorial dashboard mockup on cream background showing a 2×2 grid of four panels: "Finanzas" (with a small bar chart trending up), "Clientes" (with a satisfaction percentage gauge), "Procesos" (with a quality indicator bar), "Aprendizaje" (with a small bar showing training hours). Each panel has 2-3 sample metric lines with numbers. Orange (#ff7900) accents on indicators, dark green headers. Title at top: "Cuadro de Mando Integral · vista mensual". Looks like a real BI dashboard.

---

### 4.8 `infografia-neg-b1-mapa-oportunidades.png`

**Donde se usa:** Negocios Bloque 1, recurso futuro.
**Concepto:** mapa de Colombia con vocación productiva por región.

> Editorial infographic of a stylized map of Colombia (simplified silhouette, no detailed political boundaries) with 5-6 region pins, each linked to an icon representing its export product: coffee bean (eje cafetero), flower (Antioquia), banana (Urabá), oil (Llanos), coal (Cesar), avocado (Quindío). Purple (#7223b7) accent on the pins. Cream background. Title at top: "Vocación productiva por región". Clean editorial style, no real political borders, no city names.

---

### 4.9 `infografia-neg-b3-incoterms-2020.png`

**Donde se usa:** Negocios Bloque 3, recurso futuro.
**Concepto:** diagrama de Incoterms en una página.

> Editorial diagram showing a horizontal supply chain: factory → port (origin) → ship → port (destination) → warehouse → customer. Above the chain, four colored bars span different segments: EXW (only the factory), FOB (factory to ship boarding), CIF (factory to destination port), DDP (factory to final customer). Each bar labeled with the Incoterm. Purple (#7223b7) accents. Cream background. Title at top: "Incoterms 2020 · quién paga qué hasta dónde". Clean editorial flat style.

---

### 4.10 `infografia-neg-b3-rutas-tarifas.png`

**Donde se usa:** Negocios Bloque 3, recurso del Tema 2.
**Concepto:** rutas y tarifas de transporte desde Colombia.

> Editorial map-style infographic showing Colombia in the bottom-left with three dashed routes extending to: USA (Miami), Europe (Rotterdam), Asia (Shanghai). Each route line has a small icon (plane, ship, plane) and a tag with sample transit time (3 days / 18 days / 28 days). Purple (#7223b7) on the routes. Cream background. Title at top: "Tres rutas, tres realidades". Editorial flat illustration style, simplified continents, no political detail.

---

### 4.11 `infografia-neg-b4-financiamiento-rutas.png`

**Donde se usa:** Negocios Bloque 4, recurso futuro.
**Concepto:** cuatro caminos para conseguir recursos.

> Editorial infographic on cream background showing four parallel paths (like swim lanes) from "Idea de negocio" on the left to "Mercado internacional" on the right. Each lane labeled: "Certificación social/ambiental", "Bancóldex", "E-commerce directo", "Cooperación internacional". Each lane has 2-3 small milestone markers along the way. Purple (#7223b7) accents on the milestones. Title at top: "Cuatro caminos para financiar la internacionalización". Modern editorial flat style.

---

## 5. Imágenes auxiliares y opcionales

### 5.1 `hero-landing-collage-eco.jpg`

**Donde se usa:** programa-economia.html (overview), zona del collage o como fondo decorativo opcional.
**Aspect ratio:** 16:9 horizontal, 1920×1080 px.

> Editorial wide composition: a young Colombian university student (mid-20s, casual professional attire) in a soft-focus cafe setting, looking at a laptop with charts visible. Bogotá-style mountains in the blurred background through a window. Warm cream and teal tones (#00a4b5 accents). Editorial photography style, soft natural light, no obvious AI artifacts.

---

### 5.2 `hero-landing-collage-admin.jpg`

**Donde se usa:** programa-administracion.html, mismo uso.
**Aspect ratio:** 16:9.

> Editorial wide composition: a Colombian business meeting in a modern office, three diverse professionals (mid-20s to 40s) standing around a glass table reviewing a printed plan with sticky notes. Warm orange (#ff7900) accents in the room (chairs, prints on the wall). Soft natural light, editorial photography style.

---

### 5.3 `hero-landing-collage-neg.jpg`

**Donde se usa:** programa-negocios.html, mismo uso.
**Aspect ratio:** 16:9.

> Editorial wide composition: a Colombian export warehouse interior with a young professional inspecting a wooden crate of coffee beans with a tablet in hand. Soft warm lighting from windows above. Purple (#7223b7) accents on small details (lanyard, tablet case). Editorial photography style, no real brand labels visible.

---

### 5.4 `aha-generic-bulb.png`

**Fallback genérico** para aha-boxes que aún no tienen ilustración específica.
**Aspect ratio:** 1:1, 256×256 px.

> Minimal flat pictogram of a stylized lightbulb with a small spark/glow. Cream background. UA institutional yellow (#ffd21a) for the bulb glow, dark green outline (#003d28). Iconic, square. Used as universal "aha moment" marker.

---

## 6. Recomendaciones de implementación

### Orden sugerido de generación

1. **Primero los heroes de bloque** (11 imágenes): es lo más visible, lo que rompe la monotonía del scroll inmediatamente.
2. **Luego las infografías de recursos recomendados** (10+ imágenes): son contenido pedagógico real.
3. **Por último las aha-box illustrations** (15 imágenes): son detalle, mejoran la experiencia pero el emoji 💡 funciona como fallback.

### Validación visual del lote

Antes de generar las 36+ imágenes, te recomiendo:

1. Generar **una imagen de prueba de cada categoría** (1 hero, 1 aha, 1 infografía) y validar el estilo.
2. Iterar el style guide si algo se desvía.
3. Solo después generar el lote completo en serie con el mismo prompt base.

### Tamaño en producción

- **Heroes:** comprimir a 1200×900 webp/jpg de calidad 80. Peso objetivo: <80 KB.
- **Aha-box:** 256×256 png con transparencia o jpg si el fondo es uniforme. Peso: <20 KB.
- **Infografías:** 1600×900 jpg calidad 85 o png si tienen texto crítico. Peso: <150 KB.

---

## 7. Tabla resumen rápido

| # | Archivo | Aspect | Donde se usa |
|---|---|---|---|
| 1 | hero-admin-b1-fundamentos.png | 4:3 | Admin Bloque 1 header |
| 2 | hero-admin-b2-proceso.png | 4:3 | Admin Bloque 2 header |
| 3 | hero-eco-b1-microeconomia.png | 4:3 | Eco Bloque 1 header |
| 4 | hero-eco-b2-macroeconomia.png | 4:3 | Eco Bloque 2 header |
| 5 | hero-eco-b3-modelacion.png | 4:3 | Eco Bloque 3 header |
| 6 | hero-eco-b4-sostenibilidad.png | 4:3 | Eco Bloque 4 header |
| 7 | hero-neg-b1-identificacion.png | 4:3 | Negocios Bloque 1 header |
| 8 | hero-neg-b2-documentacion.png | 4:3 | Negocios Bloque 2 header |
| 9 | hero-neg-b3-costos.png | 4:3 | Negocios Bloque 3 header |
| 10 | hero-neg-b4-financiamiento.png | 4:3 | Negocios Bloque 4 header |
| 11 | hero-reto-biopack.png | 4:3 | Reto BioPack header |
| 12 | aha-eco-b1-cuatro-horas.png | 1:1 | Eco B1 T1 aha-box |
| 13 | aha-eco-b1-netflix-domingo.png | 1:1 | Eco B1 T3 aha-box |
| 14 | aha-eco-b1-boleta-concierto.png | 1:1 | Eco B1 T5 aha-box |
| 15 | aha-eco-b2-almuerzo-fonda.png | 1:1 | Eco B2 T2 aha-box |
| 16 | aha-eco-b3-transmilenio.png | 1:1 | Eco B3 T1 aha-box |
| 17 | aha-eco-b3-cucharada-sopa.png | 1:1 | Eco B3 T2 aha-box |
| 18 | aha-eco-b3-moneda-aire.png | 1:1 | Eco B3 T3 aha-box |
| 19 | aha-eco-b3-netflix-algoritmo.png | 1:1 | Eco B3 T5 aha-box |
| 20 | aha-eco-b4-fabrica-rio.png | 1:1 | Eco B4 T2 aha-box |
| 21 | aha-eco-b4-botella-circular.png | 1:1 | Eco B4 T3 aha-box |
| 22 | aha-admin-b1-panaderia.png | 1:1 | Admin B1 T1 aha-box |
| 23 | aha-admin-b1-contratacion.png | 1:1 | Admin B1 T3 aha-box |
| 24 | aha-admin-b2-juan-valdez.png | 1:1 | Admin B2 T1 aha-box |
| 25 | aha-admin-b2-evolucion-estructura.png | 1:1 | Admin B2 T4 aha-box |
| 26 | aha-admin-b2-tablero-carro.png | 1:1 | Admin B2 T6 aha-box |
| 27 | infografia-eco-b1-precio-vs-costo.png | 16:9 | Eco B1 T3 recurso |
| 28 | infografia-eco-b2-canasta-familiar.png | 16:9 | Eco B2 T2 recurso |
| 29 | infografia-eco-b3-correlaciones-absurdas.png | 16:9 | Eco B3 T4 recurso |
| 30 | infografia-admin-b1-mapa-recursos.png | 16:9 | Admin B1 T3 recurso |
| 31 | infografia-admin-b1-sintesis-bloque.png | 16:9 | Admin B1 T6 recurso |
| 32 | infografia-admin-b2-planeacion-pagina.png | 16:9 | Admin B2 T1 recurso |
| 33 | infografia-admin-b2-bsc-ejemplo.png | 16:9 | Admin B2 T6 recurso |
| 34 | infografia-neg-b1-mapa-oportunidades.png | 16:9 | Negocios B1 recurso |
| 35 | infografia-neg-b3-incoterms-2020.png | 16:9 | Negocios B3 recurso |
| 36 | infografia-neg-b3-rutas-tarifas.png | 16:9 | Negocios B3 T2 recurso |
| 37 | infografia-neg-b4-financiamiento-rutas.png | 16:9 | Negocios B4 recurso |
| 38 | hero-landing-collage-eco.jpg | 16:9 | Programa Eco overview (opcional) |
| 39 | hero-landing-collage-admin.jpg | 16:9 | Programa Admin overview (opcional) |
| 40 | hero-landing-collage-neg.jpg | 16:9 | Programa Negocios overview (opcional) |
| 41 | aha-generic-bulb.png | 1:1 | Fallback genérico |

**Total: 41 imágenes.** Si querés acotar, los 11 heroes + 10 infografías ya generan un salto enorme en el feel del aplicativo. Los aha-boxes son refinamiento adicional.
