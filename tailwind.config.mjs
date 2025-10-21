/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", display: "none" },
          "100%": { opacity: "1", display: "block" },
        },
      },
      animation: {
        fadeIn: "fadeIn 3s ease-in-out 1 forwards 2s",
      },
      colors: {
        lightGray: "#f3f3f3",
        gray: "#d3d3d3",
        darkGray: "#313131",
      },
      screens: {
        'custom-md': '425px',
      },
    },
  },
  plugins: [],
};
