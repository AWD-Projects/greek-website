export const SITE = {
  name: "DJ Greek",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://djgreek.mx",
  tagline: "No se trata de cumplir expectativas; se trata de romperlas. Eso es Greek.",
  instagramHandle: "@greek.06",
  instagram: "https://www.instagram.com/greek.06",
  // Abre el chat directo de Instagram con Greek
  instagramDm: "https://ig.me/m/greek.06",
  whatsappNumber: "525548575825",
  whatsapp: "https://wa.me/525548575825",
  privacyUrl: "https://amoxtli.tech/",
  builderUrl: "https://amoxtli.tech/",
} as const;

export const SOCIALS = [
  { id: "instagram", label: "Instagram", handle: "@greek.06", href: "https://www.instagram.com/greek.06" },
  { id: "youtube", label: "YouTube", handle: "@greek6353", href: "https://youtube.com/@greek6353" },
  { id: "spotify", label: "Spotify", handle: "DJ Greek", href: "https://open.spotify.com/intl-es/artist/71KNSWBRFRbFOLnASreU9K" },
  { id: "apple", label: "Apple Music", handle: "The Greek Ω", href: "https://music.apple.com/mx/artist/the-greek-%CF%89/1553075862" },
  { id: "tiktok", label: "TikTok", handle: "@greektheofficial", href: "https://www.tiktok.com/@greektheofficial" },
  { id: "soundcloud", label: "SoundCloud", handle: "greek06", href: "https://soundcloud.com/greek06" },
] as const;

export const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "cabinas", label: "Cabinas" },
  { id: "servicios", label: "Servicios" },
  { id: "videos", label: "Videos" },
  { id: "galeria", label: "Galería" },
  { id: "podcast", label: "Podcast" },
] as const;

export function whatsappLink(text: string) {
  return `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
