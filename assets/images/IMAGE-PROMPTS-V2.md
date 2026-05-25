# Catálogo de imágenes V2 — Aplicativo Ciencias Administrativas y Económicas

Versión revisada del style guide. **Objetivo:** producir imágenes **realistas y llamativas**, no flat editorial.
**Ruta de destino:** `assets/images/`.
**Convención de nombres:** los mismos del catálogo original + sufijo `-v2` antes de la extensión.
Ej.: `hero-eco-b1-microeconomia.png` → `hero-eco-b1-microeconomia-v2.png`.

---

## 1. Filosofía visual V2

El catálogo anterior usaba ilustración editorial flat (estilo Stripe/Notion). En V2 cambiamos a un sistema de **tres registros visuales** según el tipo de imagen:

| Tipo | Registro | Por qué |
|---|---|---|
| **Heroes de bloque** (4:3) | Fotografía editorial cinematográfica **o** render 3D hiperrealista (CGI tipo Apple/Behance), según el tema | Es la primera imagen que ve el estudiante al entrar al bloque. Realismo = inmersión inmediata |
| **Collages de programa** (16:9) | Fotografía editorial documental | Tono real, profesional, aspiracional. Mostrar gente real haciendo trabajo real |
| **Aha-boxes** (1:1, 256px) | Render 3D realista de objeto único (CGI pulido) o macro-fotografía de producto, sobre fondo limpio | Pequeños pero memorables, totalmente digitales y nítidos. Sin estilizaciones tipo clay/plasticine |
| **Infografías** (16:9) | Diagrama editorial moderno con tipografía cuidada y datos reales | La información manda; el estilo apoya pero no compite |

### Decisión clave por hero: foto o 3D

Para cada hero, elige el registro según el sujeto:

- **Foto editorial** cuando el tema es: personas trabajando, escenarios reales (oficina, bodega, mercado), territorio (Colombia, Bogotá), oficios concretos (panadero, exportador, agricultor)
- **Render 3D hiperrealista** cuando el tema es: conceptos abstractos (procesos, ciclos, indicadores, ecosistemas, decisiones), donde una foto sería difícil o cliché

### Paleta institucional (sin cambios)

| Token | HEX | Uso |
|---|---|---|
| UA verde institucional | `#003d28` | Color principal de marca |
| UA verde 700 | `#007442` | Acento institucional |
| UA amarillo | `#ffd21a` | Acento de atención |
| UA crema (paper) | `#fdf9ec` | Fondo neutro de imágenes |
| UA naranja | `#ff7900` | Programa de Administración |
| UA teal | `#00a4b5` | Programa de Economía |
| UA púrpura | `#7223b7` | Programa de Negocios Internacionales |
| Texto principal | `#0a1c16` | Texto sobre fondos claros |

### Lineamientos transversales V2

**Aplica a heroes y collages (fotografía):**
- Luz natural cinematográfica (golden hour suave o luz de ventana grande)
- Profundidad de campo poco profunda (sujeto enfocado, fondo desenfocado pero reconocible)
- Composición editorial: regla de tercios, espacio negativo, mirada/línea de tensión hacia el sujeto
- Colores cálidos y desaturados (estilo Apunto / Patagonia / Monocle magazine)
- Personas: adultos jóvenes y adultos diversos, ropa contemporánea (no trajes formales rígidos)
- Sin caras de stock genéricas; rostros expresivos, naturales
- Contexto colombiano cuando aplique: ojo a la arquitectura, vegetación, cordillera, café, flores

**Aplica a heroes 3D:**
- Render hiperrealista tipo C4D Redshift / Octane / Blender Cycles
- Materiales físicamente correctos (subsurface en orgánicos, metales con anisotropía, vidrios con dispersión, fibras textiles, granos de madera)
- Iluminación tres puntos suave, key principal cálida, soft shadows realistas
- Composición ¾ con punto de fuga bajo o isometría real
- Acento del programa (naranja/teal/púrpura) integrado en materiales, no como overlay
- Estilo de referencia: keynote de Apple, página de producto de Behance top, renders de Bertrand Benoit / Mir.no — NO clay, NO plasticine, NO toy-like

**Aplica a aha-boxes (CGI realista o macrofotografía):**
- Render 3D hiperrealista de un único objeto, materiales físicos correctos (cerámica de verdad, metal de verdad, madera de verdad, papel con fibras, vidrio con índice de refracción)
- O macrofotografía real del objeto, fondo cremoso uniforme, depth of field controlado
- Iluminación suave de estudio, sombra de contacto realista
- Un solo elemento dominante por icono, escala fuerte, lectura inmediata a 44px
- Color del programa como acento sutil en algún detalle del objeto (no como tinte general)
- Fondo crema (`#fdf9ec`), sin texturas decorativas
- Estilo de referencia: still life de The Easy Drinking Whisky Company / página de producto de Apple / fotografía editorial de IKEA. NO clay-render, NO plasticine, NO 3D estilizado

**Aplica a infografías:**
- Maquetación editorial limpia con grids visibles solo cuando ayudan
- Tipografía sans serif moderna (Inter, Söhne, GT America) en pesos 400/700
- Datos reales o realistas con fuentes implícitas
- Color del programa como destacado en datos clave
- Calidad de pieza diseñada por diseñador gráfico: composición cuidada, jerarquía clara, buen espaciado y acabados sobrios, sin sobredecorar
- Sí permite texto, conciso
- Sin logos, wordmarks, escudos ni marcas visibles de UAmerica, Universidad de América o cualquier institución

### 📐 Regla TRANSVERSAL — aspect ratio explícito en cada prompt

Cada prompt incluye **al final** una línea con la relación de aspecto correspondiente (4:3 / 1:1 / 16:9), descrita en lenguaje natural para que cualquier motor (Midjourney, DALL·E 3, Stable Diffusion, Flux) la respete. Si usas Midjourney, igual añade el flag explícito (`--ar 4:3`, `--ar 1:1`, `--ar 16:9`) al final del comando — el lenguaje natural sola **no garantiza** el ratio en MJ.

### 🇪🇸 Regla TRANSVERSAL e INVIOLABLE — todo el texto en ESPAÑOL

**Cualquier texto que aparezca dentro de una imagen generada DEBE estar en español de Colombia**, sin excepción. Esto aplica a:

- Títulos y subtítulos de infografías
- Etiquetas de ejes, valores, leyendas, badges, sellos
- Texto visible en pantallas (laptops, tablets, dashboards)
- Anotaciones manuscritas, sellos de fechas, marcas de agua
- Cualquier rótulo en mapas, diagramas, plantillas

**En cada prompt, incluye explícitamente la frase:**
> *"All visible text in Spanish (Colombia). No English words in any visible text inside the image."*

**En los negative prompts, añade siempre:**
> *"no English text, no English labels, no foreign-language signage"*

Si un prompt menciona texto específico (ej.: el título de una infografía), siempre escríbelo en español tal cual debe aparecer.

### Negative prompts comunes V2

```
no flat illustration, no Corporate Memphis, no childish cartoon,
no clay render, no plasticine, no toy-like 3D, no Pixar style,
no oversaturated colors, no neon, no AI-typical artifacts (extra fingers,
warped text, glitchy hands), no stock photo cliché (forced smiles,
random handshakes), no white pure background, no text watermarks,
no real brand logos visible, no political symbols, no pixelation,
no low-effort blur, no plastic skin, no uncanny faces, no stylized illustration,
no English text, no English labels, no foreign-language signage,
no Lorem Ipsum, no placeholder text
```

### Convención de nombres V2

`{tipo}-{programa}-{tema}-{descriptor}-v2.{ext}`

Ej.: `hero-eco-b1-microeconomia-v2.png`, `aha-admin-b1-panaderia-v2.png`.

---

## 2. Heroes de bloque (banner lateral derecho del header)

**Aspect ratio:** 4:3 (1600×1200 px para retina, downsample a 1200×900).
**Formato:** PNG sin transparencia (fondo presente) o JPG calidad 92.

---

### 2.1 `hero-admin-b1-fundamentos-v2.png`

**Registro:** **Fotografía editorial cinematográfica.**
**Archivo destino:** `programa-admin-bloque-1.html`

> Cinematic editorial photograph of a small Colombian neighborhood bakery interior, shot from a low ¾ angle, golden hour light spilling through a large front window. In the foreground, slightly out of focus, a tray of freshly baked pan de yuca and croissants on a wooden counter. In the mid-ground, sharp focus on a young Colombian woman in her late 20s, wearing a clean apron over a casual shirt, mid-action handing a bag to an unseen customer. Background blurred: shelves with bread, chalkboard with prices (illegible). Warm honey lighting, shallow depth of field at f/2.0, 35mm lens look. Color grading: warm tones with a subtle orange (#ff7900) glow from window light. Real, intimate, aspirational. Photorealistic editorial style, like a feature in Monocle or Cereal magazine.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no stock photo smile, no fake exaggerated bakery cliché, no plastic faces, no text on signage, no real brand logos, no flat illustration.

---

### 2.2 `hero-admin-b2-proceso-v2.png`

**Registro:** **Render 3D hiperrealista** (concepto abstracto).
**Archivo destino:** `programa-admin-bloque-2.html`

> Hyperrealistic 3D CGI render of four real-world objects arranged in a clean circular composition on a warm cream surface, shot ¾ from slightly above. Object 1: a Moleskine-style hardcover notebook open, with a real graphite pencil resting on the page (planning). Object 2: three small brushed-aluminum sphere markers linked by tensioned dark metallic wire (organizing). Object 3: a leather agenda open to a page with handwritten meeting notes in Spanish (a few visible bullet points like "equipo, prioridades, decisiones"), a fountain pen resting beside it (directing). Object 4: a minimalist analog gauge dial in brushed steel with a black face and an orange (#ff7900) needle in the green zone (controlling). Real materials: real leather, real graphite, real anodized aluminum, real fountain-pen lacquer, real glass. Studio lighting: key light warm from upper-left, soft fill from right, gentle rim light. Cream backdrop (#fdf9ec) with subtle paper grain. Shallow depth of field at f/4. Style reference: Apple product page CGI, Behance editorial top renders, Bertrand Benoit physical materials.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy-like 3D, no flat illustration, no cartoon, no logos, no text on objects in English.

---

### 2.3 `hero-eco-b1-microeconomia-v2.png`

**Registro:** **Fotografía editorial conceptual.**
**Archivo destino:** `programa-eco-bloque-1.html`

> Cinematic editorial photograph, slightly elevated shot, of an open palm holding a single 1000 COP Colombian coin perfectly centered, with two soft-focus blurred path lines forking diagonally outward into the background. Down the left blur: warm tones suggesting a coffee shop interior. Down the right blur: cool tones suggesting a clean savings jar with coins. The hand is from a young Colombian adult in their mid-20s, casual professional sleeve visible. Lighting: warm soft natural light from a window, cinematic shallow depth of field at f/1.8. The coin glints with a subtle teal (#00a4b5) cast in its highlight. Mood: introspective, decisive. Photographic editorial style. The frame communicates "every choice is a trade-off."
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no stock cliché, no fake coin types, no political imagery, no faces, no text watermarks, no flat illustration.

---

### 2.4 `hero-eco-b2-macroeconomia-v2.png`

**Registro:** **Fotografía editorial + render 3D híbrido.**
**Archivo destino:** `programa-eco-bloque-2.html`

> Hybrid editorial composition: in the background, a real photographic plate of Bogotá's skyline at dusk seen from a high-rise window, cerros orientales silhouetted, warm city lights starting to glow. Layered in front, a hyperrealistic 3D translucent glass dashboard panel floating in space, with four softly glowing data tiles: INFLACIÓN (with a subtle upward arrow), TASA (a percent symbol), USD/COP (a currency cross icon), PIB (a green growth arrow). Each tile has a thin teal (#00a4b5) outline and a warm cream glow. The glass has realistic subtle reflections of the Bogotá lights behind it. Shot with shallow depth of field — dashboard sharp, skyline soft. Mood: serious, informed, decision-making. Editorial photography aesthetic with high-end 3D overlay.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no fake numbers that look generated, no real bank logos, no AI text glitches, no cartoon, no flat illustration.

---

### 2.5 `hero-eco-b3-modelacion-v2.png`

**Registro:** **Render 3D hiperrealista**.
**Archivo destino:** `programa-eco-bloque-3.html`

> Hyperrealistic 3D render, ¾ isometric view from above, of a sleek modern wooden desk surface. Centered: a thin-profile open laptop with a perfectly rendered screen showing a clean scatter plot in dark green (#003d28) dots and a teal (#00a4b5) trend line cutting through them — the chart looks like a real Plotly export. Around the laptop, slightly floating with subtle shadows: a brass magnifying glass tilted at an angle, a small minimalist funnel filter (matte ceramic), a question-mark-shaped paperweight in clear glass with internal refraction, and a tiny flag pin in teal felt. All objects with physically accurate materials, soft studio lighting from the upper left, warm cream backdrop with subtle paper texture. Depth of field f/3.5. Style reference: Apple product photography meets a designer's still life.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no fake glitchy chart, no AI artifacts, no logos, no text labels other than the chart, no flat illustration.

---

### 2.6 `hero-eco-b4-sostenibilidad-v2.png`

**Registro:** **Render 3D hiperrealista** (concepto orgánico).
**Archivo destino:** `programa-eco-bloque-4.html`

> Hyperrealistic 3D CGI render of three interlocking sculptural rings balanced on a clean walnut wooden surface, ¾ angle, soft natural light from the upper right. Each ring represents a sustainability pillar: ring 1 (economic) — brushed brass with a small embedded coin detail and visible micro-scratches; ring 2 (social) — polished concrete with three small human silhouettes carved as bas-relief; ring 3 (environmental) — clear cast glass with a real photographic-quality fresh leaf encapsulated inside (botanical inclusion in resin). The three rings interlock at their bases like a Borromean knot sculpture, perfectly balanced. Subtle teal (#00a4b5) backlight glow through the glass ring and UA institutional green (#003d28) visible in the leaf's veins. Cream backdrop, shallow depth of field f/2.8. Style reference: Apple WWDC product reveal, Mir.no architectural renders, real museum-grade product photography.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no clay render, no plasticine, no plastic toy aesthetic, no flat illustration, no cartoon, no AI artifacts, no logos.

---

### 2.7 `hero-neg-b1-identificacion-v2.png`

**Registro:** **Fotografía editorial.**
**Archivo destino:** `programa-neg-bloque-1.html`

> Cinematic editorial photograph, top-down ¾ angle, of a hand-drawn Colombian map sketched on a creamy paper notebook placed on a wooden desk. The map is simplified but recognizable (a stylized silhouette of Colombia in soft pencil), with three regions marked with small handcrafted markers: a coffee bean placed on the eje cafetero region, a dried flower stem on Antioquia, and a small textile thread spool on the Caribbean. A brass magnifying glass held by an out-of-focus hand hovers above the map, casting a subtle shadow. Warm window light from the upper left, shallow depth of field. The magnifying glass rim has a subtle purple (#7223b7) anodized accent. Mood: discovery, curiosity, planning. Photographic editorial style, real objects, no digital effects.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no political borders visible, no city name labels readable, no stock cliché, no AI text artifacts, no flat illustration.

---

### 2.8 `hero-neg-b2-documentacion-v2.png`

**Registro:** **Render 3D hiperrealista**.
**Archivo destino:** `programa-neg-bloque-2.html`

> Hyperrealistic 3D render of three textured paper documents arranged in a fan layout on a wooden desk surface, ¾ angle from above. Each document has a slightly different paper grain and color tint (warm white, pale cream, light beige). Document 1: has a subtle embossed generic seal pattern (no real institution name) and a small checkmark indent. Document 2: has a clean line chart embossed at the top. Document 3: has a handshake icon faintly embossed. A pair of out-of-focus realistic hands at the bottom edge of the frame organizes them. Subtle purple (#7223b7) on the seal embossing. Warm natural window light, shallow depth of field, paper fibers and folds clearly visible. Style reference: photographic still life meets Apple Pages marketing render.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no readable text, no real institution names, no logos, no AI text glitches, no flat illustration.

---

### 2.9 `hero-neg-b3-costos-v2.png`

**Registro:** **Render 3D hiperrealista**.
**Archivo destino:** `programa-neg-bloque-3.html`

> Hyperrealistic 3D render, ¾ isometric view, of a small open shipping container made of weathered teal-painted steel (with subtle purple #7223b7 accent stripes), revealing inside a curated set of objects representing export costs: a vintage brass calculator with visible buttons, a small rubber stamp, a miniature cargo truck (matte enamel), a tiny plane silhouette in brushed metal, and a small embossed metallic percent sign (%). Above the container, a clean translucent glass tablet floats showing four cost rows summing up — the numbers should look like real spreadsheet data rendered in Inter font, with teal totals at the bottom. Shadows from each object grounded. Warm studio lighting, cream backdrop, depth of field f/3.5. Style reference: Behance editorial product render.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> **Negative:** no toy plastic look, no logos, no real brand names, no AI text glitches, no flat illustration.

---

### 2.10 `hero-neg-b4-financiamiento-v2.png`

**Registro:** **Fotografía editorial.**
**Archivo destino:** `programa-neg-bloque-4.html`

> Cinematic editorial photograph of two professional adults shaking hands across a wooden desk in a modern office, shot from a low ¾ angle. Visible only from chest down — both wear contemporary professional attire, one with a slight Colombian regional textile pattern detail in the lapel (subtle, not costume-like). On the desk between them: a half-open folder with neat documents, a fountain pen, a small potted plant sprouting fresh leaves (representing growth), and a single coin standing upright on its edge. Soft warm window light from the right, shallow depth of field on the handshake. A barely visible purple (#7223b7) thread visible in one of the professionals' lapel. Mood: trust, growth, deal closing. Editorial photography style.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no fake corporate smile, no logos, no AI hands with extra fingers, no overlit shots, no flat illustration.

---

### 2.11 `hero-reto-biopack-v2.png`

**Registro:** **Render 3D hiperrealista** con elemento orgánico.
**Archivo destino:** `reto-eco-biopack.html`

> Hyperrealistic 3D render of an open biodegradable food container (made of pressed sugarcane bagasse fiber with visible natural texture and warm beige tones) placed on a wooden surface. From inside the container, a fresh real plant sprout emerges (real photographic-quality leaves with veins and slight translucency in the light). Around the container, three small translucent glass spheres float at slightly different heights, each containing a tiny embedded symbol: sphere 1 has a small currency mark, sphere 2 has a single leaf, sphere 3 has a tiny stylized globe. Soft warm sunset light from the upper left, shallow depth of field. Teal (#00a4b5) and UA institutional green (#003d28) accents on the sphere highlights and the sprout's chlorophyll. Mood: emerging, hopeful, sustainable. Style reference: Apple ad photography meets a botanical magazine.
>
> Composition explicitly in 4:3 horizontal aspect ratio.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no plastic packaging, no logos, no fake-looking 3D plant, no cartoon, no flat illustration, no AI glitches.

---

## 3. Aha-box · CGI realista o macrofotografía

**Ubicación:** componente `.module-aha-icon` (a 44px en producción).
**Aspect ratio:** 1:1 (512×512 px para retina, ~44px en pantalla).
**Estilo nuevo:** **render 3D hiperrealista** de un único objeto **o** macrofotografía real del objeto, con materiales físicamente correctos y luz de estudio. Sin estilización clay/plasticine/toy. Un solo elemento dominante, escala fuerte, lectura inmediata a 44px.

---

### 3.1 `aha-eco-b1-cuatro-horas-v2.png`

**Concepto:** elegir es renunciar (4 horas, 4 opciones).

> Hyperrealistic macrophotograph of a classic round white-faced wall clock with thin black hands pointing at 4:00, photographed from a ¾ angle on a warm cream background. Around the clock at slight focus offset, four real objects: a hardcover book with visible paper edges, a worn leather soccer ball with stitching, a soft linen pillow with a subtle fold, and a thin closed laptop in brushed aluminum. Studio lighting with a soft key from upper left, real contact shadows. Subtle teal (#00a4b5) tint visible only on the clock's second hand. Shallow depth of field at f/3.5, sharp on the clock. Style reference: editorial product photography for Kinfolk magazine.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy-like 3D, no childish cartoon, no flat icon, no logos, no text.

---

### 3.2 `aha-eco-b1-netflix-domingo-v2.png`

**Concepto:** maratón de streaming dominical.

> Hyperrealistic 3D CGI render, ¾ angle, of a modern thin-bezel flat-screen TV on a real wooden floor with subtle grain. The screen shows a realistic generic streaming home interface: a dark cinematic background, several small movie/series thumbnail rows, one selected title card with a subtle teal (#00a4b5) focus outline, no brand marks and no play-button symbol on the screen. In front of the TV, a real-looking upholstered fabric couch in warm gray with visible weave. A small analog wall clock in the background shows 4:00. Soft natural light from a side window casting realistic shadows. Cream backdrop. Real materials: real fabric, real wood, real glass screen with subtle reflections. Depth of field f/3.5. Style: premium home entertainment product photography, realistic and believable.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy 3D, no Netflix logo, no streaming brand identifiers, no play button icon, no triangle play symbol, no flat icon.

---

### 3.3 `aha-eco-b1-boleta-concierto-v2.png`

**Concepto:** boleta de concierto cara.

> Hyperrealistic macrophotograph of a single concert ticket stub on a warm cream surface, shot from a slight ¾ angle. The ticket has real paper texture (visible fibers), a small perforated tear-off edge, an embossed generic music note motif, and three small star embellishments printed in ink. A clear "AGOTADO" rubber-stamp impression in teal (#00a4b5) ink across the ticket, slightly diagonal and partially worn. Real contact shadow under the ticket. Studio lighting, depth of field f/4. Style: macro product photography editorial.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy 3D, no real venue names, no logos, no flat illustration.

---

### 3.4 `aha-eco-b2-almuerzo-fonda-v2.png`

**Concepto:** almuerzo de fonda que sube de precio.

> Hyperrealistic top-down food photograph of a traditional Colombian "almuerzo corriente" on a simple white ceramic plate: a mound of white rice, red beans with broth, a fried plantain slice with golden caramelization, a small piece of carne asada with grill marks. Real food textures, real steam wisps barely visible. On the cream tablecloth next to the plate, a small printed paper price tag with a clear teal (#00a4b5) upward arrow stamped beside it. Soft warm window light, real contact shadows. Style: editorial food photography for Bon Appétit.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no plasticine food, no childish cartoon, no flat illustration, no real restaurant logos.

---

### 3.5 `aha-eco-b3-transmilenio-v2.png`

**Concepto:** mapa realista de rutas tipo TransMilenio.

> Hyperrealistic photograph of a folded printed Bogotá BRT transit map inspired by a real TransMilenio route map, laid on a wooden tabletop and viewed from a low ¾ angle, soft natural light. The printed map should feel like a real commuter map: dense route corridors, multiple intersecting trunk lines, station dots, transfer nodes, thin street-grid context and small Spanish station labels that look printed but are not the focus. Use realistic transit-map colors led by deep red route corridors with teal (#00a4b5) accents for highlighted transfers; no official logos, no brand marks, no institutional seals. Visible fold creases on the real paper, subtle shadows, real paper texture, slight grain. Style: macro photography of a real urban mobility map, not minimalistic.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no official TransMilenio logo, no city government logos, no institutional seals, no flat illustration, no minimal metro icon style, no childish cartoon.

---

### 3.6 `aha-eco-b3-cucharada-sopa-v2.png`

**Concepto:** probar una muestra (cucharada de sopa).

> Hyperrealistic editorial food photograph, ¾ side angle, of a real rustic stoneware bowl filled with warm soup (visible surface ripples, real steam wisps captured against the light). A wooden spoon dips into the bowl, lifting a small amount of broth that catches the light. Soft warm side light from the left, real contact shadow. The spoon's handle has a subtle painted teal (#00a4b5) band as a single accent detail. Cream backdrop with subtle natural texture. Depth of field f/2.8. Style: macro food editorial photography for Cereal magazine.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy 3D, no cartoon steam, no flat illustration, no childish style.

---

### 3.7 `aha-eco-b3-moneda-aire-v2.png`

**Concepto:** moneda al aire (riesgo 50/50).

> Hyperrealistic high-speed macrophotograph of a generic brass coin frozen mid-spin in the air against a warm cream background, both faces partially visible at an angle that suggests rotation. Real metallic specular highlights on the milled edge. A subtle teal (#00a4b5) anodized accent stripe on the milled rim. A soft motion-blur arc trails one edge, indicating spin. Real cast shadow on the cream surface below. Studio lighting frozen at 1/8000s effect. Style: scientific high-speed product photography.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no real currency identifiers, no flat illustration, no glitchy 3D.

---

### 3.8 `aha-eco-b3-netflix-algoritmo-v2.png`

**Concepto:** algoritmo de recomendación.

> Hyperrealistic CGI render of a modern generic thin tablet, no logos, lying flat on a cream surface at ¾ angle. The screen shows a realistic recommendation interface for streaming content: several rows of photographic thumbnail cards, a "Recomendado para ti" row in Spanish, one selected thumbnail highlighted with a subtle teal (#00a4b5) focus outline, and a small clean percentage-match badge. The interface should look like a believable product UI, not a mockup icon set; no real streaming logos, no official brand colors, no play-button overlays. Real glass screen reflection, real aluminum chassis, subtle contact shadow. Studio lighting from upper-left. Style: premium tablet product photography with a realistic app interface.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no real streaming brand logos, no Netflix-style branding, no play button icons, no flat illustration, no AI text glitches.

---

### 3.9 `aha-eco-b4-fabrica-rio-v2.png`

**Concepto:** externalidad (fábrica contamina río).

> Hyperrealistic CGI render, ¾ aerial angle, of a small industrial brick factory with a single tall chimney emitting a thin volumetric smoke plume against a soft cream sky. A real-looking winding river of water flows past the factory: upstream the water is clear with subtle teal (#00a4b5) reflections, downstream it transitions to murky muted gray-brown near the factory outlet. Real materials: weathered brick, real metal chimney, real water with refraction and ripples. Realistic ground plane with grass tufts. Soft natural light from above-left, realistic shadows. Style: photoreal architectural render.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no toy factory, no cartoon, no fake-looking pollution effects, no flat illustration.

---

### 3.10 `aha-eco-b4-botella-circular-v2.png`

**Concepto:** economía circular (botella reciclada).

> Hyperrealistic CGI render of a single transparent PET plastic bottle centered (clear bottle with subtle blue refractions and real glass-like light caustics), with a glossy teal (#00a4b5) ribbon-arrow looping around it in a 3D orbit at slight ¾ tilt. Along the orbit, three real-material miniatures at different positions: a tiny silhouetted figure rendered in matte black metal, a small open recycling bin in galvanized steel, a tiny factory in red brick with a chimney. All materials physically accurate. Cream backdrop, real contact shadows. Studio lighting. Style: Behance editorial 3D product render.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy 3D, no flat illustration, no cartoon style, no logos.

---

### 3.11 `aha-admin-b1-panaderia-v2.png`

**Concepto:** panadería del barrio.

> Hyperrealistic photograph of a small Colombian neighborhood bakery storefront facade, ¾ front angle. Real painted cream walls with weathering and life signs. A real display window showing actual fresh bread loaves and pan de yuca inside. Above the door, a fabric awning in orange (#ff7900) with subtle texture. A clean modern sign reading "PAN" in Inter Bold above the entrance. A small concrete step at the door. Warm late-afternoon sunlight from the upper left, real shadows. Style: street documentary photography for AD magazine.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no real bakery brand names, no flat illustration, no childish cartoon.

---

### 3.12 `aha-admin-b1-contratacion-v2.png`

**Concepto:** contratar mueve varios recursos.

> Hyperrealistic editorial photograph, ¾ angle, of two professionals' arms in shirt-sleeve attire reaching across a clean wooden desk to shake hands (only hands and forearms visible, no faces). Real skin, real fabric, real wood texture. Floating in a soft arc above the handshake, five real miniature objects rendered as a separate CGI layer overlaid with realistic shadows on the desk: a small analog clock, a brass coin, a tiny brushed-metal figurine, a black microchip, and a small folded note. Each connected to the next by a thin orange (#ff7900) glossy thread suspended in midair. Soft cream backdrop, depth of field f/3.5. Style: editorial photography + product CGI hybrid.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no cartoon hands, no AI extra fingers, no real corporate logos, no flat illustration.

---

### 3.13 `aha-admin-b2-juan-valdez-v2.png`

**Concepto:** misión/visión/valores/objetivos en marca de café.

> Hyperrealistic editorial photograph, ¾ angle, of a small jute burlap coffee sack centered on a clean wooden surface. The sack has real woven texture, visible fibers, and a small generic coffee plant sigil embroidered (no real brand). Around the sack at slight elevation, four real-material objects: a small ceramic heart in matte red, a small enameled star in cream, an aged metal shield with an orange (#ff7900) anodized accent, and a target ring stack in brushed brass. Each object casts real contact shadow. Soft warm window light, depth of field f/3.5. Style: editorial product photography.
>
> Composition explicitly in 1:1 square aspect ratio.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no Juan Valdez logo or real coffee brand, no flat illustration, no cartoon.

---

### 3.14 `aha-admin-b2-evolucion-estructura-v2.png`

**Concepto:** estructura organizativa evoluciona.

> Hyperrealistic CGI render, ¾ angle, of three small physical sculptures lined up on a clean wood surface, each representing an org structure. Sculpture 1: simple — one polished steel sphere on top, three smaller satellite spheres below connected by thin steel rods. Sculpture 2: medium — central sphere, three regional clusters of three spheres each fanning out, connected by clean wires. Sculpture 3: complex — a small 3×3 matrix grid of spheres interconnected with multiple wires forming a network. All spheres in brushed stainless steel with real specular highlights, connectors in glossy orange (#ff7900) enameled metal. Two thin etched arrows on the wood between the sculptures indicating evolution. Soft studio lighting, real shadows. Style: museum installation photography.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no clay render, no plasticine, no toy 3D, no flat illustration, no cartoon, no text labels on nodes.

---

### 3.15 `aha-admin-b2-tablero-carro-v2.png`

**Concepto:** tablero (Balanced Scorecard como tablero de carro).

> Hyperrealistic CGI render, head-on view, of a real automotive dashboard cluster with four circular analog gauges in a 2×2 grid. Each gauge has a deep black face with white painted tick markings (no readable digits) and a sharp orange (#ff7900) needle. Gauge 1: speedometer. Gauge 2: fuel level. Gauge 3: temperature. Gauge 4: tachometer. Real materials: glass over each dial with subtle reflections, brushed aluminum bezel rings, black plastic housing with leather stitching. Backlit subtle glow behind the dials. Cream backdrop, real contact shadows. Style: automotive interior product photography.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no clay render, no toy 3D, no real car brand identifiers, no flat illustration, no AI text glitches, no readable digits.

---

## 4. Infografías (recursos recomendados)

**Aspect ratio:** 16:9 (1920×1080 px).
**Formato:** JPG calidad 88 o PNG si el texto debe ser crítico.
**Cambio respecto a V1:** misma legibilidad informativa, pero con **calidad editorial de diseñador gráfico**, jerarquía tipográfica precisa, datos visualmente claros, paleta sobria y elementos 3D sutiles solo donde aporten (no obligatorio).
**Regla de marca:** ninguna infografía debe incluir logos, wordmarks, escudos, firmas institucionales ni menciones visuales a UAmerica, Universidad de América u otras marcas.

---

### 4.1 `infografia-eco-b1-precio-vs-costo-v2.png`

**Concepto:** «Precio visible vs. costo económico» con 3 casos.

> Modern editorial infographic on a warm cream background (#fdf9ec) with a clean asymmetric grid. Three vertical columns, each titled with a bold Inter font header: "Estudiar un posgrado", "Comprar carro", "Aceptar un empleo". Under each title, two horizontal stacked bar visualizations: the upper bar in dark slate gray labeled "Precio visible" with a real monetary amount in COP (e.g., "$45.000.000", "$80.000.000", "$0"). The lower bar in solid teal (#00a4b5) labeled "Costo económico", with a short text describing what is given up (e.g., "2 años de salario + tiempo en familia"). Above the columns, a bold title: "Lo que pagas vs. lo que dejas de ganar". Subtle dotted grid lines, professional graphic-design layout with clear hierarchy, restrained spacing and polished editorial finish. Style reference: New York Times graphics meets Apple keynote slide. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no childish style, no neon colors, no AI text artifacts, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.2 `infografia-eco-b2-canasta-familiar-v2.png`

**Concepto:** evolución de precios 2010-2025.

> Modern editorial infographic, cream background. Bold title at top: "La canasta familiar en Colombia · 15 años después". Horizontal timeline at the upper section with three milestone markers: 2010, 2017, 2025 (the 2025 marker slightly highlighted). Below, four product rows (each ~16% height), each showing: left side a small hyperrealistic 3D-rendered icon (real materials, CGI) of the product (a grain of rice, a small milk carton, a transport bus token, a Wi-Fi/data signal icon); to the right of each icon, three price tags stretching horizontally across the years with thin teal (#00a4b5) connecting lines that visibly ascend. Real-looking COP amounts (no fake numbers). Faint dotted grid behind. Subtle dark green for year markers. Inter font, professional editorial style with designer-grade spacing and hierarchy. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no clichéd inflation imagery, no AI artifacts, no childish style, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.3 `infografia-eco-b3-correlaciones-absurdas-v2.png`

**Concepto:** correlación no implica causalidad con ejemplos serios y pedagógicos.

> Modern editorial infographic on cream background. Bold title at top: "Correlación ≠ causalidad". Below the title, three small line-chart panels arranged horizontally, each with two data lines plotted on the same axes and moving together, while the label makes clear that a third factor or context can explain the pattern. Panel 1: "Ventas de sombrillas vs. tráfico vehicular" with a small note "Factor común: lluvia". Panel 2: "Búsquedas de aire acondicionado vs. consumo eléctrico" with a small note "Factor común: temperatura". Panel 3: "Matrículas universitarias vs. ventas de computadores" with a small note "Factor común: inicio de semestre". Lines in teal (#00a4b5) and a contrasting muted ochre. Clean axes, small realistic tick marks, no fake precision. A small subtitle at the bottom: "Dos curvas que se mueven juntas no prueban causa y efecto". Style: The Pudding meets Pitch Interactive, professional graphic-design finish, clear and pedagogical. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no joke memes, no celebrity examples, no childish illustrations, no AI artifacts, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.4 `infografia-admin-b1-mapa-recursos-v2.png`

**Concepto:** plantilla descargable de los 6 recursos.

> Modern editorial worksheet-style infographic on cream background. Bold title at top: "Los seis recursos de tu empresa · diagnóstico rápido". Centered: a small hyperrealistic 3D-rendered factory/office icon (CGI with real materials). Six radial spokes extend out in a hexagonal pattern, each ending in a small labeled circle with a tiny hyperrealistic 3D icon (CGI, real materials): Tiempo (clock), Talento (small group silhouette), Capital (coin stack), Tecnología (chip square), Información (a paper sheet), Reputación (small shield). Beside each circle, two short dotted-line fields for the user to write: "Qué tienes:" and "Qué falta:". Orange (#ff7900) accents on the icons and dotted lines. Professional editorial template aesthetic, looks printable, restrained and well spaced. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no cartoon, no flat illustration, no AI text glitches, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.5 `infografia-admin-b1-sintesis-bloque-v2.png`

**Concepto:** síntesis visual de los 6 temas del bloque.

> Modern editorial summary poster on cream background. Bold title at top: "Fundamentos de la administración · síntesis del bloque". Below, a clean 3×2 grid of six panels with thin orange (#ff7900) dividers. Each panel contains: a small hyperrealistic 3D-rendered icon (real materials) centered above a 2-3 word headline in Inter Bold and a one-sentence subhead in Inter Regular. Headlines: "Administrar = decidir bien", "Tres conceptos clave", "Seis recursos", "Taylor + Fayol + Mayo", "Diagnostica, diseña, decide", "Clasifica un problema real". Professional magazine spread aesthetic with clear hierarchy and restrained visual finish. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no childish design, no AI text artifacts, no inconsistent typography, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.6 `infografia-admin-b2-planeacion-pagina-v2.png`

**Concepto:** plantilla descargable de planeación en una página.

> Modern editorial template infographic on cream background. Bold title at top: "Tu plan estratégico en una página". Below, a 2×2 grid of four large rectangular fields with thin orange (#ff7900) borders and headers in Inter Bold: "Misión · qué somos hoy", "Visión · qué queremos ser en 5 años", "Valores · qué no negociamos", "Objetivos · qué vamos a lograr este año". Inside each field, three to four subtle dotted underlines indicating fillable lines. The grid has a slight subtle background texture suggesting paper. A small footer note: "Imprime, llena y revisa cada trimestre". Professional printable template look, clean and understated. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no childish design, no flat illustration, no AI text glitches, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.7 `infografia-admin-b2-bsc-ejemplo-v2.png`

**Concepto:** ejemplo de tablero Balanced Scorecard.

> Modern editorial dashboard mockup on cream background. Title at top: "Cuadro de Mando Integral · ejemplo mensual". Below, a 2×2 grid of four panels with thin dividers. Each panel has a bold header and a small data visualization: 1) "Finanzas" — a small line chart trending up with a sample monthly value. 2) "Clientes" — a circular progress gauge showing 87% satisfaction. 3) "Procesos" — three horizontal quality bars at different fill levels. 4) "Aprendizaje" — a small bar chart of training hours per month. Subtle 3D rendering on the gauge dial (real brushed metal and glass) to give depth. Orange (#ff7900) accents on key metrics, dark green headers. Real-looking numbers (no AI gibberish). Professional BI dashboard aesthetic, polished but sober. No logos or institutional wordmarks.
>
> Composition explicitly in 16:9 horizontal aspect ratio.
>
> **Negative:** no real BI tool logos (Tableau, Power BI, etc.), no AI text artifacts, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.8 `infografia-neg-b1-mapa-oportunidades-v2.png`

**Concepto:** mapa de Colombia con vocación productiva.

> Modern editorial infographic on cream background. Bold title at top: "Vocación productiva por región". Centered: a stylized Colombian silhouette in deep cream tone with subtle topographic shading suggesting cordilleras (no political borders, no city names). On the map, 6 pins each holding a tiny hyperrealistic 3D-rendered icon (CGI, real materials) of the regional export: a coffee bean (eje cafetero), a flower stem (Antioquia), a banana (Urabá), a small oil drop (Llanos), a coal lump (Cesar), an avocado (Quindío). Each pin has a thin purple (#7223b7) accent stripe. Subtle dashed elevation lines on the map. Professional editorial magazine style, designed and restrained. No logos or institutional wordmarks.
>
> **Negative:** no real political boundaries, no city names visible, no AI text glitches, no flat illustration, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.9 `infografia-neg-b3-incoterms-2020-v2.png`

**Concepto:** diagrama de Incoterms.

> Modern editorial diagram on cream background. Bold title at top: "Incoterms 2020 · quién paga qué hasta dónde". Below, a horizontal supply chain visualization with 6 small hyperrealistic 3D-rendered icon (real materials)s spaced across the width: factory → port-of-origin → cargo ship → port-of-destination → warehouse → customer. Above the chain, four colored horizontal bars span different segments of the chain, each labeled with its Incoterm: "EXW", "FOB", "CIF", "DDP". Each bar in a different shade of purple (#7223b7) gradient. A short caption under each Incoterm explaining the seller's responsibility. Clean professional editorial aesthetic with Inter font. No logos or institutional wordmarks.
>
> **Negative:** no flat illustration, no childish style, no AI text artifacts, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.10 `infografia-neg-b3-rutas-tarifas-v2.png`

**Concepto:** rutas y tarifas de transporte.

> Modern editorial map-style infographic on cream background. Bold title at top: "Tres rutas, tres realidades". A stylized world map in muted cream tones with subtle ocean tints (no political borders, no country names). Colombia visible in the bottom-left. Three dashed routes extend from Colombia to: Miami (with a small plane icon), Rotterdam (with a small cargo ship icon), Shanghai (with another plane icon). Each route is in a different purple (#7223b7) tone gradient. Next to each destination, a small data card showing "Tránsito: 3 días", "Tránsito: 18 días", "Tránsito: 28 días" and an estimated cost range. Inter font, professional editorial style. Subtle dashed compass icon in the upper corner. No logos or institutional wordmarks.
>
> **Negative:** no political detail, no real city labels other than the destinations mentioned, no AI text glitches, no flat illustration, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

### 4.11 `infografia-neg-b4-financiamiento-rutas-v2.png`

**Concepto:** cuatro caminos para financiar internacionalización.

> Modern editorial infographic on cream background. Bold title at top: "Cuatro caminos para financiar la internacionalización". Below, four parallel horizontal swim-lane paths extending from left ("Idea de negocio") to right ("Mercado internacional"). Each lane labeled at the start: 1) "Certificación social/ambiental", 2) "Bancóldex", 3) "E-commerce directo", 4) "Cooperación internacional". Along each lane, 2-3 small milestone markers as hyperrealistic 3D miniatures (CGI, real materials): a tiny certificate icon, a small bank icon, a tiny package icon, a small globe icon. Each lane uses a slightly different shade of purple (#7223b7) gradient. Inter font headers, soft dotted grid behind, professional graphic-design finish. No logos or institutional wordmarks.
>
> **Negative:** no real Bancóldex logo or specific institution branding, no AI text glitches, no logos, no university wordmark, no UAmerica, no Universidad de América.

---

## 5. Collages y heroes de programa (16:9)

**Aspect ratio:** 16:9 (1920×1080 px).
**Formato:** JPG calidad 92.
**Registro:** **Fotografía editorial documental** (sin 3D).

---

### 5.1 `hero-landing-collage-eco-v2.jpg`

**Donde se usa:** `programa-economia.html`.

> Cinematic editorial photograph, wide composition, of a young Colombian university student (mid-20s, casual professional attire with a slight neutral palette) sitting in a soft-focus café interior, looking thoughtfully at a laptop screen showing real-looking charts and data. Through a large window in the blurred background, the silhouette of Bogotá's cerros orientales is visible against soft afternoon light. Warm cream and teal (#00a4b5) tones in the composition (a teal mug on the table, a teal book corner visible). Editorial photography style at f/2.0, shot on a 35mm lens. Mood: focused, calm, intellectually engaged. Style reference: a feature in Cereal or Kinfolk magazine.
>
> **Negative:** no stock smile, no fake corporate setting, no AI hand artifacts, no real laptop brand logos, no political imagery, no flat illustration.

---

### 5.2 `hero-landing-collage-admin-v2.jpg`

**Donde se usa:** `programa-administracion.html`.

> Cinematic editorial photograph, wide composition, of three diverse Colombian professionals (mid-20s to 40s, varied gender and tone of skin) collaborating standing around a modern glass table in a warm office, reviewing a printed strategic plan with colorful sticky notes attached. One holds a marker, another points at a data point, the third writes a note. Warm orange (#ff7900) accents in the environment (a chair, a small wall art piece, the sticky notes). Soft natural light from large floor-to-ceiling windows on the right. Editorial photography style at f/2.5. Mood: collaborative, decisive, real work happening. Style reference: a startup feature in Monocle.
>
> **Negative:** no stock smile, no overly polished glamour, no fake handshakes, no real company logos, no AI hand glitches, no flat illustration.

---

### 5.3 `hero-landing-collage-neg-v2.jpg`

**Donde se usa:** `programa-negocios.html`.

> Cinematic editorial photograph, wide composition, of a Colombian export warehouse interior with high ceilings, exposed wooden beams, and warm late-afternoon light streaming through industrial windows. In the mid-ground, a young professional in casual professional attire (no suit) inspects a wooden crate filled with quality coffee beans, holding a tablet with shipping data. Stacks of crates and bags labeled subtly in the blurred background. Purple (#7223b7) accents in the professional's tablet case or a lanyard. Mood: hands-on, serious, real export business. Style reference: a Patagonia worker portrait meets a National Geographic feature.
>
> **Negative:** no fake corporate look, no AI hand glitches, no real brand logos on packaging, no political imagery, no flat illustration.

---

## 6. Recomendaciones de implementación V2

### Servicios de generación recomendados

| Categoría | Servicio sugerido | Por qué |
|---|---|---|
| Heroes 3D | **Midjourney v6/v7** o **DALL·E 3** | Mejor render hiperrealista de materiales |
| Heroes foto | **Midjourney v6/v7** con `--style raw` | Fotografía cinematográfica más natural |
| Aha-boxes 3D | **Midjourney v6/v7** con `--style raw` o **DALL·E 3** | Realismo de un objeto único; macro o CGI fotorealista |
| Infografías | **Figma + Midjourney** (Midjourney genera la base, Figma agrega tipografía precisa) | El texto en infografías necesita ser legible |

### Validación visual

Antes de generar las 41 imágenes:

1. **Genera 3 imágenes de prueba**: 1 hero foto, 1 hero 3D, 1 aha 3D. Valida estilo.
2. **Ajusta el style guide** si algo se desvía (por ejemplo, si los aha-boxes se ven recargados a 44px, simplifica).
3. **Genera el lote completo** con un mismo seed/style reference para mantener coherencia.

### Optimización para producción

| Tipo | Peso objetivo | Optimización |
|---|---|---|
| Heroes 4:3 | <120 KB | WebP calidad 82 o JPG calidad 85, redimensión a 1200×900 |
| Aha-boxes 1:1 | <30 KB | WebP calidad 80, redimensión a 256×256 (o 512 para retina) |
| Infografías 16:9 | <200 KB | PNG si el texto es crítico, JPG calidad 88 si no |
| Collages 16:9 | <250 KB | JPG calidad 90, redimensión a 1920×1080 |

### Coherencia del set

- **Misma luz, mismo tratamiento de color**: define un look base (warm cream + paleta de programa) y aplícalo en todo.
- **Mismo nivel de detalle**: no mezcles un hero hiperrealista con uno minimalista en el mismo bloque.
- **Mismas convenciones de composición**: ¾ angle para 3D, regla de tercios para foto.

---

## 7. Tabla resumen V2

| # | Archivo V2 | Aspect | Registro | Donde se usa |
|---|---|---|---|---|
| 1 | hero-admin-b1-fundamentos-v2.png | 4:3 | Foto editorial | Admin B1 header |
| 2 | hero-admin-b2-proceso-v2.png | 4:3 | 3D hiperrealista | Admin B2 header |
| 3 | hero-eco-b1-microeconomia-v2.png | 4:3 | Foto editorial | Eco B1 header |
| 4 | hero-eco-b2-macroeconomia-v2.png | 4:3 | Foto + 3D híbrido | Eco B2 header |
| 5 | hero-eco-b3-modelacion-v2.png | 4:3 | 3D hiperrealista | Eco B3 header |
| 6 | hero-eco-b4-sostenibilidad-v2.png | 4:3 | 3D hiperrealista | Eco B4 header |
| 7 | hero-neg-b1-identificacion-v2.png | 4:3 | Foto editorial | Negocios B1 header |
| 8 | hero-neg-b2-documentacion-v2.png | 4:3 | 3D hiperrealista | Negocios B2 header |
| 9 | hero-neg-b3-costos-v2.png | 4:3 | 3D hiperrealista | Negocios B3 header |
| 10 | hero-neg-b4-financiamiento-v2.png | 4:3 | Foto editorial | Negocios B4 header |
| 11 | hero-reto-biopack-v2.png | 4:3 | 3D hiperrealista | Reto BioPack header |
| 12 | aha-eco-b1-cuatro-horas-v2.png | 1:1 | CGI realista / macrofoto | Eco B1 T1 aha-box |
| 13 | aha-eco-b1-netflix-domingo-v2.png | 1:1 | CGI realista / macrofoto | Eco B1 T3 aha-box |
| 14 | aha-eco-b1-boleta-concierto-v2.png | 1:1 | CGI realista / macrofoto | Eco B1 T5 aha-box |
| 15 | aha-eco-b2-almuerzo-fonda-v2.png | 1:1 | CGI realista / macrofoto | Eco B2 T2 aha-box |
| 16 | aha-eco-b3-transmilenio-v2.png | 1:1 | CGI realista / macrofoto | Eco B3 T1 aha-box |
| 17 | aha-eco-b3-cucharada-sopa-v2.png | 1:1 | CGI realista / macrofoto | Eco B3 T2 aha-box |
| 18 | aha-eco-b3-moneda-aire-v2.png | 1:1 | CGI realista / macrofoto | Eco B3 T3 aha-box |
| 19 | aha-eco-b3-netflix-algoritmo-v2.png | 1:1 | CGI realista / macrofoto | Eco B3 T5 aha-box |
| 20 | aha-eco-b4-fabrica-rio-v2.png | 1:1 | CGI realista / macrofoto | Eco B4 T2 aha-box |
| 21 | aha-eco-b4-botella-circular-v2.png | 1:1 | CGI realista / macrofoto | Eco B4 T3 aha-box |
| 22 | aha-admin-b1-panaderia-v2.png | 1:1 | CGI realista / macrofoto | Admin B1 T1 aha-box |
| 23 | aha-admin-b1-contratacion-v2.png | 1:1 | CGI realista / macrofoto | Admin B1 T3 aha-box |
| 24 | aha-admin-b2-juan-valdez-v2.png | 1:1 | CGI realista / macrofoto | Admin B2 T1 aha-box |
| 25 | aha-admin-b2-evolucion-estructura-v2.png | 1:1 | CGI realista / macrofoto | Admin B2 T4 aha-box |
| 26 | aha-admin-b2-tablero-carro-v2.png | 1:1 | CGI realista / macrofoto | Admin B2 T6 aha-box |
| 27 | infografia-eco-b1-precio-vs-costo-v2.png | 16:9 | Diagrama editorial moderno | Eco B1 T3 recurso |
| 28 | infografia-eco-b2-canasta-familiar-v2.png | 16:9 | Diagrama editorial moderno | Eco B2 T2 recurso |
| 29 | infografia-eco-b3-correlaciones-absurdas-v2.png | 16:9 | Diagrama editorial moderno | Eco B3 T4 recurso |
| 30 | infografia-admin-b1-mapa-recursos-v2.png | 16:9 | Diagrama editorial moderno | Admin B1 T3 recurso |
| 31 | infografia-admin-b1-sintesis-bloque-v2.png | 16:9 | Diagrama editorial moderno | Admin B1 T6 recurso |
| 32 | infografia-admin-b2-planeacion-pagina-v2.png | 16:9 | Diagrama editorial moderno | Admin B2 T1 recurso |
| 33 | infografia-admin-b2-bsc-ejemplo-v2.png | 16:9 | Diagrama editorial moderno | Admin B2 T6 recurso |
| 34 | infografia-neg-b1-mapa-oportunidades-v2.png | 16:9 | Diagrama editorial moderno | Negocios B1 recurso |
| 35 | infografia-neg-b3-incoterms-2020-v2.png | 16:9 | Diagrama editorial moderno | Negocios B3 recurso |
| 36 | infografia-neg-b3-rutas-tarifas-v2.png | 16:9 | Diagrama editorial moderno | Negocios B3 T2 recurso |
| 37 | infografia-neg-b4-financiamiento-rutas-v2.png | 16:9 | Diagrama editorial moderno | Negocios B4 recurso |
| 38 | hero-landing-collage-eco-v2.jpg | 16:9 | Foto editorial documental | Programa Eco overview |
| 39 | hero-landing-collage-admin-v2.jpg | 16:9 | Foto editorial documental | Programa Admin overview |
| 40 | hero-landing-collage-neg-v2.jpg | 16:9 | Foto editorial documental | Programa Negocios overview |

**Total: 40 imágenes.** (Sin el fallback genérico `aha-generic-bulb.png`, que se mantiene de V1.)

### Plan de generación por prioridad

1. **Lote 1 — Heroes (11)**: máximo impacto visual, primera impresión de cada bloque.
2. **Lote 2 — Collages de programa (3)**: visibles en la página de cada programa.
3. **Lote 3 — Infografías (11)**: contenido pedagógico real.
4. **Lote 4 — Aha-boxes (15)**: detalle de refinamiento; tienen `aha-generic-bulb.png` como fallback aceptable.
