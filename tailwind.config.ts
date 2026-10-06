import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca de DJ Greek (sin cambios respecto al sitio original)
        neon: { DEFAULT: "#2FD510", alt: "#32CD32", deep: "#1a8a09" },
        ink: { DEFAULT: "#000000", 2: "#0a0a0a", 3: "#121212" },
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      letterSpacing: { tightest: "-0.045em", stage: "0.32em" },
      borderRadius: { none: "0" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};

export default config;
