# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Always Check PLAN.md

**Before starting any work, always read [PLAN.md](./PLAN.md)** for:
- ✅ Current implementation status and what's already built
- 🚧 Features in progress and known issues
- 📋 Planned features and development roadmap
- 💡 Ideas, notes, and architectural decisions
- 📚 Usage guides for the modal system and animations

PLAN.md is the single source of truth for project status and development direction.

## Project Overview

This is a personal portfolio website built with **Astro**, featuring case studies of design and engineering projects. The site showcases Joe Nguyen's work as a designer and engineer, with interactive animations and responsive design. The portfolio is deployed at [joengyn.com](https://joengyn.com/).

## Directory Structure

- `portfolio_ui/` - Main Astro application
  - `src/pages/` - Individual portfolio pages (Astro file-based routing)
    - `index.astro` - Homepage with project cards
    - `*.astro` - Individual case study pages (berkshiregrey, grammaroke, bandscan, toast, pinksofahour, about)
  - `src/components/` - Reusable Astro and React components
    - `*.astro` - Structural components (Header, Footer, Banner, ProjectCard, etc.)
    - `*.tsx` - React components (EnsoLottie, WaveLottie for Lottie animations)
  - `src/layouts/Layout.astro` - Main layout template with header, footer, global styles
  - `src/assets/` - Images, animations (Lottie JSON files), and other static assets
  - `astro.config.mjs` - Astro configuration with Tailwind and React integrations
  - `tailwind.config.mjs` - Tailwind CSS configuration with custom animations and colors

## Technology Stack

- **Framework**: Astro 3.x with file-based routing
- **Styling**: Tailwind CSS with SCSS support
- **React**: Integrated for interactive components (Lottie animations)
- **Animations**: Lottie (via @lottiefiles/react-lottie-player)
- **Fonts**: Google Fonts (Montserrat, Lato)
- **Analytics**: Google Analytics (gtag)
- **Code Formatting**: Prettier with Astro and Tailwind plugins

## Common Commands

All commands are run from the `portfolio_ui/` directory.

```bash
# Development
npm run dev         # Start development server (localhost:3000)
npm start           # Alias for npm run dev

# Build
npm run build       # Create production build (output to dist/)
npm run preview     # Preview production build locally

# Other
npm run astro       # Run Astro CLI directly
```

## Architecture & Key Patterns

### Layout System
- `Layout.astro` is the main wrapper component with:
  - Global SCSS styles for typography, spacing, and utilities
  - Google Analytics integration
  - Mobile menu, header, and footer components
  - Logo fade-in animation triggered by Intersection Observer when Lottie container leaves viewport
  - Responsive font sizing for tablet+ screens

### Page Structure
- **Homepage** (`index.astro`): Displays intro with Lottie animation and project cards
- **Case Study Pages**: Each project (berkshiregrey, grammaroke, etc.) has a dedicated page with:
  - Banner component with project overview, roles, tools, duration
  - ImageSlider component for showcasing multiple UI screens
  - Structured sections with rich content (images, videos, lists)
  - Navigation buttons (back to top, next case study)

### Component Patterns
- **Astro Components**: Static structural components (Banner, ProjectCard, Button, etc.)
- **React Components**: Imported with `client:only` directive for interactive features (Lottie animations)
- **Props**: Components accept TypeScript-like prop interfaces at the top in Astro frontmatter

### Animation & Interactions
- Lottie animations (enso-circle, wave) are wrapped in React components with client-side state management
- Intersection Observer API used for:
  - Logo fade-in/fade-out based on Lottie visibility
  - Project card animations (fade-in and translate-in on scroll)
- Tailwind custom animations and delays for staggered card effects

### Styling Approach
- **Tailwind utility classes** for layout and responsive design
- **Custom Tailwind extensions** in `tailwind.config.mjs`:
  - Colors: `lightGray`, `gray`, `darkGray`
  - Animations: `fadeIn` (used in Layout for staggered reveals)
  - Screen breakpoint: `custom-md: 425px`
  - Background images: `wave` (for decorative elements)
- **Global SCSS** in Layout for typography (font variables, weights), base elements (p, h2), and utilities (`.wrapper`, `.scrollbar`)

## Development Workflow

1. **Adding a new case study page**:
   - Create a new `.astro` file in `src/pages/`
   - Import Layout, components (Banner, ImageSlider, Button), and assets
   - Use the same structure as existing case studies for consistency

2. **Modifying styles**:
   - Check `tailwind.config.mjs` for Tailwind extensions first
   - Use Tailwind utilities in templates
   - For global styles, edit `Layout.astro`'s `<style is:global>`

3. **Adding interactive features**:
   - Create React components in `src/components/` with `.tsx` extension
   - Import and use with `client:only` directive in Astro files
   - Lottie animations should follow the pattern in `EnsoLottie.tsx` (state management, controlled rendering)

## Code Quality

- **Prettier formatting** is configured with:
  - Single quotes for JS/JSX/Astro
  - Astro parser for `.astro` files
  - Tailwind class ordering plugin
  - SCSS support
- Run `npm run prettier --write src/` to format (if prettier script is configured)

## Performance Considerations

- **Lottie animations**: Wrapped in `setTimeout` to prevent hydration mismatches (see `EnsoLottie.tsx`)
- **Font preloading**: Fonts preloaded in Layout with `rel="preload"` and `onload` callback for async loading
- **Responsive images**: Use Astro's `<Image>` component with `.webp` format for optimized delivery
- **Scrollbar hiding**: Utilities in Layout to hide scrollbars on image sliders (`.scrollbar` class)

## Deployment

The site is deployed to [joengyn.com](https://joengyn.com/). After building with `npm run build`, the `dist/` folder contains the static site ready for deployment.

## Git Workflow

The main branch is `main`. Recent commits focus on resume updates and content refinements. Use conventional commit practices for clarity.
