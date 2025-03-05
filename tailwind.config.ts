import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1280px",
    },
    fontFamily: {
      // admin
      primary: "var(--font-mulish)",
      secondary: "var(--font-playfairDisplay)",
      // layout
      primary_layout: "var(--font-mulish)",
      nav_h_layout: "var(--font-roboto)",
    },
    extend: {
      colors: {
        // admin
        primary: "#0C4476",
        secondary: "#00848E",
        thirdary: "#E56427",
        border: "#E5E7EB",
        // layout
        primary_layout: "#9CC900",
        secondary_layout: "#5A3112",
        hover_layout: "#4dc827",
      },
    },
  },
  plugins: [animate],
};
export default config;
