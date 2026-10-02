export interface GalleryPhoto {
  src: string;
  w: number;
  h: number;
  alt: string;
}

// Fotos empaquetadas en el repo (public/images/gallery); no dependen de ningún servicio externo.
// Orden pensado para que dos fotos del mismo evento nunca queden juntas.
export const GALLERY: GalleryPhoto[] = [
  { src: "/images/gallery/gallery-01.webp", w: 1500, h: 1500, alt: "Vista desde arriba de la cabina con controlador Pioneer y gente bailando al fondo" },
  { src: "/images/gallery/gallery-02.webp", w: 768, h: 1020, alt: "Greek en cabina frente al letrero de neón Ω verde, con parleds a los lados" },
  { src: "/images/gallery/gallery-03.webp", w: 843, h: 562, alt: "Greek con un brazo en alto en una terraza con luces cálidas" },
  { src: "/images/gallery/gallery-04.webp", w: 1500, h: 1000, alt: "Greek de espaldas en la cabina, con barra iluminada en verde y público al fondo" },
  { src: "/images/gallery/gallery-05.webp", w: 1500, h: 1000, alt: "Greek mezclando en una terraza de día con plantas y edificio al fondo" },
  { src: "/images/gallery/gallery-06.webp", w: 1072, h: 1500, alt: "Greek con lentes y camisa de futbol bajo una bola disco" },
  { src: "/images/gallery/gallery-07.webp", w: 1125, h: 1500, alt: "Greek con audífonos al atardecer sobre un mirador" },
  { src: "/images/gallery/gallery-08.webp", w: 1125, h: 1500, alt: "Greek con el brazo en alto bajo una bola disco con luz roja" },
  { src: "/images/gallery/gallery-09.webp", w: 1500, h: 1000, alt: "Greek sonriendo con lentes de luz verde junto al letrero Ω" },
  { src: "/images/gallery/gallery-10.webp", w: 1125, h: 1500, alt: "Greek de espaldas con jersey 'Santi 06' frente a la pista, con luz morada" },
  { src: "/images/gallery/gallery-11.webp", w: 1500, h: 1125, alt: "Greek de espaldas en la cabina durante una fiesta en un jardín, con luces de colores y gente bailando" },
  { src: "/images/gallery/gallery-12.webp", w: 844, h: 1500, alt: "Letrero Ω en azul con haces de luz roja y azul sobre la cabina" },
  { src: "/images/gallery/gallery-13.webp", w: 1500, h: 1000, alt: "Greek sonriendo mientras mezcla en una terraza de día" },
  { src: "/images/gallery/gallery-14.webp", w: 844, h: 1500, alt: "Greek mezclando al anochecer en un mirador, con un vaso rojo sobre la mesa" },
  { src: "/images/gallery/gallery-15.webp", w: 1125, h: 1500, alt: "Greek en cabina frente al letrero Ω bajo luz verde" },
  { src: "/images/gallery/gallery-16.webp", w: 1125, h: 1500, alt: "Greek de espaldas en cabina bajo un techo de luces azules" },
  { src: "/images/gallery/gallery-17.webp", w: 1125, h: 1500, alt: "Greek mezclando con audífonos bajo una bola disco y luz roja" },
  { src: "/images/gallery/gallery-18.webp", w: 1500, h: 1000, alt: "Detalle del letrero Ω en verde con Greek desenfocado al fondo" },
];
