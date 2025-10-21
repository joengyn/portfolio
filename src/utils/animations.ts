import gsap from 'gsap';

/**
 * GSAP Animation Utilities
 * Centralized animation functions for the "Layers & Folding" theme
 */

// ============================================
// EASING PRESETS
// ============================================

export const easings = {
  smooth: 'power3.inOut',
  smoothIn: 'power3.in',
  smoothOut: 'power3.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'back.out(1.7)',
};

// ============================================
// INITIAL PAGE LOAD - SCREEN CUT ANIMATION
// ============================================

/**
 * Creates the initial page load effect:
 * Full screen covered, then cut vertically down center
 * Each half pulls back/away revealing the page below
 */
export function animateScreenCutOpen(
  container: Element,
  duration: number = 1.2,
  delay: number = 0.3,
) {
  const tl = gsap.timeline({
    delay,
  });

  // Animate left half sliding left (away from center)
  tl.to(
    `${container.id} .screen-cut-left`,
    {
      x: -100,
      opacity: 0,
      duration,
      ease: easings.smooth,
    },
    0,
  );

  // Animate right half sliding right (away from center)
  tl.to(
    `${container.id} .screen-cut-right`,
    {
      x: 100,
      opacity: 0,
      duration,
      ease: easings.smooth,
    },
    0, // Start at same time as left half
  );

  return tl;
}

// ============================================
// SHARED ELEMENT TRANSITIONS
// ============================================

/**
 * Animates a project card expanding into a banner
 * Used when navigating from homepage to project page
 */
export function animateCardToBanner(
  cardElement: Element,
  duration: number = 0.8,
) {
  const tl = gsap.timeline();

  tl.to(cardElement, {
    scale: 1.05,
    duration: 0.2,
    ease: easings.smoothOut,
  }).to(
    cardElement,
    {
      duration,
      ease: easings.smooth,
    },
    0,
  );

  return tl;
}

/**
 * Animates banner content fading in with staggered reveals
 */
export function animateBannerContentReveal(
  bannerElement: Element,
  duration: number = 0.6,
  delay: number = 0.4,
) {
  const tl = gsap.timeline({
    delay,
  });

  const image = bannerElement.querySelector('[data-transition="image"]');
  const title = bannerElement.querySelector('[data-transition="title"]');
  const description = bannerElement.querySelector(
    '[data-transition="description"]',
  );
  const tags = bannerElement.querySelector('[data-transition="tags"]');

  // Stagger reveals
  tl.fromTo(
    image,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration, ease: easings.smooth },
    0,
  )
    .fromTo(
      title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: duration * 0.8, ease: easings.smooth },
      duration * 0.1,
    )
    .fromTo(
      description,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: duration * 0.8, ease: easings.smooth },
      duration * 0.2,
    )
    .fromTo(
      tags,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: duration * 0.6, ease: easings.smooth },
      duration * 0.3,
    );

  return tl;
}

// ============================================
// SECTION REVEALS - LAYERED FOLD-IN
// ============================================

/**
 * Creates a "fold-in from top" effect for sections
 * Used for sections as user scrolls
 */
export function animateSectionFoldIn(
  section: Element,
  duration: number = 0.8,
) {
  return gsap.fromTo(
    section,
    {
      opacity: 0,
      y: -40,
      scaleY: 0.8,
      transformOrigin: 'top center',
    },
    {
      opacity: 1,
      y: 0,
      scaleY: 1,
      duration,
      ease: easings.smooth,
      paused: true, // Will be triggered by scroll observer
    },
  );
}

/**
 * Creates a "slide in from sides" effect for sections
 * Useful for alternating left/right reveals
 */
export function animateSectionSlideIn(
  section: Element,
  side: 'left' | 'right' = 'left',
  duration: number = 0.8,
) {
  const xStart = side === 'left' ? -60 : 60;

  return gsap.fromTo(
    section,
    {
      opacity: 0,
      x: xStart,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      ease: easings.smooth,
      paused: true,
    },
  );
}

/**
 * Staggered reveals for multiple child elements within a section
 */
export function animateStaggeredReveal(
  container: Element,
  selector: string,
  duration: number = 0.5,
  staggerDelay: number = 0.1,
) {
  const children = container.querySelectorAll(selector);

  return gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: easings.smooth,
      stagger: staggerDelay,
      paused: true,
    },
  );
}

// ============================================
// MICRO-INTERACTIONS
// ============================================

/**
 * Hover effect: subtle fold/tilt on hover
 */
export function animateHoverTilt(
  element: Element,
  intensity: number = 5,
) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      rotationY: intensity,
      rotationX: -intensity,
      duration: 0.3,
      ease: easings.smoothOut,
      transformPerspective: 1000,
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.3,
      ease: easings.smoothOut,
    });
  });
}

/**
 * Button press feedback: scale down on press
 */
export function animateButtonPress(element: Element) {
  element.addEventListener('mousedown', () => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseup', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: easings.bounce,
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.15,
      ease: easings.smoothOut,
    });
  });
}

// ============================================
// SCROLL TRIGGER INTEGRATION
// ============================================

/**
 * Create a scroll-triggered animation using Intersection Observer
 * (GSAP ScrollTrigger can be added later if needed for more advanced scroll animations)
 */
export function setupScrollTrigger(
  elements: Element[],
  callback: (element: Element) => void,
  options: {
    threshold?: number;
    rootMargin?: string;
  } = {},
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    },
    {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -100px 0px',
    },
  );

  elements.forEach((el) => observer.observe(el));

  return observer;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Prefers reduced motion check for accessibility
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Disable animations if user prefers reduced motion
 */
export function respectMotionPreferences(tl: gsap.core.Timeline): void {
  if (prefersReducedMotion()) {
    tl.timeScale(0); // Freeze animations
    tl.seek('end'); // Jump to end state
  }
}
