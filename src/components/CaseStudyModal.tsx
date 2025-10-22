import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import type { ProjectData } from '../data/projectData';
import { getProjectBySlug } from '../data/projectData';

interface CaseStudyModalProps {
  isOpen: boolean;
  projectSlug: string | null;
  onClose: () => void;
  showAnimation?: boolean;
  clickedCard?: HTMLElement | null;
}

/**
 * CaseStudyModal Component
 *
 * Overlay modal that expands from the clicked card.
 * Animates from card size to full-width, displaying project background image.
 */
export default function CaseStudyModal({ isOpen, projectSlug, onClose, showAnimation = false, clickedCard = null }: CaseStudyModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const project = projectSlug ? getProjectBySlug(projectSlug) : null;

  // Extract background image and initialize card position immediately
  useEffect(() => {
    if (clickedCard) {
      const images = clickedCard.querySelectorAll('img');
      if (images.length >= 2) {
        setBgImageUrl(images[1].src);
      }
      // Initialize cardRect immediately to prevent flicker
      setCardRect(clickedCard.getBoundingClientRect());
    }
  }, [clickedCard]);

  // Track card position only during initial animation phase
  useEffect(() => {
    if (!isOpen || !clickedCard || !isAnimating) {
      return;
    }

    let frameCount = 0;
    const maxFrames = 60; // Track for ~1 second at 60fps

    const updatePosition = () => {
      if (frameCount < maxFrames) {
        setCardRect(clickedCard.getBoundingClientRect());
        frameCount++;
        requestAnimationFrame(updatePosition);
      }
    };

    const animationId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationId);
  }, [isOpen, clickedCard, isAnimating]);

  // Handle modal visibility and hide/show original card
  useEffect(() => {
    if (showAnimation && isOpen) {
      setIsAnimating(true);
      if (clickedCard) {
        clickedCard.style.opacity = '0';
        clickedCard.style.pointerEvents = 'none';
      }
    } else {
      setIsAnimating(false);
      if (clickedCard) {
        clickedCard.style.opacity = '1';
        clickedCard.style.pointerEvents = 'auto';
      }
    }

    // Cleanup: restore card visibility on unmount
    return () => {
      if (clickedCard) {
        clickedCard.style.opacity = '1';
        clickedCard.style.pointerEvents = 'auto';
      }
    };
  }, [showAnimation, isOpen, clickedCard]);

  // Expand modal to full width after delay
  useEffect(() => {
    if (showAnimation && isOpen && modalRef.current) {
      const main = document.querySelector('main');
      const mainRect = main ? main.getBoundingClientRect() : null;

      if (mainRect) {
        const timer = setTimeout(() => {
          gsap.to(modalRef.current, {
            left: mainRect.left,
            width: mainRect.width,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              // Switch to relative positioning after animation
              setIsExpanded(true);
            }
          });
        }, 200);

        return () => clearTimeout(timer);
      }
    } else if (!showAnimation) {
      setIsExpanded(false);
    }
  }, [showAnimation, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project || !cardRect) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className={`${isExpanded ? 'relative mx-4 mt-4' : 'fixed'} z-40 flex flex-col ${isExpanded ? '' : 'overflow-hidden h-full'}`}
      role='dialog'
      aria-modal='false'
      aria-label={`${project.title} case study`}
      style={{
        left: isExpanded ? 'auto' : `${cardRect?.left}px`,
        top: isExpanded ? 'auto' : `${cardRect?.top}px`,
        width: isExpanded ? 'auto' : `${cardRect?.width}px`,
        height: isExpanded ? 'auto' : `${cardRect?.height}px`,
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        pointerEvents: isAnimating ? 'auto' : 'none',
      }}
    >
      {/* Card Image - square when collapsed, banner height when expanded */}
      <div className={`relative w-full overflow-hidden ${isExpanded ? 'h-[300px] md:h-[500px]' : 'aspect-square'}`}>
        {bgImageUrl && (
          <img
            src={bgImageUrl}
            alt={project.bgImgAlt}
            className='h-full w-full object-cover'
          />
        )}

        {/* Close Button - absolute positioned in banner during animation */}
        {!isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className='absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-sand dark:bg-slate border-2 border-slate dark:border-sand text-slate dark:text-sand hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate dark:focus:ring-sand'
            aria-label='Close case study'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        )}
      </div>

      {/* Close Button - fixed when expanded to stay visible during scroll */}
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-sand dark:bg-slate border-2 border-slate dark:border-sand text-slate dark:text-sand hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate dark:focus:ring-sand'
          aria-label='Close case study'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      )}

      {/* Colored Section - matches text area of original card or banner */}
      <div className={`bg-sand dark:bg-slate ${isExpanded ? 'min-h-screen' : 'flex-1'}`}></div>
    </div>
  );
}
