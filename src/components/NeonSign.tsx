"use client";

import { motion, useReducedMotion } from "framer-motion";

// Ω centrada en un lienzo de 400×400
const OMEGA = "M132 262H172C150 244 138 222 138 190A62 62 0 0 1 262 190C262 222 250 244 228 262H268";
const SQUARE = "M88 88H312V312H88Z";
const DIAMOND = "M200 42L358 200L200 358L42 200Z";
const SHAPES = [SQUARE, DIAMOND, OMEGA];

function Tube({ stroke, width, filter, opacity, delayBase, reduce }: {
  stroke: string;
  width: number;
  filter?: string;
  opacity?: string;
  delayBase: number;
  reduce: boolean | null;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" filter={filter} style={opacity ? { opacity } : undefined}>
      {SHAPES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delayBase + i * 0.28, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

/**
 * Elemento firma: el letrero Ω de las fotos de Greek, dibujado como tubo de neón.
 * Se "enciende" al cargar y, con la canción sonando, su brillo sigue el nivel de audio (--level).
 */
export default function NeonSign({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const glow = "calc(var(--breathe) * (0.62 + var(--level) * 0.75))";
  return (
    <div
      aria-hidden
      className={className}
      style={{ transform: "scale(calc(1 + var(--level) * 0.035))", transformOrigin: "center" }}
    >
      <svg viewBox="0 0 400 400" className="neon-breathe h-full w-full overflow-visible" role="presentation" focusable="false">
        <defs>
          <filter id="glow-far" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="glow-near" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <motion.g
          transform="rotate(-8 200 200)"
          initial={{ opacity: reduce ? 1 : 0.4 }}
          animate={{ opacity: reduce ? 1 : [0.4, 1, 0.35, 1, 0.6, 1, 0.85, 1] }}
          transition={{ delay: reduce ? 0 : 1.7, duration: reduce ? 0 : 1.1, times: [0, 0.12, 0.22, 0.38, 0.5, 0.66, 0.8, 1] }}
        >
          <Tube stroke="#2FD510" width={16} filter="url(#glow-far)" opacity={glow} delayBase={0.15} reduce={reduce} />
          <Tube stroke="#2FD510" width={9} filter="url(#glow-near)" opacity={glow} delayBase={0.15} reduce={reduce} />
          <Tube stroke="#2FD510" width={5.5} delayBase={0.15} reduce={reduce} />
          <Tube stroke="#eaffe3" width={2} delayBase={0.15} reduce={reduce} />
        </motion.g>
      </svg>
    </div>
  );
}
