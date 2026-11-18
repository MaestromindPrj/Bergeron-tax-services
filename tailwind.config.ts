import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#071D49",
          dark: "#051535",
          light: "#0B2660",
          card: "#0d2556",
        },
        gold: {
          DEFAULT: "#D9A323",
          light: "#E5B94E",
          deep: "#B88620",
          hover: "#C4921F",
          subtle: "rgba(217, 163, 35, 0.15)",
        },
        darkSlate: {
          DEFAULT: "#17243A",
          card: "#1C2D48",
          border: "#2A3C5B",
        },
        lightGrey: {
          DEFAULT: "#F4F5F7",
          border: "#E4E7EC",
          hover: "#E9ECF0",
        },
        secondaryText: "#667085",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 30px -4px rgba(0, 0, 0, 0.1)",
        "gold-glow": "0 0 25px -5px rgba(217, 163, 35, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
