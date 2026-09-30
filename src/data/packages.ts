export interface SpecBullet { label?: string; text: string }
export interface SpecSection { title: string; paragraphs?: string[]; bullets?: SpecBullet[] }
export interface Package {
  id: string;
  name: string;
  price: string;
  unit: string;
  image: string;
  imageAlt: string;
  items: string[];
  specs: SpecSection[];
}

const ANTICIPO: SpecBullet = {
  label: "Anticipo",
  text: "Se requiere un anticipo del 50% del total cotizado para apartar la fecha. Este anticipo es no reembolsable en caso de cancelación. La reprogramación está sujeta a disponibilidad y acuerdo con Greek.",
};
const LIQUIDACION: SpecBullet = {
  label: "Liquidación",
  text: "El evento debe ser liquidado completamente al momento de la llegada de Greek para la instalación. Si no se ha liquidado, el evento no se llevará a cabo y Greek se retirará del lugar.",
};

export const PACKAGES: Package[] = [
  {
    id: "exclusive",
    name: "GREEK EXCLUSIVE",
    price: "$1,000",
    unit: "por hora",
    image: "/images/pricing/privado.webp",
    imageAlt: "Greek en cabina frente al letrero de neón Ω en un evento privado",
    items: [
      "Ideal para reuniones exclusivas, o celebraciones privadas.",
      "Greek se encarga de todo: música, luces y sonido para crear una atmósfera personalizada.",
      "Perfecto para hasta 120 personas, garantizando un ambiente lleno de energía.",
      "Flexibilidad para adaptar la música a tu gusto con posibilidad de enviar una lista previa.",
    ],
    specs: [
      {
        title: "Servicio Privado",
        paragraphs: [
          "El servicio incluye luces, audio y DJ liderado por Greek, con capacidad para hasta 120 personas.",
          "El número de asistentes no afecta la cotización. Si el cliente desea agregar su propio equipo, se integrará si es compatible, sin alterar el costo total.",
        ],
      },
      {
        title: "Incluye",
        bullets: [
          { label: "Subwoofer y satélites", text: "2 unidades" },
          { label: "Parleds", text: "4 unidades" },
          { label: "Láser", text: "1 unidad (opcional)" },
          { label: "Máquina de humo", text: "opcional (600 MXN adicionales)" },
          { label: "Letrero neón Ω", text: "1 unidad" },
          { label: "Controlador DJ", text: "1 unidad" },
          { text: "Mesa para DJ" },
        ],
      },
      {
        title: "Tarifas",
        bullets: [
          { text: "$1,000 por hora durante las primeras cinco horas" },
          { text: "$1,400 por hora a partir de la sexta hora" },
        ],
      },
      {
        title: "Consideraciones previas al evento",
        bullets: [
          ANTICIPO,
          { label: "Preparación", text: "Greek llega al lugar una hora antes del inicio para instalar y hacer pruebas de audio, y necesita 45 minutos para desmontar al finalizar." },
          { label: "Estacionamiento", text: "Se requiere un espacio de estacionamiento reservado para el vehículo de Greek." },
          { label: "Staff", text: "Greek estará acompañado de 1-3 personas de su staff, quienes actuarán profesionalmente, sin interactuar con los invitados más allá de su función." },
          { label: "Playlist", text: "Los clientes pueden enviar una lista de reproducción para orientar la línea musical deseada, incluyendo canciones específicas que quieran escuchar." },
          LIQUIDACION,
        ],
      },
    ],
  },
  {
    id: "club",
    name: "CLUB ENERGY",
    price: "$4,000",
    unit: "por evento",
    image: "/images/pricing/club.webp",
    imageAlt: "Greek con los brazos en alto en la cabina de un club",
    items: [
      "Diseñado para el ambiente electrizante de los clubes.",
      "Greek crea un set que mantiene a la multitud en movimiento toda la noche.",
      "Interacción directa con la audiencia para mantener la pista de baile llena.",
    ],
    specs: [
      {
        title: "Club",
        bullets: [
          { label: "Warm up", text: "1,000 MXN (máximo 2 horas)" },
          { label: "Main", text: "4,000 MXN (máximo 6 horas)" },
        ],
      },
      {
        title: "Requisitos técnicos",
        bullets: [
          { label: "Mixer", text: "mínimo dos canales, completamente funcional." },
          { label: "No Pioneer", text: "Especificar marca y modelo para adaptar la configuración." },
        ],
      },
      {
        title: "Requisitos reproductores",
        bullets: [
          { label: "Preferidos", text: "Modelos CDJ-2000 o posteriores con función de hot cue." },
          { label: "Modelos All In One aceptados", text: "XDJ-RX o controladores de una sola pieza (especificar modelo)." },
        ],
      },
      {
        title: "Requisitos en la cabina",
        bullets: [
          { text: "Monitor personal necesario." },
          { text: "Control de acceso en colaboración con otros DJs, gerentes, RP y Light Jockey." },
          { label: "Cortesía", text: "Botella de Bacardi blanco o tequila nacional (Main)." },
        ],
      },
      { title: "Consideraciones previas al evento", bullets: [ANTICIPO, LIQUIDACION] },
    ],
  },
];
