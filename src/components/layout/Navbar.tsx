"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CTAButton from "@/components/ui/CTAButton";
import HireMeModal from "@/components/ui/HireMeModal";

interface NavbarProps {
  isVisible: boolean;
}

const Navbar = ({ isVisible }: NavbarProps) => {
  const [navTheme, setNavTheme] = useState<'transparent' | 'dark' | 'light'>('transparent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  
  const menuItems = ["Services", "Projects", "Process", "Contact"];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Set active section
      const sections = ["services", "projects", "process", "contact"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 10) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);

      if (!isHomePage) {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const { top, bottom } = contactSection.getBoundingClientRect();
          if (top <= 60 && bottom > 60) {
            setNavTheme('dark');
            return;
          }
        }
        setNavTheme('light');
        return;
      }

      const aboutContainer = document.getElementById("about-container");
      if (aboutContainer) {
        const { top } = aboutContainer.getBoundingClientRect();
        if (top <= 0) {
          setNavTheme('dark');
          return;
        }
      }
      setNavTheme('transparent');
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavigation = (item: string) => {
    setIsMobileMenuOpen(false);
    
    const sectionId = item.toLowerCase();
    
    if (isHomePage) {
      router.push(`/work#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHire = () => {
    setIsMobileMenuOpen(false);
    setIsModalOpen(true);
  };

  const scrollToTop = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const getNavbarBackground = () => {
    if (isMobileMenuOpen) return navTheme === 'dark' ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)";
    switch (navTheme) {
      case 'dark': return "rgba(0, 0, 0, 0.6)";
      case 'light': return "rgba(255, 255, 255, 0.6)";
      default: return "transparent";
    }
  };

  const getTextColor = () => {
    return navTheme === 'dark' ? "white" : "#374151";
  };

  const hamburgerColor = navTheme === 'dark' ? "bg-white" : "bg-gray-700";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500"
      >
        <nav
          className="w-full px-4 sm:px-6 md:px-12 py-2 transition-all duration-500 ease-out"
          style={{
            backgroundColor: getNavbarBackground(),
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "none",
          }}
        >
          <div className="w-full relative flex items-center h-10">
            
            {/* Logo */}
            <div className="absolute left-0 transition-opacity duration-300">
              {!isHomePage && (
                <button 
                  onClick={scrollToTop}
                  className="font-bold tracking-widest uppercase text-sm cursor-pointer transition-colors duration-500" 
                  style={{ color: getTextColor() }}
                >
                  BR
                </button>
              )}
            </div>

            {/* Desktop Menu - Hidden on mobile */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center space-x-6 lg:space-x-8"
              initial={isHomePage ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: isHomePage ? 0.2 : 0, ease: "easeOut" }}
            >
              {menuItems.map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => handleNavigation(item)}
                    style={{
                      fontSize: "15px",
                      color: getTextColor(),
                      transition: "color 0.5s ease",
                    }}
                    className={`hover:scale-105 cursor-pointer tracking-wide whitespace-nowrap ${isActive ? 'font-bold' : 'font-medium'}`}
                  >
                    {item}
                  </button>
                );
              })}
            </motion.div>

            {/* Right Side: CTA + Hamburger */}
            <div className="ml-auto flex items-center gap-3">
              {/* Desktop CTA */}
              <motion.div
                className="hidden sm:block"
                initial={isHomePage ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: isHomePage ? 0.25 : 0, ease: "easeOut" }}
              >
                <div className="scale-90 relative z-50">
                  <CTAButton
                    variant="secondary"
                    icon="none"
                    fallingText={true}
                    textColor={navTheme === 'dark' ? "white" : "gray"}
                    onClick={handleHire}
                  >
                    Hire Me
                  </CTAButton>
                </div>
              </motion.div>

              {/* Hamburger - Mobile only */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer z-50"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-0.5 ${hamburgerColor} rounded-full transition-colors`}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block w-5 h-0.5 ${hamburgerColor} rounded-full transition-colors`}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-0.5 ${hamburgerColor} rounded-full transition-colors`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-4 py-6 border-t border-white/10 mt-2">
                  {menuItems.map((item) => {
                    const isActive = activeSection === item.toLowerCase();
                    return (
                      <button
                        key={item}
                        onClick={() => handleNavigation(item)}
                        style={{ color: getTextColor() }}
                        className={`text-left text-lg tracking-wide cursor-pointer hover:opacity-70 transition-opacity ${isActive ? 'font-bold' : 'font-medium'}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleHire}
                    style={{ color: getTextColor() }}
                    className="text-left text-lg font-medium tracking-wide cursor-pointer hover:opacity-70 transition-opacity sm:hidden"
                  >
                    Hire Me
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      <HireMeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;