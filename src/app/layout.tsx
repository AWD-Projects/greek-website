import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE, SOCIALS } from "@/data/site";
import { SEO, isProduction, jsonLd } from "@/lib/seo";

const jost = localFont({
  src: "./fonts/Jost-Variable.woff2",
  variable: "--font-jost",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SEO.title, template: "%s | DJ Greek" },
  description: SEO.description,
  applicationName: "DJ Greek",
  authors: [{ name: "DJ Greek", url: SITE.url }],
  alternates: { canonical: "/", languages: { "es-MX": "/" } },
  robots: isProduction
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DJ Greek",
    locale: "es_MX",
    title: SEO.title,
    description: SEO.description,
    images: [{ url: "/og/greek-og.jpg", width: 1200, height: 630, alt: SEO.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [{ url: "/og/greek-og.jpg", alt: SEO.ogAlt }],
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  other: { "instagram-profile": SOCIALS[0].href },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={jost.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
