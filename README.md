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

## Despliegue
Pensado para Vercel (migración desde Netlify). Nada a `main` sin aprobación; trabajar en `dev`.
