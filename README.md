# Simulador Inteligente de Experiencias Empresariales y Económicas

Plataforma académica de Ciencias Administrativas y Económicas — Universidad de América.

## Stack

- **Backend**: Node.js + Express + **node:sqlite (integrado)** + bcryptjs (sesión por cookie httpOnly)
- **Auth UI**: React 18 + Vite (modo library → bundle IIFE)
- **Landing**: HTML estático + GSAP (animaciones)
- **Accesibilidad**: panel propio (tamaño de fuente, contraste, filtros de daltonismo via SVG)

## Requisitos

- **Node.js 22.5+** (usa el módulo `node:sqlite` integrado, sin dependencias nativas)
- npm

> Si tienes una versión menor a 22.5, actualiza Node. El proyecto **no usa** `better-sqlite3` ni `sqlite3` para evitar compilación nativa con Visual Studio Build Tools.

## Instalación y arranque

```bash
# 1. Instalar dependencias (esto también ejecuta `npm run build`
#    via postinstall para generar src/js/auth-modal.js)
npm install

# 2. Arrancar servidor (escucha en http://localhost:3000)
npm start
```

### Desarrollo (rebuild auto)

```bash
# Corre el server con --watch y vite build --watch en paralelo
npm run dev
```

Cambios en `client/` rebuilden `src/js/auth-modal.js`. Cambios en `server/` reinician el server.

### Build manual del bundle de auth

```bash
npm run build
```

## Rutas

| URL | Archivo | Descripción |
|---|---|---|
| `/` | `index.html` | Landing público (CTA abre modal de auth) |
| `/app.html` | `app.html` | Dashboard post-auth (sidebar + workspace) |
| `/api/auth/signup` | POST | Crear cuenta |
| `/api/auth/login` | POST | Iniciar sesión |
| `/api/auth/logout` | POST | Cerrar sesión |
| `/api/auth/recover` | POST | Restablecer contraseña usando documento |
| `/api/auth/me` | GET | Datos del usuario autenticado |

## API contracts

**Signup**
```json
POST /api/auth/signup
{ "fullName": "...", "username": "...", "password": "...", "document": "..." }
→ 200 { "user": { "id", "fullName", "username" } } + cookie de sesión
→ 400 { "errors": { campo: "mensaje", ... } }
→ 409 { "errors": { "username": "Ese usuario ya existe." } }
```

**Login**
```json
POST /api/auth/login
{ "username": "...", "password": "..." }
→ 200 { "user": {...} } + cookie
→ 401 { "error": "Usuario o contraseña incorrectos." }
```

**Recover**
```json
POST /api/auth/recover
{ "username": "...", "document": "...", "newPassword": "..." }
→ 200 { "ok": true }   (todas las sesiones previas se invalidan)
→ 401 { "error": "Usuario o documento incorrectos." }
```

## Estructura

```
.
├── index.html                ← landing (entry)
├── app.html                  ← dashboard (post-auth)
├── landing.css / styles.css  ← entries CSS
├── package.json              ← deps + scripts
├── vite.config.js            ← build del modal React
│
├── assets/                   ← logos + módulos
├── docs/source/              ← 3 .docx oficiales de cada programa
├── skills/                   ← SKILL.md de diseño instruccional
│
├── server/                   ← backend
│   ├── index.js              ← Express entry
│   ├── db.js                 ← better-sqlite3 + migraciones
│   ├── auth.js               ← bcrypt + cookie sesión
│   ├── routes/auth.js        ← endpoints
│   ├── migrations/
│   │   └── 001_init.sql
│   └── data.sqlite           ← creada en runtime (gitignored)
│
├── client/                   ← React (Vite library mode)
│   └── src/
│       ├── main.jsx          ← expone window.UAAuth.open(mode)
│       ├── AuthModal.jsx     ← modal con switch login/signup/recover
│       ├── api.js
│       ├── components/
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── Recover.jsx
│       │   └── Field.jsx
│       └── styles/auth.css
│
└── src/
    ├── js/
    │   ├── landing.js        ← landing GSAP + abre modal en CTA
    │   ├── app.js            ← orquestador del dashboard
    │   ├── accessibility.js  ← panel a11y
    │   ├── auth-modal.js     ← BUILD: bundle React (gitignored)
    │   └── auth-modal.css    ← BUILD: estilos extraídos
    └── styles/
        ├── abstracts/tokens.css
        ├── base/base.css
        ├── layout/           ← solo dashboard
        └── sections/         ← landing-hero + accessibility + programs + process
```

## Cómo se abre el modal

1. El landing carga `src/js/auth-modal.js` (generado por Vite). Al ejecutarse, el bundle expone `window.UAAuth.open(mode)` y `window.UAAuth.close()`.
2. Los CTAs del landing tienen `data-open-auth="signup"` o `data-open-auth="login"`. Al hacer click, `landing.js` invoca `window.UAAuth.open(mode)`.
3. El modal monta en un `<div id="auth-root">` creado dinámicamente en `<body>`, encima del landing. Click en backdrop o Esc lo cierra.
4. Tras login/signup exitoso: redirección a `app.html`.
5. La sesión vive en una cookie httpOnly (`ua_session`) que el server valida en cada request.

## Acceso por URL directa

Puedes abrir el modal con un hash:

- `index.html#auth=login`
- `index.html#auth=signup`
- `index.html#auth=recover`

## Seguridad — notas

- **Documento como secreto de recuperación**: cubre el caso "olvidé contraseña" sin email, pero el documento de identidad es información que un atacante podría obtener. En producción seria recomendable agregar email + envío de código.
- **Sin rate limiting**: añadir middleware (`express-rate-limit`) para `/api/auth/*` antes de exponer a internet.
- **CSRF**: la cookie es `SameSite=Lax`, lo que mitiga CSRF en formularios cross-site, pero no en navegación de mismo sitio. Si se agregan endpoints sensibles, sumar token CSRF.
- **HTTPS**: la cookie se marca `secure` solo si `NODE_ENV=production`. Asegúrate de servir con HTTPS en prod.
- **Hashing**: bcryptjs con cost 12 (~250-500ms por hash en hardware típico). Suficiente; no negociable bajar.

## Próximos pasos sugeridos

1. Conectar el dashboard (`app.html`) al backend para mostrar nombre del usuario logueado y proteger contra accesos sin sesión.
2. Construir el primer micromódulo de prueba usando el método pedagógico documentado en `skills/instructional-design/SKILL.md`.
3. Rate limiting + CSRF token + auditoría de seguridad antes de exponer a producción.
