import { SITE, SOCIALS, SHOW_PODCAST } from "@/data/site";

export const SEO = {
  title: "DJ Greek | DJ para eventos privados y clubes en México",
  description:
    "DJ Greek: House y Open Format para eventos privados y clubes. Paquetes con DJ, luces y audio. Cotiza directo por Instagram o WhatsApp.",
  ogAlt: "DJ Greek frente al letrero de neón Ω en verde",
};

// El sitio solo se indexa en producción; dev y previews van con noindex.
export const isProduction =
  process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_SITE_ENV === "production";

const id = (hash: string) => `${SITE.url}/#${hash}`;

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": id("dj"),
        name: "DJ Greek",
        alternateName: "Greek",
        jobTitle: "DJ",
        url: SITE.url,
        image: `${SITE.url}/images/brand/logo.webp`,
        description:
          "DJ de House y Open Format para eventos privados y clubes, con más de diez años de experiencia.",
        knowsAbout: ["House", "Open Format", "DJ para eventos privados", "DJ para clubes"],
        sameAs: SOCIALS.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: SITE.url,
        name: "DJ Greek",
        inLanguage: "es-MX",
        publisher: { "@id": id("dj") },
      },
      {
        "@type": "WebPage",
        "@id": id("webpage"),
        url: SITE.url,
        name: SEO.title,
        description: SEO.description,
        inLanguage: "es-MX",
        isPartOf: { "@id": id("website") },
        about: { "@id": id("dj") },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.url}/og/greek-og.jpg` },
      },
      {
        "@type": "Service",
        "@id": id("servicio-privados"),
        name: "GREEK EXCLUSIVE",
        serviceType: "DJ para eventos privados",
        description:
          "DJ, luces y sonido para reuniones y celebraciones privadas de hasta 120 personas.",
        provider: { "@id": id("dj") },
      },
      {
        "@type": "Service",
        "@id": id("servicio-clubes"),
        name: "CLUB ENERGY",
        serviceType: "DJ para clubes",
        description: "Sets para clubes que mantienen la pista de baile llena toda la noche.",
        provider: { "@id": id("dj") },
      },
      {
        "@type": "MusicRecording",
        "@id": id("disco-danz"),
        name: "DISCO DANZ",
        byArtist: { "@id": id("dj") },
      },
      {
        "@type": "MusicRecording",
        "@id": id("shot"),
        name: "SHOT",
        byArtist: { "@id": id("dj") },
        publisher: { "@type": "Organization", name: "Kibbutz Records" },
      },
      ...(SHOW_PODCAST ? [{
        "@type": "PodcastSeries",
        "@id": id("podcast"),
        name: "Omega Sessions - Podcast",
        url: "https://open.spotify.com/show/66U9IcPCTGj6DiL3JvfxlQ",
        author: { "@id": id("dj") },
      }] : []),
    ],
  };
}
