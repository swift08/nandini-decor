'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Cake, 
  Briefcase, 
  Flower2, 
  Lightbulb, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  MessageCircle,
  Crown,
  Gem,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowRight,
  Heart,
  Sparkle,
  Baby,
  Clock
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import { useDebounce } from '@/hooks/useDebounce';
import { useThrottle } from '@/hooks/useThrottle';
import { useIsMobile } from '@/hooks/useIsMobile';

// Ultra-lazy load heavy components - No SSR, no loading state to prevent blocking
const ImageLightbox = lazy(() => import('@/components/ImageLightbox'));
const Floral3DBackground = lazy(() => import('@/components/Floral3DBackground'));

// Empty fallback - don't block rendering
const EmptyFallback = () => null;

export default function Home() {
  // Performance: Use refs for values that don't need re-renders
  const isMobile = useIsMobile();
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // State management - minimal state for better performance
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedPortfolioFilter, setSelectedPortfolioFilter] = useState<string>('Weddings');
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state immediately - no delay, no blocking
  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Cleanup on unmount
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, []);

  // Performance: Memoize static data to prevent re-creation on every render
  const slideshowImages = useMemo(() => [
    '/assets/slideshow/1397a1da1a651f744843f6f2723ce1be.jpg',
    '/assets/slideshow/6d75fb4daed10738a13cb58e866173e3.jpg',
    '/assets/slideshow/81784fe61a55530952362176f387b489.jpg',
    '/assets/slideshow/ee442c0b634b9cf37215763290f3a399.jpg',
    '/assets/slideshow/fe94c28172b22139550b974f1f0c4b1e.jpg',
    '/assets/slideshow/WhatsApp Image 2025-11-27 at 5.29.00 PM.jpeg',
    '/assets/slideshow/WhatsApp Image 2025-11-27 at 5.29.01 PM (1).jpeg',
    '/assets/slideshow/WhatsApp Image 2025-11-27 at 5.29.01 PM.jpeg',
  ], []);

  // Enhanced smooth scroll optimization - One-time setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    }
  }, []);

  // Performance: Optimized slideshow with ref to prevent stale closures
  useEffect(() => {
    if (isSlideshowPaused || slideshowImages.length === 0) {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
      return;
    }
    
    slideshowIntervalRef.current = setInterval(() => {
      setCurrentHeroSlide((prev) => {
        const next = (prev + 1) % slideshowImages.length;
        return next;
      });
    }, isMobile ? 6000 : 5000); // Slower on mobile for better performance

    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
    };
  }, [isSlideshowPaused, slideshowImages.length, isMobile]);

  // Ensure currentHeroSlide is always within valid range - Optimized
  useEffect(() => {
    if (currentHeroSlide >= slideshowImages.length) {
      setCurrentHeroSlide(0);
    }
  }, [currentHeroSlide, slideshowImages.length]);

  // Helper function to get image paths from assets
  const getImagePaths = (folderName: string): string[] => {
    const images: string[] = [];
    try {
      // Using require.context-like approach with dynamic imports
      // For Next.js, we'll use static imports
      return images;
    } catch {
      return images;
    }
  };

  // Performance: Memoize portfolio data to prevent re-creation
  const portfolioByService = useMemo(() => ({
    'Weddings': [
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.19.26 PM (1).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.19.26 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.19.27 PM (1).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.19.27 PM (2).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.19.27 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.20.16 PM (1).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.20.16 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.20.17 PM (1).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.20.17 PM (2).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.20.17 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.20.18 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.23.15 PM (1).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.23.15 PM (2).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.23.15 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.23.16 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.24.27 PM (1).jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.24.27 PM.jpeg',
      '/assets/wedding/WhatsApp Image 2025-11-18 at 4.24.28 PM.jpeg',
    ],
    'Engagement': [
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.26 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.26 PM (2).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.26 PM.jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.27 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.27 PM.jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.28 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.28 PM.jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.20 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.20 PM (2).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.20 PM (3).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.20 PM.jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.21 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.21 PM (2).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.21 PM (3).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.21 PM.jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.22 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.22 PM (2).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.22 PM.jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.23 PM (1).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.23 PM (2).jpeg',
      '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.23 PM.jpeg',
    ],
    'Baby Shower': [
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.51 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.52 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.52 PM (2).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.52 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.53 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.53 PM (2).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.53 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.54 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.54 PM (2).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.54 PM (3).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.54 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.28 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.28 PM (2).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.28 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.29 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.29 PM (2).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.29 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.30 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.30 PM (2).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.30 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.31 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.37.31 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 5.01.29 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 5.01.29 PM.jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 5.02.38 PM (1).jpeg',
      '/assets/baby shower/WhatsApp Image 2025-11-18 at 5.02.38 PM.jpeg',
    ],
    'Naming Ceremony': [
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.07 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.07 PM.jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.08 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.08 PM (2).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.08 PM.jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.09 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.09 PM (2).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.09 PM.jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.10 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.10 PM (2).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.10 PM (3).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.10 PM.jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.11 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.11 PM (2).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.11 PM.jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.12 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.12 PM (2).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.12 PM.jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.13 PM (1).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.13 PM (2).jpeg',
      '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.13 PM.jpeg',
    ],
    'Birthday Parties': [
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.36 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.37 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.37 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.38 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.38 PM (2).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.38 PM (3).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.38 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.39 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.39 PM (2).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.39 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.40 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.40 PM (2).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.40 PM (3).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.40 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.41 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.41 PM (2).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.41 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.42 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.42 PM (2).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.42 PM.jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.43 PM (1).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.43 PM (2).jpeg',
      '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.43 PM.jpeg',
    ],
    'Haldi': [
      '/assets/haldi/WhatsApp Image 2025-11-18 at 4.56.03 PM.jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 4.56.04 PM.jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 4.56.04 PM (1).jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 4.57.10 PM.jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 4.57.10 PM (1).jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 4.57.10 PM (2).jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 5.00.13 PM.jpeg',
      '/assets/haldi/WhatsApp Image 2025-11-18 at 5.00.14 PM.jpeg',
    ],
    'Bridal Shower & Parties': [
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.24 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.24 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.25 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.25 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.25 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.26 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.26 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.26 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.27 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.27 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.27 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.28 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.28 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.28 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.29 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.29 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.29 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.30 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.30 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.30 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.31 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.31 PM (2).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.31 PM.jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.32 PM (1).jpeg',
      '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.32 PM.jpeg',
    ],
    'House Warming': [
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.18 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.18 PM (2).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.18 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.19 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.19 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.20 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.20 PM (2).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.20 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.40.27 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.40.27 PM (2).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.40.27 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.40.28 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.40.28 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.22 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.22 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.23 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.23 PM (2).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.23 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.24 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.24 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.42 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.41.42 PM.jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.42.05 PM (1).jpeg',
      '/assets/house warming/WhatsApp Image 2025-11-25 at 2.42.05 PM.jpeg',
    ],
    'Garlands': [
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.16 PM (1).jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.16 PM (2).jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.16 PM (3).jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.16 PM.jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.17 PM (1).jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.17 PM (2).jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.17 PM.jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.18 PM (1).jpeg',
      '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.18 PM.jpeg',
    ],
    'Half Saree Ceremony': [
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.27 PM.jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.28 PM (1).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.28 PM (2).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.28 PM.jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.29 PM (1).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.29 PM (2).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.29 PM.jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.30 PM (1).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.30 PM (2).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.30 PM.jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.31 PM (1).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.31 PM (2).jpeg',
      '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.31 PM.jpeg',
    ]
  }), []);

  // Performance: Memoize computed values to prevent recalculation
  const allPortfolioImages = useMemo(() => 
    Object.values(portfolioByService).flat(), 
    [portfolioByService]
  );
  
  const portfolioFilters = useMemo(() => 
    Object.keys(portfolioByService), 
    [portfolioByService]
  );
  
  // Hero slideshow images - 11 photos from each portfolio section
  const heroSlides = useMemo(() => {
    const slides: Array<{ src: string; alt: string }> = [];
    
    // Get 11 photos from each category (or all if less than 11)
    Object.entries(portfolioByService).forEach(([category, images]) => {
      const selectedImages = images.slice(0, 11); // Take first 11 or all if less
      selectedImages.forEach((image, index) => {
        slides.push({
          src: image,
          alt: `${category} - Image ${index + 1}`
        });
      });
    });
    
    return slides;
  }, [portfolioByService]);
  
  // Performance: Memoize filtered images to prevent recalculation
  const getFilteredPortfolioImages = useMemo(() => {
    return portfolioByService[selectedPortfolioFilter as keyof typeof portfolioByService] || [];
  }, [portfolioByService, selectedPortfolioFilter]);

  const formatPhoneLink = (phone: string) => phone.replace(/\s+/g, '');

  // Performance: Memoize static data
  const services = useMemo(() => [
    {
      icon: Flower2,
      title: 'Weddings',
      description: 'Heavenly blue mandaps, floating florals, and royal aisle artistry inspired by Mysuru palaces.',
      variant: 'floral',
      image: '/assets/wedding/WhatsApp Image 2025-11-18 at 4.19.26 PM (1).jpeg'
    },
    {
      icon: Sparkles,
      title: 'Engagement',
      description: 'Celeste-toned floral tunnels, proposal pedestals, and cinematic light projections for modern rituals.',
      variant: 'floral',
      image: '/assets/engagement/WhatsApp Image 2025-11-18 at 4.27.26 PM (1).jpeg'
    },
    {
      icon: Baby,
      title: 'Baby Shower',
      description: 'Soft pastel blooms with kinetic petals, cradle installations, and keepsake corners.',
      variant: 'floral',
      image: '/assets/baby shower/WhatsApp Image 2025-11-18 at 4.34.51 PM.jpeg'
    },
    {
      icon: Heart,
      title: 'Naming Ceremony',
      description: 'Custom name monograms blooming out of sky-blue clouds with fragrant jasmine curtains.',
      variant: 'floral',
      image: '/assets/naming ceremony/WhatsApp Image 2025-11-18 at 4.41.07 PM (1).jpeg'
    },
    {
      icon: Cake,
      title: 'Birthday Parties',
      description: 'Immersive 3D stage sets, holographic confetti, and animated floral fountains for every milestone.',
      variant: 'birthday',
      image: '/assets/birthday parties/WhatsApp Image 2025-11-18 at 4.43.36 PM.jpeg'
    },
    {
      icon: Gem,
      title: 'Half Saree Ceremony',
      description: 'Royal fusion of temple motifs and contemporary floral chandeliers celebrating coming-of-age grace.',
      variant: 'floral',
      image: '/assets/Half saree ceremony/WhatsApp Image 2025-11-25 at 2.27.27 PM.jpeg'
    },
    {
      icon: Briefcase,
      title: 'Bachelorette & Bridal Shower',
      description: 'Experiential lounges with hanging gardens, mist tunnels, and handcrafted prop styling.',
      variant: 'floral',
      image: '/assets/bridal shower and parties/WhatsApp Image 2025-11-25 at 2.37.24 PM.jpeg'
    },
    {
      icon: Lightbulb,
      title: 'House Warming',
      description: 'Celestial rangoli projections, suspended planters, and scent-programmed welcome pathways.',
      variant: 'floral',
      image: '/assets/house warming/WhatsApp Image 2025-11-25 at 2.39.18 PM.jpeg'
    },
    {
      icon: Crown,
      title: 'German Service Props & Antique Props',
      description: 'Exclusive European-grade props, kinetic arches, and illuminated floral structures—our signature spotlight.',
      variant: 'highlight',
      image: '/assets/wedding/WhatsApp Image 2025-11-18 at 4.23.15 PM (1).jpeg'
    },
    {
      icon: Crown,
      title: 'Wedding Props',
      description: 'Premium wedding props, elegant arches, and traditional decorative elements for royal celebrations.',
      variant: 'highlight',
      image: '/assets/wedding/WhatsApp Image 2025-11-18 at 4.24.27 PM (1).jpeg'
    },
    {
      icon: Flower2,
      title: 'Mehendi & Sangeet',
      description: 'Vibrant floral backdrops, henna-inspired installations, and musical stage designs for pre-wedding celebrations.',
      variant: 'floral',
      image: '/assets/engagement/WhatsApp Image 2025-11-18 at 4.31.20 PM (1).jpeg'
    },
    {
      icon: Sparkles,
      title: 'Haldi',
      description: 'Golden floral arrangements, turmeric-themed decor, and traditional haldi ceremony setups with modern touches.',
      variant: 'floral',
      image: '/assets/haldi/WhatsApp Image 2025-11-18 at 4.56.03 PM.jpeg'
    },
    {
      icon: Flower2,
      title: 'Garlands',
      description: 'Handcrafted floral garlands, traditional jasmine strings, and custom garland arrangements for all ceremonies.',
      variant: 'floral',
      image: '/assets/garlands/WhatsApp Image 2025-11-25 at 2.43.16 PM.jpeg'
    }
  ], []);

  const legacyStats = useMemo(() => [
    {
      value: 'Since 1993',
      label: 'Generations of royal celebrations'
    },
    {
      value: '7000+',
      label: 'Luxury events curated with love'
    },
    {
      value: 'Mysuru',
      label: 'Floral artistry inspired by heritage'
    }
  ], []);

  const founders = useMemo(() => [
    {
      name: 'Chandrashekar P',
      role: 'Founder & Creative Legend',
      phone: '+91 93414 79989',
      note: 'The visionary who began the Nandini floral story in 1993.',
      image: '/assets/Chandrashekar P.jpeg'
    },
    {
      name: 'Chandan C',
      role: 'Managing Director',
      phone: '+91 84532 28622',
      note: 'Design-led MD ensuring every event feels futuristic yet rooted.',
      image: '/assets/chandan.jpeg'
    }
  ], []);

  const founderHighlights: Record<string, { badge: string; quote: string; stat: string; aura: string }> = useMemo(() => ({
    'Chandrashekar P': {
      badge: 'Heritage Visionary',
      quote: '“I script every mandap with Mysuru’s royal poetry.”',
      stat: '30+ yrs of bespoke floral architecture',
      aura: 'from-[#FFF4E6] via-[#FDE7F5] to-[#E0F2FF]'
    },
    'Chandan C': {
      badge: 'Design Futurist',
      quote: '“Technology + tradition is the new luxury love story.”',
      stat: '7000+ immersive celebrations curated',
      aura: 'from-[#E0F2FF] via-[#F7FCFF] to-[#FDE7F5]'
    }
  }), []);

  const businessHighlights = useMemo(() => [
    {
      title: 'Floral Motion Lab',
      detail: 'Heavenly blue palettes layered with kinetic petals, mist, and projection art.'
    },
    {
      title: 'Legacy Craftsmanship',
      detail: 'Hand-built mandaps, arches, and props perfected over 3 decades of celebrations.'
    },
    {
      title: 'German Prop Authority',
      detail: 'Exclusive props, precision-engineered arches, and premium textures for royal stages.'
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: 'Priya Sharma',
      event: 'Wedding Reception',
      rating: 5,
      text: 'Nandini Decoration transformed our wedding into a fairytale! The attention to detail and royal ambiance they created was beyond our expectations. Highly recommended!'
    },
    {
      name: 'Rajesh Kumar',
      event: 'Corporate Launch',
      rating: 5,
      text: 'Professional, punctual, and absolutely stunning work! They understood our vision perfectly and delivered a corporate event setup that impressed all our guests.'
    },
    {
      name: 'Anjali Reddy',
      event: 'Birthday Celebration',
      rating: 5,
      text: 'The team made my daughter\'s birthday truly special. The decoration was elegant, creative, and exactly what we dreamed of. Thank you for the wonderful memories!'
    },
    {
      name: 'Vikram Singh',
      event: 'Anniversary Party',
      rating: 5,
      text: 'Outstanding service from start to finish! They created a magical atmosphere for our 25th anniversary. The floral arrangements and lighting were absolutely breathtaking. Our guests are still talking about it!'
    },
    {
      name: 'Meera Patel',
      event: 'Baby Shower',
      rating: 5,
      text: 'Such a beautiful and elegant setup for my baby shower! The team was so creative and paid attention to every little detail. The pastel theme was executed perfectly. Couldn\'t have asked for more!'
    },
    {
      name: 'Arjun Nair',
      event: 'Product Launch',
      rating: 5,
      text: 'We hired Nandini Decoration for our product launch event, and they exceeded all expectations! The modern yet sophisticated decor perfectly matched our brand. Excellent coordination and execution!'
    },
    {
      name: 'Kavya Desai',
      event: 'Engagement Ceremony',
      rating: 5,
      text: 'The engagement ceremony was absolutely dreamy! The combination of traditional and modern elements was perfect. The team worked tirelessly to make our day special. Truly professional!'
    },
    {
      name: 'Rohit Menon',
      event: 'Housewarming Party',
      rating: 5,
      text: 'Amazing work! They transformed our new home into a celebration space. The decor was tasteful, elegant, and created such a warm, welcoming atmosphere. Highly professional team!'
    },
    {
      name: 'Sneha Iyer',
      event: 'Graduation Party',
      rating: 5,
      text: 'My graduation party was a huge success thanks to Nandini Decoration! The setup was modern, vibrant, and exactly what I wanted. The team was so accommodating and creative. Five stars!'
    },
    {
      name: 'Aditya Rao',
      event: 'Retirement Function',
      rating: 5,
      text: 'They created a beautiful, dignified setup for my father\'s retirement function. The decor was elegant and respectful, perfectly capturing the occasion. Professional service throughout!'
    },
    {
      name: 'Divya Krishnan',
      event: 'Bridal Shower',
      rating: 5,
      text: 'The bridal shower was absolutely gorgeous! Every detail was perfect - from the centerpieces to the lighting. The team understood my vision and brought it to life beautifully. Thank you!'
    },
    {
      name: 'Suresh Gowda',
      event: 'Festival Celebration',
      rating: 5,
      text: 'For our Diwali celebration, they created an absolutely stunning setup! The traditional elements mixed with modern touches were perfect. The entire team was professional and punctual. Excellent work!'
    }
  ], []);

  // Performance: Removed isVisible state - using Intersection Observer instead (handled by components)

  // Performance: Optimized testimonial rotation with throttling
  const testimonialIntervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }
    testimonialIntervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, isMobile ? 6000 : 5000); // Slower on mobile
    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, [testimonials.length, isMobile]);

  // Removed duplicate hero slideshow effect - already handled above

  // Performance: Memoize callbacks to prevent re-renders
  const openLightbox = useCallback((index: number, imagesArray: string[] = allPortfolioImages) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, [allPortfolioImages]);

  const whatsappNumber = '+918453228622';
  const founderNumber = '+919341479989';
  const emailAddress = 'Chandanmysore77@gmail.com';
  const businessHours = 'Mon – Sun · 10:30 AM – 10:00 PM IST';
  const locationLink = 'https://www.google.com/maps/place/Nandini+Lightings+and+Decorators,+528,+Theobald+Rd,+Near+PWD+Quarters,+Nazarbad,+Mysuru,+Karnataka+570010';
  const mapEmbedUrl = 'https://www.google.com/maps?q=Nandini+Lightings+and+Decorators,+528,+Theobald+Rd,+Nazarbad,+Mysuru&output=embed';
  const puneethOffer = {
    title: 'Power Star Tribute Offer',
    detail: 'On Puneeth Rajkumar Sir’s birthday, enjoy a 50% celebration upgrade on every event you book with us.',
    thought: '“Let gratitude bloom wider than the sky—celebrate by touching hearts.”',
    birthDate: 'Born 17 March 1975'
  };
  const contactEntries = [
    {
      icon: Phone,
      title: 'Chandan C (Managing Director)',
      value: whatsappNumber,
      href: `tel:${whatsappNumber.replace(/[^0-9+]/g, '')}`,
      note: ''
    },
    {
      icon: Phone,
      title: 'Chandrashekar P (Founder)',
      value: founderNumber,
      href: `tel:${founderNumber.replace(/[^0-9+]/g, '')}`,
      note: ''
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: emailAddress,
      href: `mailto:${emailAddress}`,
      note: 'Share floor plans, Pinterest boards, or rider lists.'
    },
    {
      icon: Clock,
      title: 'Business Hours (IST)',
      value: businessHours,
      note: 'Monday – Sunday · Morning 10:30 AM to Night 10:00 PM'
    }
  ];
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;

  // Performance: Memoize service mapping
  const serviceToPortfolioMap: Record<string, string> = useMemo(() => ({
    'Weddings': 'Weddings',
    'Engagement': 'Engagement',
    'Baby Shower': 'Baby Shower',
    'Half Saree Ceremony': 'Half Saree Ceremony',
    'House Warming': 'House Warming',
    'Garlands': 'Garlands',
    'Bachelorette & Bridal Shower': 'Bridal Shower & Parties',
    'Birthday Parties': 'Birthday Parties',
    'Naming Ceremony': 'Naming Ceremony',
    'Mehendi & Sangeet': 'Engagement',
    'Haldi': 'Haldi',
    'German Service Props & Antique Props': 'Weddings',
    'Wedding Props': 'Weddings'
  }), []);

  // Performance: Memoize scroll function
  const smoothScrollToPortfolio = useCallback((filterName: string) => {
    // Update filter first
    setSelectedPortfolioFilter(filterName);
    
    // Function to scroll to portfolio
    const scrollToPortfolio = () => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        const yOffset = -120; // Account for fixed navbar
        const rect = portfolioSection.getBoundingClientRect();
        const scrollY = rect.top + window.pageYOffset + yOffset;
        
        // Use smooth scroll
        window.scrollTo({
          top: Math.max(0, scrollY),
          behavior: 'smooth'
        });
        return true;
      }
      return false;
    };
    
    // Try multiple times to ensure it works
    // First attempt immediately
    scrollToPortfolio();
    
    // Second attempt after a short delay (for React state updates)
    setTimeout(() => {
      scrollToPortfolio();
    }, 150);
    
    // Third attempt after React has fully updated
    setTimeout(() => {
      scrollToPortfolio();
    }, 400);
  }, []);

  // Performance: Memoize smooth scroll function
  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -120;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // Use native smooth scroll if available
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      } else {
        // Fallback smooth scroll with easing
        const start = window.pageYOffset;
        const distance = targetPosition - start;
        const duration = Math.min(Math.abs(distance) * 0.5, 1000);
        let startTime: number | null = null;
        
        const easeInOutCubic = (t: number): number => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          window.scrollTo(0, start + distance * easeInOutCubic(progress));
          
          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        };
        
        requestAnimationFrame(animation);
      }
    }
  };

  // Performance: Removed Intersection Observer - Components handle their own visibility

  // Handle unhandled promise rejections and errors - Enhanced for mobile
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Prevent default error handling to avoid crashes
      event.preventDefault();
      
      // Safely extract error message
      try {
        const reason = event.reason;
        if (reason instanceof Error) {
          // It's a proper Error object
          if (process.env.NODE_ENV === 'development') {
            console.error('Unhandled promise rejection:', reason);
          }
        } else if (reason && typeof reason === 'object' && 'message' in reason) {
          // It has a message property
          if (process.env.NODE_ENV === 'development') {
            console.error('Unhandled promise rejection:', reason.message);
          }
        }
        // If it's an Event object or other type, silently ignore
      } catch (e) {
        // Silently ignore any errors in error handling
      }
    };

    const handleError = (event: ErrorEvent) => {
      // Prevent default error handling and page crashes
      event.preventDefault();
      
      // Log in development only
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error caught:', event.message, event.filename);
      }
      
      // Return true to prevent error from propagating
      return true;
    };

    try {
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      window.addEventListener('error', handleError);
    } catch (err) {
      // Ignore if listeners can't be added
    }

    return () => {
      try {
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        window.removeEventListener('error', handleError);
      } catch (err) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Never block rendering - always show content immediately
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Premium Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Simple Slideshow Background */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden z-10"
        onMouseEnter={() => setIsSlideshowPaused(true)}
        onMouseLeave={() => setIsSlideshowPaused(false)}
      >
        {/* Optimized Slideshow Background - CSS-based for smooth performance */}
        <div className="absolute inset-0 z-[1] overflow-hidden">
          {slideshowImages.map((image, index) => {
            const isActive = index === (currentHeroSlide % slideshowImages.length);
            return (
              <div
                key={`slideshow-${index}-${image}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  willChange: isActive ? 'opacity' : 'auto',
                  backfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src={image}
                  alt={`Slideshow Image ${index + 1} of ${slideshowImages.length}`}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  quality={index === 0 ? 90 : 70}
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                  }}
                />
              </div>
            );
          })}
              </div>

        {/* Subtle Dark Overlay for Better Contrast */}
        <div 
          className="absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.25) 100%)',
          }}
        />

        {/* Hero Content - Elegant Centered Overlay Box Style */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-5xl">
            {/* Elegant Semi-Transparent White Box - "The White Collection" Style */}
            <div
              className="relative mx-auto animate-fade-in-up"
              style={{
                animationDelay: '0.3s',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* Semi-transparent white box with border - Frosted Glass Effect */}
              <div 
                className="relative px-8 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-12 md:py-16 lg:py-20 rounded-2xl"
                  className="hero-glass-mobile"
                  style={{
                    background: isMobile ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(200, 200, 200, 0.5)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                  }}
              >
                {/* Decorative Divider Line Above Logo */}
                <div className="flex items-center justify-center mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent max-w-sm" />
                  <div className="mx-4 w-2.5 h-2.5 rounded-full bg-gold/70" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent max-w-sm" />
                </div>

                {/* Main Logo - Smaller Size */}
                <div className="flex justify-center mb-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="relative">
                    <Image
                      src="/assets/logo.png"
                      alt="Nandini Decorations Logo"
                      width={300}
                      height={300}
                      className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl mx-auto"
                      style={{ 
                        filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))',
                        transform: 'translate3d(0, 0, 0)',
                      }}
                      priority
                      unoptimized
                    />
                    <div className={`absolute inset-0 bg-gold/20 rounded-full animate-pulse -z-10 ${isMobile ? '' : 'blur-2xl'}`} />
                  </div>
                </div>

                {/* Subtitle Text - No Gap Below Logo */}
                <p
                  className="text-lg sm:text-xl md:text-2xl font-elegant text-center mb-4 md:mb-5 animate-fade-in-up"
                  style={{
                    color: '#1a1a1a',
                    fontFamily: "'Cormorant Garamond', serif",
                    lineHeight: '1.6',
                    fontWeight: 500,
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)',
                    animationDelay: '0.7s',
                    transform: 'translate3d(0, 0, 0)',
                   }}
              >
                Crafting moments with love since 1993.
                <br />
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Where every celebration blooms into a memory.
                  </span>
                </p>
            
                {/* CTA Button - No Gap Below Tagline */}
                <div
                  className="flex justify-center animate-fade-in-up"
                  style={{
                    animationDelay: '0.8s',
                    transform: 'translate3d(0, 0, 0)',
                  }}
            >
                  <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 md:px-12 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg uppercase tracking-wide shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  style={{
                      background: '#2c2c2c',
                      color: '#ffffff',
                      letterSpacing: '0.1em',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book Your Event
                  </a>
                </div>

                {/* Decorative Divider Line 3 */}
                <div className="flex items-center justify-center mt-10 md:mt-12 mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent max-w-xs" />
                  <div className="mx-4 w-2 h-2 rounded-full bg-gold/60" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent max-w-xs" />
                </div>

                {/* Stats Row - Elegant Design - Fixed Mobile, Same Desktop */}
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 animate-fade-in-up"
                  style={{
                    animationDelay: '1.2s',
                    transform: 'translate3d(0, 0, 0)',
                }}
                >
                {legacyStats.map((stat, index) => (
                    <div
                    key={stat.value}
                      className="p-3 md:p-6 lg:p-8 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                    style={{
                        background: isMobile ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid rgba(200, 200, 200, 0.4)',
                        animationDelay: `${1.3 + index * 0.1}s`,
                        transform: 'translate3d(0, 0, 0)',
                      }}
                  >
                      <p className="text-xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2" style={{
                        fontFamily: "'Inter', sans-serif",
                        color: '#0a0a0a',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
                      }}>{stat.value}</p>
                      <p className="text-xs md:text-base font-medium leading-snug md:leading-tight whitespace-normal" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: '#1a1a1a',
                        textShadow: '0 1px 1px rgba(255, 255, 255, 0.4)',
                      }}>{stat.label}</p>
                    </div>
                ))}
        </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Carousel Indicators - Bottom Center - All Images */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center max-w-full px-4">
          {slideshowImages.map((_, index) => {
            const activeIndex = currentHeroSlide % slideshowImages.length;
            return (
                  <button
                    key={index}
                onClick={() => {
                  setCurrentHeroSlide(index);
                  setIsSlideshowPaused(true);
                  setTimeout(() => setIsSlideshowPaused(false), 3000);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-white'
                    : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
            );
          })}
              </div>

        {/* Elegant Slide Counter - All Images */}
        <div className="absolute top-6 md:top-8 right-4 md:right-8 z-20 px-3 py-1.5 rounded-full border border-white/20 slide-counter-mobile"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <p className="text-xs md:text-sm font-semibold text-white">
            {(currentHeroSlide % slideshowImages.length) + 1} / {slideshowImages.length}
          </p>
        </div>
      </section>

      {/* Services Section - Creative Floral Design */}
      <section 
        id="services" 
        className="py-16 md:py-24 relative z-10"
        style={{
          position: 'relative',
        }}
      >
        {/* 3D Floral Background - Lazy loaded */}
        <Suspense fallback={null}>
          <Floral3DBackground 
            images={slideshowImages.slice(0, 3)} 
            intensity="medium"
          />
        </Suspense>
        {/* Dark Blue to White Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.15) 0%, rgba(15, 61, 86, 0.08) 30%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.1) 100%)',
            zIndex: 1,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Creative Section Header */}
          <div 
            className="text-center mb-12 md:mb-16 animate-fade-in-up"
            id="services"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {/* Decorative Floral Icons - CSS animation for performance */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="animate-float-delay-1">
                <Flower2 className="w-8 h-8 text-[#FAD1E7]" />
              </div>
              <div className="animate-float-delay-2">
                <Flower2 className="w-10 h-10 text-[#BCE1F1]" />
              </div>
              <div className="animate-float-delay-3">
                <Flower2 className="w-8 h-8 text-[#9ED2C9]" />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-center font-elegant" style={{ 
              textShadow: '3px 3px 6px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.5)',
              color: '#0F3D56'
            }}>
              <span 
                className="text-gradient-sky"
                style={{
                  background: 'linear-gradient(135deg, #0F3D56 0%, #1F5A7B 30%, #0F3D56 60%, #1F5A7B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 8s ease infinite',
                  filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.9))',
                }}
              >
                Our Services
              </span>
            </h2>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-[#3A6E8F] max-w-3xl mx-auto px-4 font-elegant animate-fade-in-up"
              style={{ animationDelay: '0.3s', transform: 'translate3d(0, 0, 0)' }}
            >
              Fully floral hero animations, kinetic props, and immersive 3D stages—crafted differently for every ritual and modern celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => {
              const isBirthday = service.variant === 'birthday';
              const isHighlight = service.variant === 'highlight';
              return (
              <div
                  key={service.title}
                  className={`floral-service-card group ${isHighlight ? 'floral-service-card--highlight' : ''} animate-fade-in-up`}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <div className="floral-service-glow" />
                  
                  {/* Service Theme Image */}
                  <div className="relative w-full h-56 mb-5 rounded-2xl overflow-hidden shadow-lg" style={{ position: 'relative', zIndex: 10 }}>
                    <Image
                      src={service.image.startsWith('http') ? service.image : encodeURI(service.image)}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-115"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      quality={index === 0 ? 85 : 70}
                      unoptimized={!service.image.startsWith('http')}
                      onError={(e) => {
                        if (process.env.NODE_ENV === 'development') {
                          console.error('Image failed to load:', service.image);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D56]/80 via-[#0F3D56]/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="p-2.5 rounded-xl bg-white/95 shadow-lg service-icon-mobile">
                        <service.icon className="w-6 h-6 text-[#0F3D56]" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-2xl mb-1">{service.title}</h3>
                    </div>
                  </div>
                  
                  {isBirthday && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="birthday-3d-wrapper-small">
                        <div className="gift-shadow" />
                        <div className="gift-base">
                          <div className="gift-panel gift-panel--left" />
                          <div className="gift-panel gift-panel--front" />
                          <div className="gift-panel gift-panel--right" />
                        </div>
                    <div
                          className="gift-lid animate-float-delay-1"
                          style={{ transform: 'translate3d(0, 0, 0)' }}
                        >
                          <div className="gift-ribbon" />
                    </div>
                    </div>
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-[#3A6E8F] leading-relaxed mb-3 sm:mb-4">{service.description}</p>

                  {isHighlight && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDECF6] text-[#A43E77] text-xs font-semibold mb-3">
                      <Gem className="w-3 h-3" />
                      Flagship German Props
                    </span>
                  )}

                  {isBirthday && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F7EF] text-[#13795B] text-xs font-semibold mb-3">
                      <Sparkles className="w-3 h-3" />
                      3D Motion Stage
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const portfolioFilter = serviceToPortfolioMap[service.title] || 'Weddings';
                      smoothScrollToPortfolio(portfolioFilter);
                    }}
                    className="flex items-center justify-between text-sm text-[#2A6F97] font-semibold w-full group/arrow hover:text-[#A43E77] transition-colors duration-300 cursor-pointer relative z-10 bg-transparent border-none p-0 text-left"
                    type="button"
                  >
                    <span>{isHighlight ? 'Signature German prop experience' : 'View Portfolio'}</span>
                    <div
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                    >
                      <ArrowRight className="w-4 h-4 group-hover/arrow:text-[#A43E77] transition-colors duration-300" />
                    </div>
                  </button>
                        </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section 
        id="portfolio" 
        className="py-8 md:py-16 relative overflow-hidden z-10"
      >
        {/* 3D Floral Background */}
        <Floral3DBackground 
          images={slideshowImages.slice(1, 4)} 
          intensity="medium"
        />
        {/* Dark Blue to White Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.15) 0%, rgba(15, 61, 86, 0.08) 30%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.1) 100%)',
            zIndex: 1,
          }}
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 md:mb-3 text-[#0F3D56] text-center" style={{ 
              textShadow: '3px 3px 6px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.5)',
            }}>
              <span className="text-gradient-sky" style={{
                filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.9))',
              }}>Portfolio</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-2 md:mb-3" />
            <p className="text-base sm:text-lg text-[#0F3D56] font-semibold max-w-2xl mx-auto text-center px-4 drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.9)' }}>
              Explore our stunning transformations and creative event decorations
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-4">
            {portfolioFilters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedPortfolioFilter(filter)}
                className={`px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                  selectedPortfolioFilter === filter
                    ? 'text-[#0F3D56] shadow-lg scale-105 border-2'
                    : 'bg-white text-[#3A6E8F] border-2 hover:border-[#FAD1E7]/60'
                }`}
                style={selectedPortfolioFilter === filter ? {
                  background: 'linear-gradient(135deg, rgba(250, 209, 231, 0.9) 0%, rgba(188, 225, 241, 0.9) 100%)',
                  borderColor: 'rgba(250, 209, 231, 0.5)'
                } : {
                  borderColor: 'rgba(250, 209, 231, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
            {getFilteredPortfolioImages.map((image, index) => {
              const allImages = getFilteredPortfolioImages;
              return (
                <motion.div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group shadow-premium section-card-hover"
                  onClick={() => {
                    const globalIndex = allPortfolioImages.indexOf(image);
                    openLightbox(globalIndex >= 0 ? globalIndex : index);
                  }}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.06,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    zIndex: 10,
                    transition: { 
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={encodeURI(image)}
                    alt={`Portfolio image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading="lazy"
                    quality={75}
                    unoptimized
                    onError={(e) => {
                      if (process.env.NODE_ENV === 'development') {
                        console.error('Portfolio image failed to load:', image);
                      }
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#0F3D56]/80 via-[#0F3D56]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.span
                      className="text-white font-semibold text-lg"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      View
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 transition-all duration-300"
                    whileHover={{ borderWidth: 4 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className="py-8 md:py-12 text-white relative overflow-hidden z-10"
      >
        {/* Plain Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/assets/client testimonials bg.jpg"
              alt="Testimonials Background"
              fill
              className="object-cover"
              quality={90}
              priority
              unoptimized
            />
          </motion.div>
          
          {/* Dark Blue to White Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.25) 0%, rgba(15, 61, 86, 0.15) 30%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.15) 100%)',
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-2 md:mb-3">
            <h2 className="text-4xl md:text-5xl font-bold mb-1 md:mb-2 text-center mx-auto">
              Client <span className="text-gradient-sky">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-1 md:mb-2" />
            <p className="text-lg text-white/80 max-w-2xl mx-auto text-center">
              Hear what our satisfied clients have to say
            </p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              key={activeTestimonial}
              className="testimonial-card-clear rounded-2xl p-8 md:p-12 shadow-2xl border-2 relative overflow-hidden w-full mx-auto"
              style={{
                background: 'rgba(15, 61, 86, 0.95)',
                borderColor: 'rgba(250, 209, 231, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(250, 209, 231, 0.2) 0%, rgba(188, 225, 241, 0.25) 50%, rgba(250, 209, 231, 0.2) 100%)',
                  backgroundSize: "200% 200%"
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="text-gold fill-gold mx-1" size={24} />
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.p
                  className="text-xl md:text-2xl text-center mb-8 leading-relaxed italic font-elegant text-white font-semibold drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  "{testimonials[activeTestimonial].text}"
                </motion.p>
                
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="font-bold text-2xl text-gold mb-2 drop-shadow-lg">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-white/90 text-lg font-medium">
                    {testimonials[activeTestimonial].event}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`rounded-full transition-all ${
                    index === activeTestimonial 
                      ? 'bg-gold' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    width: index === activeTestimonial ? 32 : 12,
                    height: 12,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Puneeth Rajkumar Tribute Offer */}
      <section className="py-10 md:py-14 relative z-10" id="tribute">
        {/* 3D Floral Background */}
        <Floral3DBackground 
          images={slideshowImages.slice(4, 7)} 
          intensity="medium"
        />
        {/* Dark Blue to White Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.15) 0%, rgba(15, 61, 86, 0.08) 30%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.1) 100%)',
            zIndex: 1,
          }}
        />
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-3xl bg-gradient-to-r from-[#BCE1F1] via-white to-[#D3ECF6] p-6 md:p-10 shadow-2xl border border-[#A7D6EC]/60 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className={`absolute -top-10 -right-10 w-40 h-40 bg-[#82C8E5]/40 rounded-full ${isMobile ? '' : 'blur-3xl'}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute bottom-0 left-10 w-32 h-32 bg-[#FDE6F0]/70 rounded-full ${isMobile ? '' : 'blur-3xl'}`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0F3D56] font-semibold shadow">
                  <Star className="w-4 h-4 text-[#F9A8D4]" />
                  {puneethOffer.title}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-[#0F3D56] mt-4 mb-3">
                  {puneethOffer.detail}
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white/60 text-[#0F3D56] font-semibold text-sm shadow-sm mb-4">
                  <Crown className="w-4 h-4 text-[#F59E0B]" />
                  {puneethOffer.birthDate}
                </div>
                <p className="text-lg text-[#2A6F97] mb-4">
                  We honour the Power Star's kindness by gifting unbeatable value to families who celebrate with us.
                </p>
                <div className="p-4 rounded-2xl bg-white/80 border border-[#BCE1F1] text-[#264F6F] font-elegant italic">
                  {puneethOffer.thought}
                </div>
              </div>
              <div className="space-y-4">
                {/* Puneeth Rajkumar Photo */}
                <motion.div
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="/assets/PRK photo.webp"
                    alt="Puneeth Rajkumar - Power Star"
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      if (process.env.NODE_ENV === 'development') {
                        console.error('PRK photo failed to load');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D56]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg drop-shadow-lg">Puneeth Rajkumar</p>
                    <p className="text-white/90 text-sm drop-shadow">Power Star - A Legend Forever</p>
                  </div>
                </motion.div>
                
                <div className="flex items-center gap-3 text-[#0F3D56]">
                  <Flower2 className="w-6 h-6 text-[#82C8E5]" />
                  <span>Applicable to weddings, rituals, corporate experiences, and couture floral installations.</span>
                </div>
                <div className="flex items-center gap-3 text-[#0F3D56]">
                  <Gem className="w-6 h-6 text-[#F9A8D4]" />
                  <span>Includes access to our German prop vault + motion floral upgrades.</span>
                </div>
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#0F3D56] text-white font-semibold shadow-xl"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Claim the Tribute Offer
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-10 md:py-16 relative overflow-hidden z-10"
      >
        {/* 3D Floral Background */}
        <Floral3DBackground 
          images={[slideshowImages[5], slideshowImages[0], slideshowImages[2]]} 
          intensity="medium"
        />
        {/* Decorative Floral Background Elements */}
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full -translate-x-1/2 -translate-y-1/2 ${isMobile ? '' : 'blur-3xl'}`} style={{ background: 'radial-gradient(circle, rgba(250, 209, 231, 0.3), transparent)' }} />
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full translate-x-1/2 translate-y-1/2 ${isMobile ? '' : 'blur-3xl'}`} style={{ background: 'radial-gradient(circle, rgba(188, 225, 241, 0.3), transparent)' }} />
        {/* Dark Blue to White Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.15) 0%, rgba(15, 61, 86, 0.08) 30%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.1) 100%)',
            zIndex: 1,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-3 text-[#0F3D56] text-center"
              style={{ 
                textShadow: '3px 3px 6px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About <span className="text-gradient-sky" style={{
                filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.9))',
              }}>Our Story</span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-gold mx-auto mb-2 md:mb-3"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p
              className="text-lg md:text-xl text-[#0F3D56] leading-relaxed mb-4 font-elegant font-semibold drop-shadow-md"
              style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.9)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              At Nandini Decoration, every celebration blooms in shades of sky blue and celeste. Since 1993, our family-led studio has curated floral architecture, immersive lighting, and animated storytelling for Karnataka's most cherished milestones.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-[#0F3D56] leading-relaxed font-elegant font-semibold drop-shadow-md"
              style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.9)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              From heritage weddings to futuristic showers, we custom-build petals, props, and projections that feel dreamy yet disciplined—always honoring your story and the Mysuru legacy we're proud of.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Since 1993 - Business Highlights */}
      <section className="py-12 md:py-16 relative z-10" id="legacy">
        {/* 3D Floral Background */}
        <Floral3DBackground 
          images={slideshowImages.slice(2, 5)} 
          intensity="medium"
        />
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-[#2A6F97] font-semibold">
              <Crown className="w-4 h-4" />
              Since 1993 · Business Highlights
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3D56] mt-6 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Mysuru's most trusted floral futurists.
            </h2>
            <p className="text-lg text-[#0F3D56] font-semibold mt-4 drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.9)' }}>
              Nandini Lightings & Decorators blend heritage detailing with next-level animation, 3D stages, and prop innovation to deliver unforgettable experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {businessHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl section-card-hover floral-hover-glow floral-hover-swirl"
                  className="business-highlight-card-mobile"
                  style={{
                    background: isMobile ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.95)',
                    border: '2px solid rgba(250, 209, 231, 0.4)',
                  }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.04,
                  transition: { 
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-white" style={{
                  background: 'linear-gradient(135deg, rgba(250, 209, 231, 0.9) 0%, rgba(188, 225, 241, 0.9) 100%)'
                }}>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F3D56] mb-2">{highlight.title}</h3>
                <p className="text-sm sm:text-base text-[#3A6E8F] leading-relaxed">{highlight.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section
        id="founder"
        className="py-12 md:py-20 relative overflow-hidden z-10"
      >
        {/* 3D Floral Background */}
        <Floral3DBackground 
          images={slideshowImages.slice(5, 8)} 
          intensity="medium"
        />
        {/* Dark Blue to White Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.15) 0%, rgba(15, 61, 86, 0.08) 30%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.1) 100%)',
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute -top-32 right-0 w-[28rem] h-[28rem] bg-[#BCE1F1]/45 rounded-full ${isMobile ? '' : 'blur-[150px]'}`} />
          <div className={`absolute bottom-0 -left-16 w-[32rem] h-[32rem] bg-[#FFD6E8]/35 rounded-full ${isMobile ? '' : 'blur-[160px]'}`} />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(130,200,229,0.18) 1px, transparent 0)',
              backgroundSize: '120px 120px'
            }}
          />
          <motion.span
            className={`absolute top-16 left-10 w-16 h-16 rounded-full border border-white/70 bg-white/30 ${isMobile ? '' : 'blur-sm'}`}
            animate={{ y: [0, -14, 0], opacity: [0.8, 1, 0.8], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className={`absolute bottom-16 right-16 w-24 h-24 rounded-full border border-[#82C8E5]/70 bg-[#82C8E5]/20 ${isMobile ? '' : 'blur-lg'}`}
            animate={{ y: [0, 18, 0], opacity: [0.7, 1, 0.7], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BCE1F1] text-[#0F3D56] font-semibold">
              <Heart className="w-4 h-4" />
              Founded by family · Rooted in Mysuru
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3D56] mt-4 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)' }}>About the Founders</h2>
            <p className="text-lg text-[#0F3D56] font-semibold mt-3 drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.9)' }}>
              Chandrashekar P (Founder) and Chandan C (Managing Director) personally blueprint each celebration with unmatched care and availability.
            </p>
        </motion.div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {founders.map((leader, index) => (
              <motion.div
                key={leader.name}
                className="relative rounded-[42px] p-[3px] bg-gradient-to-br from-[#F0F8FF] via-white to-[#FFEFF7] shadow-premium-xl section-card-hover overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.35 }
                }}
              >
                <div className="absolute inset-0 opacity-35 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(130,200,229,0.18), transparent 55%)' }} />
                <div className="relative grid gap-8 lg:grid-cols-[minmax(280px,360px)_1fr] items-center rounded-[38px] founder-card-clear border border-white/70 p-6 md:p-10">
                  <div className="relative h-full w-full">
                    <div className={`absolute -inset-2 rounded-[34px] bg-gradient-to-br from-[#FEEBD3] via-transparent to-[#CDE8FF] opacity-70 ${isMobile ? '' : 'blur-2xl'}`} />
                    <div className="relative rounded-[32px] overflow-hidden border border-white/60 shadow-[0_35px_65px_rgba(15,61,86,0.3)] min-h-[340px]">
                      {leader.image ? (
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover object-center founder-image-clear"
                          quality={100}
                          unoptimized
                          priority={leader.name === 'Chandan C'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const currentSrc = target.src;
                            const basePath = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                            const currentExt = currentSrc.substring(currentSrc.lastIndexOf('.'));
                            if (currentExt === '.jpg') {
                              target.src = basePath + '.jpeg';
                            } else if (currentExt === '.jpeg') {
                              target.src = basePath + '.png';
                            } else if (currentExt === '.png') {
                              target.src = basePath + '.webp';
                            } else if (target.parentElement) {
                              target.parentElement.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-[#82C8E5] to-[#3b82f6] flex items-center justify-center text-white text-4xl font-bold">
                                  ${leader.name.split(' ')[0][0]}
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#82C8E5] to-[#3b82f6] flex items-center justify-center text-white text-4xl font-bold">
                          {leader.name.split(' ')[0][0]}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D56]/35 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#3A6E8F]">
                      Since 1993 · Mysuru Lineage
                    </p>
                    <div>
                      <h3 className="text-4xl font-serif font-bold text-[#0F3D56]">{leader.name}</h3>
                      <p className="text-[#1f4b66] font-semibold text-lg mt-1">{leader.role}</p>
                    </div>
                    <p className="text-[#214961] leading-relaxed text-lg">
                      {leader.note}
                    </p>
                    <div className="rounded-3xl bg-white border border-[#BCE1F1]/70 p-6 shadow-[0_15px_35px_rgba(15,61,86,0.12)] flex flex-col gap-3">
                      <p className="text-[11px] uppercase tracking-[0.4em] text-[#4A7EA2]">
                        Direct Line
                      </p>
                      <a 
                        href={`tel:${leader.phone.replace(/[^0-9+]/g, '')}`} 
                        className="flex items-center gap-3 text-[#0A2E45] font-bold text-3xl tracking-wide whitespace-nowrap"
                      >
                        <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#E1F2FF] text-[#0A2E45] shadow-inner">
                          <Phone className="w-5 h-5" />
                        </span>
                        {leader.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-8 md:py-12 relative overflow-hidden z-10"
      >
        {/* 3D Floral Background */}
        <Floral3DBackground 
          images={slideshowImages.slice(1, 4)} 
          intensity="medium"
        />
        {/* Decorative Floral Elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full translate-x-1/2 -translate-y-1/2 ${isMobile ? '' : 'blur-3xl'}`} style={{ background: 'radial-gradient(circle, rgba(250, 209, 231, 0.4), transparent)' }} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full -translate-x-1/2 translate-y-1/2 ${isMobile ? '' : 'blur-3xl'}`} style={{ background: 'radial-gradient(circle, rgba(188, 225, 241, 0.3), transparent)' }} />
        {/* Dark Blue to White Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 61, 86, 0.15) 0%, rgba(15, 61, 86, 0.08) 30%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0.1) 100%)',
            zIndex: 1,
          }}
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-4 md:mb-6">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-2 md:mb-3 text-[#0F3D56] text-center"
              style={{ 
                textShadow: '3px 3px 6px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.5)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In <span className="text-gradient-sky" style={{
                filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.9))',
              }}>Touch</span>
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-2 md:mb-3" />
            <p className="text-lg text-[#0F3D56] font-semibold max-w-2xl mx-auto text-center drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.9)' }}>
              Ready to create something extraordinary? Contact us today!
            </p>
          </div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {contactEntries.map((entry, index) => (
              <motion.div
                    key={entry.title}
                    className="p-5 rounded-2xl shadow-lg contact-card-clear contact-card-hover"
                    style={{
                      background: 'rgba(255, 255, 255, 0.98)',
                      border: '2px solid rgba(250, 209, 231, 0.4)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-2xl text-[#0F3D56] flex-shrink-0" style={{
                        background: 'linear-gradient(135deg, rgba(250, 209, 231, 0.3) 0%, rgba(188, 225, 241, 0.3) 100%)'
                      }}>
                        <entry.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm uppercase tracking-wide text-[#2A6F97] font-semibold">{entry.title}</p>
                        {entry.href ? (
                          <a
                            href={entry.href}
                            className="text-xl font-bold text-[#0F3D56] block mt-1 break-words break-all"
                            target={entry.href.startsWith('http') ? '_blank' : undefined}
                            rel={entry.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {entry.value}
                          </a>
                        ) : (
                          <p className="text-xl font-bold text-[#0F3D56] mt-1 break-words">{entry.value}</p>
                        )}
                        {entry.note && <p className="text-sm text-[#4A7C9F] mt-1 break-words">{entry.note}</p>}
                    </div>
                  </div>
              </motion.div>
                ))}
              </div>

              <motion.div
                className="p-6 rounded-3xl bg-[#0F3D56] text-white shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Visit Us</p>
                <h3 className="text-2xl font-bold mt-2 mb-2">Nazarbad · Mysuru · Karnataka</h3>
                <p className="text-white/80 mb-4">
                  528, Theobald Road, Near PWD Quarters · Landmark: Nandini Lightings & Decorators studio.
                </p>
                <a
                  href={locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#0F3D56] font-semibold"
                >
                  <MapPin className="w-4 h-4" />
                  Open Google Maps
                </a>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={`tel:${founderNumber.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 font-semibold"
                  style={{
                    borderColor: 'rgba(250, 209, 231, 0.6)',
                    color: '#0F3D56',
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone className="w-5 h-5" />
                  Call
                </motion.a>
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                  className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(250, 209, 231, 0.95) 0%, rgba(188, 225, 241, 0.95) 100%)',
                    color: '#0F3D56'
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
              </motion.a>
              </div>
            </div>

            <motion.div
              className="h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 relative z-30"
              style={{
                borderColor: 'rgba(250, 209, 231, 0.5)',
                backgroundColor: 'white',
                isolation: 'isolate'
              }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'relative', zIndex: 40 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nandini Lightings and Decorators location"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Next Level Creative Design */}
      <footer className="relative bg-gradient-to-b from-[#0F3D56] via-[#134B70] to-[#0F3D56] text-white overflow-hidden">
        {/* Animated Wave Background */}
        <div className="absolute top-0 left-0 w-full h-32 overflow-hidden">
          <motion.svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.path
              d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="url(#wave-gradient)"
              animate={{
                d: [
                  "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                  "M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z",
                  "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#82C8E5" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#BCE1F1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#D3ECF6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        {/* Floating Floral Petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="footer-petal"
              style={{
                left: `${(i / 12) * 100}%`,
                animationDelay: `${i * 0.8}s`,
              }}
              animate={{
                y: ['-10%', '110%'],
                x: [0, i % 2 === 0 ? 30 : -30],
                rotate: [0, i % 2 === 0 ? 45 : -45],
                scale: [0.4, 0.8, 0.4],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 15 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Animated Mesh Gradient Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(76, 29, 149, 0.3) 0%, transparent 50%)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Image
                    src="/assets/logo.png"
                    alt="Nandini Decoration Logo"
                    width={50}
                    height={50}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))' }}
                    unoptimized
                  />
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  Nandini Decoration
                </h3>
              </motion.div>
              <motion.p
                className="text-white/70 mb-6 font-elegant text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Creating Royal Celebrations Since 1993
              </motion.p>
              
              {/* Animated Social Icons */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, color: "from-purple-500 to-pink-500", href: "#" },
                  { icon: Facebook, color: "from-blue-500 to-blue-600", href: "#" },
                  { icon: Twitter, color: "from-sky-400 to-sky-500", href: "#" },
                  { icon: Youtube, color: "from-red-500 to-red-600", href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="relative group"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.color} p-0.5`}>
                      <div className="w-full h-full rounded-full bg-[#0F3D56] flex items-center justify-center group-hover:bg-transparent transition-colors">
                        <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 ${isMobile ? '' : 'blur-xl'}`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-xl font-bold mb-6 text-gold flex items-center gap-2">
                <Sparkle className="w-5 h-5" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#" },
                  { label: "About Us", href: "#about" },
                  { label: "Services", href: "#services" },
                  { label: "Gallery", href: "#portfolio" },
                  { label: "Testimonials", href: "#testimonials" },
                  { label: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <motion.a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === '#portfolio') {
                          e.preventDefault();
                          smoothScrollTo('portfolio');
                        }
                      }}
                      className="text-white/70 hover:text-gold transition-colors flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-6 text-gold flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Our Services
              </h4>
              <ul className="space-y-3">
                {[
                  "Wedding Decor",
                  "Birthday Setup",
                  "Corporate Events",
                  "Floral Design",
                  "Stage Lighting",
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <motion.div
                      className="text-white/70 hover:text-gold transition-colors flex items-center gap-2 group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <Sparkle className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                      <span>{service}</span>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 text-gold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Get In Touch
              </h4>
              <div className="space-y-4 mb-6">
                <motion.a
                  href={`tel:${whatsappNumber}`}
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Phone className="w-5 h-5" />
                  </motion.div>
                  <span>{whatsappNumber}</span>
                </motion.a>
                <motion.a
                  href="mailto:Chandanmysore77@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.div>
                  <span>Chandanmysore77@gmail.com</span>
                </motion.a>
                <motion.div
                  className="flex items-center gap-3 text-white/70 group"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <MapPin className="w-5 h-5" />
                  </motion.div>
                  <span>Mysore, Karnataka, India</span>
                </motion.div>
              </div>

            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-gold/20 pt-8 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <motion.p
                className="text-white/50 text-sm flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} Nandini Decoration. All rights reserved.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Animated Particles - Client-side only to avoid hydration mismatch */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => {
              // Generate stable random values based on index
              const seed = i * 0.618033988749895; // Golden ratio for better distribution
              const left = ((seed * 100) % 100);
              const top = (((seed * 1.618) * 100) % 100);
              const duration = 3 + ((seed * 2) % 2);
              const delay = ((seed * 3) % 3);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gold rounded-full"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                  }}
                />
              );
            })}
          </div>
        )}
      </footer>

      {/* Lightbox - Lazy loaded */}
      {lightboxOpen && (
        <Suspense fallback={null}>
          <ImageLightbox
            images={allPortfolioImages}
            currentIndex={currentImageIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={() => setCurrentImageIndex((prev) => (prev + 1) % allPortfolioImages.length)}
            onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + allPortfolioImages.length) % allPortfolioImages.length)}
          />
        </Suspense>
      )}

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 group"
        aria-label="Contact on WhatsApp"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(34, 197, 94, 0.5)",
            "0 0 40px rgba(34, 197, 94, 0.8)",
            "0 0 20px rgba(34, 197, 94, 0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
      </motion.a>
    </div>
  );
}