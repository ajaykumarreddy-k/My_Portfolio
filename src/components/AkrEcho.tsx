"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Smile, Sparkles, Ghost, MousePointer2 } from "lucide-react"

export default function AkrEcho() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { margin: "-100px", once: false })

    const panels = [
        {
            title: "AKR NODE AND SKILL!",
            icon: <Smile size={14} />,
            graphic: <img src="/akr-echo/akr-node.png" alt="AKR Node" className="w-full h-full object-cover" />,
            link: "https://akr-node.vercel.app/"
        },
        {
            title: "AKR-VID!",
            icon: <Sparkles size={14} />,
            graphic: <img src="/akr-echo/akr-vid.png" alt="AKR Vid" className="w-full h-full object-cover" />,
            link: "https://akr-vid.vercel.app/"
        },
        {
            title: "AKR-INSPO!",
            icon: <Ghost size={14} />,
            graphic: <img src="/akr-echo/akr-inspo.jpeg" alt="AKR Inspo" className="w-full h-full object-cover" />,
            link: "https://akr-inspo.vercel.app/"
        },
        {
            title: "AKR-MUSIC!",
            icon: <MousePointer2 size={14} />,
            graphic: <img src="/akr-echo/akr-music.png" alt="AKR Music" className="w-full h-full object-cover" />,
            link: "https://akr-pixel-player.vercel.app/"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const panelVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const popVariants = {
        hidden: { scale: 0, opacity: 0, rotate: -20 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
        }
    }

    return (
        <section ref={sectionRef} id="akr-echo-container" className="w-full flex flex-col font-sans mb-20 overflow-hidden">
            
            {/* Section Heading & Graphic Banner */}
            <div className="w-full px-4 md:px-8 mb-12 flex flex-col items-center overflow-hidden">
                
                {/* Heading */}
                <motion.h2 
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10vw] md:text-[6vw] lg:text-[4rem] leading-[0.8] tracking-tighter font-black uppercase text-[#111]/80 m-0 self-start" 
                    style={{ fontFamily: 'Impact, sans-serif', willChange: 'transform, opacity' }}
                >
                    AKR-ECO.
                </motion.h2>
                
                {/* Visual Banner Placeholder */}
                <div className="w-full mt-12 md:mt-20 mb-8 flex flex-wrap items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-row items-center justify-center text-[10vw] sm:text-[14vw] md:text-[14vw] lg:text-[12rem] font-medium tracking-tighter text-[#111] leading-none select-none"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <span className="mr-1 sm:mr-2 md:mr-4">Visit(</span>
                        
                        {/* Image 1: Earth Placeholder */}
                        <motion.div 
                            variants={popVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="w-[12vw] h-[12vw] sm:w-[16vw] sm:h-[16vw] md:w-[16vw] md:h-[16vw] lg:w-[200px] lg:h-[200px] rounded-full bg-zinc-300 overflow-hidden shadow-inner flex-shrink-0 relative border border-black/10 flex items-center justify-center"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <img src="/akr-echo/image1.jpeg" alt="Earth" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                        </motion.div>
                        
                        {/* Image 2: Thinker Placeholder */}
                        <motion.div 
                            variants={popVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            transition={{ delay: 0.45 }}
                            className="w-[12vw] h-[12vw] sm:w-[16vw] sm:h-[16vw] md:w-[16vw] md:h-[16vw] lg:w-[200px] lg:h-[200px] rounded-full bg-blue-200/80 overflow-hidden shadow-inner flex-shrink-0 relative -ml-[4vw] sm:-ml-[5vw] md:-ml-[5vw] lg:-ml-[70px] border border-black/10 flex items-center justify-center"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <img src="/akr-echo/image2.png" alt="Thinker" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                        </motion.div>
                        
                        <span className="ml-1 sm:ml-2 md:ml-4">)</span>
                        
                        {/* Down Arrow SVG */}
                        <motion.svg 
                            initial={{ opacity: 0, y: -20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                            className="w-[8vw] h-[8vw] sm:w-[10vw] sm:h-[10vw] md:w-[10vw] md:h-[10vw] lg:w-[130px] lg:h-[130px] ml-2 sm:ml-4 md:ml-8" 
                            viewBox="0 0 24 24" 
                            fill="none"
                        >
                            <path d="M12 3v18m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
                        </motion.svg>
                    </motion.div>
                </div>
            </div>

            {/* 4-Column Gallery */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-full h-[500px] md:h-[75vh] flex gap-1 p-1 md:gap-2 md:p-2 bg-white overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {panels.map((panel, idx) => (
                    <motion.a 
                        key={idx} 
                        href={panel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={panelVariants}
                        whileHover={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex-none w-[85vw] sm:w-[45vw] md:w-auto md:flex-1 h-full bg-[#EEEEEE] relative overflow-hidden flex flex-col items-center justify-end snap-center group rounded-sm block"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        {/* Huge Graphic */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out">
                            {panel.graphic}
                        </div>

                        {/* Bottom Pill */}
                        <div className="relative z-10 mb-8 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm whitespace-nowrap group-hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                            <span className="text-[#111] opacity-70">
                                {panel.icon}
                            </span>
                            <span className="text-xs md:text-sm font-mono text-[#111] font-semibold tracking-tight uppercase">
                                {panel.title}
                            </span>
                        </div>
                    </motion.a>
                ))}
            </motion.div>
            
        </section>
    )
}

