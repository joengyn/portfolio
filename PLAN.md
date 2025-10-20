# Project Improvement Plan

This document outlines a plan to address identified areas for improvement in the portfolio website, categorized into immediate updates and broader enhancements.

## Immediate Updates (from initial code review) ✅ COMPLETED

These updates focus on direct code changes to improve maintainability, fix minor issues, and enhance data management.

### 1. Refactor Header JavaScript ✅
*   **Status:** COMPLETED
*   Moved header logic to inline script in Header.astro (optimal for Astro architecture)
*   Applied transition classes once to the header element
*   Removed console.log statements

### 2. Centralize Project Data ✅
*   **Status:** COMPLETED
*   Created `src/data/projects.json` with all project details
*   Updated `src/pages/index.astro` to use `import.meta.glob()` for dynamic image loading
*   Implemented `isVisible` filtering for project display

### 3. Dynamic `alt` Attributes for Project Cards ✅
*   **Status:** COMPLETED
*   Updated `src/components/ProjectCard.astro` with dynamic alt text generation
*   Alt text now uses project title for better accessibility (e.g., `${title} background`)

### 4. Clean Up `index.astro` ✅
*   **Status:** COMPLETED
*   Removed all hardcoded ProjectCard instances
*   Removed commented-out Pink Sofa Hour card
*   Implemented dynamic rendering from projects.json

### 5. Directory Structure Refactoring ✅
*   **Status:** COMPLETED
*   Flattened repository structure by removing `portfolio_ui/` nesting
*   All project files now at repository root for cleaner GitHub visibility

## Broader Enhancements (from second code review)

These enhancements focus on improving the overall quality, performance, and user experience of the site.

### 1. Enhance Accessibility (A11y) ✅ IN PROGRESS
*   **Goal:** Ensure the website is usable by everyone, regardless of ability.
*   **Tasks:**
    *   **Keyboard Navigation & Focus States** ✅ COMPLETED
        *   Comprehensive audit of all interactive elements completed
        *   Global focus styles implemented in Layout.astro (2px outline, 4px offset, 2px border-radius)
        *   Component-specific focus styles for mobile menu, footer, project cards
        *   Consistent `:focus-visible` styling across all interactive elements
        *   Focus indicators have proper spacing and visibility on all backgrounds
    *   **ARIA Attributes** ✅ COMPLETED
        *   Mobile menu: `role="navigation"`, `aria-label`, `aria-expanded`, `aria-controls`
        *   Menu button: `aria-label="Toggle navigation menu"`, dynamic `aria-expanded`
        *   Close button: `aria-label="Close navigation menu"`, `aria-hidden` on decorative elements
        *   Footer links: `aria-label` on social media icons with `rel="noopener noreferrer"`
        *   Image Slider: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-live`
    *   **Mobile Menu Tab Order** ✅ COMPLETED
        *   Fixed double-tabbing issue by converting nested buttons to styled links
        *   Implemented `inert` attribute management for hidden menu state
        *   MutationObserver syncs `aria-expanded` with `tabindex` state
        *   Menu items only tabbable when menu is open
    *   **Keyboard Support** ✅ COMPLETED
        *   Enter/Space opens and closes mobile menu
        *   Escape key closes mobile menu
        *   Focus management moves to close button when menu opens
        *   Proper event prevention and state management
    *   **Contact Button Refactoring** ✅ COMPLETED
        *   Mobile menu: Converted from nested button to styled link
        *   Footer: Converted from nested button to styled link
        *   About page: Converted from nested button to styled link
        *   Eliminated double-tab focus issues
    *   **Color Contrast Audit:** Perform a color contrast analysis to ensure all text and interactive elements meet WCAG 2.1 AA standards. (Pending)

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
