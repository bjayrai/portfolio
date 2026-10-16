"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Daily Informiq Network",
    subtitle: "Web",
    image: "assets/projects-mockups/projects/newsportal-mock.jpg",
    description: [
      "A modern digital news platform designed to deliver the latest news, current affairs, and informative stories through a seamless and responsive user experience.",
      "The platform enables readers to explore news across multiple categories, stay updated with breaking stories, and access national and international developments through an intuitive and user-friendly interface.",
      "Built with performance, scalability, and accessibility in mind, Daily Informiq Network features a clean editorial layout, dynamic content management, optimized page loading, and a responsive design for seamless browsing across desktop and mobile devices.",
      "Developed using Next.js and React for the frontend and Python for the backend, the platform integrates modern web technologies to deliver a fast, maintainable, and reliable digital news publishing experience.",
    ],
    tags: ["NextJS", "RestAPI", "Python", "MySQL"],
  },
  {
    id: 2,
    title: "Fleet Management Dashboard",
    subtitle: "Web",
    image: "/assets/projects-mockups/projects/fleetmanagement-dashboard-mock.png",
    description: [
      "A comprehensive fleet management and operations dashboard designed to streamline platform-wide administration and business processes.",
      "The system enables centralized control of vendors, customers, fleet operations, transactions, user management, and other critical platform activities through a unified interface.",
      "Built with scalability and performance in mind, the dashboard provides real-time insights, advanced data management, and role-based access controls for efficient decision-making.",
      "Developed using Next.js for the frontend and integrated with Java Spring Boot REST APIs, ensuring a robust, secure, and maintainable enterprise-grade architecture.",
    ],
    tags: ["NextJS", "Redux", "RestAPI", "Java", "Springboot", "Postgres"],
  },
  {
    id: 3,
    title: "Truth X Dare",
    subtitle: "Mobile App",
    image: "/assets/projects-mockups/projects/truthxdare-app-mock.png",
    description: [
      "A fun, social party game app built with Flutter that brings the classic Truth or Dare experience to mobile.",
      "Designed with playful UI and smooth animations, the app features themed decks, multiplayer support, and a sleek dark-mode interface.",
      "Every interaction is crafted to keep the energy alive — from card flips to timer countdowns.",
      "Built with scalable architecture using Riverpod pattern and Firebase for real-time multiplayer sessions.",
    ],
    tags: ["Flutter", "Riverpod", "Firebase"],
  },
  {
    id: 4,
    title: "Owl Learner",
    subtitle: "Web & Mobile App",
    image: "/assets/projects-mockups/projects/owllearner-mock.png",
    description: [
      "An educational learning platform designed to help students access high-quality study resources and exam preparation materials in one place.",
      "The platform provides answers to previous examination questions, study notes, practice materials, and academic resources across multiple subjects and curricula.",
      "Supporting learners from secondary education to higher studies, Owl Learner makes it easier to prepare for exams, reinforce concepts, and improve academic performance.",
      "Built with a student-first approach, the platform delivers organized, searchable, and easily accessible learning content across both web and mobile devices.",
    ],
    tags: ["Wordpress", "Elementor"],
  },
];

const SCROLL_HEIGHT_PER_PROJECT = 7;

const ProjectSlide = ({ project }: { project: typeof projects[0] }) => {
  const slideRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  // ─── DESKTOP TRANSFORMS ───
  // Phase 1: Entry from bottom to center (0.00 → 0.15)
  const containerY = useTransform(
    scrollYProgress,
    [0.00, 0.15, 0.85, 1.00],
    ["100vh", "0vh", "0vh", "-100vh"]
  );

  // Dark overlay (0.15 → 0.30)
  const overlayOpacity = useTransform(
    scrollYProgress, [0.00, 0.15, 0.30], [0.75, 0.75, 0]
  );

  // Title slides center → bottom, then fades (0.15 → 0.32)
  const titleY = useTransform(
    scrollYProgress, [0.00, 0.15, 0.30], ["0%", "0%", "120%"]
  );
  const titleOpacity = useTransform(
    scrollYProgress, [0.00, 0.15, 0.28, 0.32], [1, 1, 1, 0]
  );

  // Phase 2: Container scales down and slides LEFT (0.30 → 0.44)
  // Start at scale 1 (big, centered), shrink to 0.6 and translate left
  const imgScale = useTransform(
    scrollYProgress, [0.00, 0.30, 0.44], [1, 1, 0.75]
  );
  // Move from center (0%) to left (-28% of viewport = balanced with right panel)
  const imgX = useTransform(
    scrollYProgress, [0.00, 0.30, 0.44, 0.85, 1.00],
    ["0%", "0%", "-45%", "-45%", "-45%"]
  );

  // ─── MOBILE TRANSFORMS ───
  // On mobile: scale down and move UP instead of left
  const mobileScale = useTransform(
    scrollYProgress, [0.00, 0.30, 0.44], [1, 1, 0.55]
  );
  const mobileY = useTransform(
    scrollYProgress, [0.00, 0.15, 0.30, 0.44, 0.85, 1.00],
    ["100vh", "0vh", "0vh", "-10vh", "-10vh", "-130vh"]
  );

  // Description panel (desktop: right side, mobile: below)
  const descOpacity = useTransform(scrollYProgress, [0.42, 0.48], [0, 1]);
  const descX = useTransform(
    scrollYProgress, [0.42, 0.48, 0.85, 1.00], [60, 0, 0, -200]
  );

  // Mobile description: slides up from below
  const mobileDescOpacity = useTransform(scrollYProgress, [0.42, 0.50], [0, 1]);
  const mobileDescY = useTransform(
    scrollYProgress, [0.42, 0.50, 0.85, 1.00], [40, 0, 0, -100]
  );

  // Sentence-by-sentence
  const sent1 = useTransform(scrollYProgress, [0.48, 0.54], [0, 1]);
  const sent2 = useTransform(scrollYProgress, [0.54, 0.60], [0, 1]);
  const sent3 = useTransform(scrollYProgress, [0.60, 0.66], [0, 1]);
  const sent4 = useTransform(scrollYProgress, [0.66, 0.72], [0, 1]);
  const sentenceOpacities = [sent1, sent2, sent3, sent4];

  return (
    <div
      ref={slideRef}
      style={{ height: `${SCROLL_HEIGHT_PER_PROJECT * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ═══════ DESKTOP LAYOUT (lg+) ═══════ */}
        <div className="hidden lg:flex items-center justify-center w-full h-full">
          <motion.div
            style={{ y: containerY }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Mockup Image — starts big & centered, then shrinks + moves left */}
            <motion.div
              style={{ scale: imgScale, x: imgX }}
              className="absolute w-[65vw] max-w-[750px] origin-center"
            >
              {/* Blurry Background */}
              <div className="absolute -inset-10 rounded-[40px] overflow-hidden z-0">
                <img
                  src={project.image} alt=""
                  className="w-full h-full object-cover blur-3xl opacity-30 scale-125"
                  draggable={false}
                />
              </div>

              {/* Main Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
                <img
                  src={project.image} alt={project.title}
                  className="w-full h-auto object-cover" draggable={false}
                />
                {/* Overlay */}
                <motion.div
                  style={{ opacity: overlayOpacity }}
                  className="absolute inset-0 bg-black/80 z-20"
                />
                {/* Centered Title */}
                <motion.div
                  style={{ y: titleY, opacity: titleOpacity }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-8"
                >
                  <h3 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base font-medium tracking-wide">
                    {project.subtitle}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Description Panel — right side, balanced spacing */}
            <motion.div
              style={{ opacity: descOpacity, x: descX }}
              className="absolute right-[8vw] xl:right-[10vw] top-1/2 -translate-y-1/2 w-[30vw] max-w-[380px]"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] xl:text-xs font-semibold uppercase tracking-widest text-gray-400 border border-gray-200 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {project.title}
              </h4>
              <p className="text-gray-400 text-xs xl:text-sm font-medium mb-6">
                {project.subtitle}
              </p>
              <div className="flex flex-col gap-3 xl:gap-4">
                {project.description.map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    style={{ opacity: sentenceOpacities[idx] || sent4 }}
                    className="text-gray-600 leading-relaxed text-sm xl:text-[15px]"
                  >
                    {sentence}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══════ MOBILE/TABLET LAYOUT (<lg) ═══════ */}
        <div className="flex lg:hidden flex-col items-center justify-center w-full h-full px-6 sm:px-8">
          {/* Mockup — enters from bottom, shrinks & moves up after reveal */}
          <motion.div
            style={{ y: mobileY, scale: mobileScale }}
            className="relative w-[75vw] sm:w-[60vw] md:w-[50vw] max-w-[400px] origin-center"
          >
            {/* Blurry bg */}
            <div className="absolute -inset-6 rounded-3xl overflow-hidden z-0">
              <img src={project.image} alt="" className="w-full h-full object-cover blur-3xl opacity-30 scale-125" draggable={false} />
            </div>

            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              <img src={project.image} alt={project.title} className="w-full h-auto object-cover" draggable={false} />
              <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black/80 z-20" />
              <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4"
              >
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm font-medium tracking-wide">
                  {project.subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Description — appears below after image shrinks up */}
          <motion.div
            style={{ opacity: mobileDescOpacity, y: mobileDescY }}
            className="mt-4 w-full max-w-[400px] text-center"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1 tracking-tight">
              {project.title}
            </h4>
            <p className="text-gray-400 text-xs font-medium mb-4">{project.subtitle}</p>
            <div className="flex flex-col gap-2 text-left">
              {project.description.map((sentence, idx) => (
                <motion.p
                  key={idx}
                  style={{ opacity: sentenceOpacities[idx] || sent4 }}
                  className="text-gray-600 leading-relaxed text-xs sm:text-sm"
                >
                  {sentence}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-white text-black">
      <div className="pt-24 pb-4 px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight">
            Selected Projects
          </h2>
        </motion.div>
      </div>

      {projects.map((project) => (
        <ProjectSlide key={project.id} project={project} />
      ))}
    </section>
  );
};

export default Projects;