/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm palette inspired by paper, bamboo, and natural materials
        // Light mode
        lightGray: "#FAF8F3",  // Warm cream (like aged paper) - was #f3f3f3
        gray: "#E6DFD0",        // Warm sand (like bamboo mat) - was #d3d3d3
        darkGray: "#0F0E0D",    // Very dark warm charcoal (70% darker!) - was #313131

        // Semantic color aliases for better readability
        cream: "#FAF8F3",       // Same as lightGray
        linen: "#F0EBE3",       // Secondary surfaces
        sand: "#E6DFD0",        // Same as gray
        inkBrown: "#2B2520",    // Warm dark text
        charcoal: "#3D3935",    // Secondary text/borders

        // Dark mode specific
        obsidian: "#0F0E0D",    // Same as darkGray - main dark bg
        slate: "#1C1A18",       // Dark mode secondary surfaces
        stone: "#2B2825",       // Dark mode elevated surfaces
        pearl: "#FAF8F3",       // Dark mode text
        ash: "#D4CFC7",         // Dark mode secondary text
      },
      screens: {
        'custom-md': '425px',
      },
    },
  },
  plugins: [],
};
