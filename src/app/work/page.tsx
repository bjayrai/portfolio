"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import SmoothScroller from "@/components/ui/SmoothScroller";

export default function Work() {
  return (
    <SmoothScroller>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="min-h-screen bg-white relative pt-20"
        >
          {/* Navbar is forced visible on subpages */}
          <Navbar isVisible={true} />
          
          <main className="relative z-20">
            <Services />
            <Projects />
            <Process />
            <Contact />
            <Footer />
          </main>
        </motion.div>
      </div>
    </SmoothScroller>
  );
}
