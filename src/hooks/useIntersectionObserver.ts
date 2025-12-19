import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Optimized Intersection Observer hook for lazy loading
 * Returns a ref that can initially be null while React attaches it.
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [RefObject<HTMLDivElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Default options optimized for mobile
    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px', // Start loading 50px before element is visible
      threshold: 0.1,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (!hasIntersected) {
            setHasIntersected(true);
            // Unobserve after first intersection to reduce overhead
            observer.unobserve(element);
          }
        } else {
          setIsIntersecting(false);
        }
      });
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasIntersected, options]);

  return [elementRef, isIntersecting || hasIntersected];
}

