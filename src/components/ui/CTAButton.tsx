"use client";

import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface CTAButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  icon?: "arrow" | "user" | "none";
  fallingText?: boolean;
  customClass?: string;
  textColor?: "white" | "gray" | "black";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CTAButton = ({ 
  variant, 
  children, 
  onClick, 
  icon = "arrow", 
  fallingText = false, 
  customClass = "",
  textColor = "gray",
  type = "button",
  disabled = false
}: CTAButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    letter: string;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
    originalX: number;
  }>>([]);
  
  const text = typeof children === 'string' ? children : '';
  const letters = text.split('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine text color based on variant and textColor prop
  const getTextColorClass = () => {
    if (variant === "primary") return "text-white";
    if (textColor === "white") return "text-white";
    if (textColor === "black") return "text-black";
    return "text-gray-700";
  };

  // Original hover effect - only scale, no text color change
  const getHoverClass = () => {
    if (variant === "secondary") {
      return "hover:scale-105";
    }
    return "";
  };

  const getIcon = () => {
    if (icon === "none") return null;
    const iconColor = textColor === "white" ? "text-white" : "text-current";
    if (icon === "arrow") {
      return <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${iconColor}`} />;
    }
    return <UserPlus className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${iconColor}`} />;
  };

  const baseStyles = `inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium transition-all duration-300 group cursor-pointer relative rounded-[10px] overflow-hidden ${getHoverClass()} ${customClass}`;
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:scale-105",
    secondary: `bg-transparent ${getTextColorClass()}`
  };

  // Function to resize canvas with proper resolution
  const resizeCanvas = () => {
    if (!canvasRef.current || !buttonRef.current) return null;
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      
      const rect = buttonRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr * 2;
      canvas.height = rect.height * dpr * 2;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr * 2, dpr * 2);
      ctx.imageSmoothingEnabled = true;
      
      return { width: rect.width, height: rect.height, dpr };
    } catch (error) {
      console.error("Error resizing canvas:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!isClient || !isHovered || !fallingText || variant !== "secondary") return;
    if (!canvasRef.current || !buttonRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dimensions = resizeCanvas();
    if (!dimensions) return;
    
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;
    
    const letterWidth = 14;
    const totalWidth = letters.length * letterWidth;
    const startX = (width - totalWidth) / 2;
    const fallingTextColor = textColor === "white" ? "rgba(255, 255, 255, " : "rgba(0, 0, 0, ";
    
    particlesRef.current = letters.map((letter, index) => {
      const originalX = startX + (index * letterWidth) + letterWidth / 2;
      return {
        x: originalX,
        y: height / 2 - 5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0,
        letter: letter === " " ? "\u00A0" : letter,
        opacity: 1,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 3,
        originalX: originalX
      };
    });
    
    let startTime: number | null = null;
    const animationDuration = 1500;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach(particle => {
        if (progress < 1) {
          const gravityStrength = 0.08;
          particle.vy += gravityStrength;
          particle.y += particle.vy;
          particle.x += particle.vx;
          particle.rotation += particle.rotationSpeed;
          
          if (particle.x < 10) {
            particle.x = 10;
            particle.vx *= -0.6;
          }
          if (particle.x > width - 10) {
            particle.x = width - 10;
            particle.vx *= -0.6;
          }
          
          if (particle.y > height - 10) {
            particle.y = height - 10;
            if (Math.abs(particle.vy) > 0.5) {
              particle.vy *= -0.4;
            } else {
              particle.vy = 0;
            }
          }
          
          particle.vx *= 0.98;
          const opacity = Math.min(1, 1 - (particle.y / height) * 0.3);
          
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation * Math.PI / 180);
          ctx.font = '500 15px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = `${fallingTextColor}${opacity})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.letter, 0, 0);
          ctx.restore();
        } else {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation * Math.PI / 180);
          ctx.font = '500 15px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = textColor === "white" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.letter, 0, 0);
          ctx.restore();
        }
      });
      
      if (isHovered && progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, letters, textColor, isClient, fallingText, variant]);
  
  const handleHoverStart = () => {
    if (!fallingText || variant !== "secondary") return;
    setIsHovered(true);
  };
  
  const handleHoverEnd = () => {
    setIsHovered(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  if (variant === "primary") {
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseStyles.replace("py-1.5", "py-3 min-w-[200px]")} bg-black text-white hover:bg-gray-900 shadow-lg hover:shadow-xl ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:bg-black hover:shadow-none' : ''}`}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        type={type}
        disabled={disabled}
      >
        <div className="relative flex items-center justify-center overflow-hidden w-full px-2">
           {/* Left Arrow (Hidden by default, shoots in on hover) */}
           {icon === "arrow" && (
             <motion.div
               initial={{ x: -20, opacity: 0, width: 0 }}
               animate={{ 
                 x: isHovered ? 0 : -20, 
                 opacity: isHovered ? 1 : 0,
                 width: isHovered ? "auto" : 0,
                 marginRight: isHovered ? "8px" : "0px"
               }}
               transition={{ duration: 0.3, ease: "easeInOut" }}
               className="flex items-center"
             >
               <ArrowRight className="w-4 h-4 text-white" />
             </motion.div>
           )}

           {/* Text */}
           <motion.span 
             className="text-[15px] whitespace-nowrap"
             layout
             transition={{ duration: 0.3, ease: "easeInOut" }}
           >
             {children}
           </motion.span>

           {/* Right Arrow (Visible by default, shoots out on hover) */}
           {icon === "arrow" ? (
             <motion.div
               initial={{ x: 0, opacity: 1, width: "auto" }}
               animate={{ 
                 x: isHovered ? 20 : 0, 
                 opacity: isHovered ? 0 : 1,
                 width: isHovered ? 0 : "auto",
                 marginLeft: isHovered ? "0px" : "8px"
               }}
               transition={{ duration: 0.3, ease: "easeInOut" }}
               className="flex items-center"
             >
               <ArrowRight className="w-4 h-4 text-white" />
             </motion.div>
           ) : (
             <div className="ml-2">{getIcon()}</div>
           )}
        </div>
      </motion.button>
    );
  }

  if (!fallingText && variant === "secondary") {
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={onClick}
        className={`${baseStyles} ${variants.secondary} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        type={type}
        disabled={disabled}
      >
        <span className="text-[15px]">{children}</span>
        {getIcon()}
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={onClick}
      className={`${baseStyles} ${variants.secondary}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      disabled={disabled}
      style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
    >
      <span className={`relative z-10 transition-opacity duration-300 text-[15px] ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      
      <div className={`relative z-10 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        {getIcon()}
      </div>
      
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 20 }}
      />
    </motion.button>
  );
};

export default CTAButton;