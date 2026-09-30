import Image from "next/image";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden border-t border-white/10">
      <Image
        src="/images/footer/greek-shot.webp"
        alt="Greek sosteniendo un caballito de tequila frente a la cámara, en primer plano desenfocado"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-40"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/70" />

      <p aria-hidden className="display fade-neon select-none pl-[var(--pad)] text-[24.5vw] leading-[0.8]">
        Greek
      </p>

      <div className="wrap flex flex-col gap-3 border-t border-white/15 pb-24 pt-5 lg:pb-5 text-[0.75rem] uppercase tracking-[0.16em] text-white/75 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} DJ Greek</p>
        <a href={SITE.builderUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Desarrollado por <span className="font-bold text-neon">Amoxtli Web Developers</span>
        </a>
        <a href={SITE.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Aviso de privacidad
        </a>
      </div>
    </footer>
  );
}
