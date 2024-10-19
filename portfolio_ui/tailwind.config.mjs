/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeOut: {
          "0%": { opacity: 1, display: "block" },
          "100%": { opacity: 0, display: "none" },
        },
        moveUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        overflowHidden: {
          "0%": { overflow: "hidden" },
          "100%": { overflow: "auto" },
        },
      },
      animation: {
        fade: "fade 5s ease-in-out 1 forwards 3s",
        fadeOut: "fadeOut 5s 2s 1 forwards",
        moveUp: "moveUp 3s ease-in-out 1 forwards",
        overflowHidden: "overflowHidden 5s forwards",
      },
      colors: {
        gray: "#d3d3d3",
        darkGray: "#313131",
      },
      backgroundImage: {
        wave: "url('src/assets/black-wave.jpeg')",
      },
    },
  },
  plugins: [],
};
