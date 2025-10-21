# Animation System Guide - "Layers & Folding" Theme

This guide explains how to use the new animation system in your portfolio. The system is built around three core technologies:

- **View Transitions API** - Smooth page transitions with shared elements
- **GSAP** - Advanced animation orchestration and scroll triggers
- **CSS Animations** - Lightweight, performant baseline animations

---

## Quick Overview

### What's New

1. **Automatic Page Load Effect** - Initial screen cut animation on first visit
2. **Shared Element Transitions** - Project cards smoothly transform into banners when navigating
3. **Scroll-Triggered Reveals** - Sections fold/slide in as user scrolls
4. **Micro-Interactions** - Hover effects, press feedback on interactive elements

### Architecture

```
Layout.astro (imports ViewTransitions & animations.scss)
├── ScreenCutOverlay.tsx (initial page load)
├── ProjectCard.astro (with view-transition-names)
├── Banner.astro (matches ProjectCard transitions)
├── SectionReveal.tsx (scroll-triggered animations)
├── StaggeredReveal.tsx (staggered child animations)
└── InteractiveElement.tsx (hover/press effects)
```

---

## Usage Guide

### 1. Page Load Effect (Automatic) ✅

The screen cut animation runs automatically on first page load. It's already integrated in `Layout.astro`.

**What happens:**
- Fixed overlay covers entire screen
- Vertical cut down center
- Each half slides away, revealing the page
- Animation completes in ~1.4 seconds

**To customize:**
Edit `src/components/ScreenCutOverlay.tsx`:
```tsx
const tl = animateScreenCutOpen(container, 1.2, 0.2); // (duration, delay)
```

---

### 2. Shared Element Transitions (Page Navigation) ✅

When clicking a project card, it smoothly transitions into the project banner.

**How it works:**
- ProjectCard has `view-transition-name` on image and title
- Banner has matching `view-transition-name`
- Astro's ViewTransitions API handles the morphing
- View Transitions are unique per project (using project slug)

**Already implemented:**
- `src/components/ProjectCard.astro` - transition names set automatically
- `src/components/Banner.astro` - matches ProjectCard transitions

**Example structure:**
```
Project Slug: "berkshiregrey"
├── ProjectCard transition names:
│   ├── project-image-berkshiregrey
│   └── project-title-berkshiregrey
└── Banner transition names:
    ├── project-image-berkshiregrey
    └── project-title-berkshiregrey
```

---

### 3. Section Reveal Animations

For scroll-triggered animations on case study pages.

#### A. Simple Section Fold-In

```astro
---
import SectionReveal from '../components/SectionReveal.tsx';
---

<SectionReveal client:only="react" effect="fold-in" duration={0.8}>
  <section class="wrapper">
    <h2>Section Title</h2>
    <p>Content that folds in when scrolled to...</p>
  </section>
</SectionReveal>
```

**Effect options:**
- `fold-in` (default) - Scales up from top with fade
- `slide-left` - Slides in from left
- `slide-right` - Slides in from right

**Props:**
```tsx
interface SectionRevealProps {
  effect?: 'fold-in' | 'slide-left' | 'slide-right';
  duration?: number;           // animation duration in seconds
  className?: string;          // additional CSS classes
}
```

#### B. Staggered Child Animation

For animating multiple items in sequence:

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

**Props:**
```tsx
interface StaggeredRevealProps {
  itemSelector: string;        // CSS selector for children to animate
  duration?: number;           // per-item animation duration
  staggerDelay?: number;       // delay between each item
  className?: string;
}
```

---

### 4. Micro-Interactions

Add hover effects and press feedback to any element.

#### Button Scale Effect

```astro
---
import InteractiveElement from '../components/InteractiveElement.tsx';
---

<InteractiveElement
  client:only="react"
  type="button"
  hoverEffect="scale"
  pressEffect={true}
>
  <button>Click me</button>
</InteractiveElement>
```

#### Link Lift Effect

```astro
<InteractiveElement
  client:only="react"
  hoverEffect="lift"
  pressEffect={false}
>
  <a href="/projects">View Projects</a>
</InteractiveElement>
```

#### 3D Tilt Effect

```astro
<InteractiveElement
  client:only="react"
  hoverEffect="tilt"
  intensity={8}  // tilt rotation amount
>
  <div class="project-card">...</div>
</InteractiveElement>
```

**Props:**
```tsx
interface InteractiveElementProps {
  hoverEffect?: 'tilt' | 'scale' | 'lift' | 'none';
  pressEffect?: boolean;      // mouse down/up feedback
  intensity?: number;         // for tilt, controls rotation
  className?: string;
}
```

---

## Direct Animation Utilities

For custom animations, use the utilities in `src/utils/animations.ts`:

### GSAP Animations

```tsx
import {
  animateScreenCutOpen,
  animateCardToBanner,
  animateBannerContentReveal,
  animateSectionFoldIn,
  animateSectionSlideIn,
  animateStaggeredReveal,
  animateHoverTilt,
  animateButtonPress,
  setupScrollTrigger,
} from '../utils/animations';

// Example: Custom section animation
const tl = animateSectionFoldIn(element, duration);
tl.play();
```

### Accessibility

All animations respect `prefers-reduced-motion`:

```tsx
import { prefersReducedMotion, respectMotionPreferences } from '../utils/animations';

if (prefersReducedMotion()) {
  // Skip animations or jump to end state
}
```

---

## CSS Animation Classes

Use predefined CSS animation classes in templates:

```html
<div class="animate-layer-fold-in">Folds in</div>
<div class="animate-layer-slide-left">Slides left</div>
<div class="animate-layer-slide-right">Slides right</div>
<div class="animate-fade-in">Fades in</div>

<!-- Stagger delays -->
<div class="animate-layer-fold-in stagger-1">First</div>
<div class="animate-layer-fold-in stagger-2">Second</div>
<div class="animate-layer-fold-in stagger-3">Third</div>
```

---

## Example: Full Case Study Page

```astro
---
import Layout from '../layouts/Layout.astro';
import Banner from '../components/Banner.astro';
import SectionReveal from '../components/SectionReveal.tsx';
import StaggeredReveal from '../components/StaggeredReveal.tsx';
import InteractiveElement from '../components/InteractiveElement.tsx';
// ... imports
---

<Layout title="Project Case Study">
  <!-- Banner with shared element transition -->
  <Banner
    title="Project Name"
    bgImg={bannerImage}
    bgImgAlt="Banner"
    logo={logo}
    logoAlt="Logo"
    overview="Description..."
    roles={["Role 1", "Role 2"]}
    tools={["Tool 1", "Tool 2"]}
    duration="3 months"
  />

  <!-- Section with fold-in animation -->
  <SectionReveal client:only="react" effect="fold-in">
    <section class="wrapper">
      <h2>Problem Statement</h2>
      <p>Description...</p>
    </section>
  </SectionReveal>

  <!-- Alternating slides -->
  <SectionReveal client:only="react" effect="slide-left">
    <section class="wrapper">Content...</section>
  </SectionReveal>

  <SectionReveal client:only="react" effect="slide-right">
    <section class="wrapper">Content...</section>
  </SectionReveal>

  <!-- Staggered process steps -->
  <StaggeredReveal
    client:only="react"
    itemSelector=".process-item"
    staggerDelay={0.2}
  >
    <div class="process-item">Step 1</div>
    <div class="process-item">Step 2</div>
    <div class="process-item">Step 3</div>
  </StaggeredReveal>

  <!-- Interactive button -->
  <InteractiveElement
    client:only="react"
    hoverEffect="lift"
  >
    <button class="btn-primary">Call to Action</button>
  </InteractiveElement>
</Layout>
```

---

## Performance Considerations

1. **GSAP Bundle Size**: ~72 KB (gzipped: ~28 KB) - included in ScreenCutOverlay
2. **View Transitions**: Zero runtime cost (browser API)
3. **Scroll Triggers**: Lightweight Intersection Observer (no polling)
4. **Accessibility**: All animations respect `prefers-reduced-motion`

### Optimization Tips

- Use CSS animations for simple effects (faster than GSAP)
- Limit simultaneous GSAP animations to <5
- Stagger reveals rather than animate everything at once
- Test animations on lower-end devices

---

## Browser Support

- **View Transitions API**: Chrome 111+, Edge 111+, modern Chromium browsers
  - Graceful fallback: instant navigation on unsupported browsers
- **GSAP**: All modern browsers (IE 11+)
- **CSS Animations**: All modern browsers

---

## Customization

### Adjust Animation Easing

Edit `src/utils/animations.ts`:
```tsx
export const easings = {
  smooth: 'power3.inOut',
  smoothIn: 'power3.in',
  smoothOut: 'power3.out',
  // Add more...
};
```

### Adjust Default Durations

Edit component props or animation utilities:
```tsx
<SectionReveal duration={1.2}>  // slower
<StaggeredReveal staggerDelay={0.25}>  // more delay
```

### Adjust Initial Page Load Animation

Edit `src/components/ScreenCutOverlay.tsx`:
```tsx
const tl = animateScreenCutOpen(container, 1.2, 0.2);
// First param: animation duration
// Second param: delay before starting
```

---

## Troubleshooting

### Animations not playing?

1. Check that `client:only="react"` is set on the component
2. Verify `prefers-reduced-motion` isn't enabled in system settings
3. Check browser console for errors
4. Ensure View Transitions are enabled (should be by default)

### Janky/stuttering animations?

1. Reduce simultaneous animations
2. Check CPU/GPU usage during animation
3. Test on different devices
4. Consider using CSS animations instead of GSAP for simple effects

### Transition not working between pages?

1. Verify `ViewTransitions` is imported in `Layout.astro` ✓
2. Check that `view-transition-name` values match between pages
3. Ensure project slug is consistent (e.g., "berkshiregrey")

---

## Next Steps

1. **Apply animations to case study pages**
   - Wrap content sections with `SectionReveal`
   - Add `StaggeredReveal` to process steps or galleries
   - Wrap interactive elements with `InteractiveElement`

2. **Customize animations**
   - Adjust durations and easing
   - Mix and match effects (fold-in + slide-left)
   - Create new effects by extending utilities

3. **Test across devices**
   - Mobile/tablet responsiveness
   - Performance on lower-end devices
   - Animation timing on slower networks

---

## Files Reference

```
src/
├── utils/
│   └── animations.ts          # Core animation utilities & GSAP functions
├── styles/
│   └── animations.scss        # CSS keyframes and utilities
├── components/
│   ├── ScreenCutOverlay.tsx   # Initial page load effect
│   ├── SectionReveal.tsx      # Scroll-triggered section reveals
│   ├── StaggeredReveal.tsx    # Staggered child animations
│   ├── InteractiveElement.tsx # Hover/press micro-interactions
│   ├── ProjectCard.astro      # Auto-transition names ✓
│   ├── Banner.astro           # Auto-transition names ✓
│   └── ...
├── layouts/
│   └── Layout.astro           # ViewTransitions + animations.scss ✓
└── pages/
    ├── index.astro
    ├── berkshiregrey.astro    # (and other case studies)
    └── ...

ANIMATIONS_GUIDE.md             # This file
```

---

## Questions?

Refer to:
- [GSAP Documentation](https://gsap.com)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [CLAUDE.md](./CLAUDE.md) - Project overview

Happy animating! 🎨
