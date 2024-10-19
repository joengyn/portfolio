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
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        moveUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        fade: "fade 5s ease-in-out 1 forwards",
        fadeOut: "fadeOut 5s 2s forwards",
        moveUp: "moveUp 3s ease-in-out 1 forwards",
      },
      colors: {
        gray: "#d3d3d3",
        darkGray: "#313131",
      },
      backgroundImage: {
        wave: "url('src/assets/black-wave.jpeg')",
      },
      backgroundSize: {
        "250%": "250%",
      },
    },
  },
  plugins: [],
};
