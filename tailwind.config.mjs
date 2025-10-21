/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Simplified warm palette - light to dark
        white: "#FAF8F3",       // Lightest - main light bg and text
        sand: "#E6DFD0",        // Light - secondary surfaces
        slate: "#1C1A18",       // Dark - secondary dark surfaces and borders
        black: "#0F0E0D",       // Darkest - main dark bg and text
      },
      screens: {
        'custom-md': '425px',
      },
      boxShadow: {
        // Depth shadows - light mode (subtle warm-toned blacks)
        'depth-xs': '0 1px 2px rgba(15, 14, 13, 0.05)',
        'depth-sm': '0 2px 4px rgba(15, 14, 13, 0.08)',
        'depth-md': '0 4px 12px rgba(15, 14, 13, 0.12)',
        'depth-lg': '0 8px 24px rgba(15, 14, 13, 0.15)',
        'depth-xl': '0 12px 48px rgba(15, 14, 13, 0.2)',
        // Interactive shadows for hover/lift effects
        'lift-sm': '0 4px 8px rgba(15, 14, 13, 0.1)',
        'lift-md': '0 8px 16px rgba(15, 14, 13, 0.15)',
        'lift-lg': '0 12px 32px rgba(15, 14, 13, 0.2)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
};
