# DJ Greek — djgreek.mx

Sitio de DJ Greek (House y Open Format para eventos privados y clubes). Next.js 14 (App Router) + TypeScript + Tailwind + framer-motion + Lenis + Radix.

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Variables de entorno
| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica (default `https://djgreek.mx`) |
| `NEXT_PUBLIC_SITE_ENV=production` | Permite indexar. Vercel lo cubre con `VERCEL_ENV=production`; en cualquier otro entorno el sitio sale con `noindex` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Token de verificación de Google Search Console (opcional) |

## Contenido
- Datos editables en `src/data/` (`site.ts` redes y contacto, `packages.ts`, `videos.ts`, `gallery.ts`, `venues.ts`).
- Imágenes en `public/images` (WebP), audio en `public/audio`, imagen para compartir en `public/og/greek-og.jpg` (1200×630).
- Contacto directo por Instagram (`ig.me/m/greek.06`) y WhatsApp; no hay formulario.

## Intro de carga
`src/components/Loader.tsx`: pulso neón con latido a 128 BPM, anillos en rombo y progreso real (fuentes + imágenes). Sale en cortina, se muestra una vez por sesión y el hero espera su salida para animar. Con reduced-motion dura ~0.5 s sin animación.

## Despliegues
Flujo en `.github/workflows/ci-cd.yml`:

| Evento | Qué corre |
|---|---|
| Pull request a `dev` o `main` | Lint, tipos y build |
| Push a `dev` | Lint, tipos, build y deploy de **preview** (entorno `dev`) |
| Push a `main` | Lint, tipos, build y deploy a **producción** (entorno `production`), con verificación del sitio publicado |

Nada va a `main` sin aprobación; el trabajo diario es en `dev`.

### Seguimiento
- **GitHub > Deployments** (o la pestaña Environments del repo): historial por entorno, con commit, autor, URL y estado.
- Cada deploy deja un resumen en la ejecución de Actions (URL, commit corto, autor).
- Vercel guarda en cada deploy los metadatos `githubCommitSha`, `githubActor` y `githubRef`.
- Dependabot abre PRs semanales a `dev` con actualizaciones menores y de seguridad.

### Configuración (una sola vez)
1. **Secretos del repo** (Settings > Secrets and variables > Actions > Secrets):
   - `VERCEL_TOKEN`: token creado en Vercel (Account Settings > Tokens).
   - `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`: ejecutar `npx vercel link` en el proyecto y leer `.vercel/project.json` (el archivo no se sube al repo).
2. **Entornos** (Settings > Environments): crear `dev` y `production`. En `production`, agregar revisores requeridos para que cada deploy espere aprobación manual (en repos privados esta opción depende del plan de GitHub).
3. **Variable opcional** `PROD_URL` (Settings > Secrets and variables > Actions > Variables), por ejemplo `https://djgreek.mx`: activa la verificación del sitio publicado.
4. **Evitar deploys dobles:** mientras el deploy automático de Vercel esté activo, conviven los dos. Cuando el flujo de Actions funcione, desactivar el de Vercel agregando a `vercel.json`:
   ```json
   "git": { "deploymentEnabled": false }
   ```
Si faltan los secretos, los jobs de deploy se omiten y solo corre la verificación de calidad.

### Dominio
`djgreek.mx` se mueve de Netlify a Vercel hasta que producción esté aprobada: primero se agrega el dominio en Vercel (Settings > Domains), luego se cambian los registros DNS.
