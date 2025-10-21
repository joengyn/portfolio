import React, { useEffect, useRef } from 'react';
import {
  animateSectionFoldIn,
  animateSectionSlideIn,
  setupScrollTrigger,
  prefersReducedMotion,
} from '../utils/animations';

interface SectionRevealProps {
  children: React.ReactNode;
  effect?: 'fold-in' | 'slide-left' | 'slide-right';
  duration?: number;
  className?: string;
}

/**
 * SectionReveal Component
 * Wraps a section and triggers layered/fold-in animations when it enters the viewport.
 * Uses Intersection Observer for scroll trigger.
 */

export default function SectionReveal({
  children,
  effect = 'fold-in',
  duration = 0.8,
  className = '',
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) {
      return;
    }

    // Create the appropriate animation based on effect prop
    let animation;
    switch (effect) {
      case 'slide-left':
        animation = animateSectionSlideIn(sectionRef.current, 'left', duration);
        break;
      case 'slide-right':
        animation = animateSectionSlideIn(sectionRef.current, 'right', duration);
        break;
      case 'fold-in':
      default:
        animation = animateSectionFoldIn(sectionRef.current, duration);
    }

    // Set up scroll trigger to play animation when element enters viewport
    const observer = setupScrollTrigger([sectionRef.current], () => {
      animation.play();
    });

    return () => {
      observer.disconnect();
    };
  }, [effect, duration]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
