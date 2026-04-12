"use client";

import { motion, AnimatePresence } from "framer-motion";
import AboutSection from "./sections/About";
import TimelineProgress from "./TimelineProgress";

interface ScrollRevealOverlayProps {
  overlayProgress: number;
  aboutProgress: number;
  timelineProgress: number;
}

const ScrollRevealOverlay = ({
  overlayProgress,
  aboutProgress,
  timelineProgress
}: ScrollRevealOverlayProps) => {
  const isAboutVisible = aboutProgress >= 1;

  return (
    <div
      id="about-container"
      className="fixed inset-0 bg-black z-10"
      style={{
        transform: `translateY(${(1 - overlayProgress) * 100}%)`,
        transition: "transform 0.3s ease-out",
        pointerEvents: "none",
      }}
    >
      <div className="absolute inset-0 px-4 pt-24 pb-6 sm:px-6 sm:pt-28 sm:pb-10 md:p-12" style={{ pointerEvents: "auto" }}>
        <AnimatePresence>
          {isAboutVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full flex flex-col md:block"
            >
              {/* About Text - Top Left */}
              <div className="lg:absolute lg:top-15 lg:left-0">
                <AboutSection aboutProgress={aboutProgress} />
              </div>

              {/* Timeline Progress - Below About on mobile, Right side on desktop */}
              {/* Desktop */}
              <div
                className="hidden lg:block absolute right-0"
                style={{ top: "calc(3.75rem + 113.5px - 25px)", width: "45%" }}
              >
                <TimelineProgress timelineProgress={timelineProgress} />
              </div>

              {/* Mobile/Tablet — sits below the About title with proper spacing */}
              <div className="block lg:hidden mt-4 flex-1 overflow-y-auto w-full">
                <TimelineProgress timelineProgress={timelineProgress} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScrollRevealOverlay;