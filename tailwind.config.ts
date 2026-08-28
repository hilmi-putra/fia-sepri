import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pixel Game Palette
        wedding: {
          primary: "#DAB2B8",
          secondary: "#E7B1A7",
          tertiary: "#C8A66B",
          neutral: "#F7F2E6",
        },
        // Old Ghibli vibes (kept for backwards compatibility so build doesn't fail)
        ghibli: {
          blue: "#4A7c8C",
          green: "#6B8E6B",
          cream: "#F4F1E1",
          dark: "#2F3E46",
          gold: "#D4AF37",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
        pixel: ['var(--font-press-start)', 'monospace'],
      }
    },
  },
  plugins: [],
};

export default config;
