"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TimelineProgressProps {
  timelineProgress: number;
}

const TimelineProgress = ({ timelineProgress }: TimelineProgressProps) => {
  const timelineData = [
    { year: "2016", designation: "Graphic Designer", descriptionIndex: 0 },
    { year: "2019", designation: "Wordpress Developer", descriptionIndex: 1 },
    { year: "2020", designation: "Web Developer", descriptionIndex: 2 },
    { year: "2021", designation: "Mobile App Developer", descriptionIndex: 3 },
    { year: "2023", designation: "Independent Developer", descriptionIndex: 4 },
    { year: "Present", designation: "Independent Developer", descriptionIndex: 4 },
  ];

  const descriptions = [
    `Hi, I'm Bijay Rai. Well, I know the scroll brought you here to learn a bit about my journey—but if you'd rather skip ahead, the navigation bar up top will take you wherever you want to go.\n\nSo, how did I begin as a graphic designer? Interesting, right? Like many in the creative field, it started long before I even knew it could become a career. I was always drawn to art—sketching cartoon characters, animals, or even trying to capture real-life faces. It didn't matter what it was, as long as I could create something.\n\nThat interest kept growing, slowly moving from paper to screen. What began as simple curiosity turned into a deeper fascination with how visuals can communicate ideas, emotions, and stories. I started exploring design more seriously—learning how colors interact, how typography speaks, and how composition can change everything.\n\nGraphic design became more than just creating something that looks good; it became about creating something that feels right and communicates clearly. That's where it all started for me—the foundation of everything I build on today.`,

    `I know—it might seem a bit confusing at first. Going from designing to WordPress? But it actually happened quite naturally.\n\nWhile working on a personal project, I reached a point where static designs weren't enough anymore. I wanted to see my ideas come to life—fully functional, interactive, and accessible on the web. Instead of relying on someone else to build it, I decided to take it on myself.\n\nThat's where WordPress came in. What started as a simple need to build a website quickly turned into a deeper interest in how things work behind the scenes. I began exploring themes, customizing layouts, and understanding how structure and functionality come together.\n\nIt wasn't just about making a site look good anymore—it was about making it work smoothly, feel intuitive, and deliver a complete experience. That curiosity pushed me further into development, where design and functionality finally met in one place.`,

    `After stepping into computer science during my undergraduate journey, I realized it was time to push my creativity beyond just visuals and into how things actually work.\n\nUp until then, I had been focused on design and building websites with tools—but this was different. This was about understanding the logic behind everything on the screen. Naturally, curiosity kicked in again. I started exploring how websites function under the hood—how interactions are handled, how data flows, and how everything connects together.\n\nWhat excited me most was the control it offered. Instead of working within limits, I could now build from scratch, shape functionality exactly how I imagined, and create more dynamic, responsive experiences.\n\nWeb development became the space where creativity met logic—where I wasn't just designing interfaces, but engineering the entire experience behind them.`,

    `As my journey continued, the next natural step was mobile development—taking everything I had learned and bringing it into the hands of users.\n\nWhat drew me in was the idea of creating experiences that feel personal and immediate. Mobile isn't just another screen; it's something people interact with constantly. That made me curious about how to design and build applications that are not only functional, but smooth, responsive, and intuitive in everyday use.\n\nI began exploring how mobile apps are structured, how performance plays a critical role, and how small details can shape the overall user experience. It pushed me to think differently—simplifying interfaces, optimizing interactions, and focusing on usability at every step.\n\nMobile development, for me, is where everything comes together—design, logic, and user experience—delivered in its most refined and accessible form.`,

    `Working as an Independent Frontend Developer, I bring together my background in design and development to create complete, user-focused digital experiences.\n\nWhat started as a curiosity to bridge visuals with functionality has now shaped the way I approach every project. I focus on building interfaces that are not only visually engaging but also responsive, accessible, and efficient.\n\nFor me, frontend development is about precision—translating ideas into seamless interactions while maintaining performance and clean structure. Every project is an opportunity to refine that balance between design and code, delivering experiences that feel as good as they look.`
  ];

  // === PHASE LAYOUT PER DESCRIPTION ===
  // Each segment has 2 phases:
  //   Phase 1 (0.0 – 0.85): Text reveal + connector fill (synced)
  //   Phase 2 (0.85 – 1.0): HOLD — text fully revealed, extra scroll required
  const TEXT_PHASE = 0.85;

  const totalSegments = descriptions.length; // 5 segments
  const totalTimelineConnectors = timelineData.length - 1; // 5 connectors

  // Raw segment progress
  const rawSegmentProgress = timelineProgress * totalSegments;
  const currentDescriptionIndex = Math.min(Math.floor(rawSegmentProgress), totalSegments - 1);
  const segmentFill = rawSegmentProgress - currentDescriptionIndex;

  // === TEXT REVEAL PROGRESS ===
  // Text reveals during 0 → TEXT_PHASE of each segment
  const textRevealRaw = Math.min(segmentFill / TEXT_PHASE, 1);
  const textRevealProgress = textRevealRaw; // Linear for predictable 1.5 words/scroll

  // === CONNECTOR FILLS ===
  // Each connector fills in sync with its description's text reveal
  const connectorFills = Array(totalTimelineConnectors).fill(0);
  for (let i = 0; i < totalTimelineConnectors; i++) {
    if (i < currentDescriptionIndex) {
      connectorFills[i] = 1;
    } else if (i === currentDescriptionIndex) {
      connectorFills[i] = textRevealProgress;
    }
  }

  // === ACTIVE YEAR INDEX ===
  // Stays perfectly in sync with the description index
  let activeIndex = currentDescriptionIndex;

  // At the end, ensure "Present" is highlighted and all connectors filled
  if (timelineProgress >= 0.98) {
    activeIndex = timelineData.length - 1;
    for (let i = 0; i < totalTimelineConnectors; i++) {
      connectorFills[i] = 1;
    }
  }

  const currentDesignation = timelineData[activeIndex]?.designation;
  const currentDescription = descriptions[currentDescriptionIndex];

  // Split description into paragraphs and words
  const paragraphs = currentDescription.split('\n\n');
  const allWords = paragraphs.flatMap(paragraph => paragraph.split(' '));
  const totalWords = allWords.length;
  const wordsToShow = textRevealProgress * totalWords;

  const paragraphWordCounts = paragraphs.map(paragraph => paragraph.split(' ').length);

  return (
    <div className="w-full">
      {/* Timeline Years Row */}
      <div className="flex items-center justify-end gap-0 mb-4 overflow-x-auto scrollbar-hide pr-4 md:pr-6">
        {timelineData.map((item, idx) => (
          <div key={item.year} className="flex items-center">
            <motion.span
              animate={{
                opacity: idx <= activeIndex ? (idx === activeIndex ? 1 : 0.8) : 0.3,
                scale: idx === activeIndex ? 1.15 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`whitespace-nowrap origin-center ${idx <= activeIndex
                ? idx === activeIndex
                  ? "text-white font-bold"
                  : "text-white/80"
                : "text-white/30"
                }`}
              style={{ fontSize: idx === activeIndex ? "16px" : "12px" }}
            >
              {item.year}
            </motion.span>
            {idx < timelineData.length - 1 && (
              <div className="mx-1 sm:mx-2 w-6 sm:w-10 md:w-14 relative">
                {/* Background track */}
                <div className="h-px bg-white/20 w-full" />
                {/* Animated fill */}
                <motion.div
                  className="h-px bg-white absolute top-0 left-0"
                  animate={{ width: `${connectorFills[idx] * 100}%` }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
                {/* Glowing leading edge */}
                {connectorFills[idx] > 0 && connectorFills[idx] < 1 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
                    style={{
                      left: `${connectorFills[idx] * 100}%`,
                      boxShadow: "0 0 6px 2px rgba(255,255,255,0.5)",
                    }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current Designation */}
      <div className="text-right mb-6 sm:mb-8 md:mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDesignation}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="text-white font-semibold text-lg sm:text-xl md:text-3xl lg:text-4xl"
          >
            {currentDesignation}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Description Text - Smaller text, darker base */}
      <div className="max-w-xl ml-auto text-left mt-8 sm:mt-12 md:mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDescriptionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {paragraphs.map((paragraph, pIdx) => {
              const words = paragraph.split(' ');
              const startIdx = paragraphWordCounts.slice(0, pIdx).reduce((a, b) => a + b, 0);

              return (
                <div key={pIdx} className="mb-5 last:mb-0">
                  <div className="leading-relaxed flex flex-wrap gap-x-1 gap-y-0.5 text-xs sm:text-sm md:text-[15px]">
                    {words.map((word, wIdx) => {
                      const globalIdx = startIdx + wIdx;
                      const wordProgress = Math.max(0, Math.min(1, wordsToShow - globalIdx));
                      const easedProgress = wordProgress < 1
                        ? Math.pow(wordProgress, 0.4)
                        : 1;

                      return (
                        <span key={wIdx} className="relative inline-block">
                          {/* Base muted text — very dark grey to blend with black bg */}
                          <span style={{ color: "rgba(255,255,255,0.10)" }}>{word}</span>
                          {/* White overlay — smooth opacity + slide */}
                          <span
                            className="absolute top-0 left-0 text-white whitespace-nowrap"
                            style={{
                              opacity: easedProgress,
                              transform: `translateY(${(1 - easedProgress) * 3}px)`,
                              transition: "opacity 0.12s ease-out, transform 0.12s ease-out",
                            }}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineProgress;