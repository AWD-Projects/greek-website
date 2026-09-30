"use client";

import { Eyebrow, Reveal, SplitTitle } from "./Motion";
import { ArrowUpRight, SOCIAL_ICONS } from "./Icons";
import { SITE, SOCIALS } from "@/data/site";
import { track } from "@/lib/analytics";

/** Contacto directo por redes: sin formulario ni correo. */
export default function Contact() {
  const WA = SOCIAL_ICONS.whatsapp;
  return (
    <section id="contacto" className="section-y wrap relative">
      <Eyebrow index="07">Contacto</Eyebrow>
      <SplitTitle lines={["Follow me"]} className="t-section mt-5" />
      <Reveal delay={0.1} className="mt-6 max-w-[40ch]">
        <p className="text-[1.02rem] leading-relaxed text-white/85 md:text-[1.12rem]">
          Escríbeme directo por Instagram o WhatsApp y cuéntame de tu evento.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="section-gap">
        <a
          href={SITE.instagramDm}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("contact_click", { channel: "instagram", location: "contact" })}
          data-cursor="DM"
          className="group flex items-end justify-between gap-6 border-y border-neon/70 py-6 transition hover:bg-neon md:py-9"
        >
          <span className="min-w-0">
            <span className="eyebrow block transition group-hover:text-black">Mensaje directo en Instagram</span>
            <span className="display mt-3 block truncate text-[clamp(2.3rem,8.5vw,7rem)] transition group-hover:text-black">{SITE.instagramHandle}</span>
          </span>
          <ArrowUpRight className="mb-2 h-10 w-10 shrink-0 text-neon transition group-hover:text-black md:h-16 md:w-16" />
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("contact_click", { channel: "whatsapp", location: "contact" })}
          className="group flex items-center justify-between gap-6 border-b border-white/20 py-5 transition hover:border-neon md:py-7"
        >
          <span className="flex items-center gap-4 text-[clamp(1.4rem,3.4vw,2.6rem)] font-extrabold uppercase tracking-tight transition group-hover:text-neon">
            <WA className="h-7 w-7 md:h-9 md:w-9" aria-hidden /> WhatsApp
          </span>
          <ArrowUpRight className="h-7 w-7 text-white/60 transition group-hover:text-neon md:h-10 md:w-10" />
        </a>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 md:mt-16">
        <p className="eyebrow mb-6">Sígueme y escúchame</p>
        <ul className="grid gap-x-16 md:grid-cols-2">
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.id];
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("social_click", { network: s.id })}
                  className="group flex items-center gap-5 border-t border-white/15 py-5 transition hover:border-neon"
                >
                  <Icon className="h-6 w-6 shrink-0 text-neon" aria-hidden />
                  <span className="text-lg font-bold uppercase tracking-tight md:text-xl">{s.label}</span>
                  <span className="ml-auto truncate text-sm text-white/70">{s.handle}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/60 transition group-hover:text-neon" />
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
