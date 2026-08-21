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
        // Ghibli vibes
        ghibli: {
          blue: "#4A7c8C", // Serene sky/water blue
          green: "#6B8E6B", // Earthy grass green
          cream: "#F4F1E1", // Warm paper/cream background
          dark: "#2F3E46", // Dark green/slate for text
          gold: "#D4AF37", // Accent gold
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'], // Optional for headings
      }
    },
  },
  plugins: [],
};

export default config;
