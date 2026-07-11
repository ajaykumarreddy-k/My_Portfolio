import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SocialDirectory.css';

export default function SocialDirectory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  const cardVariants = {
    hidden: { y: 200, opacity: 0, scale: 0.5 },
    visible: (rotate: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: rotate,
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 15,
        mass: 1.2
      }
    }),
    hover: { 
      scale: 1.03, 
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  return (
    <section ref={ref} className="relative w-full bg-[#E8E8E8] flex flex-col items-center justify-center overflow-hidden border-t border-black/5 dark:border-white/5 pb-4">
      <div className="w-full max-w-[1400px] px-4 md:px-8 pt-20 pb-10 text-center">
        <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-black mb-8 font-sans">
          Social Directory
        </span>
      </div>
      
      <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar bg-[#E8E8E8]">
        <div className="min-w-[800px] w-full max-w-[1400px] mx-auto">
          <div className="poster-canvas">
            {/* Card 1: Email */}
            <motion.a 
              href="mailto:ajaykumarreddykrishnareddygari@gmail.com" 
              className="card card-1 group"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              style={{ willChange: 'transform' }}
              custom={-15}
            >
              <h2>EMAIL</h2>
              <p>CONNECT</p>
              <img src="/bg removed/mail-logo.png" alt="Email" className="absolute bottom-3 right-3 w-[60%] object-contain drop-shadow-xl opacity-90 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            {/* Card 2: GitHub */}
            <motion.a 
              href="https://github.com/ajaykumarreddy-k" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="card card-2 group"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              style={{ willChange: 'transform' }}
              custom={5}
            >
              <div className="card-image-container">
                <img src="/bg removed/git-logo.png" alt="GitHub" className="w-[85%] h-[85%] object-contain drop-shadow-2xl p-2 opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all" />
              </div>
              <div className="bottom-right-text">
                <p>DEVELOPER</p>
                <h2>GIT<br/>HUB</h2>
              </div>
            </motion.a>

            {/* Card 3: Center Decoration */}
            <motion.div 
              className="card card-3 pointer-events-none"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ willChange: 'transform' }}
              custom={-3}
            >
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', left: '2cqw', top: '10cqw', width: '1.5cqw' }}>
                <polygon points="50,0 100,50 50,100 0,50" fill="var(--imaneo-blue)"/>
              </svg>
              <div className="teal-text">
                <p>SOCIAL<br/>DIRECTORY</p>
                <h2>2026</h2>
              </div>
              <svg viewBox="0 0 100 50" style={{ position: 'absolute', bottom: 0, left: '10%', width: '70%' }}>
                <path d="M 0,50 L 0,25 Q 0,0 20,0 Q 40,0 40,25 Q 40,0 60,0 Q 80,0 80,25 L 80,50 Z" fill="#000"/>
              </svg>
            </motion.div>

            {/* Card 4: Blue footer card */}
            <motion.div 
              className="card card-4 blue-card-content pointer-events-none"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ willChange: 'transform' }}
              custom={3}
            >
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', left: '1.5cqw', top: '1.5cqw', width: '2cqw' }}>
                <polygon points="50,0 60,35 95,35 65,55 75,90 50,70 25,90 35,55 5,35 40,35" fill="var(--imaneo-yellow)"/>
              </svg>
              
              <div className="arch-container">
                <div className="arch"></div>
                <div className="arch"></div>
                <div className="arch"></div>
              </div>

              <div className="blue-footer">
                <div className="blue-footer-left">
                  <h2>NET<br/>WORK</h2>
                  <p>SOCIAL<br/>LINKS</p>
                </div>
                <div className="blue-footer-right">
                  <p>PROFESSIONAL,<br/>CREATIVE ET<br/>DEVELOPMENT<br/>PORTFOLIO<br/>(2022-2026)</p>
                </div>
              </div>
            </motion.div>

            {/* Card 5: LinkedIn */}
            <motion.a 
              href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="card card-5 group"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              style={{ willChange: 'transform' }}
              custom={12}
            >
              <h2>LINKEDIN</h2>
              <p>NETWORK</p>
              <img src="/bg removed/linked-in-logo.png" alt="LinkedIn" className="absolute bottom-4 right-4 w-[50%] object-contain drop-shadow-xl opacity-90 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            {/* Card 6: Resume */}
            <motion.a 
              href="/Resume/KRISHNAREDDY GARI AJAY KUMAR REDDY_Doc.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="card card-6 group"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              style={{ willChange: 'transform' }}
              custom={-4}
            >
              <div className="card-image-container">
                <img src="/bg removed/resume logo .png" alt="Resume" className="w-[85%] h-[85%] object-contain drop-shadow-2xl p-2 opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all" />
              </div>
              <div className="bottom-right-text">
                <p>EXPERIENCE</p>
                <h2>RES<br/>UME</h2>
              </div>
            </motion.a>

          </div>
        </div>
      </div>
    </section>
  );
}
