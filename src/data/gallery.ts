export interface GalleryPhoto {
  src: string;
  w: number;
  h: number;
  alt: string;
}

// Fotos empaquetadas en el repo (antes se leían en vivo de un bucket de Supabase).
export const GALLERY: GalleryPhoto[] = [
  { src: "/images/gallery/gallery-01.webp", w: 1500, h: 1000, alt: "Greek con lentes frente al letrero de neón Ω" },
  { src: "/images/gallery/gallery-02.webp", w: 768, h: 1020, alt: "Greek en cabina frente al letrero de neón Ω" },
  { src: "/images/gallery/gallery-03.webp", w: 1200, h: 1500, alt: "Greek sonriendo con audífonos al aire libre" },
  { src: "/images/gallery/gallery-04.webp", w: 1200, h: 1500, alt: "Retrato de Greek con audífonos ante el letrero de neón" },
  { src: "/images/gallery/gallery-05.webp", w: 843, h: 562, alt: "Greek con invitados brindando en una fiesta nocturna" },
  { src: "/images/gallery/gallery-06.webp", w: 1500, h: 1125, alt: "Greek tras la cabina con el letrero Ω iluminado" },
  { src: "/images/gallery/gallery-07.webp", w: 1200, h: 1500, alt: "Greek sonriendo con lentes oscuros y audífonos" },
  { src: "/images/gallery/gallery-08.webp", w: 1080, h: 1350, alt: "Greek con luz roja junto a un controlador" },
  { src: "/images/gallery/gallery-09.webp", w: 1080, h: 1080, alt: "Greek con luz morada sobre el mixer" },
  { src: "/images/gallery/gallery-10.webp", w: 1125, h: 1500, alt: "Greek mezclando en una mesa con luces de colores durante una fiesta" },
  { src: "/images/gallery/gallery-11.webp", w: 1200, h: 1200, alt: "Greek en blanco y negro con las manos sobre el controlador" },
  { src: "/images/gallery/gallery-12.webp", w: 843, h: 562, alt: "Greek con un brazo en alto en una terraza iluminada" },
  { src: "/images/gallery/gallery-13.webp", w: 1500, h: 1200, alt: "Greek mezclando en un parque con equipo Pioneer" },
  { src: "/images/gallery/gallery-14.webp", w: 1200, h: 1500, alt: "Cabina vista desde arriba con la pista al fondo" },
  { src: "/images/gallery/gallery-15.webp", w: 1500, h: 1000, alt: "Greek con los brazos abiertos al atardecer junto al letrero Ω" },
  { src: "/images/gallery/gallery-16.webp", w: 1500, h: 1000, alt: "Greek en una terraza junto al letrero de neón Ω" },
  { src: "/images/gallery/gallery-17.webp", w: 1500, h: 1000, alt: "Greek en una terraza de noche con el letrero Ω" },
  { src: "/images/gallery/gallery-18.webp", w: 1170, h: 1331, alt: "Cabina de Foro Escarabajo con luz morada" },
  { src: "/images/gallery/gallery-19.webp", w: 713, h: 1500, alt: "Greek en cabina con una pantalla de colores al fondo" },
  { src: "/images/gallery/gallery-20.webp", w: 1200, h: 1500, alt: "Greek a contraluz frente al letrero verde Ω" },
  { src: "/images/gallery/gallery-21.webp", w: 1125, h: 1500, alt: "Greek en cabina junto a un letrero de neón rojo" },
  { src: "/images/gallery/gallery-22.webp", w: 749, h: 1500, alt: "Persona con el brazo en alto en una pista con luces verdes" },
  { src: "/images/gallery/gallery-23.webp", w: 1375, h: 753, alt: "Greek y un invitado sonriendo en la cabina" },
  { src: "/images/gallery/gallery-24.webp", w: 1125, h: 1500, alt: "Greek de perfil junto a un letrero de neón azul" },
];
