# Project Overview
This is a personal portfolio website built with Astro, a modern static site builder. It leverages React for UI components and Tailwind CSS for styling. The project showcases various works and projects of Joe Nguyen, with a focus on a clean and responsive user interface. It also integrates Lottie animations for dynamic visual elements.

# Building and Running

## Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

## Installation
To install the project dependencies, navigate to the `portfolio_ui` directory and run:
```bash
npm install
# or
yarn install
```

## Development
To start the development server with hot-reloading, navigate to the `portfolio_ui` directory and run:
```bash
npm run dev
# or
npm start
```
This will typically start the server at `http://localhost:4321`.

## Building for Production
To build the project for production, navigate to the `portfolio_ui` directory and run:
```bash
npm run build
```
This will generate static assets in the `dist` directory.

## Preview Production Build
To preview the production build locally, navigate to the `portfolio_ui` directory and run:
```bash
npm run preview
```

# Development Conventions

## Technologies Used
*   **Framework:** Astro
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **Animations:** Lottie (via `@lottiefiles/react-lottie-player`)
*   **Language:** TypeScript (implied by `tsconfig.json` extending `astro/tsconfigs/strict`)

## Styling
The project uses Tailwind CSS for utility-first styling. Custom colors (`lightGray`, `gray`, `darkGray`) and animations (`fadeIn`) are defined in `tailwind.config.mjs`.

## Code Formatting
Prettier is used for code formatting, as indicated by `prettier` and `prettier-plugin-astro` in `package.json`.

## Project Structure
The `src` directory likely contains Astro pages (`.astro`), React components (`.tsx`), and assets.
