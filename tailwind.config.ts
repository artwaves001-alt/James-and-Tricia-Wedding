import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#555638", "olive-deep": "#414329", rose: "#C58F98", blush: "#E8C7CC",
        sage: "#A8B5A0", champagne: "#D8C29D", ivory: "#FFF9F0", beige: "#E8DCCB", antique: "#756052",
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
