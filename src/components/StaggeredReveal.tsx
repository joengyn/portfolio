import React, { useEffect, useRef } from 'react';
import {
  animateStaggeredReveal,
  setupScrollTrigger,
  prefersReducedMotion,
} from '../utils/animations';

interface StaggeredRevealProps {
  children: React.ReactNode;
  itemSelector: string; // CSS selector for child elements to stagger
  duration?: number;
  staggerDelay?: number;
  className?: string;
}

/**
 * StaggeredReveal Component
 * Wraps multiple elements and triggers staggered animations when container enters viewport.
 * Each child element animates in sequence with a configurable delay between them.
 *
 * Example:
 * <StaggeredReveal itemSelector=".list-item" staggerDelay={0.1}>
 *   <div className="list-item">Item 1</div>
 *   <div className="list-item">Item 2</div>
 *   <div className="list-item">Item 3</div>
 * </StaggeredReveal>
 */

export default function StaggeredReveal({
  children,
  itemSelector,
  duration = 0.5,
  staggerDelay = 0.1,
  className = '',
}: StaggeredRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) {
      return;
    }

    // Create staggered reveal animation
    const animation = animateStaggeredReveal(
      containerRef.current,
      itemSelector,
      duration,
      staggerDelay,
    );

    // Set up scroll trigger
    const observer = setupScrollTrigger([containerRef.current], () => {
      animation.play();
    });

    return () => {
      observer.disconnect();
    };
  }, [itemSelector, duration, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
