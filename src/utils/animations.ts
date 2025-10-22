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
// CARD UNFOLD ANIMATION
// ============================================

/**
 * Animates a card unfolding/expanding from center to full width
 * Used when card moves to center and transitions into banner
 *
 * The card expands symmetrically from its center point to fill available width
 * Matches the Banner component's layout: m-4 mx-auto max-w-[1800px]
 */
export function animateCardUnfold(
  cardElement: Element,
  originalWidth: number,
  containerWidth: number = window.innerWidth,
  duration: number = 0.75,
) {
  const rect = cardElement.getBoundingClientRect();
  const cardCenter = rect.left + rect.width / 2;

  // Banner layout: m-4 (1rem = 16px) mx-auto max-w-[1800px]
  // This means: 16px margin on each side, centered, max 1800px wide
  const bannerMargin = 16; // m-4 in pixels
  const bannerMaxWidth = 1800;

  // Calculate target width (limited by max-width or window width)
  const targetWidth = Math.min(containerWidth - bannerMargin * 2, bannerMaxWidth);

  // Calculate where the banner should be positioned (centered)
  const totalMargin = (containerWidth - targetWidth) / 2;

  const tl = gsap.timeline();

  // Expand the card to match banner layout
  tl.to(
    cardElement,
    {
      left: totalMargin,
      right: totalMargin,
      width: 'auto',
      duration,
      ease: easings.smooth,
    },
    0,
  );

  return tl;
}

// ============================================
// MODAL ORCHESTRATION - CASE STUDY REVEAL
// ============================================

/**
 * Orchestrates the complete case study modal reveal sequence
 * Combines: logo slide + card expand + content fold
 * Total duration: ~2.0 seconds
 *
 * Sequence:
 * - 0.0-0.4s: Logo slides from header down to card position
 * - 0.2-1.0s: Project card image expands into banner
 * - 0.8-1.4s: Banner info (logo, roles, tools) fades in
 * - 1.2-2.0s: Main page content folds out with stagger
 */
export function orchestrateModalOpen(
  options: {
    cardElement?: Element | null;
    logoElement?: Element | null;
    bannerElement?: Element | null;
    contentElements?: Element[];
  } = {},
) {
  const tl = gsap.timeline();

  // 1. LOGO SLIDE (0.0 - 0.4s)
  // Logo slides from header position down to card
  if (options.logoElement) {
    tl.fromTo(
      options.logoElement,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: easings.smooth,
      },
      0,
    );
  }

  // 2. CARD EXPAND (0.2 - 1.0s)
  // Card image expands and morphs into banner
  if (options.cardElement) {
    tl.to(
      options.cardElement,
      {
        duration: 0.8,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // bounce easing for dynamic feel
      },
      0.2, // Start at 0.2s (after logo has moved a bit)
    );
  }

  // 3. BANNER CONTENT FADE (0.8 - 1.4s)
  // Banner logo and info sections fade in
  if (options.bannerElement) {
    const bannerLogo = options.bannerElement.querySelector('.banner-content-fade');
    const bannerInfo = options.bannerElement.querySelectorAll('.banner-content-fade');

    tl.fromTo(
      bannerInfo,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.6,
        ease: easings.smooth,
        stagger: 0.05,
      },
      0.8, // Start at 0.8s
    );
  }

  // 4. CONTENT FOLD-OUT (1.2 - 2.0s)
  // Main page content folds in with staggered timing
  if (options.contentElements && options.contentElements.length > 0) {
    tl.fromTo(
      options.contentElements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: easings.smooth,
        stagger: 0.1,
      },
      1.2, // Start at 1.2s
    );
  }

  // Respect user motion preferences
  respectMotionPreferences(tl);

  return tl;
}

/**
 * Quick close animation for modal
 * Reverse of the open sequence
 */
export function orchestrateModalClose(
  options: {
    modalElement?: Element | null;
  } = {},
) {
  const tl = gsap.timeline();

  if (options.modalElement) {
    tl.to(options.modalElement, {
      opacity: 0,
      duration: 0.3,
      ease: easings.smoothOut,
    });
  }

  respectMotionPreferences(tl);

  return tl;
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
