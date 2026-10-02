"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/data/site";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["22%", "0%"]);
  return (
    <footer ref={ref} className="relative isolate flex min-h-svh flex-col overflow-hidden border-t border-white/10">
      <Image
        src="/images/footer/greek-shot.webp"
        alt="Greek sosteniendo un caballito de tequila frente a la cámara, en primer plano desenfocado"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-40"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/70" />

      <div className="flex flex-1 items-center justify-center">
        <motion.p aria-hidden style={reduce ? undefined : { y }} className="display fade-neon select-none text-center text-[24.5vw] leading-[0.8]">
          Greek
        </motion.p>
      </div>

      <div className="wrap flex flex-col gap-0 border-t border-white/15 pb-24 pt-3 md:pt-5 lg:pb-5 text-[0.75rem] uppercase tracking-[0.16em] text-white/75 md:flex-row md:items-center md:justify-between">
        <p className="py-2 md:py-0">© {new Date().getFullYear()} DJ Greek</p>
        <a href={SITE.builderUrl} target="_blank" rel="noopener noreferrer" className="py-3.5 hover:text-white md:py-3">
          Desarrollado por <span className="font-bold text-neon">AMOXTLI<sup className="ml-0.5 text-[0.7em]">®</sup></span>
        </a>
        <a href={SITE.privacyUrl} target="_blank" rel="noopener noreferrer" className="py-3.5 hover:text-white md:py-3">
          Aviso de privacidad
        </a>
      </div>
    </footer>
  );
}
