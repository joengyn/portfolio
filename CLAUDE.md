# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **Astro**, featuring case studies of design and engineering projects. The site showcases Joe Nguyen's work as a designer and engineer, with interactive animations and responsive design. The portfolio is deployed at [joengyn.com](https://joengyn.com/).

## Directory Structure

- `portfolio_ui/` - Main Astro application
  - `src/pages/` - Individual portfolio pages (Astro file-based routing)
    - `index.astro` - Homepage with project cards
    - `*.astro` - Individual case study pages (berkshiregrey, grammaroke, bandscan, toast, pinksofahour, about)
  - `src/components/` - Reusable Astro components (Header, Footer, Banner, ProjectCard, Button, MobileMenu, StructuredData)
  - `src/layouts/Layout.astro` - Main layout template with header, footer, global styles, and animations
  - `src/assets/` - Images, videos, and other static assets
  - `astro.config.mjs` - Astro configuration with Tailwind and React integrations
  - `tailwind.config.mjs` - Tailwind CSS configuration with custom animations and colors

## Technology Stack

- **Framework**: Astro 5.x with file-based routing
- **Styling**: Tailwind CSS with SCSS support
- **Animations**: CSS animations, Intersection Observer API, HTML5 videos
- **Fonts**: Google Fonts (Montserrat, Lato) with async loading
- **Analytics**: Google Analytics (gtag)
- **Code Formatting**: Prettier with Astro and Tailwind plugins
- **Type Safety**: TypeScript with strict type checking via `astro check`

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
  - Dark mode theme switching with localStorage persistence
  - Async font preloading for performance
  - Responsive font sizing for tablet+ screens

### Page Structure
- **Homepage** (`index.astro`): Displays intro text with project cards and structured data (SEO)
- **Case Study Pages**: Each project (berkshiregrey, grammaroke, bandscan, toast, pinksofahour) has a dedicated page with:
  - Banner component with project overview, roles, tools, duration
  - Rich content sections with images, videos, and text
  - Structured data markup for SEO
- **About Page** (`about.astro`): Profile information with video content

### Component Patterns
- **Astro Components**: Static structural components (Banner, ProjectCard, Button, Header, Footer, MobileMenu, StructuredData)
- **Props**: Components accept TypeScript-like prop interfaces at the top in Astro frontmatter
- **Type Safety**: All components properly typed with strict TypeScript checking

### Animation & Interactions
- **CSS Animations**: Staggered fade-in effects for project cards using Tailwind utilities
- **Intersection Observer API**: Used for scroll-triggered project card animations
- **HTML5 Videos**: WebM and MP4 formats used for case study demos (with autoplay and controls)
- **Interactive Elements**: Mobile menu toggle with keyboard support (Enter/Space), theme switcher
- **Transitions**: Smooth hover effects and focus states with accessible outlines

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
   - Use Astro components with inline `<script>` tags for client-side interactivity
   - Follow existing patterns in Header.astro and MobileMenu.astro for event handling
   - Use proper type assertions (e.g., `as KeyboardEvent`) for DOM events

## Code Quality

- **Prettier formatting** is configured with:
  - Single quotes for JS/JSX/Astro
  - Astro parser for `.astro` files
  - Tailwind class ordering plugin
  - SCSS support
- Run `npm run prettier --write src/` to format (if prettier script is configured)

## Performance Considerations

- **Font preloading**: Fonts preloaded in Layout with async loading via JavaScript to prevent render-blocking
- **Responsive images**: Use Astro's `<Image>` component with `.webp` format for optimized delivery
- **Video optimization**: WebM format (smaller) as primary with MP4 fallback for compatibility
- **Type checking**: Run `npx astro check` to catch type errors during development
- **Build validation**: All errors, warnings, and hints should be zero before deployment

## Deployment

The site is deployed to [joengyn.com](https://joengyn.com/). After building with `npm run build`, the `dist/` folder contains the static site ready for deployment.

## Git Workflow

The main branch is `main`. Recent commits focus on resume updates and content refinements. Use conventional commit practices for clarity.
