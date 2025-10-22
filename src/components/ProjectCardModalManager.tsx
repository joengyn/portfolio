import React, { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import CaseStudyModal from './CaseStudyModal';

/**
 * ProjectCardModalManager
 *
 * Orchestrates card click animations and modal interactions.
 * Flow: Card moves to center → Modal appears and expands → Close triggers collapse and return
 */
export default function ProjectCardModalManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [clickedCard, setClickedCard] = useState<HTMLElement | null>(null);
  const [showModalAnimation, setShowModalAnimation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    if (isAnimating) return; // Prevent overlapping animations
    setIsAnimating(true);

    // Collapse modal back to card size
    const modalElement = document.querySelector('[role="dialog"]') as HTMLElement;
    const tl = gsap.timeline();

    if (modalElement && clickedCard) {
      // Collapse back to card position
      tl.to(
        modalElement,
        {
          left: clickedCard.getBoundingClientRect().left,
          width: clickedCard.getBoundingClientRect().width,
          duration: 1.0,
          ease: 'sine.inOut',
        },
        0
      );
    }

    // Hide modal after collapse completes
    tl.call(() => {
      setShowModalAnimation(false);
    }, null, 1.0);

    // Start card return animation after collapse completes
    const cardTl = gsap.timeline({ delay: 1.0 });

    // Get all cards and elements
    const allCards = document.querySelectorAll('[data-project-card]');
    const otherCards = Array.from(allCards).filter(card => card !== clickedCard);
    const introSection = document.querySelector('.flex.pt-3');
    const logoHeader = document.getElementById('logoHeader');
    const logoHeaderDark = document.getElementById('logoHeaderDark');

    // Fade out header logos
    if (logoHeader) {
      cardTl.to(logoHeader, { opacity: 0, duration: 1.0, ease: 'sine.inOut' }, 0);
    }
    if (logoHeaderDark) {
      cardTl.to(logoHeaderDark, { opacity: 0, duration: 1.0, ease: 'sine.inOut' }, 0);
    }

    // Return card to original position
    if (clickedCard) {
      cardTl.to(
        clickedCard,
        { x: 0, y: 0, duration: 0.6, ease: 'power3.inOut', clearProps: 'transform' },
        0.15
      );
    }

    // Show hidden elements first
    if (introSection) {
      (introSection as HTMLElement).style.display = '';
    }
    otherCards.forEach(card => {
      (card as HTMLElement).style.display = '';
    });

    // Fade in other cards and intro section
    cardTl.to(
      otherCards,
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.inOut', clearProps: 'transform,pointerEvents' },
      0.75
    );

    if (introSection) {
      cardTl.to(
        introSection,
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'sine.inOut',
        },
        0.75
      );
    }

    cardTl.call(() => {
      setIsOpen(false);
      setSelectedSlug(null);
      setClickedCard(null);
      setShowModalAnimation(false);
      setIsAnimating(false); // Animation complete
    });
  }, [clickedCard, isAnimating]);

  // Set up event listeners for project card clicks
  useEffect(() => {
    const handleCardClick = (e: Event) => {
      // Prevent clicks during animations
      if (isAnimating) return;

      const target = e.target as HTMLElement;
      const card = target.closest('[data-project-card]') as HTMLElement;

      if (card) {
        const slug = card.getAttribute('data-project-slug');
        if (slug) {
          e.preventDefault();
          e.stopPropagation();

          // If clicking the same card while open, close it
          if (isOpen && selectedSlug === slug) {
            handleClose();
            return;
          }

          // Scroll to top if user is scrolled down
          if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          setIsAnimating(true);
          setClickedCard(card);
          setSelectedSlug(slug);
          setShowModalAnimation(false);
          setIsOpen(true);
        }
      }
    };

    // ESC key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('click', handleCardClick, true);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleCardClick, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedSlug, handleClose, isAnimating]);

  // Trigger animations when modal opens
  useEffect(() => {
    if (isOpen && selectedSlug && clickedCard) {
      const tl = gsap.timeline();
      const allCards = document.querySelectorAll('[data-project-card]');
      const otherCards = Array.from(allCards).filter(card => card !== clickedCard);
      const introSection = document.querySelector('.flex.pt-3');
      const logoHeader = document.getElementById('logoHeader');
      const logoHeaderDark = document.getElementById('logoHeaderDark');

      // Fade out intro and other cards
      if (introSection) {
        tl.to(introSection, { y: -300, opacity: 0, duration: 1.0, ease: 'sine.inOut' }, 0);
      }
      tl.to(otherCards, { opacity: 0, y: 50, duration: 0.4, ease: 'power3.inOut', pointerEvents: 'none' }, 0);

      // Fade in header logos
      if (logoHeader) {
        tl.to(logoHeader, { opacity: 1, duration: 1.0, ease: 'sine.inOut' }, 0);
      }
      if (logoHeaderDark) {
        tl.to(logoHeaderDark, { opacity: 1, duration: 1.0, ease: 'sine.inOut' }, 0);
      }

      // Move clicked card to center
      const rect = clickedCard.getBoundingClientRect();
      const header = document.querySelector('header');
      const headerRect = header ? header.getBoundingClientRect() : null;
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const headerBottomY = (headerRect?.bottom || 0) + 16;
      const distanceToMove = headerBottomY - rect.top;

      tl.to(clickedCard, { x: centerX - rect.left, y: distanceToMove, duration: 0.6, ease: 'power3.inOut' }, 0.15);

      // Trigger modal animation after card movement completes
      tl.call(() => {
        setShowModalAnimation(true);
        // Hide other elements after animation completes
        setTimeout(() => {
          if (introSection) {
            (introSection as HTMLElement).style.display = 'none';
          }
          otherCards.forEach(card => {
            (card as HTMLElement).style.display = 'none';
          });
          setIsAnimating(false);
        }, 1000);
      }, null, 1.0);
    }
  }, [isOpen, selectedSlug, clickedCard]);

  return (
    <CaseStudyModal
      isOpen={isOpen}
      projectSlug={selectedSlug}
      onClose={handleClose}
      showAnimation={showModalAnimation}
      clickedCard={clickedCard}
    />
  );
}
