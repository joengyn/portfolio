# Portfolio Development Plan

**Vision:** Transform the portfolio into a smooth, orchestrated experience with origami-style folding interactions. Clicking a project card triggers choreographed animations that reveal case study content in layers.

**Last Updated:** 2025-01-22

---

## ✅ Implemented Features

### Modal Infrastructure
- ✅ **CaseStudyModal.tsx** - Full-screen overlay that expands from clicked card
  - Tracks card position during initial animation
  - Expands from card dimensions to full banner width
  - ESC key closes modal
  - Close button (fixed position when scrolling)
- ✅ **ProjectCardModalManager.tsx** - Orchestrates card-to-modal animations
  - GSAP timeline for card movement, fades, expansions
  - Hides/shows other cards and intro section
  - Header logo fade in/out during transitions
  - Prevents overlapping animations with `isAnimating` flag
- ✅ **ProjectCard.astro** - Converted from links to buttons
  - `data-project-slug` attribute for modal targeting
  - ViewTransition names for shared element animations
  - Hover effects (translateY + scale)

### Data Architecture
- ✅ **projectData.ts** - Centralized project metadata
  - All 5 projects (berkshiregrey, grammaroke, bandscan, toast, pinksofahour)
  - Banner info (title, overview, roles, tools, duration)
  - Asset imports (proper ImageMetadata types)
  - Helper functions (getVisibleProjects, getProjectBySlug, getNextProject)
- ✅ **CaseStudyContent.astro** - Reusable case study layout wrapper
  - Renders Banner + content slot + navigation
  - Used by modal and individual pages (future)

### Animation System
- ✅ **GSAP utilities** (src/utils/animations.ts)
  - `animateScreenCutOpen()` - Initial page load effect
  - `animateCardToBanner()` - Card expansion
  - `animateBannerContentReveal()` - Staggered banner fade-in
  - `animateSectionFoldIn()` - Scroll-triggered section reveals
  - `animateSectionSlideIn()` - Side slide animations
  - `animateStaggeredReveal()` - Child element stagger
  - `animateHoverTilt()`, `animateButtonPress()` - Micro-interactions
  - `orchestrateModalOpen()`, `orchestrateModalClose()` - Full sequence
  - `prefersReducedMotion()`, `respectMotionPreferences()` - A11y support
- ✅ **CSS animations** (src/styles/animations.scss)
  - Keyframes: layerFoldIn, layerSlideInLeft/Right, fadeIn
  - View Transition customization for shared elements
  - Modal backdrop and content animations
  - `.banner-content-fade`, `.page-content-fade` timing classes
  - Reduced motion media query support

### Layout & Components
- ✅ **ViewTransitions** re-enabled in Layout.astro
- ✅ **Banner.astro** - ViewTransition names, content fade classes
- ✅ **Header.astro** - Auto-hide on scroll (project pages only), relative on index
- ✅ **Case study pages** - All 5 have `.page-content-fade` classes

### Supporting Components (Built, Not Yet Used)
- ✅ **ScreenCutOverlay.tsx** - Initial page load screen cut effect
- ✅ **SectionReveal.tsx** - Scroll-triggered wrapper component
- ✅ **StaggeredReveal.tsx** - Staggered child animations wrapper
- ✅ **InteractiveElement.tsx** - Hover/press effects wrapper

---

## 🚧 In Progress

### Current Focus: Modal Animation Polish
- 🚧 **Fine-tune animation timing** - Make sequence feel natural
  - Current: 2.0s total duration
  - Test different easing curves
  - Adjust stagger delays
- 🚧 **Test on different screen sizes** - Ensure responsiveness
  - Mobile animations (may need simplified/faster)
  - Tablet breakpoints
  - Ultra-wide displays
- 🚧 **Body scroll locking** - Prevent background scroll when modal open
- 🚧 **Animation sequence improvements**
  - Smoother card-to-modal transition
  - Better handling of rapid clicks
  - Loading states for async operations

### Known Issues
- ⚠️ `prefers-reduced-motion` not called in ProjectCardModalManager
- ⚠️ No URL state management (can't share modal state via URL)
- ⚠️ Modal content doesn't actually load case study yet (just shows banner)

---

## 📋 Planned Features

### Phase 1: Complete Modal Content
- 📋 **Load full case study in modal** - Currently only shows expanding banner
  - Render full case study content inside CaseStudyModal
  - Use CaseStudyContent.astro within modal
  - Lazy load content sections
- 📋 **Content extraction** - Pull content from individual pages into projectData
  - Create `projectContent.ts` with section data
  - Define content section types (background, process, insights, etc.)
  - Include image/asset references per section

### Phase 2: Animation Enhancements
- 📋 **Enable ScreenCutOverlay** - Initial page load effect
  - Uncomment in Layout.astro
  - Test first-load detection
  - Ensure doesn't trigger on view transitions
- 📋 **Apply scroll-triggered animations** to case study pages
  - Wrap sections with `<SectionReveal>` components
  - Alternate fold-in, slide-left, slide-right effects
  - Add `<StaggeredReveal>` to process steps/galleries
- 📋 **Micro-interactions** on interactive elements
  - Wrap buttons with `<InteractiveElement>`
  - Add hover lift/tilt effects to project cards
  - Press feedback on CTAs

### Phase 3: UX Improvements
- 📋 **URL state management** - Shareable modal links
  - Query params: `?project=berkshiregrey`
  - History API integration
  - Direct link support (open modal from URL)
- 📋 **Navigation within modal** - Browse between projects without closing
  - Previous/Next project buttons
  - Keyboard arrows
  - Smooth transition between projects
- 📋 **Loading indicators** - For async content/images
  - Skeleton states
  - Progressive image loading
  - Smooth placeholder → content transition

### Phase 4: Performance & A11y
- 📋 **Implement `prefers-reduced-motion`** throughout
  - Check in ProjectCardModalManager
  - Respect in all GSAP timelines
  - Provide instant transitions when enabled
- 📋 **Focus management** in modal
  - Trap focus inside modal
  - Return focus to card on close
  - Keyboard navigation (Tab, Shift+Tab)
- 📋 **ARIA improvements**
  - Modal role="dialog"
  - aria-modal="true"
  - aria-labelledby for titles
  - Live region announcements
- 📋 **Performance optimization**
  - Lazy load GSAP (only when needed)
  - Code split modal components
  - Optimize animation frame rates
  - Test on low-end devices

### Phase 5: Refactoring & Cleanup
- 📋 **Refactor case study pages** to use CaseStudyContent.astro
  - All 5 pages currently duplicating structure
  - Extract to shared component
  - Maintain SEO benefits of static pages
- 📋 **Create case study template** for future projects
  - Standardized structure
  - Easy to add new projects
  - Consistent animations
- 📋 **Extract reusable components**
  - ContentSection.astro
  - ImageGrid.astro
  - ProcessSteps.astro
- 📋 **Remove unused code**
  - Decide on ScreenCutOverlay, SectionReveal, etc.
  - Clean up commented code
  - Remove duplicate animation utilities

---

## 💡 Ideas & Notes

### Animation Concepts
- **Parallax effects** on scroll within modal
- **Card shuffle** animation when closing modal (cards rearrange)
- **3D flip** effect for case study navigation (flip to next project)
- **Origami-inspired folds** - More pronounced fold lines, paper texture
- **Particle effects** during transitions (subtle, not distracting)
- **Color morph** - Background color shifts based on project theme

### UX Experiments
- **Infinite scroll** of projects in modal view
- **Gesture controls** - Swipe to navigate, pinch to close
- **Preview mode** - Hover card shows animated preview
- **Timeline scrubbing** - Drag to control animation speed
- **Sound effects** - Subtle audio feedback (optional, user preference)

### Technical Ideas
- **WebGL transitions** for more complex effects (three.js?)
- **Shared element morphing** beyond images (shapes, colors)
- **Physics-based animations** (velocity, inertia)
- **SVG morphing** for logo/icon transitions
- **Lottie animations** for micro-interactions

### Content Ideas
- **Video backgrounds** in modals (subtle, ambient)
- **Interactive demos** embedded in case studies
- **Before/after sliders** for design comparisons
- **Process timelines** with animated milestones
- **Testimonials** with animated quotes

### Performance Notes
- Keep GSAP bundle small (currently ~160KB for ProjectCardModalManager)
- Consider CSS-only animations for simple effects
- Use `will-change` sparingly (only during animation)
- Preload critical assets (fonts, hero images)
- Consider View Transitions API fallbacks for unsupported browsers

---

## 📚 Usage Guide

### How to Use the Modal System

**1. ProjectCard automatically triggers modal:**
```astro
<!-- Cards already set up with data-project-slug -->
<ProjectCard
  href="/berkshiregrey"
  title="Berkshire Grey"
  ...
/>
```

**2. Modal manager handles orchestration:**
- Click card → GSAP timeline starts
- Other cards fade out
- Clicked card moves to center
- Modal appears and expands
- Close button returns to grid

**3. Adding content to modal:**
```tsx
// In CaseStudyModal.tsx, render full content:
<CaseStudyContent project={project} />
```

### How to Use Animation Utilities

**Direct GSAP animations:**
```tsx
import { animateSectionFoldIn } from '../utils/animations';

const animation = animateSectionFoldIn(element, 0.8);
animation.play();
```

**Scroll-triggered animations:**
```astro
---
import SectionReveal from '../components/SectionReveal.tsx';
---

<SectionReveal client:only="react" effect="fold-in" duration={0.8}>
  <section class="wrapper">
    <h2>Background</h2>
    <p>Content folds in on scroll...</p>
  </section>
</SectionReveal>
```

**Staggered reveals:**
```astro
---
import StaggeredReveal from '../components/StaggeredReveal.tsx';
---

<StaggeredReveal
  client:only="react"
  itemSelector=".process-step"
  staggerDelay={0.15}
>
  <div class="process-step">Step 1</div>
  <div class="process-step">Step 2</div>
  <div class="process-step">Step 3</div>
</StaggeredReveal>
```

**CSS animation classes:**
```html
<div class="animate-layer-fold-in">Folds in</div>
<div class="animate-layer-slide-left">Slides from left</div>

<!-- With stagger delays -->
<div class="animate-fade-in stagger-1">First</div>
<div class="animate-fade-in stagger-2">Second</div>
<div class="animate-fade-in stagger-3">Third</div>
```

### How to Add a New Project

**1. Add to projectData.ts:**
```typescript
import bgNewProject from '../assets/newproject/background.webp';
import logoNewProject from '../assets/newproject/logo.svg';

export const projectsData = {
  // ...existing projects
  newproject: {
    slug: 'newproject',
    href: '/newproject',
    title: 'New Project',
    body: 'Short description...',
    overview: 'Longer overview...',
    roles: ['Role 1', 'Role 2'],
    tools: ['Tool 1', 'Tool 2'],
    duration: 'X months',
    bgImg: bgNewProject,
    bgImgAlt: 'Alt text',
    logo: logoNewProject,
    logoAlt: 'Logo alt',
    invertLogo: true,
    nextProject: 'berkshiregrey',
    isVisible: true,
  },
};
```

**2. Update ViewTransitions in animations.scss:**
```scss
::view-transition-group(project-image-newproject),
::view-transition-group(project-title-newproject) {
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**3. Create static page (SEO fallback):**
```astro
// src/pages/newproject.astro
---
import Layout from '../layouts/Layout.astro';
import Banner from '../components/Banner.astro';
// ... imports
---

<Layout title="New Project">
  <Banner ... />
  <div class="wrapper page-content-fade">
    <!-- Content -->
  </div>
</Layout>
```

---

## 📁 Reference

### File Structure

```
src/
├── data/
│   └── projectData.ts          ✅ Project metadata & helpers
├── utils/
│   └── animations.ts           ✅ GSAP animation utilities
├── styles/
│   └── animations.scss         ✅ CSS keyframes & transitions
├── components/
│   ├── CaseStudyModal.tsx      ✅ Modal overlay component
│   ├── ProjectCardModalManager.tsx  ✅ Animation orchestration
│   ├── CaseStudyContent.astro  ✅ Reusable case study layout
│   ├── ProjectCard.astro       ✅ Card with modal trigger
│   ├── Banner.astro            ✅ With transition names
│   ├── Header.astro            ✅ Auto-hide on scroll
│   ├── ScreenCutOverlay.tsx    ✅ Initial load effect (unused)
│   ├── SectionReveal.tsx       ✅ Scroll wrapper (unused)
│   ├── StaggeredReveal.tsx     ✅ Stagger wrapper (unused)
│   └── InteractiveElement.tsx  ✅ Hover/press wrapper (unused)
├── layouts/
│   └── Layout.astro            ✅ ViewTransitions enabled
└── pages/
    ├── index.astro             ✅ With ProjectCardModalManager
    ├── berkshiregrey.astro     ✅ With page-content-fade
    ├── grammaroke.astro        ✅ With page-content-fade
    ├── bandscan.astro          ✅ With page-content-fade
    ├── toast.astro             ✅ With page-content-fade
    └── pinksofahour.astro      ✅ With page-content-fade
```

### Data Models

**ProjectData interface:**
```typescript
interface ProjectData {
  slug: string;
  href: string;
  title: string;
  body: string;              // Card description
  overview: string;          // Banner overview
  roles: string[];
  tools: string[];
  duration: string;
  bgImg: ImageMetadata;
  bgImgAlt: string;
  logo: ImageMetadata;
  logoAlt: string;
  invertLogo?: boolean;
  nextProject: string;       // Slug of next project
  isVisible: boolean;        // Show in grid
}
```

**Animation sequence (current):**
```
0.0s: Other cards/intro fade out, header logos fade in
0.15s: Clicked card moves to center
0.75s: Card repositioned, modal appears
1.0s: Modal expands to full width
1.8s: Modal switches to relative positioning
```

### Key Technologies

- **Astro 3.x** - Static site framework
- **GSAP** - Animation library (~160KB bundle)
- **View Transitions API** - Native browser transitions
- **React** - For interactive components (modal, animations)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **SCSS** - CSS preprocessing

### Browser Support

- **View Transitions API**: Chrome 111+, Edge 111+ (graceful fallback)
- **GSAP**: All modern browsers (IE 11+)
- **CSS Animations**: All modern browsers
- **Fallback**: Static pages work without JavaScript

---

## 🎯 Success Criteria

**Modal System:**
- ✅ Click card opens modal smoothly
- 🚧 Animation feels natural and orchestrated (needs refinement)
- 🚧 Card expands to banner (working but needs polish)
- ❌ Full content loads in modal (not yet implemented)
- ✅ ESC key closes modal
- ✅ Individual pages work as static fallbacks
- ❌ Animations respect `prefers-reduced-motion` (not wired up)

**Performance:**
- ✅ Build succeeds with no errors
- 🚧 Smooth 60fps animations (needs testing on devices)
- 📋 Bundle size optimized (need measurements)
- 📋 Lighthouse score >90 (need to test)

**Accessibility:**
- ❌ Focus management in modal
- ❌ ARIA attributes complete
- ❌ Keyboard navigation fully functional
- ✅ Reduced motion utilities exist (not used)
- ✅ Semantic HTML maintained

**User Experience:**
- 🚧 No janky pops or layout shifts (mostly good, needs polish)
- ❌ Loading states for content
- ❌ URL sharing for modal state
- ✅ Mobile menu and navigation work
- 📋 Cross-browser testing needed

---

## 📊 Progress Tracker

**Overall Completion: ~35%**

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Data Structure | ✅ Done | 100% |
| Phase 2: Modal Infrastructure | 🚧 In Progress | 70% |
| Phase 3: Animation Orchestration | 🚧 In Progress | 50% |
| Phase 4: Integration | 🚧 In Progress | 40% |
| Phase 5: Content Loading | ❌ Not Started | 0% |
| Phase 6: Polish & A11y | ❌ Not Started | 0% |

---

## 🔗 Resources

- [GSAP Documentation](https://gsap.com)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [View Transitions API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [CLAUDE.md](./CLAUDE.md) - Project overview
- [ANIMATIONS_GUIDE.md](./ANIMATIONS_GUIDE.md) - Original animation guide (reference)

---

## 📝 Notes & Decisions

### Architecture Decisions
- **Modal vs Page Navigation**: Chose modal overlay for interactive feel while keeping static pages for SEO
- **GSAP vs CSS**: Using GSAP for complex orchestrated sequences, CSS for simple effects
- **TypeScript**: Strict types for projectData ensures consistency
- **Component Strategy**: Build wrappers (SectionReveal, etc.) even if not using yet - ready when needed

### Performance Tradeoffs
- **Bundle Size**: GSAP adds ~160KB but enables smooth complex animations
- **Animation Complexity**: Prioritizing feel over simplicity - may need to simplify for mobile
- **Image Loading**: Not optimized yet - consider lazy loading, blurhash placeholders

### Design Decisions
- **Origami Theme**: Fold/unfold metaphor guides all animation choices
- **Timing**: Aim for 1-2s total animation time (fast enough to feel responsive)
- **Easing**: Using cubic-bezier bounce for dynamic feel
- **Reduced Motion**: Build in support from start, not as afterthought

### Open Questions
- Should we load all project content upfront or lazy load?
- Do we need separate animation sets for mobile/desktop?
- Should modal support deep linking (URL params)?
- Keep ScreenCutOverlay or remove it?
- Use SectionReveal components or stick with CSS classes?

---

**Last Updated:** 2025-01-22 (animations-update branch)
