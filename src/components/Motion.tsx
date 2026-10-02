"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Entrada ordenada: observa el contenedor (no hijos enmascarados). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Título por líneas: cada palabra sube desde una máscara. El texto sigue siendo texto real. */
export function SplitTitle({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <Tag ref={ref} className={cn("display", className)}>
      {lines.map((line, li) => (
        <span key={li} className={cn("block", lineClassName?.[li])}>
          {line.split(" ").map((word, wi) => {
            const i = n++;
            return (
              <span key={wi} className="-mt-[0.2em] inline-block overflow-hidden pb-[0.06em] pt-[0.2em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={inView ? { y: "0%" } : { y: "115%" }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : i * 0.07, ease: EASE }}
                >
                  {word}
                </motion.span>
                {wi < line.split(" ").length - 1 ? " " : ""}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Etiqueta de sección: "01 / Sobre" */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-4">
      <span className="tabular-nums">{index}</span>
      <span aria-hidden className="h-px w-10 bg-neon/60" />
      <span>{children}</span>
    </p>
  );
}

/** Imagen con revelado por máscara y parallax ligado al scroll. El contenedor debe tener tamaño propio (aspect/alto). */
export function ParallaxFrame({
  children,
  className,
  amount = 9,
  reveal = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -6% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  const show = !reveal || inView;
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: show ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
    >
      <motion.div className="absolute inset-[-12%]" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Párrafo que se enciende palabra por palabra al hacer scroll. El texto completo sigue en el DOM. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const words = text.split(" ");

  // Una sola suscripción al scroll que escribe la opacidad de cada palabra directo en el DOM (sin re-render)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce || !ref.current) return;
    const spans = ref.current.children;
    const n = spans.length;
    for (let i = 0; i < n; i++) {
      const start = i / n;
      const t = Math.min(1, Math.max(0, (p - start) / (1.5 / n)));
      (spans[i] as HTMLElement).style.opacity = String(0.55 + 0.45 * t);
    }
  });

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} style={reduce ? undefined : { opacity: 0.55 }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Línea de progreso de lectura, bajo el header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[51] h-[2px] origin-left bg-neon" style={{ scaleX }} />;
}
