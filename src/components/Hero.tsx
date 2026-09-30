"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NeonSign from "./NeonSign";
import Player from "./Player";
import { ArrowUpRight, SOCIAL_ICONS } from "./Icons";
import { SITE } from "@/data/site";
import { track } from "@/lib/analytics";

const PORTRAITS = [
  { src: "/images/hero/hero-1.webp", alt: "Retrato de Greek con audífonos bajo luz verde neón" },
  { src: "/images/hero/hero-3.webp", alt: "Greek mirando de lado con lentes de sol bajo luz verde neón" },
  { src: "/images/hero/hero-2.webp", alt: "Greek ajustándose los lentes de sol junto a otra toma de espaldas, en verde neón" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % PORTRAITS.length), 7000);
    return () => clearInterval(t);
  }, [reduce]);

  const IG = SOCIAL_ICONS.instagram;
  const WA = SOCIAL_ICONS.whatsapp;
  const d = (s: number) => (reduce ? 0 : s);

  return (
    <section id="inicio" className="relative flex flex-col overflow-clip">
      {/* Área principal: crece si el contenido lo pide; el reproductor queda fijo abajo mientras dure el hero */}
      <div className="relative flex min-h-[calc(100svh-8.75rem)] flex-col justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[6%] h-[80%] w-[74%] opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(47,213,16,.2), transparent 70%)" }}
        />

        {/* 1. Letrero de neón (elemento firma) */}
        <NeonSign className="absolute right-[-16%] top-[50%] z-0 h-[40svh] w-[40svh] md:right-[15%] md:top-[9%] md:h-[70svh] md:w-[70svh]" />

        {/* 2. Retrato en verde neón, por delante del letrero */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-[46svh] w-[74vw] md:h-[76svh] md:w-[58vw]">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: d(1.2), ease: "easeInOut" }}
            >
              <Image
                src={PORTRAITS[i].src}
                alt={PORTRAITS[i].alt}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 60vw, 78vw"
                className="object-contain object-[right_bottom]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Mensaje y contacto directo */}
        <div className="wrap relative z-30 pt-24 md:pt-28">
          <motion.p
            className="eyebrow mb-5 md:mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d(0.2), duration: d(0.8) }}
          >
            House · Open Format
          </motion.p>
          <motion.p
            className="max-w-[17ch] text-[clamp(1.75rem,3.4vw,3.8rem)] font-light leading-[1.05] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,.9)] md:max-w-[19ch]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d(0.35), duration: d(1), ease: [0.16, 1, 0.3, 1] }}
          >
            No se trata de cumplir expectativas; se trata de <span className="font-extrabold text-neon">romperlas.</span> Eso es Greek.
          </motion.p>
          <motion.p
            className="mt-5 max-w-[36ch] text-[0.95rem] leading-relaxed text-white/80 [text-shadow:0_1px_16px_rgba(0,0,0,.95)] md:mt-7 md:max-w-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d(0.7), duration: d(0.9) }}
          >
            Más que música, Greek es un concepto que transforma cada evento. Con un estilo &lsquo;Open Format&rsquo;, cada presentación es una experiencia única.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-3 md:mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d(0.9), duration: d(0.8) }}
          >
            <a
              href={SITE.instagramDm}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("contact_click", { channel: "instagram", location: "hero" })}
              data-cursor="DM"
              className="group inline-flex h-14 items-center gap-3 border border-neon bg-neon px-5 text-[0.76rem] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-black hover:text-neon md:px-6"
            >
              <IG className="h-5 w-5" aria-hidden />
              Contáctame por Instagram
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("contact_click", { channel: "whatsapp", location: "hero" })}
              className="inline-flex h-14 items-center gap-3 border border-white/35 bg-black/60 px-5 text-[0.76rem] font-bold uppercase tracking-[0.15em] transition hover:border-neon hover:text-neon md:px-6"
            >
              <WA className="h-5 w-5" aria-hidden />
              WhatsApp
            </a>
          </motion.div>
        </div>

        {/* 4. Nombre gigante detrás del retrato */}
        <h1 className="display wrap pointer-events-none relative z-[25] mt-6 select-none whitespace-nowrap text-[23vw] leading-[0.74] md:mt-2 md:text-[clamp(5rem,19vw,22rem)]">
          <span aria-hidden className="absolute left-[var(--pad)] top-[-0.02em] text-[0.12em] font-semibold leading-none tracking-[0.3em] text-neon [text-shadow:0_0_18px_rgba(47,213,16,.55)] md:top-[-0.04em]">DJ</span>
          <span className="sr-only">DJ </span>Greek
        </h1>
      </div>

      <div className="sticky bottom-0 z-40">
        <Player />
      </div>
    </section>
  );
}
