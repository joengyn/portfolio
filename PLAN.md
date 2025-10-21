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

### 2. Optimize Performance ✅ COMPLETED
*   **Goal:** Improve website loading speed and responsiveness.
*   **Status:** COMPLETED - Achieved 52% build size reduction (50MB → 24MB)
*   **Tasks:**
    *   **Image Sizing & Compression:** ✅ COMPLETED
        *   Converted all public/ PNG/JPEG to WebP (profile.png: 1.7MB → 88KB, wave.jpeg: 1.2MB → 159KB)
        *   Compressed large WebP images in src/assets/ (quality 75-80)
        *   Scaled down oversized design mockups (bandscan-ui: 4510x3833 → 799x679, 2.8MB → 61KB)
        *   Optimized all project card UI images to 800px width for proper display size
        *   Removed 3MB of duplicate non-WebP assets
        *   Total image savings: ~6MB
    *   **Critical CSS Loading:** ✅ COMPLETED
        *   Analyzed global SCSS in Layout.astro - confirmed minimal and optimal (24KB bundle)
        *   Removed unused background image reference from tailwind.config.mjs
        *   No changes needed - CSS already well-optimized
    *   **JavaScript Bundle Size:** ✅ COMPLETED
        *   Replaced @lottiefiles/react-lottie-player with lightweight lottie-web (508KB → 493KB)
        *   Implemented client:load for EnsoLottie (smooth initial load without layout shift)
        *   Implemented client:idle for WaveLottie (deferred loading)
        *   Fixed CommonJS import issues (removed AnimationItem named export)
        *   Removed unnecessary setTimeout/useState from EnsoLottie
        *   Total JS savings: 15KB + improved loading strategy
    *   **Video Optimization:** ✅ COMPLETED (bonus)
        *   Optimized all MP4 files using ffmpeg (CRF 28, H.264)
        *   fpv-clip.mp4: 14MB → 6.6MB (53% reduction)
        *   UI demo videos: 87-92% reduction (scrolling-video: 1.4MB → 115KB)
        *   Total video savings: ~11.4MB
*   **Results:**
    *   Build size: 50MB → 24MB (52% reduction, exceeded 20-30% target)
    *   Assets directory: 33MB → 17MB (48% reduction)
    *   Clean build with no errors
    *   Smooth page loading without layout shift

### 3. Improve Maintainability and Best Practices ✅ COMPLETED
*   **Goal:** Increase code quality, reduce potential errors, and improve long-term maintainability.
*   **Status:** COMPLETED - All maintainability improvements implemented
*   **Tasks:**
    *   **TypeScript Strictness:** ✅ COMPLETED
        *   Reviewed tsconfig.json - extends "astro/tsconfigs/strict" (already optimal)
        *   Strict mode enabled with noImplicitAny and strictNullChecks
        *   No additional strictness needed
    *   **SEO Enhancements:** ✅ COMPLETED
        *   **Dynamic Meta Description:** ✅ COMPLETED
            *   Updated Layout.astro to accept `description` prop with sensible default
            *   Added unique meta descriptions to all 7 pages (index, about, 5 project pages)
            *   Verified in build output
        *   **Structured Data (JSON-LD):** ✅ COMPLETED
            *   Created StructuredData.astro component for injecting JSON-LD schemas
            *   Homepage: WebSite schema with author and portfolio information
            *   About page: Person schema with job title, location (Boulder, CO), alumni info
            *   Project pages: CreativeWork schemas with descriptions, keywords, URLs
                *   Berkshire Grey: HMI Design, UX Design, Robotics, Enterprise Software
                *   Grammaroke: Music, Language Learning, Education Technology, Web Application
                *   Bandscan: UX Design, UI Design, Mobile App, SolidJS
                *   Toast: UX Design, UI Design, User Research, Mobile App, Restaurant Technology
                *   Pink Sofa Hour: Web Design, Branding, Music Community, Wix Studio
            *   Validated all JSON-LD output in built HTML files
    *   **Error Boundaries (React Components):** ✅ COMPLETED
        *   Created ErrorBoundary.tsx component with proper error handling
        *   Wrapped EnsoLottie component with error boundary and fallback UI
        *   Wrapped WaveLottie component with error boundary and fallback UI
        *   Graceful degradation: animations fail silently without breaking page
        *   Error logging to console for debugging maintained
        *   Build tested successfully (492.44 KB → 492.96 KB, +0.52 KB overhead)
*   **Results:**
    *   Production-ready code with proper error handling
    *   SEO-optimized with structured data for search engines
    *   Type-safe codebase with strict TypeScript configuration
    *   All 7 pages have unique meta descriptions and appropriate schema markup

### 4. Refine User Experience (UX)
*   **Goal:** Provide a smoother and more engaging user experience.
*   **Tasks:**
    *   **Loading Indicators:** Implement subtle loading indicators or skeleton states for images and dynamic content that might take time to load.
    *   **Prefetching/Preloading:** Investigate and implement Astro's prefetching capabilities for internal links to speed up navigation between pages.
