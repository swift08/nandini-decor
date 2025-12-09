'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const lastUpdateTimeRef = useRef(0);
  
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const throttleDelay = isMobile ? 32 : 16; // Slower on mobile for better performance
    
    const handleScroll = () => {
      try {
        const now = Date.now();
        
        // Throttle updates to prevent excessive calculations
        if (now - lastUpdateTimeRef.current < throttleDelay) {
          return;
        }
        
        // Cancel any pending animation frame
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          try {
            const windowHeight = window.innerHeight || 0;
            const documentHeight = document.documentElement.scrollHeight || 0;
            const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
            
            if (documentHeight > windowHeight) {
              const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
              setScrollProgress(Math.min(100, Math.max(0, progress)));
            }
            
            lastUpdateTimeRef.current = now;
            rafRef.current = null;
          } catch (err) {
            // Prevent crashes from calculation errors
            if (process.env.NODE_ENV === 'development') {
              console.warn('Scroll progress calculation error:', err);
            }
            rafRef.current = null;
          }
        });
      } catch (err) {
        // Prevent crashes from scroll event errors
        if (process.env.NODE_ENV === 'development') {
          console.warn('Scroll event error:', err);
        }
      }
    };

    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial calculation
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to add scroll listener:', err);
      }
    }

    return () => {
      try {
        window.removeEventListener('scroll', handleScroll);
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
      } catch (err) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Performance: Memoize transform style
  const transformStyle = useMemo(() => ({
    transform: `scaleX(${scrollProgress / 100})`,
    transformOrigin: 'left',
    willChange: 'transform',
  }), [scrollProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200/20 z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-pink-400 via-blue-400 to-pink-400 transition-transform duration-75 ease-out"
        style={transformStyle}
      />
    </div>
  );
}

