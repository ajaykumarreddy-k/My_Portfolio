"use client"

import { motion } from "framer-motion"
import { Smile, Sparkles, Ghost, MousePointer2 } from "lucide-react"

export default function AkrEcho() {
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

    return (
        <section id="akr-echo-container" className="w-full flex flex-col font-sans mb-20 overflow-hidden">
            
            {/* Section Heading & Graphic Banner */}
            <div className="w-full px-4 md:px-8 mb-12 flex flex-col items-center overflow-hidden">
                
                {/* Heading */}
                <h2 className="text-[10vw] md:text-[6vw] lg:text-[4rem] leading-[0.8] tracking-tighter font-black uppercase text-[#111]/80 m-0 self-start" style={{ fontFamily: 'Impact, sans-serif' }}>
                    AKR-ECO.
                </h2>
                
                {/* Visual Banner Placeholder */}
                <div className="w-full mt-12 md:mt-20 mb-8 flex items-center justify-center">
                    <div className="flex items-center justify-center text-[18vw] md:text-[14vw] lg:text-[12rem] font-medium tracking-tighter text-[#111] leading-none select-none">
                        <span className="mr-2 md:mr-4">Visit(</span>
                        
                        {/* Image 1: Earth Placeholder */}
                        <div className="w-[22vw] h-[22vw] md:w-[16vw] md:h-[16vw] lg:w-[200px] lg:h-[200px] rounded-full bg-zinc-300 overflow-hidden shadow-inner flex-shrink-0 relative border border-black/10 flex items-center justify-center">
                            <img src="/akr-echo/image1.jpeg" alt="Earth" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply" />
                        </div>
                        
                        {/* Image 2: Thinker Placeholder */}
                        <div className="w-[22vw] h-[22vw] md:w-[16vw] md:h-[16vw] lg:w-[200px] lg:h-[200px] rounded-full bg-blue-200/80 overflow-hidden shadow-inner flex-shrink-0 relative -ml-[8vw] md:-ml-[5vw] lg:-ml-[70px] mix-blend-multiply border border-black/10 flex items-center justify-center">
                            <img src="/akr-echo/image2.png" alt="Thinker" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        
                        <span className="ml-2 md:ml-4">)</span>
                        
                        {/* Down Arrow SVG */}
                        <svg className="w-[14vw] h-[14vw] md:w-[10vw] md:h-[10vw] lg:w-[130px] lg:h-[130px] ml-4 md:ml-8" viewBox="0 0 24 24" fill="none">
                            <path d="M12 3v18m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 4-Column Gallery */}
            <div className="w-full h-[500px] md:h-[75vh] flex gap-1 p-1 md:gap-2 md:p-2 bg-white overflow-x-auto snap-x snap-mandatory">
                {panels.map((panel, idx) => (
                    <a 
                        key={idx} 
                        href={panel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-[85vw] sm:w-[45vw] md:w-auto md:flex-1 h-full bg-[#EEEEEE] relative overflow-hidden flex flex-col items-center justify-end snap-center group rounded-sm block"
                    >
                        {/* Huge Graphic */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out">
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
                    </a>
                ))}
            </div>
            
        </section>
    )
}

