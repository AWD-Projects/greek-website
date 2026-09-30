"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, SplitTitle } from "./Motion";
import { GALLERY } from "@/data/gallery";

const INITIAL = 12;

export default function Gallery() {
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const shown = all ? GALLERY : GALLERY.slice(0, INITIAL);

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const photo = open !== null ? GALLERY[open] : null;

  return (
    <section id="galeria" className="section-y relative">
      <div className="wrap">
        <Eyebrow index="05">Galería</Eyebrow>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <SplitTitle lines={["Galería"]} className="text-[clamp(3.2rem,9.5vw,9rem)]" />
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-white/70 tabular-nums">
            {shown.length} / {GALLERY.length} fotos
          </p>
        </div>
      </div>

      <ul className="mt-14 columns-2 gap-1 md:mt-20 lg:columns-3 xl:columns-4 [&>li]:mb-1">
        {shown.map((p, i) => (
          <motion.li
            key={p.src}
            className="break-inside-avoid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="VER"
              aria-label={`Ampliar foto ${i + 1}: ${p.alt}`}
              className="duotone group block w-full overflow-hidden"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                className="h-auto w-full group-hover:scale-[1.04]"
              />
            </button>
          </motion.li>
        ))}
      </ul>

      {GALLERY.length > INITIAL && (
        <div className="wrap mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            aria-expanded={all}
            className="inline-flex h-14 items-center border border-neon px-8 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-neon transition hover:bg-neon hover:text-black"
          >
            {all ? "Ver menos" : `Ver las ${GALLERY.length} fotos`}
          </button>
        </div>
      )}

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/95" />
          <Dialog.Content
            data-lenis-prevent
            aria-describedby={undefined}
            className="fixed inset-0 z-[91] flex flex-col"
          >
            <Dialog.Title className="sr-only">Galería de fotos de DJ Greek</Dialog.Title>
            <div className="wrap flex h-16 shrink-0 items-center justify-between">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] tabular-nums text-white/80">
                {open !== null ? open + 1 : 0} / {GALLERY.length}
              </p>
              <Dialog.Close className="grid h-11 w-11 place-items-center border border-white/30 hover:border-neon hover:text-neon" aria-label="Cerrar galería">
                <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
              </Dialog.Close>
            </div>

            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {photo && (
                  <motion.div
                    key={photo.src}
                    className="absolute inset-x-4 inset-y-0 md:inset-x-24"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.28 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -70) step(1);
                      else if (info.offset.x > 70) step(-1);
                    }}
                  >
                    <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" priority />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 bg-black/60 hover:border-neon hover:text-neon md:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 bg-black/60 hover:border-neon hover:text-neon md:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <p className="wrap shrink-0 py-4 text-center text-sm text-white/75">{photo?.alt}</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
