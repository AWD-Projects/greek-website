"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import NeonSign from "./NeonSign";
import { useReady } from "./Loader";
import Player from "./Player";
import { ArrowUpRight, SOCIAL_ICONS } from "./Icons";
import { SITE } from "@/data/site";
import { track } from "@/lib/analytics";

const PORTRAITS = [
  { src: "/images/hero/hero-1.webp", alt: "Retrato de Greek con lentes de sol, sonriendo y sacando la lengua bajo luz verde neón" },
  { src: "/images/hero/hero-3.webp", alt: "Greek bajándose los lentes de sol con ambas manos, mirando a cámara bajo luz verde neón" },
  { src: "/images/hero/hero-2.webp", alt: "Dos tomas de Greek con lentes de sol, lado a lado, en verde neón" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const ready = useReady();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % PORTRAITS.length), 7000);
    return () => clearInterval(t);
  }, [reduce]);

  const IG = SOCIAL_ICONS.instagram;
  const WA = SOCIAL_ICONS.whatsapp;
  const d = (s: number) => (reduce ? 0 : s);

  // Al salir del hero, el letrero gira y el retrato sube un poco
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const signRotate = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section id="inicio" ref={ref} className="relative overflow-clip">
      <div className="wrap grid min-h-[calc(100svh-9.25rem)] grid-cols-1 gap-x-10 pb-10 pt-24 lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:items-center lg:pb-8 lg:pt-20">
        {/* A. Nombre */}
        <motion.div style={reduce ? undefined : { y: textY }} className="relative z-10 lg:col-span-7 lg:row-start-1 lg:self-end">
          <h1 className="display text-[clamp(4.6rem,24vw,8rem)] leading-[0.8] lg:text-[clamp(5.5rem,10vw,9.5rem)]">
            <span className="mb-0 block text-[0.3em] font-extrabold leading-none tracking-[0.04em] text-neon">
              <motion.span className="inline-block" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: d(0.3), duration: d(0.8) }}>DJ</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] pt-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: ready ? "0%" : "110%" }}
                transition={{ delay: d(0.25), duration: d(1.1), ease: [0.16, 1, 0.3, 1] }}
              >
                Greek
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* B. Retrato sobre el letrero de neón (elemento firma) */}
        <div className="relative mx-auto mt-6 h-[min(92vw,54svh)] w-full max-w-[34rem] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-[min(74svh,46rem)] lg:max-w-none">
          <motion.div style={reduce ? undefined : { rotate: signRotate }} className="absolute inset-0 grid place-items-center justify-items-start">
            {ready && <NeonSign className="aspect-square h-[90%] max-w-[92%]" />}
          </motion.div>
          <motion.div style={reduce ? undefined : { y: portraitY }} className="feather pointer-events-none absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: d(1.2), ease: "easeInOut" }}
              >
                <Image
                  src={PORTRAITS[i].src}
                  alt={PORTRAITS[i].alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="object-contain object-[right_bottom]"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* C. Mensaje y contacto directo */}
        <div className="relative z-10 mt-8 lg:col-span-7 lg:row-start-2 lg:mt-7 lg:self-start">
          <motion.p
            className="max-w-[24ch] lg:max-w-[38ch] text-[clamp(1.6rem,2.5vw,2.4rem)] font-light leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ delay: d(0.5), duration: d(1), ease: [0.16, 1, 0.3, 1] }}
          >
            No se trata de cumplir expectativas; se trata de <span className="font-extrabold text-neon">romperlas.</span> Eso es Greek.
          </motion.p>
          <motion.p
            className="mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed text-white/75 md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: d(0.75), duration: d(0.9) }}
          >
            Más que música, Greek es un concepto que transforma cada evento. Con un estilo &lsquo;Open Format&rsquo;, cada presentación es una experiencia única.
          </motion.p>
          <motion.div
            className="mt-6 grid gap-3 sm:flex sm:flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
            transition={{ delay: d(0.95), duration: d(0.8) }}
          >
            <a
              href={SITE.instagramDm}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("contact_click", { channel: "instagram", location: "hero" })}
              data-cursor="DM"
              className="group inline-flex h-14 items-center justify-center gap-3 border border-neon bg-neon px-6 text-[0.76rem] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-black hover:text-neon"
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
              className="inline-flex h-14 items-center justify-center gap-3 border border-white/35 px-6 text-[0.76rem] font-bold uppercase tracking-[0.15em] transition hover:border-neon hover:text-neon"
            >
              <WA className="h-5 w-5" aria-hidden />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative z-40 [@media(min-width:1024px)_and_(min-height:860px)]:sticky [@media(min-width:1024px)_and_(min-height:860px)]:bottom-0">
        <Player />
      </div>
    </section>
  );
}
