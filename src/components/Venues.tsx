"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitTitle } from "./Motion";
import { VENUES } from "@/data/venues";

/** Cada nombre se "llena" de neón de izquierda a derecha al cruzar el centro de la pantalla. */
function Row({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 52%"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <li ref={ref} className="group relative flex items-baseline gap-4 border-b border-white/15 py-3 md:gap-6 md:py-3.5">
      <span className="relative block min-w-0">
        <span className="display dim-text block text-[clamp(1.45rem,2.9vw,2.9rem)] leading-[1.06]">{name}</span>
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="display absolute inset-0 block text-[clamp(1.45rem,2.9vw,2.9rem)] leading-[1.06] text-neon transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_24px_rgba(47,213,16,.6)]"
        >
          {name}
        </motion.span>
      </span>
    </li>
  );
}

export default function Venues() {
  const half = Math.ceil(VENUES.length / 2);
  const cols = [VENUES.slice(0, half), VENUES.slice(half)];
  return (
    <section id="trayectoria" className="section-y wrap relative border-y border-white/10 bg-ink-2">
      <SplitTitle lines={["Donde", "ha sonado"]} className="t-section" lineClassName={["", "text-neon"]} />
      <div className="section-gap grid gap-x-16 md:grid-cols-2">
        {cols.map((col, c) => (
          <ol key={c} className="border-t border-white/15">
            {col.map((name, i) => (
              <Row key={name} name={name} index={c * half + i} />
            ))}
          </ol>
        ))}
      </div>
    </section>
  );
}
