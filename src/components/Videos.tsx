"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Eyebrow, Reveal, SplitTitle } from "./Motion";
import { ArrowUpRight, SOCIAL_ICONS } from "./Icons";
import { CHANNEL, VIDEOS } from "@/data/videos";
import { track } from "@/lib/analytics";

function Thumb({ i, big, onOpen }: { i: number; big?: boolean; onOpen: (i: number) => void }) {
  const v = VIDEOS[i];
  return (
    <button
      type="button"
      onClick={() => onOpen(i)}
      data-cursor="PLAY"
      aria-label={`Reproducir video ${i + 1} de DJ Greek`}
      className="duotone group relative block aspect-video w-full overflow-hidden text-left"
    >
      <Image src={v.thumb} alt={v.alt} fill sizes={big ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 34vw, 100vw"} className="object-cover group-hover:scale-[1.04]" />
      <span aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
        <span aria-hidden className="grid h-11 w-11 place-items-center border border-neon bg-black/50 text-neon transition group-hover:bg-neon group-hover:text-black">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
        </span>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]">Video {i + 1}</span>
      </span>
    </button>
  );
}

export default function Videos() {
  const [current, setCurrent] = useState<number | null>(null);
  const YT = SOCIAL_ICONS.youtube;
  const v = current !== null ? VIDEOS[current] : null;

  return (
    <section id="videos" className="section-y wrap relative">
      <Eyebrow index="04">Videos</Eyebrow>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <SplitTitle lines={["Videos"]} className="text-[clamp(3.2rem,9.5vw,9rem)]" />
        <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <div className="flex items-center gap-4">
            <Image src="/images/videos/channel.webp" alt="Foto de perfil del canal de DJ Greek" width={56} height={56} className="h-14 w-14 rounded-full" />
            <p className="text-xl font-extrabold uppercase tracking-tight">{CHANNEL.name}</p>
          </div>
          <dl className="flex gap-8">
            {CHANNEL.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold tabular-nums text-neon md:text-3xl">{s.value}</dd>
                <p aria-hidden className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/70">{s.label}</p>
              </div>
            ))}
          </dl>
          <a
            href={CHANNEL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 border border-white/35 px-5 text-[0.75rem] font-bold uppercase tracking-[0.16em] transition hover:border-neon hover:text-neon"
          >
            <YT className="h-5 w-5" aria-hidden /> YouTube <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-1 md:mt-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Thumb i={0} big onOpen={setCurrent} />
        </Reveal>
        <div className="grid gap-1 lg:col-span-5">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Thumb i={i} onOpen={setCurrent} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog.Root open={current !== null} onOpenChange={(o) => !o && setCurrent(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/90" />
          <Dialog.Content
            data-lenis-prevent
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[91] w-[min(64rem,94vw)] -translate-x-1/2 -translate-y-1/2"
          >
            <Dialog.Title className="sr-only">Video {current !== null ? current + 1 : ""} de DJ Greek</Dialog.Title>
            {v && (
              <div className="aspect-video w-full border border-neon/60 bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0${v.start ? `&start=${v.start}` : ""}`}
                  title={`Video ${current! + 1} de DJ Greek`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              {v && (
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("open_youtube", { video: v.id })}
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-neon"
                >
                  Abrir en YouTube ↗
                </a>
              )}
              <Dialog.Close className="grid h-11 w-11 place-items-center border border-white/30 hover:border-neon hover:text-neon" aria-label="Cerrar video">
                <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
