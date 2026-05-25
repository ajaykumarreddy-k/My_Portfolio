import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  targetId: string; // ID of the section to scroll to
  isHome?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", targetId: "home", isHome: true },
  { label: "Works", targetId: "projects" },
  { label: "Archive", targetId: "portfolio" },
  { label: "Toolkit", targetId: "docs" },
  { label: "Me", targetId: "me" },
  { label: "Contact", targetId: "reach-me" },
];

// Snappy, layout-optimized spring curve with absolute zero delay or sluggishness
const snappySpring = { type: "spring" as const, stiffness: 480, damping: 32, mass: 0.4 };
const indicatorSpring = { type: "spring" as const, stiffness: 420, damping: 30, mass: 0.4 };

export const DynamicNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll helper
  const handleScrollTo = (item: NavItem, index: number) => {
    setActiveIndex(index);
    if (item.isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(item.targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Automatically track scroll position to highlight the active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 150) {
        setActiveIndex(0);
        return;
      }

      let currentActiveIndex = 0;
      let minDistance = Infinity;

      navItems.forEach((item, index) => {
        if (item.isHome) return;
        const el = document.getElementById(item.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 80);
          if (rect.top < window.innerHeight * 0.4 && rect.bottom > 80) {
            if (distance < minDistance) {
              minDistance = distance;
              currentActiveIndex = index;
            }
          }
        }
      });

      if (currentActiveIndex !== 0) {
        setActiveIndex(currentActiveIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover open and immediate reaction
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180); // Quick collapse trigger for snappy usability
  };

  return (
    <div
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[998] select-none pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        layout
        transition={snappySpring}
        className={`flex items-center bg-[#0a0a0a]/92 dark:bg-black/92 border border-white/10 text-white rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.3)] backdrop-blur-md cursor-pointer overflow-hidden p-1.5 ${
          isOpen ? "gap-1 sm:gap-2 px-2 sm:px-3 py-1.5" : "gap-3 px-3 py-1.5 w-[92px]"
        }`}
      >
        {/* Left Side: Avatar/Initials Logo + Morphing Name Signature */}
        <motion.div
          layout
          className="flex items-center gap-1.5 shrink-0"
          transition={snappySpring}
        >
          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1c1c1c] text-[#0a0a0a] dark:text-white font-extrabold text-[11px] flex items-center justify-center shrink-0 shadow-sm border border-black/5">
            AKR
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0, x: -4 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -4 }}
                transition={snappySpring}
                className="hidden sm:inline text-white/90 text-[11px] font-bold tracking-wider whitespace-nowrap pr-2 font-sans border-r border-white/10 mr-1"
              >
                Ajay kumar Reddy K
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Nav Items */}
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="nav-links-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-0.5 sm:gap-1.5 mr-1"
              transition={{ duration: 0.1 }}
            >
              {navItems.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScrollTo(item, idx);
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-colors duration-150 tracking-wide font-sans cursor-pointer ${
                      isActive ? "text-[#0a0a0a] dark:text-[#0a0a0a]" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {/* Active Highlight sliding background */}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                        transition={indicatorSpring}
                      />
                    )}

                    {/* Hover sliding glass background */}
                    {hoveredIndex === idx && !isActive && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                        transition={indicatorSpring}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            // Right Side: 6-dot menu icon grid (fades in instantly)
            <motion.div
              key="dots-grid-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="flex flex-col items-center justify-center shrink-0 pr-1 w-6 h-6"
            >
              <div className="grid grid-cols-3 gap-[2.5px] w-3 h-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-white/70 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
