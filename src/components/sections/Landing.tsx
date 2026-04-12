"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CTAButton from "@/components/ui/CTAButton";
import ScrollRevealOverlay from "@/components/ScrollRevealOverlay";

const Landing = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [rawScrollProgress, setRawScrollProgress] = useState(0);
  const [overlayProgress, setOverlayProgress] = useState(0);
  const [aboutProgress, setAboutProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const words = ["performance", "usability", "clean design"];
  const hasSnappedRef = useRef(false);
  const router = useRouter();

  // Spacer heights for each stage
  const overlaySpacer = 180;    // Black overlay slides up
  const aboutSpacer = 12;       // About text appears quickly after overlay (no blank black screen)
  const timelineSpacer = 600;   // Massive scroll distance for very slow timeline animation (~1.5 words per scroll)
  const totalSpacer = overlaySpacer + aboutSpacer + timelineSpacer;
  const overlayEnd = overlaySpacer / totalSpacer;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollableHeight = document.documentElement.scrollHeight - windowHeight;
      let rawProgress = scrollableHeight > 0 ? Math.min(scrollY / scrollableHeight, 1) : 0;
      
      // Calculate overlay progress
      const overlayRawProgress = Math.min(rawProgress / overlayEnd, 1);
      
      // SNAP BEHAVIOR: When overlay progress reaches 95%, snap to 100%
      if (overlayRawProgress >= 0.95 && overlayRawProgress < 1 && !hasSnappedRef.current) {
        hasSnappedRef.current = true;
        
        const targetProgress = overlayEnd;
        const targetScrollY = targetProgress * scrollableHeight;
        
        window.scrollTo({
          top: targetScrollY,
          behavior: "instant"
        });
        
        rawProgress = targetProgress;
      }
      
      setRawScrollProgress(rawProgress);
      
      const aboutEnd = (overlaySpacer + aboutSpacer) / totalSpacer;
      
      // Overlay progress: 0 to 1 over first overlaySpacer
      const overlay = Math.min(rawProgress / overlayEnd, 1);
      setOverlayProgress(overlay);
      
      // About progress: appears quickly once overlay is complete
      let about = 0;
      if (rawProgress > overlayEnd) {
        const t = (rawProgress - overlayEnd) / (aboutEnd - overlayEnd);
        about = Math.min(t, 1); // Linear — no delay
      }
      setAboutProgress(about);
      
      // Timeline progress: very slow, linear over large timelineSpacer
      let timeline = 0;
      if (rawProgress > aboutEnd) {
        const t = (rawProgress - aboutEnd) / (1 - aboutEnd);
        timeline = Math.min(t, 1); // Linear for predictable speed
      }
      setTimelineProgress(timeline);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [overlaySpacer, aboutSpacer, totalSpacer, overlayEnd]);

  const handleStartProject = () => {
    router.push("/work#contact");
  };

  return (
    <>
      {/* Main content – fixed, fully interactive */}
      <div className="fixed inset-0 z-0 bg-white">
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 pt-16">
          <div className="w-full text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight"
            >
              <span className="inline">Frontend developer focused on </span>
              <span className="inline-flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="font-bold whitespace-nowrap text-gray-900"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="inline">.</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl"
            >
              From concept to deployment, I create applications that feel as good as they look.
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-8 sm:mt-12 mb-6 sm:mb-8"
            >
              Bridging design
              <br className="hidden sm:block" />
              <span className="block mt-2">and functionality</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 mt-6 sm:mt-8"
            >
              <CTAButton variant="primary" onClick={handleStartProject} icon="arrow">
                Get Started
              </CTAButton>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Separate spacers for each animation stage */}
      <div style={{ pointerEvents: "none" }}>
        {/* Stage 1: Black overlay slides up and SNAPS at 95% */}
        <div style={{ height: `${overlaySpacer}vh` }} />
        
        {/* Stage 2: About text appears quickly */}
        <div style={{ height: `${aboutSpacer}vh` }} />
        
        {/* Stage 3: Timeline animates very slowly */}
        <div style={{ height: `${timelineSpacer}vh` }} />
      </div>

      {/* Scroll Reveal Overlay */}
      <ScrollRevealOverlay 
        overlayProgress={overlayProgress}
        aboutProgress={aboutProgress}
        timelineProgress={timelineProgress}
      />
    </>
  );
};

export default Landing;