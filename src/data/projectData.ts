/**
 * Centralized Project Data
 * Contains banner metadata and card info for all case studies
 * Used by: Modal, individual pages, and card grid
 */

import type { ImageMetadata } from 'astro';

// Import all project assets
import bgBerkshireGrey from '../assets/berkshiregrey/bg-background.webp';
import logoBerkshireGrey from '../assets/berkshiregrey/bg-logo.svg';
import bgGrammaroke from '../assets/grammaroke/music-venue.webp';
import logoGrammaroke from '../assets/grammaroke/favicon.svg';
import bgBandscan from '../assets/bandscan/fox-theater.webp';
import logoBandscan from '../assets/bandscan/bandscan-logo.webp';
import bgToast from '../assets/toast/restaurant.webp';
import logoToast from '../assets/toast/toast-logo.svg';
import bgPinkSofaHour from '../assets/pinksofahour/studio.webp';
import logoPinkSofaHour from '../assets/pinksofahour/psh-logo.webp';

export interface ProjectData {
  slug: string;
  href: string;
  title: string;
  body: string;
  overview: string;
  roles: string[];
  tools: string[];
  duration: string;
  bgImg: ImageMetadata;
  bgImgAlt: string;
  logo: ImageMetadata;
  logoAlt: string;
  invertLogo?: boolean;
  nextProject: string;
  isVisible: boolean;
}

export const projectsData: Record<string, ProjectData> = {
  berkshiregrey: {
    slug: 'berkshiregrey',
    href: '/berkshiregrey',
    title: 'Berkshire Grey',
    body: 'Design of Human Machine Interfaces (HMIs) for AI-enabled enterprise robotics',
    overview:
      'Design and development of Human Machine Interfaces (HMIs) for AI-enabled enterprise robotics, streamlining complex robotic systems and making them more intuitive and accessible for operators.',
    roles: [
      'Design Lead (Mobile robotics team)',
      'Design Technologist / Full Stack Developer (Picking robotics team)',
    ],
    tools: ['Adobe XD', 'Figma', 'React', 'Python'],
    duration: '15 months',
    bgImg: bgBerkshireGrey,
    bgImgAlt: 'Image of mobile robots carrying items',
    logo: logoBerkshireGrey,
    logoAlt: 'Berkshire Grey logo',
    invertLogo: true,
    nextProject: 'grammaroke',
    isVisible: true,
  },

  grammaroke: {
    slug: 'grammaroke',
    href: '/grammaroke',
    title: 'Grammaroke',
    body: 'Design and development of a music focused language learning web application',
    overview: 'Design and development of a music based language learning web application.',
    roles: ['UX/UI Designer', 'Full Stack Developer'],
    tools: ['Figma', 'SvelteKit', 'Vercel', 'Supabase'],
    duration: '6 months',
    bgImg: bgGrammaroke,
    bgImgAlt: 'Image of a coffee shop music venue',
    logo: logoGrammaroke,
    logoAlt: 'Grammaroke logo',
    invertLogo: true,
    nextProject: 'bandscan',
    isVisible: true,
  },

  bandscan: {
    slug: 'bandscan',
    href: '/bandscan',
    title: 'Bandscan',
    body: 'Design and development of a mobile app for discovering local artists and live music events',
    overview: 'Design and development of a mobile app for discovering local artists and live music events.',
    roles: ['UX/UI Designer', 'Frontend Developer'],
    tools: ['Figma', 'SolidJS'],
    duration: '4 months',
    bgImg: bgBandscan,
    bgImgAlt: 'Image of a theater marquee',
    logo: logoBandscan,
    logoAlt: 'Bandscan logo',
    invertLogo: true,
    nextProject: 'toast',
    isVisible: true,
  },

  toast: {
    slug: 'toast',
    href: '/toast',
    title: 'Toast',
    body: 'Design of a mobile QR code based pay-at-the-table service for restaurants',
    overview:
      'Design of a mobile QR code based pay-at-the-table service, providing customers with a safer dining experience and increasing sales for restaurants.',
    roles: ['UX Design Intern'],
    tools: ['Figma'],
    duration: '3 months',
    bgImg: bgToast,
    bgImgAlt: 'Image of the inside of a restaurant',
    logo: logoToast,
    logoAlt: 'Toast logo',
    invertLogo: false,
    nextProject: 'pinksofahour',
    isVisible: true,
  },

  pinksofahour: {
    slug: 'pinksofahour',
    href: '/pinksofahour',
    title: 'Pink Sofa Hour',
    body: 'Web design for a local music show, cultivating community by connecting artists and audiences',
    overview:
      'Web designer for The Pink Sofa Hour, a Colorado based music interview show focused on cultivating community by connecting artists and audiences.',
    roles: ['Web Designer'],
    tools: ['Wix Studio'],
    duration: '4 months',
    bgImg: bgPinkSofaHour,
    bgImgAlt: 'Homepage of the Pink Sofa Hour website',
    logo: logoPinkSofaHour,
    logoAlt: 'Pink Sofa Hour logo',
    invertLogo: true,
    nextProject: 'berkshiregrey', // Cycles back
    isVisible: false,
  },
};

/**
 * Get all visible projects (for homepage grid)
 */
export function getVisibleProjects(): ProjectData[] {
  return Object.values(projectsData).filter((project) => project.isVisible);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData[slug];
}

/**
 * Get next project in sequence
 */
export function getNextProject(currentSlug: string): ProjectData | undefined {
  const current = projectsData[currentSlug];
  if (!current) return undefined;
  return projectsData[current.nextProject];
}
