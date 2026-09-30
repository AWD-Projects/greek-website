import {
  FaApple,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

export const SOCIAL_ICONS = {
  instagram: FaInstagram,
  youtube: FaYoutube,
  spotify: FaSpotify,
  apple: FaApple,
  tiktok: FaTiktok,
  soundcloud: FaSoundcloud,
  whatsapp: FaWhatsapp,
} as const;

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="square" />
    </svg>
  );
}
