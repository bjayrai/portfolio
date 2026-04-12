"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useLayoutEffect } from "react";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/layout/Navbar";
import Landing from "@/components/sections/Landing";

let loaderHasPlayed = false;

export default function Home() {
  const [showContent, setShowContent] = useState(loaderHasPlayed);
  const [showNavbar, setShowNavbar] = useState(loaderHasPlayed);
  const [isInitializing, setIsInitializing] = useState(!loaderHasPlayed);

  // LayoutEffect executes before paint to avoid flash of loader if already visited
  useLayoutEffect(() => {
    if (loaderHasPlayed) {
      setShowContent(true);
      setShowNavbar(true);
    }
    setIsInitializing(false);
  }, []);

  const handleLoaderComplete = () => {
    loaderHasPlayed = true;
    setShowContent(true);
  };

  const handleNavbarReady = () => {
    setShowNavbar(true);
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {isInitializing ? null : (
        <AnimatePresence mode="wait">
          {!showContent ? (
            <Loader
              key="loader"
              onComplete={handleLoaderComplete}
              onLogoReady={handleNavbarReady}
            />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="min-h-screen bg-white"
            >
              <Navbar isVisible={showNavbar} />
              <main className="relative">
                <Landing />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}