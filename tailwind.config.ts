import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "custom": "0px 8px 15px rgba(0, 0, 0, 0.1)",
        "outline": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      },
      scale: {
        '102': '1.02',
      },
      colors: {
        lightBlue: "#f3faf9",
        aqua: "#c5d7d6",
        grey: "#d8d9d5",
        seafoam: "#9fe2bf",
        blue: "#519ece",
        red: "#F8481c",
      },
    },
  },
  plugins: [],
};
export default config;
