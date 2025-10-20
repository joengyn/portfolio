# Project Improvement Plan

This document outlines a plan to address identified areas for improvement in the portfolio website, categorized into immediate updates and broader enhancements.

## Immediate Updates (from initial code review)

These updates focus on direct code changes to improve maintainability, fix minor issues, and enhance data management.

### 1. Refactor Header JavaScript
*   **Goal:** Improve organization and optimize JavaScript loading for the header's interactive elements.
*   **Tasks:**
    *   Create `portfolio_ui/src/scripts/header.js`.
    *   Move mobile menu and scroll animation logic from `Header.astro` into `header.js`.
    *   Import `header.js` into `Header.astro` using an appropriate Astro client directive (e.g., `client:load`).
    *   Ensure `transition-transform`, `duration-500`, and `ease-in-out` classes are applied only once to the header element, either directly in the HTML or via a single class toggle, rather than on every scroll event within the JavaScript.
    *   Remove `console.log('Scroll function active on this page.');` from the scroll animation logic.

### 2. Centralize Project Data
*   **Goal:** Decouple project content from presentation, making it easier to manage and update portfolio items.
*   **Tasks:**
    *   Create `portfolio_ui/src/data/projects.json`.
    *   Populate `projects.json` with details for each portfolio project (e.g., `href`, `title`, `body`, `bgImg` path, `uiImg` path, `bgAlt`, `uiAlt`, `className` delays, `isVisible`).
    *   Modify `portfolio_ui/src/pages/index.astro` to import `projects.json`.
    *   Iterate over the `projects.json` data to dynamically render `ProjectCard` components, filtering by `isVisible` if implemented.

### 3. Dynamic `alt` Attributes for Project Cards
*   **Goal:** Improve accessibility and SEO for project images.
*   **Tasks:**
    *   Update `portfolio_ui/src/components/ProjectCard.astro` to accept new props: `bgAlt` and `uiAlt`.
    *   Use these new props for the `alt` attributes of the `bgImg` and `uiImg` respectively.
    *   Ensure `projects.json` includes `bgAlt` and `uiAlt` for each project.
    *   Pass `bgAlt` and `uiAlt` from `index.astro` to `ProjectCard.astro` when dynamically rendering.

### 4. Clean Up `index.astro`
*   **Goal:** Remove dead code and streamline `index.astro`.
*   **Tasks:**
    *   Remove the commented-out `ProjectCard` for 'Pink Sofa Hour' from `portfolio_ui/src/pages/index.astro`. Its data will now reside in `projects.json`.

## Broader Enhancements (from second code review)

These enhancements focus on improving the overall quality, performance, and user experience of the site.

### 1. Enhance Accessibility (A11y)
*   **Goal:** Ensure the website is usable by everyone, regardless of ability.
*   **Tasks:**
    *   **Keyboard Navigation & Focus States:** Conduct a comprehensive audit of all interactive elements to ensure full keyboard navigability and implement clear `:focus` styles.
    *   **ARIA Attributes:** Add appropriate ARIA attributes (e.g., `aria-expanded`, `aria-controls`, `aria-label`) to the mobile menu and other dynamic UI elements.
    *   **Color Contrast Audit:** Perform a color contrast analysis to ensure all text and interactive elements meet WCAG 2.1 AA standards.

### 2. Optimize Performance
*   **Goal:** Improve website loading speed and responsiveness.
*   **Tasks:**
    *   **Image Sizing & Compression:** Review all image assets to ensure they are optimally sized and compressed before being used in the project.
    *   **Critical CSS Loading:** Analyze the final CSS bundle. If the global SCSS in `Layout.astro` is substantial, investigate ways to scope styles or convert them to Tailwind utilities.
    *   **JavaScript Bundle Size:** Monitor the client-side JS bundle. Ensure Astro's partial hydration directives are used effectively and consider lazy loading for less critical scripts.

### 3. Improve Maintainability and Best Practices
*   **Goal:** Increase code quality, reduce potential errors, and improve long-term maintainability.
*   **Tasks:**
    *   **TypeScript Strictness:** Review `tsconfig.json` and consider enabling additional strictness flags (e.g., `noImplicitAny`, `strictNullChecks`) for stronger type checking.
    *   **SEO Enhancements:**
        *   **Dynamic Meta Description:** Update `Layout.astro` to accept a `description` prop for dynamic meta descriptions on each page.
        *   **Structured Data (JSON-LD):** Implement JSON-LD for portfolio items and personal information to enhance search engine visibility.
    *   **Error Boundaries (React Components):** Implement an Error Boundary component to wrap React components like `EnsoLottie` to gracefully handle runtime errors.

### 4. Refine User Experience (UX)
*   **Goal:** Provide a smoother and more engaging user experience.
*   **Tasks:**
    *   **Loading Indicators:** Implement subtle loading indicators or skeleton states for images and dynamic content that might take time to load.
    *   **Prefetching/Preloading:** Investigate and implement Astro's prefetching capabilities for internal links to speed up navigation between pages.
