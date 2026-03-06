/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        bg: "#0e1520",
        surf: "#141d2e",
        card: "#1a2540",
        border: "#253450",
        coral: "#e8614a",
        sage: "#4bbfa0",
        amber: "#f0a842",
        cream: "#f0ead8",
        muted: "#8090b0",
      },
      animation: {
        breathe: "breathe 3s ease-in-out infinite",
        scanY: "scanY 3.5s linear infinite",
        fadeIn: "fadeIn .4s ease both",
        floatUp: "floatUp .7s ease both",
        spinSlow: "spinSlow 1.2s linear infinite",
        ticker: "ticker 22s linear infinite",
        halo: "halo 2.5s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%,100%": { transform: "scale(1)", opacity: ".85" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        scanY: {
          "0%": { top: "-2px" },
          "100%": { top: "100%" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        floatUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        halo: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(232,97,74,.35)" },
          "50%": { boxShadow: "0 0 0 20px rgba(232,97,74,0)" },
        },
      },
    },
  },
  plugins: [],
};
