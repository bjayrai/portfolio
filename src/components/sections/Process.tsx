"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your vision, goals, and requirements through an initial consultation. I learn about your brand, target audience, and what success looks like for your project.",
  },
  {
    number: "02",
    title: "Planning & Strategy",
    description: "Defining the project scope, architecture, and timeline. I map out the user journey, create wireframes, and establish the technical foundation before writing a single line of code.",
  },
  {
    number: "03",
    title: "Design & Prototype",
    description: "Translating strategy into visual designs. I create high-fidelity mockups and interactive prototypes that bring the concept to life, ensuring every detail aligns with the project goals.",
  },
  {
    number: "04",
    title: "Development",
    description: "Building the project with clean, maintainable code. I focus on performance, responsiveness, and seamless interactions—turning approved designs into a fully functional product.",
  },
  {
    number: "05",
    title: "Testing & Refinement",
    description: "Rigorous testing across devices and browsers ensures everything works flawlessly. I refine details, optimize performance, and polish the experience until it meets the highest standards.",
  },
  {
    number: "06",
    title: "Launch & Support",
    description: "Deploying your project to production with careful monitoring. I provide post-launch support, handle any adjustments, and ensure a smooth transition from development to live.",
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const updateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="process" ref={containerRef} className="bg-white text-black h-[400vh] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
        
        {/* Header - Selectable text, no pointer-events-none */}
        <div className="absolute top-16 sm:top-24 left-0 w-full px-4 sm:px-6 md:px-12 z-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight">
            How I Work
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed">
            You&apos;re not just another project, your vision gets the attention it deserves.
          </p>
        </div>

        {/* The horizontally scrolling track Container */}
        <div className="w-full flex items-center">
          <motion.div 
            ref={scrollRef}
            style={{ x }} 
            className="flex items-center w-max"
          >
            {/* Left Spacer */}
            <div className="shrink-0 w-[50vw] ml-[calc(-42.5vw)] md:ml-[calc(-225px)]" />

            {/* Cards wrapper */}
            <div className="flex gap-6 md:gap-10 items-center">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="w-[85vw] md:w-[450px] flex-shrink-0 bg-gray-50 border border-gray-100 rounded-[40px] p-10 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 group h-[450px] flex flex-col justify-between"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-gray-200 text-6xl md:text-7xl font-bold font-mono leading-none group-hover:text-black/5 transition-colors duration-500">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-full border border-gray-100 bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="w-2 h-2 rounded-full bg-black group-hover:bg-blue-600 transition-colors duration-300" />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[15px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Spacer */}
            <div className="shrink-0 w-[50vw] mr-[calc(-42.5vw)] md:mr-[calc(-225px)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;