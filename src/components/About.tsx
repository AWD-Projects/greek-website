import Image from "next/image";
import { Eyebrow, Reveal, SplitTitle } from "./Motion";

const FACTS = [
  { k: "Estilo", v: "House · Open Format" },
  { k: "Formación", v: "Virtuality Audio · Beat System" },
  { k: "Mentores", v: "Bass Kleph · Travis Emmons" },
  { k: "Lanzamiento", v: "SHOT · Kibbutz Records, Portugal" },
  { k: "Trayectoria", v: "Más de 6 años en eventos privados y clubes" },
];

export default function About() {
  return (
    <section id="sobre" className="section-y relative">
      <div className="grid grid-cols-12 gap-x-5 gap-y-14 md:gap-x-10">
        {/* Retrato a sangre, en duotono verde */}
        <Reveal className="col-span-12 md:col-span-5">
          <div className="duotone relative aspect-square w-full md:sticky md:top-24" data-cursor="GREEK">
            <Image
              src="/images/about/greek.webp"
              alt="Retrato de Greek con lentes de sol y audífonos al cuello"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
            <span aria-hidden className="absolute bottom-4 left-4 z-10 text-[0.7rem] font-medium uppercase tracking-stage text-black md:bottom-6 md:left-6">
              Greek
            </span>
          </div>
        </Reveal>

        <div className="wrap col-span-12 md:col-span-7 md:pl-0 md:pr-[var(--pad)]">
          <Eyebrow index="01">Sobre</Eyebrow>
          <SplitTitle lines={["¿Quién es", "DJ Greek?"]} className="mt-6 text-[clamp(3.2rem,9.5vw,9rem)]" lineClassName={["", "text-neon"]} />

          <Reveal delay={0.1} className="mt-10 max-w-[62ch] md:mt-14">
            <p className="text-[1.05rem] leading-[1.75] text-white/85 md:text-[1.2rem]">
              Greek, con su estilo en el House y la versatilidad del ‘Open Format’, se destaca como un DJ capaz de crear experiencias memorables y adaptarse a cualquier evento. Su distintivo verde neón evoca energía y renovación, electrificando cada ambiente y dejando una huella inolvidable. Formado en prestigiosas instituciones como Virtuality Audio y Beat System, y guiado por mentores de renombre como Bass Kleph y Travis Emmons, Greek consolida su lugar en la escena. Su lanzamiento internacional Shot con Kibbutz Records en Portugal refuerza su impacto global. Con más de seis años de experiencia en eventos privados y clubes, Greek transforma cada escenario en un espectáculo único, donde su energía y el verde neón invitan a disfrutar al máximo.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 max-w-2xl border-t border-white/15 md:mt-16">
              {FACTS.map((f) => (
                <div key={f.k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-white/15 py-4 md:grid-cols-[10rem_1fr]">
                  <dt className="eyebrow !tracking-[0.24em]">{f.k}</dt>
                  <dd className="text-base font-medium md:text-lg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 max-w-xl md:mt-20">
            <p className="text-[clamp(1.4rem,2.4vw,2.1rem)] font-light leading-[1.2] tracking-tight">
              Con seis años de trayectoria y un magnetismo único, Greek es para quienes buscan algo extraordinario. Una experiencia inolvidable.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
