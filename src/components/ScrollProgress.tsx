'use client';

import { useState, useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps max
    
    const handleScroll = () => {
      try {
        const now = Date.now();
        
        // Throttle updates to prevent excessive calculations
        if (now - lastUpdateTime < throttleDelay) {
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
            
            lastUpdateTime = now;
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

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200/20 z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-pink-400 via-blue-400 to-pink-400 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}

