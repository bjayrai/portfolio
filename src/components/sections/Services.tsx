"use client";

import { motion } from "framer-motion";
import { Palette, Monitor, Smartphone, Layout } from "lucide-react";

const services = [
  {
    id: "design",
    icon: Palette,
    title: "Creative Design",
    description: "From brand identities to motion graphics, I craft visuals that communicate with clarity and impact.",
    features: ["Brand Identity", "Motion Graphics", "Print Media", "Visual Storytelling"],
  },
  {
    id: "web",
    icon: Monitor,
    title: "Web Development",
    description: "I design and build responsive, high-performance websites focused on clean structure and smooth interactions.",
    features: ["Custom Websites", "Responsive Design", "Performance", "CMS Integration"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Building native and cross-platform mobile applications that feel intuitive and natively run smoothly.",
    features: ["Cross-Platform", "Native iOS/Android", "App UI/UX", "Optimization"],
  },
  {
    id: "uiux",
    icon: Layout,
    title: "UI/UX Design",
    description: "I design interfaces that are both visually engaging and functionally intuitive through prototyping.",
    features: ["User Research", "Wireframing", "Design Systems", "Usability Testing"],
  },
];

const marqueeLogos = [
  { name: "Adobe Photoshop", src: "/assets/marquee-logos/Adobe_Photoshop_CC_icon.svg" },
  { name: "Adobe Illustrator", src: "/assets/marquee-logos/Adobe_Illustrator_CC_icon.svg" },
  { name: "Adobe After Effects", src: "/assets/marquee-logos/Adobe_After_Effects_CC_icon.svg" },
  { name: "Adobe XD", src: "/assets/marquee-logos/Adobe_XD_CC_icon.svg" },
  { name: "Figma", src: "/assets/marquee-logos/Figma-Logo-SVG_015.svg" },
  { name: "WordPress", src: "/assets/marquee-logos/WordPress_logo.svg" },
  { name: "React", src: "/assets/marquee-logos/react_original_wordmark_logo_icon_146375.svg" },
  { name: "Bootstrap", src: "/assets/marquee-logos/bootstrap-wordmark.svg" },
  { name: "Next.js", src: "/assets/marquee-logos/Nextjs-logo.svg" },
  { name: "Tailwind CSS", src: "/assets/marquee-logos/Tailwind_CSS_logo_with_dark_text.svg" },
  { name: "GSAP", src: "/assets/marquee-logos/gsap.svg" },
  { name: "Redux", src: "/assets/marquee-logos/Redux_Logo.svg" },
  { name: "Flutter", src: "/assets/marquee-logos/Google-flutter-logo.svg" },
  { name: "BLoC", src: "/assets/marquee-logos/flutter_bloc.svg" },
  { name: "Riverpod", src: "/assets/marquee-logos/riverpod.svg" },
  { name: "Firebase", src: "/assets/marquee-logos/New_Firebase_logo.svg" },
];

const marqueeItems = [...marqueeLogos, ...marqueeLogos];

const Services = () => {
  return (
    <section id="services" className="bg-white text-black pt-20 sm:pt-32 pb-0 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight">
            How I Can Help Your Business
          </h2>
        </motion.div>

        {/* 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mx-auto pb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group border border-gray-100 rounded-3xl p-8 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className="mb-6 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Icon size={24} className="text-gray-400 group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>

                <div className="pt-6 border-t border-gray-100">
                   <ul className="flex flex-col gap-3">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-gray-700 text-xs font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="mt-8 py-10 border-t border-gray-50 flex flex-col items-center relative z-0 w-full bg-white">
        <div className="w-full relative flex overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          
          <motion.div
            className="flex whitespace-nowrap gap-12 lg:gap-20 items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          >
            {marqueeItems.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 h-8 md:h-10 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-full w-auto object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;