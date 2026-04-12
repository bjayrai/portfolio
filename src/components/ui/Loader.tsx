"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
  onLogoReady?: () => void;
}

const Loader = ({ onComplete, onLogoReady }: LoaderProps) => {
  const [showRai, setShowRai] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTransition, setStartTransition] = useState(false);

  useEffect(() => {
    const bijayTimer = setTimeout(() => {
      setShowRai(true);
    }, 3000);
    
    const startTime = Date.now();
    const totalDuration = 5800;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed < totalDuration) {
        requestAnimationFrame(updateProgress);
      } else {
        setStartTransition(true);
        setTimeout(() => {
          if (onLogoReady) onLogoReady();
        }, 600);
      }
    };
    
    const raf = requestAnimationFrame(updateProgress);
    
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, totalDuration + 600);
    
    return () => {
      clearTimeout(bijayTimer);
      clearTimeout(completeTimer);
      cancelAnimationFrame(raf);
    };
  }, [onComplete, onLogoReady]);

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ backgroundColor: "white" }} // Force white background
    >
      <div className="flex flex-col items-center justify-center relative">
        <motion.div 
          className="flex flex-col items-center"
          animate={startTransition ? { 
            y: -200,
            opacity: 0
          } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* BIJAY */}
          <motion.div 
            className="relative"
            style={{ width: "fit-content" }}
            animate={showRai ? { y: -8 } : { y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div 
              className="text-3xl font-bold text-black relative" 
              style={{ letterSpacing: "12px" }}
            >
              <span className="invisible whitespace-nowrap" style={{ letterSpacing: "10px" }}>B I J A Y</span>
              <motion.span 
                className="absolute inset-0 overflow-hidden whitespace-nowrap bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ ease: "linear", duration: 2.8 }}
              >
                <span className="text-black" style={{ letterSpacing: "11px" }}>B I J A Y</span>
              </motion.span>
            </div>
          </motion.div>

          {/* RAI */}
          <AnimatePresence>
            {showRai && (
              <motion.div 
                className="relative -mb-6"
                style={{ width: "fit-content" }}
                initial={{ y: -10, opacity: 0, height: 0 }}
                animate={{ y: 0, opacity: 1, height: "auto" }}
                exit={{ y: -10, opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="font-bold text-9xl text-black relative -mt-5">
                  <span className="text-black/20">RAI</span>
                  <motion.div 
                    className="absolute inset-0 overflow-hidden"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ ease: "linear", duration: 2.8 }}
                  >
                    <span className="text-black whitespace-nowrap">RAI</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mt-6 relative"
          animate={{
            ...(showRai ? { y: 8 } : { y: 0 }),
            ...(startTransition ? { opacity: 0 } : {})
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden" style={{ width: "210px" }}>
            <motion.div 
              className="h-full bg-black rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;