"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/data/site";
import { scrollToId } from "./SmoothScroll";
import { SOCIAL_ICONS } from "./Icons";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const IG = SOCIAL_ICONS.instagram;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = [...NAV.map((n) => n.id), "contacto"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Deja que el menú cierre y el scroll se libere antes de desplazar
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-white/15 bg-black/95" : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="wrap flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href="#inicio" onClick={go("inicio")} className="flex items-center gap-2.5" aria-label="DJ Greek, ir al inicio">
          <Image src="/images/brand/omega.webp" alt="" width={206} height={194} className="h-[1.15rem] w-auto md:h-[1.3rem]" priority />
          <span className="whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight text-neon md:text-[1.7rem]">DJ Greek</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 xl:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={go(n.id)}
              aria-current={active === n.id ? "true" : undefined}
              className={cn(
                "relative py-3 text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-neon",
                active === n.id ? "text-neon" : "text-white/80"
              )}
            >
              {n.label}
              <span
                aria-hidden
                className={cn("absolute inset-x-0 -bottom-0.5 h-px origin-left bg-neon transition-transform duration-500", active === n.id ? "scale-x-100" : "scale-x-0")}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_click", { channel: "instagram", location: "header" })}
            className="hidden h-11 items-center gap-2 border border-neon px-5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-neon transition hover:bg-neon hover:text-black md:inline-flex"
          >
            <IG className="h-4 w-4" aria-hidden />
            Contáctame
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="grid h-11 w-11 place-items-center border border-white/30 xl:hidden"
              aria-label="Abrir menú"
            >
              <span aria-hidden className="flex flex-col gap-[6px]">
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
              </span>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Content asChild forceMount aria-describedby={undefined}>
                    <motion.div
                      data-lenis-prevent
                      className="fixed inset-0 z-[80] flex flex-col bg-black"
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(0 0 0% 0)" }}
                      exit={{ clipPath: "inset(0 0 100% 0)" }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Dialog.Title className="sr-only">Menú</Dialog.Title>
                      <div className="wrap flex h-16 items-center justify-between">
                        <span className="text-2xl font-extrabold uppercase tracking-tight text-neon">DJ Greek</span>
                        <Dialog.Close className="grid h-11 w-11 place-items-center border border-white/30" aria-label="Cerrar menú">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
                        </Dialog.Close>
                      </div>
                      <nav aria-label="Menú móvil" className="wrap flex flex-1 flex-col justify-center gap-1">
                        {NAV.map((n, idx) => (
                          <a
                            key={n.id}
                            href={`#${n.id}`}
                            onClick={go(n.id)}
                            className="display flex items-baseline gap-4 border-b border-white/10 py-3 text-[clamp(2.6rem,13vw,4.5rem)] transition-colors active:text-neon"
                          >
                            {n.label}
                          </a>
                        ))}
                      </nav>
                      <div className="wrap pb-8">
                        <a href={SITE.instagramDm} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-3 bg-neon text-[0.8rem] font-bold uppercase tracking-[0.16em] text-black">
                          <IG className="h-5 w-5" aria-hidden /> Contáctame por Instagram
                        </a>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
