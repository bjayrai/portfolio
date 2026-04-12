import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  onIntersect?: () => void;
}

// This is a named export
export const useScrollAnimation = <T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '-100px',
  onIntersect,
}: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            onIntersect?.();
          }
        });
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, onIntersect]);

  return elementRef;
};