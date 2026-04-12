"use client";

import { motion } from "framer-motion";

interface AboutProps {
  aboutProgress: number;
}

const About = ({ aboutProgress }: AboutProps) => {
  const aboutLetters = "About".split("");
  const isVisible = aboutProgress >= 1;

  return (
    <div className="text-white font-bold select-text text-[60px] sm:text-[80px] md:text-[140px] lg:text-[200px] xl:text-[227px]" style={{ lineHeight: "1" }}>
      {aboutLetters.map((letter, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 100, rotate: -10 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 100,
            rotate: isVisible ? 0 : -10
          }}
          transition={{
            duration: 0.4,
            delay: idx * 0.05,
            ease: "backOut",
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default About;