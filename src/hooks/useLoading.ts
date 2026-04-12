import { useState, useEffect } from 'react';

interface UseLoadingProps {
  duration?: number;
  increment?: number;
  onComplete?: () => void;
}

export const useLoading = ({ 
  duration = 4000, // Increased to 4 seconds for slower reveal
  increment = 1,
  onComplete 
}: UseLoadingProps = {}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalTime = duration / 100; // Calculate time per increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onComplete?.();
          }, 500); // Brief pause at 100%
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, increment, onComplete]);

  return { loading, progress };
};