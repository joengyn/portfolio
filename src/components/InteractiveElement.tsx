import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface InteractiveElementProps {
  children: React.ReactNode;
  type?: 'button' | 'link' | 'element';
  hoverEffect?: 'tilt' | 'scale' | 'lift' | 'none';
  pressEffect?: boolean;
  className?: string;
  intensity?: number; // For tilt effect, controls rotation amount
}

/**
 * InteractiveElement Component
 * Wraps any element to add micro-interactions like hover effects and press feedback.
 *
 * Effects:
 * - tilt: 3D perspective tilt on hover
 * - scale: Subtle scale-up on hover
 * - lift: Combine scale and shadow elevation
 * - none: No hover effect
 *
 * Example:
 * <InteractiveElement type="button" hoverEffect="scale" pressEffect>
 *   <button>Click me</button>
 * </InteractiveElement>
 */

export default function InteractiveElement({
  children,
  type = 'element',
  hoverEffect = 'scale',
  pressEffect = true,
  className = '',
  intensity = 5,
}: InteractiveElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Hover effects
    if (hoverEffect !== 'none') {
      element.addEventListener('mouseenter', () => {
        switch (hoverEffect) {
          case 'tilt':
            gsap.to(element, {
              rotationY: intensity,
              rotationX: -intensity,
              duration: 0.3,
              ease: 'power2.out',
              transformPerspective: 1000,
            });
            break;
          case 'scale':
            gsap.to(element, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            });
            break;
          case 'lift':
            gsap.to(element, {
              scale: 1.05,
              y: -8,
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
              duration: 0.3,
              ease: 'power2.out',
            });
            break;
        }
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }

    // Press effect
    if (pressEffect) {
      element.addEventListener('mousedown', () => {
        gsap.to(element, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out',
        });
      });

      element.addEventListener('mouseup', () => {
        gsap.to(element, {
          scale: hoverEffect === 'none' ? 1 : 1.05,
          duration: 0.15,
          ease: 'back.out(1.7)',
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    }
  }, [hoverEffect, pressEffect, intensity]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'none', // Let GSAP handle transitions
      }}
    >
      {children}
    </div>
  );
}
