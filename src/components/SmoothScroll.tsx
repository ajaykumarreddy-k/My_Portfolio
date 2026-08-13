import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Expose lenis instance globally for smooth programmatic anchor scrolling
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
