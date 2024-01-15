import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        heading: ["var(--font-heading)"],
      },
      colors: {
        accent: "#06b6d4",
        accentDark: "#ffdb4d",
        dark: "rgb(0 0 0)",
        light: "#FFF",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
export default config;
