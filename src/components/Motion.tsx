"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
