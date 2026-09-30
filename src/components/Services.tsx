"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Eyebrow, Reveal, SplitTitle } from "./Motion";
import { ArrowUpRight, SOCIAL_ICONS } from "./Icons";
import { PACKAGES, type Package } from "@/data/packages";
import { SITE, whatsappLink } from "@/data/site";
import { track } from "@/lib/analytics";

function message(p: Package) {
  return `Hola, me interesa contratar el plan "${p.name}" (${p.price} MXN ${p.unit}).`;
}

function SpecDialog({ pkg }: { pkg: Package }) {
  const WA = SOCIAL_ICONS.whatsapp;
  return (
    <Dialog.Root>
      <Dialog.Trigger
        onClick={() => track("open_specs", { plan: pkg.name })}
        className="inline-flex h-14 items-center gap-2 border border-white/35 px-6 text-[0.78rem] font-bold uppercase tracking-[0.16em] transition hover:border-neon hover:text-neon"
      >
        Más info
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/85" />
        <Dialog.Content
          data-lenis-prevent
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[91] max-h-[92svh] overflow-y-auto border-t border-neon bg-ink-3 p-6 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(44rem,100vw)] md:border-l md:border-t-0 md:p-12"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Más especificaciones</p>
              <Dialog.Title className="display mt-3 text-[clamp(2.2rem,5vw,3.6rem)]">{pkg.name}</Dialog.Title>
            </div>
            <Dialog.Close className="grid h-11 w-11 shrink-0 place-items-center border border-white/30 hover:border-neon hover:text-neon" aria-label="Cerrar">
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
            </Dialog.Close>
          </div>

          <div className="mt-10 space-y-9">
            {pkg.specs.map((s) => (
              <section key={s.title}>
                <h3 className="eyebrow border-b border-white/15 pb-3">{s.title}</h3>
                {s.paragraphs?.map((t) => (
                  <p key={t} className="mt-4 text-[0.98rem] leading-relaxed text-white/85">{t}</p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-3">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-[0.98rem] leading-relaxed text-white/85">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-neon" />
                        <span>
                          {b.label && <strong className="font-semibold text-white">{b.label}: </strong>}
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <a
            href={whatsappLink(message(pkg))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_click", { channel: "whatsapp", location: "specs", plan: pkg.name })}
            className="mt-12 inline-flex h-14 w-full items-center justify-center gap-3 bg-neon text-[0.8rem] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white"
          >
            <WA className="h-5 w-5" aria-hidden /> Contratar
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Panel({ pkg, index }: { pkg: Package; index: number }) {
  const IG = SOCIAL_ICONS.instagram;
  const WA = SOCIAL_ICONS.whatsapp;
  return (
    <article className="flex flex-col border-white/15 lg:border-l first:lg:border-l-0">
      <div className="duotone relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]" data-cursor="Ver">
        <Image src={pkg.image} alt={pkg.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="wrap flex flex-1 flex-col py-10 md:py-14">
        <Reveal>
          <p className="eyebrow tabular-nums">Paquete {String(index + 1).padStart(2, "0")}</p>
          <h3 className="display mt-4 text-[clamp(2.6rem,6vw,5.4rem)]">{pkg.name}</h3>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="neon-text text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none tracking-tight">{pkg.price}</span>
            <span className="text-sm font-medium uppercase tracking-[0.22em] text-white/75">MXN · {pkg.unit}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-10 border-t border-white/15">
            {pkg.items.map((t, i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/15 py-4 text-[1.02rem] leading-relaxed text-white/90 md:text-[1.1rem]">
                <span className="eyebrow pt-[0.35em] tabular-nums !tracking-[0.12em]">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={whatsappLink(message(pkg))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_click", { channel: "whatsapp", location: "plan", plan: pkg.name })}
            className="inline-flex h-14 items-center gap-3 border border-neon bg-neon px-6 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-transparent hover:text-neon"
          >
            <WA className="h-5 w-5" aria-hidden /> Contratar
          </a>
          <a
            href={SITE.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_click", { channel: "instagram", location: "plan", plan: pkg.name })}
            className="inline-flex h-14 items-center gap-3 border border-white/35 px-6 text-[0.78rem] font-bold uppercase tracking-[0.16em] transition hover:border-neon hover:text-neon"
          >
            <IG className="h-5 w-5" aria-hidden /> Instagram <ArrowUpRight className="h-4 w-4" />
          </a>
          <SpecDialog pkg={pkg} />
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="relative">
      <div className="wrap section-y !pb-14 md:!pb-20">
        <Eyebrow index="03">Servicios</Eyebrow>
        <SplitTitle lines={["Your way", "with Greek"]} className="mt-6 text-[clamp(3.2rem,9.5vw,9rem)]" lineClassName={["", "text-neon"]} />
      </div>
      <div className="grid border-y border-white/15 lg:grid-cols-2">
        {PACKAGES.map((p, i) => (
          <Panel key={p.id} pkg={p} index={i} />
        ))}
      </div>
    </section>
  );
}
