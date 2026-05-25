import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const InteractiveEyes = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
  const [rightOffset, setRightOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      const screenWidth = window.innerWidth || 1200;
      const screenHeight = window.innerHeight || 800;

      // Calculate Left Eye Offset
      if (leftEyeRef.current) {
        const rect = leftEyeRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        
        // Smoothly map cursor location relative to viewport size to the pupil travel bounds (-6px to 6px)
        const ratioX = dx / screenWidth;
        const ratioY = dy / screenHeight;
        
        // Multiplied by a gain factor so that pupils glide smoothly across the entire range
        const moveX = Math.max(-6, Math.min(6, ratioX * 12));
        const moveY = Math.max(-6, Math.min(6, ratioY * 12));
        
        setLeftOffset({ x: moveX, y: moveY });
      }

      // Calculate Right Eye Offset
      if (rightEyeRef.current) {
        const rect = rightEyeRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        
        // Smoothly map cursor location relative to viewport size to the pupil travel bounds (-6px to 6px)
        const ratioX = dx / screenWidth;
        const ratioY = dy / screenHeight;
        
        // Multiplied by a gain factor so that pupils glide smoothly across the entire range
        const moveX = Math.max(-6, Math.min(6, ratioX * 12));
        const moveY = Math.max(-6, Math.min(6, ratioY * 12));
        
        setRightOffset({ x: moveX, y: moveY });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[999] select-none pointer-events-auto">
      {/* 💬 Custom Speech Bubble Message Popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute -top-[52px] right-0 bg-[#0a0a0a] text-white border border-white/10 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none z-[1000] font-['Google_Sans','sans-serif'] flex items-center justify-center"
            style={{ originX: 0.85, originY: 1 }}
          >
            hello here , greetings from Ajay -_-
            {/* Downward triangle arrow pointer aligned perfectly to the eyeball center */}
            <div className="absolute top-full right-[38px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0a0a0a] z-10" />
            <div className="absolute top-full right-[38px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10" style={{ transform: 'translateY(1px)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eyeball Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center justify-center p-3.5 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer transition-colors duration-300"
      >
        <div className="flex gap-2.5 items-center">
          {/* Left Eyeball */}
          <div
            ref={leftEyeRef}
            className="relative w-7 h-10 bg-white rounded-[24px] border border-black/[0.06] overflow-hidden flex items-center justify-center shadow-inner"
          >
            {/* Pupil + Specular Reflection */}
            <div
              style={{
                transform: `translate3d(${leftOffset.x}px, ${leftOffset.y}px, 0px) scale(${isHovered ? 1.15 : 1})`,
                transition: isHovered 
                  ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)" 
                  : "transform 0.08s ease-out",
              }}
              className="relative w-[16px] h-[22px] bg-[#0a0a0a] rounded-[100%] flex items-center justify-center"
            >
              {/* Tiny highlight */}
              <div className="absolute top-[3px] right-[3px] w-[3.5px] h-[3.5px] bg-white rounded-full opacity-80" />
            </div>
          </div>

          {/* Right Eyeball */}
          <div
            ref={rightEyeRef}
            className="relative w-7 h-10 bg-white rounded-[24px] border border-black/[0.06] overflow-hidden flex items-center justify-center shadow-inner"
          >
            {/* Pupil + Specular Reflection */}
            <div
              style={{
                transform: `translate3d(${rightOffset.x}px, ${rightOffset.y}px, 0px) scale(${isHovered ? 1.15 : 1})`,
                transition: isHovered 
                  ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)" 
                  : "transform 0.08s ease-out",
              }}
              className="relative w-[16px] h-[22px] bg-[#0a0a0a] rounded-[100%] flex items-center justify-center"
            >
              {/* Tiny highlight */}
              <div className="absolute top-[3px] right-[3px] w-[3.5px] h-[3.5px] bg-white rounded-full opacity-80" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
