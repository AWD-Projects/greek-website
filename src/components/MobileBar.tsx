"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/data/site";
import { SOCIAL_ICONS } from "./Icons";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Barra fija en móvil con los dos contactos directos. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  const IG = SOCIAL_ICONS.instagram;
  const WA = SOCIAL_ICONS.whatsapp;

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[55] grid grid-cols-2 border-t border-neon/60 bg-black pb-[env(safe-area-inset-bottom)] transition-transform duration-500 lg:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <a
        href={SITE.instagramDm}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("contact_click", { channel: "instagram", location: "mobile_bar" })}
        className="flex h-14 items-center justify-center gap-2 bg-neon text-[0.75rem] font-bold uppercase tracking-[0.16em] text-black"
      >
        <IG className="h-5 w-5" aria-hidden /> Instagram
      </a>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("contact_click", { channel: "whatsapp", location: "mobile_bar" })}
        className="flex h-14 items-center justify-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.16em]"
      >
        <WA className="h-5 w-5" aria-hidden /> WhatsApp
      </a>
    </div>
  );
}
