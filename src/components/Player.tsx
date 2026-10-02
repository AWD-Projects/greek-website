"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";

const BARS = 44;

function fmt(t: number) {
  if (!isFinite(t)) return "00:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type AC = typeof AudioContext;

/** Reproductor de DISCO DANZ. Mientras suena, escribe el nivel de graves en --level (:root). */
export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const levelRef = useRef(0);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const playedOnce = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const reduce = useReducedMotion();

  const setLevel = (v: number) => {
    levelRef.current = v;
    document.documentElement.style.setProperty("--level", v.toFixed(3));
  };

  const loop = useCallback(() => {
    const an = analyserRef.current;
    if (!an) return;
    const data = new Uint8Array(an.frequencyBinCount);
    const tick = () => {
      an.getByteFrequencyData(data);
      // Graves (bins 1-6) mueven el neón; el espectro completo mueve las barras
      let bass = 0;
      for (let i = 1; i <= 6; i++) bass += data[i];
      const target = Math.min(1, bass / 6 / 255 / 0.85);
      setLevel(levelRef.current + (target - levelRef.current) * 0.28);
      for (let b = 0; b < BARS; b++) {
        const idx = 1 + Math.floor(Math.pow(b / BARS, 1.6) * 90);
        const v = data[idx] / 255;
        const el = barsRef.current[b];
        if (el) el.style.transform = `scaleY(${(0.06 + v * 0.94).toFixed(3)})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    // Apaga suave: el nivel vuelve a 0 y las barras bajan
    const fade = () => {
      const next = levelRef.current * 0.85;
      setLevel(next < 0.01 ? 0 : next);
      barsRef.current.forEach((el) => el && (el.style.transform = "scaleY(0.06)"));
      if (levelRef.current > 0) rafRef.current = requestAnimationFrame(fade);
    };
    rafRef.current = requestAnimationFrame(fade);
  }, []);

  const ensureGraph = () => {
    if (ctxRef.current || reduce) return;
    try {
      const Ctor: AC = window.AudioContext || (window as unknown as { webkitAudioContext: AC }).webkitAudioContext;
      const ctx = new Ctor();
      const src = ctx.createMediaElementSource(audioRef.current!);
      const an = ctx.createAnalyser();
      an.fftSize = 256;
      an.smoothingTimeConstant = 0.8;
      src.connect(an);
      an.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = an;
    } catch {
      /* Sin analizador: el audio sigue sonando, solo no reacciona el neón */
    }
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      return;
    }
    ensureGraph();
    if (ctxRef.current?.state === "suspended") await ctxRef.current.resume();
    a.play().catch(() => {});
    if (!playedOnce.current) {
      playedOnce.current = true;
      track("play_track");
    }
  };

  useEffect(() => {
    const a = audioRef.current!;
    const onPlay = () => {
      setPlaying(true);
      cancelAnimationFrame(rafRef.current);
      loop();
    };
    const onPause = () => {
      setPlaying(false);
      stopLoop();
    };
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(rafRef.current);
      setLevel(0);
      ctxRef.current?.close().catch(() => {});
    };
  }, [loop, stopLoop]);

  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <div className="relative z-30 border-t border-white/15 bg-black/80" role="group" aria-label="Reproductor de DISCO DANZ">
      <audio ref={audioRef} src="/audio/disco-danz.mp3" preload="none" />
      <div className="wrap flex items-center gap-4 py-4 md:gap-8 md:py-5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden md:h-16 md:w-16">
          <Image src="/images/brand/disco-danz-cover.webp" alt="Portada de DISCO DANZ, de DJ Greek" fill sizes="64px" className="object-cover" />
        </div>
        <div className="min-w-0 md:w-56 lg:w-72">
          <p className="truncate text-xl font-extrabold uppercase leading-none tracking-tight md:text-2xl">DISCO DANZ</p>
          <p className="mt-1 truncate text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/70">DJ Greek</p>
        </div>

        {/* Espectro: reacciona al audio en tiempo real */}
        <div aria-hidden className="hidden h-12 flex-1 items-end gap-[3px] md:flex">
          {Array.from({ length: BARS }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className="block h-full flex-1 origin-bottom bg-neon"
              style={{ transform: "scaleY(0.06)", transition: playing ? "none" : "transform .5s ease" }}
            />
          ))}
        </div>

        <span className="ml-auto hidden text-sm tabular-nums text-white/70 sm:block">
          {fmt(time)} / {fmt(dur || 91)}
        </span>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar DISCO DANZ" : "Reproducir DISCO DANZ"}
          data-cursor={playing ? "PAUSA" : "PLAY"}
          className="ml-auto grid h-14 w-14 shrink-0 place-items-center border border-neon bg-neon text-black transition hover:bg-transparent hover:text-neon sm:ml-0 md:h-16 md:w-16"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M7 4v16l13-8z" /></svg>
          )}
        </button>
      </div>
      <div className="wrap pb-3">
        <input
          type="range"
          className="scrub w-full"
          min={0}
          max={dur || 91}
          step={0.1}
          value={time}
          aria-label="Posición de la canción"
          style={{ ["--p" as string]: `${pct}%` }}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (audioRef.current) audioRef.current.currentTime = v;
            setTime(v);
          }}
        />
      </div>
    </div>
  );
}
