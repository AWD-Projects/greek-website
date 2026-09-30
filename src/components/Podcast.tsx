import Image from "next/image";
import { Eyebrow, ParallaxFrame, Reveal, SplitTitle } from "./Motion";
import { ArrowUpRight, SOCIAL_ICONS } from "./Icons";

const SPOTIFY = "https://open.spotify.com/show/66U9IcPCTGj6DiL3JvfxlQ";
const YOUTUBE = "https://www.youtube.com/@greek0006/podcasts";

export default function Podcast() {
  const SP = SOCIAL_ICONS.spotify;
  const YT = SOCIAL_ICONS.youtube;
  return (
    <section id="podcast" className="section-y relative border-t border-white/10 bg-ink-2">
      <div className="grid grid-cols-12 items-center gap-x-5 gap-y-14 md:gap-x-10">
        <div className="wrap col-span-12 md:order-2 md:col-span-6 lg:col-span-7 md:pl-0">
          <Eyebrow index="06">Podcast</Eyebrow>
          <SplitTitle lines={["Omega Sessions", "Podcast"]} className="t-section mt-5" lineClassName={["", "text-neon"]} />
          <Reveal delay={0.1} className="mt-8 max-w-[52ch]">
            <p className="text-[1.02rem] leading-[1.75] text-white/85 md:text-[1.12rem]">
              Omega Sessions - Podcast es el espacio donde la música y las historias se unen. Cada episodio te lleva a la historia detrás de cada artista invitado, detrás de sus cabinas y sus personajes.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href={SPOTIFY}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Escuchar"
              className="inline-flex h-14 items-center justify-center gap-3 border border-neon bg-neon px-6 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-transparent hover:text-neon"
            >
              <SP className="h-5 w-5" aria-hidden /> Escuchar en Spotify <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 border border-white/35 px-6 text-[0.78rem] font-bold uppercase tracking-[0.16em] transition hover:border-neon hover:text-neon"
            >
              <YT className="h-5 w-5" aria-hidden /> Ver en YouTube <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="wrap col-span-12 md:order-1 md:col-span-6 lg:col-span-5">
          <ParallaxFrame className="duotone mx-auto aspect-square w-full max-w-md border border-neon/50 md:max-w-none" amount={5}>
            <Image
              src="/images/podcast/omega-sessions.webp"
              alt="Logo de Omega Sessions, el podcast de DJ Greek"
              fill
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-cover"
            />
          </ParallaxFrame>
        </div>
      </div>
    </section>
  );
}
