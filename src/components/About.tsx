import Image from "next/image";
import { ParallaxFrame, Reveal, ScrollText, SplitTitle } from "./Motion";

const FACTS = [
  { k: "Estilo", v: "House · Open Format" },
  { k: "Formación", v: "Virtuality Audio · Beat System" },
  { k: "Mentores", v: "Bass Kleph · Travis Emmons" },
  { k: "Lanzamientos", v: "Disco Danz · Shot · Whistle" },
  { k: "Trayectoria", v: "Más de 10 años en eventos privados y clubes" },
];

export default function About() {
  return (
    <section id="sobre" className="section-y relative">
      <div className="wrap grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10 lg:gap-x-16">
        {/* Retrato en duotono verde */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ParallaxFrame className="duotone aspect-square w-full md:aspect-[16/10] lg:aspect-[4/5]" amount={7}>
              <Image
                src="/images/about/greek.webp"
                alt="Retrato de Greek con lentes de sol ovalados y gesto serio, en verde neón"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-top"
              />
            </ParallaxFrame>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <SplitTitle lines={["¿Quién es", "DJ Greek?"]} className="t-section" lineClassName={["", "text-neon"]} />

          <ScrollText
            className="mt-8 max-w-[60ch] text-[1.02rem] leading-[1.75] text-white md:mt-10 md:text-[1.12rem]"
            text="Greek combina la energía del House con la versatilidad del Open Format. Con una sólida trayectoria, formación integral y presencia internacional gracias a su lanzamiento “Shot” con Kibbutz Records de Portugal, proyecta una identidad marcada por el verde neón, la energía y su conexión con el público."
          />

          <Reveal className="mt-10 md:mt-12">
            <dl className="max-w-2xl border-t border-white/15">
              {FACTS.map((f) => (
                <div key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-white/15 py-3.5 md:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow !tracking-[0.22em]">{f.k}</dt>
                  <dd className="text-[0.98rem] font-medium md:text-lg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-10 max-w-xl md:mt-14">
            <p className="text-[clamp(1.3rem,2.1vw,1.85rem)] font-light leading-[1.22] tracking-tight">
              Greek es para quienes buscan algo extraordinario. Una experiencia inolvidable.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
