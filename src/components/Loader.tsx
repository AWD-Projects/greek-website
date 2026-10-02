"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ReadyCtx = createContext(false);
/** Verdadero cuando la intro terminó: el hero espera esta señal para animar su entrada. */
export const useReady = () => useContext(ReadyCtx);

const KEY = "greek-intro-seen";
const MAX_MS = 4500;

/**
 * Intro de carga: el pulso neón del sitio original, ahora con latido a 128 BPM, anillos en rombo
 * (la forma del letrero), progreso real (fuentes + imágenes) y salida en cortina hacia arriba.
 * Solo se muestra una vez por sesión y no bloquea el contenido para buscadores ni sin JavaScript.
 */
export function LoaderProvider({ children }: { children: ReactNode }) {
  const [shown, setShown] = useState(true);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0.06);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch {}
    if (seen) {
      setShown(false);
      setReady(true);
      return;
    }

    const minMs = reduce ? 500 : 1700;
    const start = performance.now();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let fonts = false;
    let loaded = document.readyState === "complete";
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearInterval(tick);
      setProgress(1);
      window.setTimeout(() => {
        html.style.overflow = prevOverflow;
        try { sessionStorage.setItem(KEY, "1"); } catch {}
        setShown(false);
        setReady(true);
      }, reduce ? 0 : 320);
    };
    const check = () => {
      const elapsed = performance.now() - start;
      if ((fonts && loaded && elapsed >= minMs) || elapsed >= MAX_MS) finish();
    };

    document.fonts.ready.then(() => { fonts = true; check(); });
    const onLoad = () => { loaded = true; check(); };
    if (!loaded) window.addEventListener("load", onLoad);

    const tick = window.setInterval(() => {
      const elapsed = performance.now() - start;
      setProgress((p) => Math.min(0.92, Math.max(p, 0.06 + (elapsed / minMs) * 0.86)));
      check();
    }, 90);

    return () => {
      clearInterval(tick);
      window.removeEventListener("load", onLoad);
      html.style.overflow = prevOverflow;
    };
  }, [reduce]);

  return (
    <ReadyCtx.Provider value={ready}>
      <noscript>
        <style>{"#intro{display:none!important}"}</style>
      </noscript>
      {children}
      <AnimatePresence>
        {shown && (
          <motion.div
            id="intro"
            role="status"
            aria-label="Cargando DJ Greek"
            className="fixed inset-0 z-[100] grid place-items-center bg-black"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.95, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative grid h-56 w-56 place-items-center">
              {[0, 1, 2].map((i) => (
                <span key={i} aria-hidden className="intro-ring" style={{ animationDelay: `${i * 0.625}s` }} />
              ))}
              <div className="intro-logo relative z-10">
                <Image src="/images/brand/logo.webp" alt="" width={128} height={128} priority className="h-28 w-28 rounded-full md:h-32 md:w-32" />
              </div>
            </div>
            <div aria-hidden className="absolute bottom-[18%] h-px w-36 bg-white/15">
              <motion.div
                className="h-full origin-left bg-neon shadow-[0_0_10px_var(--neon)]"
                animate={{ scaleX: progress }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReadyCtx.Provider>
  );
}
