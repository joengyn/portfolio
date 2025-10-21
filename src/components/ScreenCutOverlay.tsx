import React, { useEffect } from 'react';
import { animateScreenCutOpen, respectMotionPreferences } from '../utils/animations';

/**
 * ScreenCutOverlay Component
 * Displays the initial page load effect: screen cut vertically,
 * then both halves pull away from center to reveal page below.
 *
 * Only shows on first page load (not on view transitions)
 */

export default function ScreenCutOverlay() {
  useEffect(() => {
    // Check if this is the first page load (not a view transition)
    // Use a combination of sessionStorage and a flag on window object
    const isFirstLoad = !window.__hasLoadedBefore;
    window.__hasLoadedBefore = true;

    if (isFirstLoad) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const container = document.getElementById('screen-cut-container');
        if (container) {
          const tl = animateScreenCutOpen(container, 1.4, 0.3);
          respectMotionPreferences(tl);

          // Remove container after animation completes
          tl.eventCallback('onComplete', () => {
            container.style.pointerEvents = 'none';
            container.remove();
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // If not first load, remove immediately
      const container = document.getElementById('screen-cut-container');
      if (container) {
        container.remove();
      }
    }
  }, []);

  return (
    <div
      id='screen-cut-container'
      className='screen-cut-container'
      style={{
        backgroundColor: 'var(--color-bg, #f5f5f5)',
      }}
    >
      <div className='screen-cut-left' />
      <div className='screen-cut-right' />
    </div>
  );
}
