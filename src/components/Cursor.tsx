"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor propio solo con puntero fino. Crece y muestra una etiqueta
 * sobre elementos con data-cursor="VER" / "PLAY" / etc.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(el ? el.dataset.cursor ?? "" : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  const active = label !== null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: active ? 92 : 14,
        height: active ? 92 : 14,
        backgroundColor: active ? "#2FD510" : "rgba(47,213,16,0)",
        borderColor: "#2FD510",
        borderWidth: active ? 0 : 1.5,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      {active && <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black">{label}</span>}
    </motion.div>
  );
}
