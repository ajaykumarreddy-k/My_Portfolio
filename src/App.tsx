import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Copy, Check, X, FileText, ArrowUpRight, Command } from 'lucide-react';
import LorenzoInteractivePortrait from './components/LorenzoInteractivePortrait';
import Preloader from './components/Preloader';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import { InteractiveEyes } from './components/InteractiveEyes';
import { DynamicNav } from './components/DynamicNav';
import SocialDirectory from './components/SocialDirectory';
import { TextFlippingBoardSection } from './components/TextFlippingBoard';
import AkrEcho from './components/AkrEcho';

/**
 * CONFIGURATION: Hero background asset
 */
const BACKGROUND_ASSET = "/sakura.gif";

/**
 * REUSABLE SECTION WRAPPER (LAYERED OVERLAP LAYOUT)
 * Implements a wide layout (1400px) with overlapping rounded-top sections and inner depth.
 */
const Section = ({ id, title, subtitle, children, className = "bg-[#F8F7F5]", isFirst = false }: any) => (
  <section id={id} className={`relative w-full ${isFirst ? "mt-0" : "-mt-16"} rounded-t-[3rem] py-16 md:py-28 px-4 md:px-5 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(0,0,0,0.04)] ${className}`}>
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1400px] mx-auto relative z-30"
    >
      <div className="max-w-[1400px] mx-auto px-4 mb-10 md:mb-16">
        <h2 className="text-[11vw] sm:text-[8vw] md:text-[6vw] leading-none font-semibold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-3 md:mt-4 text-base md:text-xl font-medium max-w-4xl leading-relaxed opacity-70">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  </section>
);

/**
 * INTERACTIVE FOLDER COMPONENT
 * Playful Google Labs style folder with slide-up papers and tilt-open cover.
 */
const Folder = ({ color, items, label, onClick }: { color: string, items: any[], label: string, onClick?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative cursor-pointer group"
        style={{ width: '170px', height: '125px', perspective: '1000px' }}
        onClick={handleClick}
        whileHover={{ y: -10, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      >
        {/* BACK PLATE with TAB */}
        <div
          className="absolute inset-0 rounded-[1.5rem] shadow-[0_5px_20px_rgba(0,0,0,0.08)] border-b-[5px] border-black/20"
          style={{ backgroundColor: color }}
        >
          <div
            className="absolute -top-3.5 left-5 w-14 h-6 rounded-t-2xl shadow-[0_-3px_8px_rgba(0,0,0,0.02)]"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* PAPERS (SLIDE UP) */}
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-3.5 top-2.5 bg-white rounded-2xl shadow-[0_3px_12px_rgba(0,0,0,0.05)] p-4 border border-black/5 overflow-hidden flex flex-col justify-start"
            initial={false}
            animate={{
              y: isOpen ? -44 - (i * 26) : 0,
              rotate: isOpen ? (i - 1) * 6 : 0,
              scale: isOpen ? 1 : 0.92,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 24, delay: isOpen ? i * 0.05 : 0 }}
            style={{ zIndex: 10 + i, height: '110px' }}
          >
            <div className="font-sans text-[10px] leading-relaxed text-black/85 font-extrabold break-words" style={{ fontFamily: "Inter, sans-serif" }}>
              {item}
            </div>
          </motion.div>
        ))}

        {/* FRONT COVER (TILT) */}
        <motion.div
          className="absolute inset-0 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.12)] origin-bottom border-t-2 border-white/30 overflow-hidden flex flex-col justify-end p-4"
          style={{ backgroundColor: color, zIndex: 30 }}
          animate={{ rotateX: isOpen ? -40 : 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 28 }}
        >
          {/* Subtle geometric accent on cover */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="w-[150%] h-[150%] -rotate-45 translate-x-[-20%] translate-y-[-20%] border-t-2 border-white" />
          </div>

          {/* Tactile File Archive Label Badge */}
          <div
            className="relative z-10 rounded-lg px-2 py-1.5 text-[9px] uppercase tracking-[0.25em] font-extrabold text-center select-none border border-black/5 bg-white/20 backdrop-blur-md shadow-sm"
            style={{
              color: color === '#E9FF61' || color === '#FFFFFF' ? '#000000' : '#FFFFFF',
              fontFamily: "'Google Sans', sans-serif"
            }}
          >
            {label}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const LinePath = ({
  scrollYProgress,
}: {
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[5]">
      <svg
        viewBox="0 0 1278 2319"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-12 sm:opacity-15"
      >
        <motion.path
          d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength,
            strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
          }}
        />
      </svg>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const isVideo = BACKGROUND_ASSET.toLowerCase().endsWith('.mp4');

  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  // Toolkit Modal State
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const [toolCommands, setToolCommands] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Content Data
  const projects = [
    { title: "AI Face Transformation Suite (GAN)", tags: ["Python", "AI"], color: "from-blue-500/10", label: "", image: "/projects/Group%2026.png", desc: "A GAN-based face transformation suite enabling controllable emotion editing, identity morphing, and high-fidelity sketch generation.", url: "https://github.com/ajaykumarreddy-k/PS-Style-GAN-Image-Generater-for-facial-entertainment-with-Features" },
    { title: "Medyphas AI", tags: [], color: "from-red-500/10", label: "", image: "/projects/medyphasAi.png", desc: "An AI-powered patient triage system that analyzes symptoms, intelligently prioritizes cases, and dynamically optimizes doctor queues for efficient clinical decision-making.", url: "https://github.com/ajaykumarreddy-k/Medyphas-AI-Intelligent-Patient-Triage-System" },
    { title: "AI UI Generation Pipeline (RAG)", tags: [], color: "from-purple-500/10", label: "", image: "/projects/project3.png", desc: "An AI-powered frontend generation pipeline that uses retrieval-augmented generation to produce structured, consistent, and pixel-aligned UI layouts.", url: "https://github.com/ajaykumarreddy-k/Prompt-Machine-Ajayakr-prompter-" },
    { title: "Tempo — Weather Intelligence Interface", tags: [], color: "from-orange-500/10", label: "", image: "/projects/project4.png", desc: "A context-aware weather interface that transforms forecast data into actionable insights for smarter, real-time decision-making.", url: "https://github.com/ajaykumarreddy-k/TEMPO-WEATHER" },
  ];
  const featuredProject = projects[0];
  const remainingProjects = projects.slice(1);


  return (
    <div className="relative min-h-screen w-full bg-background font-sans selection:bg-foreground/10 selection:text-foreground">

      {/* 👀 Floating Cursor-Tracking Eyeballs - hidden on mobile to avoid overlapping replay button */}
      {!isPreloaderActive && <div className="hidden md:block"><InteractiveEyes /></div>}

      {/* 🧭 Morphing Dynamic Sticky Nav Bar */}
      {!isPreloaderActive && <DynamicNav />}

      {/* 🌀 High-Fidelity Greeting Preloader */}
      <Preloader active={isPreloaderActive} setActive={setIsPreloaderActive} />

      {/* ↺ Subtle Floating Replay Trigger */}
      {!isPreloaderActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.08 }}
          onClick={() => setIsPreloaderActive(true)}
          className="fixed bottom-6 left-6 z-[99] bg-[#f0ede6]/95 dark:bg-black/95 backdrop-blur-md border border-black/10 dark:border-white/10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-[#0a0a0a] dark:text-[#f0ede6] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300"
          title="Replay Preloader Intro"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
        </motion.button>
      )}

      {/* 〰️ Wrapper Container for line path ending at Me section */}
      <div className="relative w-full">
        <LinePath scrollYProgress={scrollYProgress} />

        {/* 🚀 GIMAEV-INSPIRED EDITORIAL HOME PAGE & TITLE SCREEN */}
        <section className="relative min-h-screen bg-[#FDFCF7] text-[#0a0a0a] font-mori flex flex-col justify-start px-5 pt-20 pb-5 md:px-16 md:py-8 overflow-hidden">

          {/* Subtle cinematic physical grain texture overlay */}
          <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-[0.025]" />

          {/* Top Header Row */}
          <div className="relative w-full flex flex-col md:flex-row md:items-start justify-between gap-8 z-20">

            {/* Logo & Vol metadata (Left Column top) */}
            <div className="flex flex-col gap-2">
              <h1
                className="text-2xl font-bold tracking-tight text-[#0a0a0a] leading-snug"
                style={{ fontFamily: "'PP Mori', sans-serif" }}
              >
                <span className="block">Ajay Kumar Reddy K. <span aria-hidden="true" className="inline-block align-middle text-xl">✌️🙂</span></span>
                <span className="block font-medium text-[#0a0a0a]/70 text-base tracking-normal">— Creative Technologist &amp; AI Engineer</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/50 font-bold leading-relaxed">
                Selected Engineering &amp; AI Works, vol. 2 <br />
                for 2022 — 2026
              </p>
            </div>

          </div>

          {/* Core 2-Column Content Layout */}
          <div className="relative w-full flex flex-col md:flex-row gap-6 md:gap-16 items-start z-20 mt-6 md:mt-12 transition-transform duration-500">

            {/* Left Column (Quiet taglines on desktop) */}
            <div className="w-full md:w-[25%] hidden md:flex flex-col justify-between h-[20vh]">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 font-bold leading-relaxed">
                Quiet confidence. <br />
                Built in silence, <br />
                designed to resonate.
              </div>
            </div>

            {/* Right Column (The primary content - shifted upwards to fit beautifully in the upper viewport) */}
            <div className="w-full md:w-[70%] max-w-4xl flex flex-col items-start gap-3 md:gap-6 md:-translate-y-[5vh] lg:-translate-y-[6vh]">

              {/* ABOUT ME label */}
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-black">
                ABOUT ME
              </div>

              {/* Huge, Elegant Editorial Biography */}
              {/* Huge, Elegant Editorial Biography with Premium Word-by-Word Reveal */}
              <motion.h2
                className="text-[3.8vw] sm:text-xl md:text-[2.5rem] font-normal leading-[1.55] sm:leading-[1.35] md:leading-[1.25] text-[#0a0a0a] tracking-[-0.01em] md:tracking-[-0.02em] max-w-4xl font-sans"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
                initial="hidden"
                animate={isPreloaderActive ? "hidden" : "visible"}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.007
                    }
                  }
                }}
              >
                {[
                  { w: "Hello", bold: false },
                  { w: "there!", bold: false },
                  { w: "My", bold: false },
                  { w: "name", bold: false },
                  { w: "is", bold: false },
                  { w: "Ajay", bold: true },
                  { w: "Kumar", bold: true },
                  { w: "Reddy", bold: true },
                  { w: "K.", bold: true },
                  { w: "I’m", bold: false },
                  { w: "a", bold: false },
                  { w: "Creative", bold: false },
                  { w: "Technologist", bold: false },
                  { w: "and", bold: false },
                  { w: "AI", bold: false },
                  { w: "Engineer,", bold: false },
                  { w: "currently", bold: false },
                  { w: "building", bold: false },
                  { w: "advanced", bold: false },
                  { w: "machine", bold: false },
                  { w: "learning", bold: false },
                  { w: "suites", bold: false },
                  { w: "and", bold: false },
                  { w: "intelligent", bold: false },
                  { w: "triage", bold: false },
                  { w: "interfaces.", bold: false },
                  { w: "Previously,", bold: false },
                  { w: "I", bold: false },
                  { w: "built", bold: false },
                  { w: "Medyphas", bold: false },
                  { w: "AI", bold: false },
                  { w: "and", bold: false },
                  { w: "led", bold: false },
                  { w: "autonomous", bold: false },
                  { w: "supply-chain", bold: false },
                  { w: "models.", bold: false },
                  { w: "Beyond", bold: false },
                  { w: "building", bold: false },
                  { w: "AI", bold: false },
                  { w: "pipelines,", bold: false },
                  { w: "I", bold: false },
                  { w: "enjoy", bold: false },
                  { w: "tinkering", bold: false },
                  { w: "with", bold: false },
                  { w: "generative", bold: false },
                  { w: "adversarial", bold: false },
                  { w: "networks,", bold: false },
                  { w: "exploring", bold: false },
                  { w: "computer", bold: false },
                  { w: "vision", bold: false },
                  { w: "algorithms,", bold: false },
                  { w: "and", bold: false },
                  { w: "publishing", bold: false },
                  { w: "open-source", bold: false },
                  { w: "experiments.", bold: false }
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block overflow-hidden mr-[0.23em] py-[0.05em] align-top"
                  >
                    <motion.span
                      className={`inline-block ${item.bold ? "font-bold text-[#0a0a0a]" : "text-[#0a0a0a]/85"}`}
                      variants={{
                        hidden: { y: "100%", opacity: 0.1 },
                        visible: { y: 0, opacity: 1 }
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        mass: 0.8
                      }}
                    >
                      {item.w}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>

              {/* Portrait + Stickers Row */}
              <div className="w-full flex flex-row items-start gap-5 md:gap-8">

                {/* Rounded Portrait Image — optimized sizing */}
                <div className="flex-shrink-0 w-[50%] sm:w-[55%] md:w-[255px] lg:w-[290px] xl:w-[320px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-black/[0.04] aspect-[4/5] md:aspect-[4/3] relative group shadow-md bg-stone-100">
                  <img
                    src="/footerbackground.jpeg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/me.png";
                    }}
                    alt="Ajay Kumar Reddy K."
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Sticker Wall — bigger stickers */}
                <div className="flex-1 flex flex-wrap items-start justify-start gap-4 md:gap-7 pb-3 md:pb-6">

                  {/* Linux Tux */}
                  <img
                    src="/Stickers/Stickerview1-128-removebg-preview.png"
                    alt="Linux sticker"
                    className="w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain drop-shadow-lg hover:scale-110 hover:-rotate-3 transition-all duration-300 cursor-pointer select-none"
                    style={{ transform: "rotate(-8deg)" }}
                    draggable={false}
                  />

                  {/* Figma */}
                  <img
                    src="/Stickers/figma-adesivo-sticker-removebg-preview.png"
                    alt="Figma sticker"
                    className="w-9 h-9 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain drop-shadow-lg hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer select-none"
                    style={{ transform: "rotate(6deg)" }}
                    draggable={false}
                  />

                  {/* GitHub */}
                  <img
                    src="/Stickers/st_small_507x507-pad_600x600_f8f8f8-removebg-preview.png"
                    alt="GitHub sticker"
                    className="w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain drop-shadow-lg hover:scale-110 hover:-rotate-2 transition-all duration-300 cursor-pointer select-none"
                    style={{ transform: "rotate(-4deg)" }}
                    draggable={false}
                  />

                  {/* Laptop Sticker */}
                  <img
                    src="/Stickers/lap%20pre.png"
                    alt="Laptop sticker"
                    className="w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain drop-shadow-lg hover:scale-110 hover:-rotate-6 transition-all duration-300 cursor-pointer select-none"
                    style={{ transform: "rotate(-6deg)" }}
                    draggable={false}
                  />

                  {/* Code tag </> */}
                  <img
                    src="/Stickers/image.png"
                    alt="Code sticker"
                    className="w-9 h-9 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain drop-shadow-lg hover:scale-110 hover:rotate-5 transition-all duration-300 cursor-pointer select-none"
                    style={{ transform: "rotate(10deg)" }}
                    draggable={false}
                  />

                </div>
              </div>

            </div>

          </div>

          {/* Bottom Navigation & Metadata Footer Row (Pushed to the absolute bottom dynamically) */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6 z-20 mt-auto border-t border-black/[0.05] pt-4 md:pt-6">

            {/* Bottom Left: Rounded Navigation Pills */}
            <div className="flex gap-2">
              {[
                { label: 'Works', href: '#projects', active: false },
                { label: 'About', href: '#', active: true },
                { label: 'Contact', href: '#reach-me', active: false }
              ].map((pill, i) => (
                <a
                  key={i}
                  href={pill.href}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] border transition-all duration-300 ${pill.active
                    ? 'bg-[#0a0a0a] text-white border-transparent'
                    : 'bg-transparent text-[#0a0a0a]/60 border-black/10 hover:border-black hover:text-[#0a0a0a]'
                    }`}
                  style={{ fontFamily: "'PP Mori', sans-serif" }}
                >
                  {pill.label}
                </a>
              ))}
            </div>

            {/* Bottom Right: Metadata Columns */}
            <div className="flex gap-12 text-left">
              <div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 font-black mb-1">POSITION</div>
                <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a]/80" style={{ fontFamily: "'PP Mori', sans-serif" }}>Design Lead</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 font-black mb-1">EXPERIENCE</div>
                <div className="text-xs font-bold uppercase tracking-[0.1em] text-[#0a0a0a]/80" style={{ fontFamily: "'PP Mori', sans-serif" }}>3 years</div>
              </div>
            </div>

          </div>

        </section>

        {/* 🛠 PROJECTS SECTION (Featured Card Layout) */}
        <Section
          id="projects"
          title="Selected Works."
          subtitle="A curated archive of design-led engineering and experimental digital solutions."
          className="bg-[#F8F7F5]"
          isFirst={true}
        >
          {/* DOMINANT FEATURED CARD */}
          {/* PREMIUM SCROLL STACK PORTFOLIO LAYOUT */}
          <div className="max-w-6xl mx-auto py-12 pb-20 px-4 md:px-0">
            <ScrollStack
              itemDistance={90}
              itemScale={0.025}
              itemStackDistance={35}
              stackPosition="20%"
              scaleEndPosition="10%"
              baseScale={0.88}
              rotationAmount={1.5}
              blurAmount={1.5}
              useWindowScroll={true}
            >
              {projects.map((project, i) => {
                const cardBackgrounds = [
                  'bg-gradient-to-br from-stone-900 to-stone-950 border border-white/5 shadow-2xl',
                  'bg-gradient-to-br from-[#1a1815] to-[#0f0e0c] border border-white/5 shadow-2xl',
                  'bg-gradient-to-br from-[#121620] to-[#0a0d14] border border-white/5 shadow-2xl',
                  'bg-gradient-to-br from-[#161a24] to-[#0e1118] border border-white/5 shadow-2xl'
                ];

                return (
                  <ScrollStackItem
                    key={i}
                    itemClassName="bg-gradient-to-br from-[#121318] to-[#090A0D] border border-white/[0.06] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] text-white"
                  >
                    <div className="w-full h-full flex flex-col md:flex-row items-stretch min-h-[360px] md:min-h-[440px]">

                      {/* LEFT PANEL: Rich Editorial Information */}
                      <div className="flex-[0.8] flex flex-col justify-between p-5 md:p-12 min-h-[220px] md:min-h-0">
                        <div>
                          {/* Top Row: Index & Category */}
                          <div
                            className="flex justify-between items-center text-[10px] font-bold tracking-[0.15em] text-white/45 uppercase mb-5"
                            style={{ fontFamily: "'Google Sans', sans-serif" }}
                          >
                            <span>0{i + 1} / {project.tags[0] || 'ENGINEERING'}</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/[0.04] text-[9px] tracking-widest font-bold text-white/50">ACTIVE PORT</span>
                          </div>

                          {/* Title */}
                          <h3
                            className="text-xl md:text-4xl font-bold tracking-tight text-white mb-3 md:mb-4 leading-tight"
                            style={{ fontFamily: "'Google Sans', sans-serif" }}
                          >
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-sm md:text-base text-white/80 leading-relaxed max-w-xl font-normal mb-6"
                            style={{ fontFamily: "'Google Sans', sans-serif" }}
                          >
                            {project.desc}
                          </p>
                        </div>

                        {/* Bottom Row: Tags & CTA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.length > 0 ? (
                              project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3.5 py-1 bg-white/5 rounded-full text-[9px] uppercase tracking-[0.15em] font-bold text-white/50 border border-white/[0.04]"
                                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span
                                className="px-3.5 py-1 bg-white/5 rounded-full text-[9px] uppercase tracking-[0.15em] font-bold text-white/50 border border-white/[0.04]"
                                style={{ fontFamily: "'Google Sans', sans-serif" }}
                              >
                                Engineering &amp; AI
                              </span>
                            )}
                          </div>

                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#E9FF61] text-black font-bold text-xs uppercase tracking-[0.15em] rounded-full hover:bg-[#d6ed42] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_15px_30px_rgba(233,255,97,0.15)] group/btn"
                            style={{ fontFamily: "'Google Sans', sans-serif" }}
                          >
                            <span>{i === 0 ? 'Explore Project' : 'Launch App'}</span>
                            <span className="ml-1.5 transform group-hover/btn:translate-x-0.5 transition-transform duration-300">→</span>
                          </a>
                        </div>
                      </div>

                      {/* RIGHT PANEL: Extended Massive Visual Showcase (Fully seamless background) */}
                      <div className="flex-[1.2] min-h-[180px] md:min-h-0 relative overflow-hidden bg-transparent group flex items-center justify-center p-4 md:p-8">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-contain opacity-95 rounded-2xl md:rounded-[2rem] border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-transform duration-750 group-hover:scale-[1.02]"
                        />
                      </div>

                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
        </Section>

        {/* 🚀 AKR ECHO HORIZONTAL GALLERY */}
        <div className="relative z-30 -mt-16 rounded-t-[3rem] bg-[#F8F7F5] pt-20">
          <AkrEcho />
        </div>

        {/* 🌑 DARK EMPHASIS SECTION */}
        <section className="relative z-10 -mt-16 rounded-t-[3rem] py-16 md:py-32 bg-[#0E0E0E] text-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4">
            <p className="text-sm uppercase tracking-widest text-white/50 mb-6">
              Archive Identity
            </p>
            <h2 className="text-[8vw] md:text-[6vw] leading-none font-semibold tracking-tight break-words">
              AKR - More works.
            </h2>
          </div>
        </section>

        {/* 📦 PORTFOLIO SECTION (Parallel Archive Layout) */}
        <div id="portfolio" className="relative z-30 -mt-16 rounded-t-[3rem] overflow-hidden">
          <ParallelArchive />
        </div>

        {/* 🛠 DEVELOPER TOOLKIT (Interactive Folder Layout) */}
        <Section
          id="docs"
          title="Developer Toolkit."
          subtitle="Commands, workflows, and systems I use to build."
          className="bg-[#ECEAE6]"
        >
          {/* Folder Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-16 py-8 md:py-12 max-w-6xl mx-auto px-2 md:px-0">

            {/* Git Folder */}
            <div className="flex flex-col items-center gap-3">
              <Folder
                color="#FF5B5B"
                label="Git"
                items={["git init", "git clone", "git push"]}
                onClick={() => {
                  setActiveTool("Git Workflow");
                  setToolCommands([
                    "git init",
                    "git clone <repository-url>",
                    "git checkout -b <branch-name>",
                    "git add .",
                    "git commit -m 'your message'",
                    "git pull origin main",
                    "git push origin <branch-name>",
                    "git merge main"
                  ]);
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-black/45 mt-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>Git</p>
            </div>

            {/* Bun Folder */}
            <div className="flex flex-col items-center gap-3">
              <Folder
                color="#E9FF61"
                label="Bun"
                items={["bun init", "bun install", "bun dev"]}
                onClick={() => {
                  setActiveTool("Bun Toolkit");
                  setToolCommands([
                    "bun init",
                    "bun install",
                    "bun add <package>",
                    "bun run dev",
                    "bun run build",
                    "bun test",
                    "bun x create-next-app"
                  ]);
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-black/45 mt-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>Bun</p>
            </div>

            {/* npm Folder */}
            <div className="flex flex-col items-center gap-3">
              <Folder
                color="#FF8E53"
                label="npm"
                items={["npm init", "npm install", "npm dev"]}
                onClick={() => {
                  setActiveTool("NPM Workflow");
                  setToolCommands([
                    "npm init -y",
                    "npm install",
                    "npm install <package>",
                    "npm run dev",
                    "npm run build",
                    "npm run start",
                    "npx create-next-app"
                  ]);
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-black/45 mt-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>npm</p>
            </div>

            {/* Python Folder */}
            <div className="flex flex-col items-center gap-3">
              <Folder
                color="#5BE7FF"
                label="Python"
                items={["uv venv", "uv pip install", "uv run"]}
                onClick={() => {
                  setActiveTool("Python (uv + pip)");
                  setToolCommands([
                    "uv venv",
                    "source .venv/bin/activate",
                    "uv pip install fastapi",
                    "uv pip install -r requirements.txt",
                    "uv pip freeze > requirements.txt",
                    "uv run main.py",
                    "pip install -r requirements.txt",
                    "pip freeze"
                  ]);
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-black/45 mt-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>Python</p>
            </div>

            {/* Cheatsheets */}
            <div className="flex flex-col items-center gap-3">
              <Folder
                color="#E07BFF"
                label="Cheatsheets"
                items={["Patterns", "Layouts", "Auth"]}
                onClick={() => {
                  setActiveTool("Developer Cheatsheets");
                  setToolCommands([
                    "Flexbox patterns (Centering, Grids)",
                    "CSS Grid layouts (Masonry, Holy Grail)",
                    "API architectural patterns (REST, GraphQL)",
                    "Auth flows (OAuth2, JWT, Sessions)",
                    "System design fundamentals"
                  ]);
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-black/45 mt-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>Cheatsheets</p>
            </div>

            {/* Docs Links */}
            <div className="flex flex-col items-center gap-3">
              <Folder
                color="#FFFFFF"
                label="Docs"
                items={["akr-refs.vercel.app"]}
                onClick={() => {
                  setActiveTool("AKR References");
                  setToolCommands([
                    "akr-refs.vercel.app"
                  ]);
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-black/45 mt-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>Docs</p>
            </div>

          </div>
        </Section>

        {/* 👤 ME SECTION */}
        <Section
          id="me"
          title="Me."
          subtitle="A closer look at the creator behind the archive. I Just Added this because it looked Cool FR <_> lol."
          className="bg-[#F8F7F5]"
        >
          <div className="w-full">
            <div className="rounded-[28px] md:rounded-[40px] overflow-hidden bg-[#0a0a0a] border border-black/[0.04] p-2 md:p-4 flex flex-col items-center justify-center group hover:border-black/10 hover:shadow-2xl transition-all duration-700 relative aspect-[4/3] md:aspect-[21/9]">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black">
                <LorenzoInteractivePortrait backgroundColor="#000000" colorBgVec3="0.0,0.0,0.0" />
              </div>
            </div>
          </div>
        </Section>
      </div>


      {/* 📖 AEO: FAQ + BODY TEXT + CONTEXTUAL LINKS SECTION */}
      <section
        id="about-faq"
        className="relative w-full bg-[#F8F7F5] z-30 -mt-16 rounded-t-[3rem] py-16 md:py-28 px-4 md:px-5 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(0,0,0,0.04)]"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Intro body copy — rich quotable text for AI crawlers */}
            <div className="w-full">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-black mb-6">About the Work</p>
              <p className="text-base md:text-lg text-[#0a0a0a]/75 leading-relaxed mb-5" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                I'm <strong>Ajay Kumar Reddy KrishnareddyGari</strong>, a Creative Technologist and AI Engineer based in India with over three years of professional experience
                building intelligent systems, machine learning pipelines, and high-performance web applications. My work sits at the intersection of
                deep learning research and product engineering — from training generative adversarial networks to shipping production-grade React interfaces.
              </p>
              <p className="text-base md:text-lg text-[#0a0a0a]/75 leading-relaxed mb-5" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                The projects in my{" "}
                <a href="#projects" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium text-[#0a0a0a]">selected works</a>
                {" "}span computer vision, natural language processing, healthcare AI, and autonomous supply chain systems.
                Each project is built to solve a real problem, with a bias toward clean architecture and exceptional user experience.
                You can explore the full{" "}
                <a href="#portfolio" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium text-[#0a0a0a]">project archive</a>
                {" "}for a complete view of my engineering history.
              </p>
              <p className="text-base md:text-lg text-[#0a0a0a]/75 leading-relaxed mb-5" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                Beyond building AI pipelines, I invest heavily in developer tooling and workflow automation — a curated set of which is available in the{" "}
                <a href="#docs" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium text-[#0a0a0a]">Developer Toolkit</a>.
                I'm a strong advocate for open-source development; most of my work lives publicly on{" "}
                <a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium text-[#0a0a0a]">GitHub</a>.
                I'm also professionally connected on{" "}
                <a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium text-[#0a0a0a]">LinkedIn</a>.
              </p>
              <p className="text-base md:text-lg text-[#0a0a0a]/75 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                When not writing code, I explore generative adversarial network architectures, contribute to open-source computer vision tooling, and publish
                experimental interfaces. If you're interested in collaborating or have an engineering challenge worth solving,{" "}
                <a href="#reach-me" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium text-[#0a0a0a]">get in touch</a>.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="w-full">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-black mb-6">Frequently Asked</p>

              <div className="space-y-8">

                <div className="border-t border-black/[0.07] pt-6">
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2 leading-snug" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    What technologies does Ajay Kumar Reddy work with?
                  </h3>
                  <p className="text-base text-[#0a0a0a]/70 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    I work across the full stack, with a primary focus on <strong>Python</strong>, <strong>PyTorch</strong>, and <strong>TensorFlow</strong> for machine learning,
                    and <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Node.js</strong> for web development. For backend APIs I use <strong>FastAPI</strong> and
                    <strong> PostgreSQL</strong>. On mobile, I've shipped Android apps with <strong>Kotlin</strong>. I also use Figma for design and have deep experience
                    with the{" "}
                    <a href="https://pytorch.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all">PyTorch ecosystem</a>.
                  </p>
                </div>

                <div className="border-t border-black/[0.07] pt-6">
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2 leading-snug" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    What is Ajay's most notable AI project?
                  </h3>
                  <p className="text-base text-[#0a0a0a]/70 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    The <strong>AI Face Transformation Suite</strong> is a GAN-based system enabling controllable emotion editing, identity morphing, and
                    high-fidelity sketch generation from facial images. It was built using PyTorch and draws from research in{" "}
                    <a href="https://arxiv.org/abs/1406.2661" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all">Generative Adversarial Networks (Goodfellow et al., 2014)</a>.
                    See the{" "}
                    <a href="#projects" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all">selected works section</a>
                    {" "}for more details.
                  </p>
                </div>

                <div className="border-t border-black/[0.07] pt-6">
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2 leading-snug" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    Is Ajay Kumar Reddy available for freelance or full-time roles?
                  </h3>
                  <p className="text-base text-[#0a0a0a]/70 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    Yes. I'm open to both freelance project engagements and full-time engineering roles, particularly those involving AI systems, computer vision,
                    or full-stack product development. You can{" "}
                    <a href="#reach-me" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all">reach out via the contact section</a>
                    {" "}or connect directly on{" "}
                    <a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all">LinkedIn</a>.
                  </p>
                </div>

                <div className="border-t border-black/[0.07] pt-6">
                  <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2 leading-snug" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    Where can I view Ajay's open-source code?
                  </h3>
                  <p className="text-base text-[#0a0a0a]/70 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    All public projects and experiments are available on{" "}
                    <a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all font-medium">github.com/ajaykumarreddy-k</a>.
                    The repository covers everything from GAN training scripts to full-stack web apps, Android applications, and civic technology tools.
                    You can also browse the curated{" "}
                    <a href="#portfolio" className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all">archive section</a>{" "}
                    on this site for annotated summaries.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔗 STAGGERED FLIP REVEAL SOCIAL LINKS */}
      <SocialDirectory />
      <TextFlippingBoardSection />

      {/* 🎬 CINEMATIC FOOTER */}
      <footer className="relative w-full bg-black text-white overflow-hidden" id="reach-me">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/footerbackground.jpeg" className="w-full h-full object-cover opacity-40" alt="Footer Background" />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-24">
          {/* Top Content */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Left */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                Stay connected and explore more.
              </h2>
              <div className="flex items-center gap-4 mt-6">
                <a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition" title="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:ajaykumarreddykrishnareddygari@gmail.com" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition" title="Email">
                  <Mail size={20} />
                </a>
                <a href="/Resume/KRISHNAREDDY GARI AJAY KUMAR REDDY_Doc.pdf" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition" title="Resume">
                  <FileText size={20} />
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <p className="opacity-50 mb-4">Navigation</p>
                <ul className="space-y-2">
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#docs">Docs</a></li>
                  <li><a href="#portfolio">Portfolio</a></li>
                </ul>
              </div>
              <div>
                <p className="opacity-50 mb-4">Connect</p>
                <ul className="space-y-2">
                  <li><a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="mailto:ajaykumarreddykrishnareddygari@gmail.com">Email</a></li>
                  <li><a href="/Resume/KRISHNAREDDY GARI AJAY KUMAR REDDY_Doc.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="mt-24 border-t border-white/10 pt-10">
            <span className="text-[12vw] leading-none font-bold tracking-tight block">
              AKR
            </span>
            <p
              className="text-white/50 text-sm md:text-lg uppercase tracking-widest font-medium mt-2 md:mt-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ajay Kumar Reddy KrishnareddyGari
            </p>
          </div>
        </div>
      </footer>

      {/* 🔮 TOOLKIT MODAL HUB */}
      <AnimatePresence>
        {activeTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTool(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden mx-2"
            >
              <div className="p-6 md:p-14">
                <div className="flex justify-between items-center mb-6 md:mb-10">
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-foreground" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {activeTool}
                  </h3>
                  <button
                    onClick={() => setActiveTool(null)}
                    className="p-3 bg-foreground/5 rounded-full hover:bg-foreground/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 md:space-y-4 max-h-[50vh] md:max-h-[450px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' as any }}>
                  {toolCommands.map((cmd, i) => (
                    <div
                      key={i}
                      className="group flex justify-between items-center bg-[#F4F2EF] border border-black/[0.04] px-6 py-5 rounded-2xl transition-all hover:bg-white hover:shadow-lg"
                    >
                      <span className="font-serif text-base text-foreground/90 tracking-wide break-all pr-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        {cmd}
                      </span>
                      <button
                        onClick={() => copyToClipboard(cmd, i)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${copiedIndex === i
                          ? 'bg-green-500 text-white'
                          : 'bg-foreground/10 text-foreground/40 hover:bg-foreground hover:text-white'
                          }`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check size={12} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setActiveTool(null)}
                    className="text-xs font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Close Terminal
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const archiveProjects = [
  {
    title: "AI Face Transform",
    tag: "GAN / Vision",
    year: "[04 sep]",
    color: "#5B5BF7",
    context:
      "GAN-based face morphing and emotion generation system.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Medyphas AI",
    tag: "AI Healthcare",
    year: "[07 sep]",
    color: "#7CFF6B",
    context:
      "AI-powered patient triage system with intelligent queue optimization.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "AI UI Pipeline",
    tag: "Python / RAG",
    year: "[12 sep]",
    color: "#FFB84D",
    context:
      "Structured frontend generation pipeline powered by retrieval systems.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Tempo",
    tag: "Weather Systems",
    year: "[15 sep]",
    color: "#5BE7FF",
    context:
      "Atmospheric forecasting interface focused on adaptive data visualization.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Narrative Shield",
    tag: "Disinformation",
    year: "[18 sep]",
    color: "#FF5BA0",
    context:
      "Misinformation detection engine with contextual reasoning layers.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Sentinal-X",
    tag: "Supply Chain",
    year: "[21 sep]",
    color: "#D9FF00",
    context:
      "Autonomous logistics intelligence and predictive monitoring system.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Swap Walls",
    tag: "Android",
    year: "[24 sep]",
    color: "#8A7DFF",
    context:
      "Minimal wallpaper ecosystem engineered with Kotlin rendering systems.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Famshare",
    tag: "Media Streaming",
    year: "[26 sep]",
    color: "#FF7B7B",
    context:
      "Personal streaming architecture with API-driven playback.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "BrainBuzzer",
    tag: "Full Stack",
    year: "[28 sep]",
    color: "#00D1B2",
    context:
      "Interactive multiplayer quiz platform with scalable architecture.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "Certificate Gen",
    tag: "Automation",
    year: "[30 sep]",
    color: "#F7F36B",
    context:
      "Automated certificate generation with customizable template pipelines.",
    link: "https://github.com/ajaykumarreddy-k",
  },

  {
    title: "AKR- refs",
    tag: "Recap & Review",
    year: "[02 oct]",
    color: "#FF8E53",
    context:
      "All material, docs, and notes for quick recaps and conceptual revision with verified links.",
    link: "https://akr-refs.vercel.app",
  },

  {
    title: "marmady",
    tag: "UML & Diagrams",
    year: "[05 oct]",
    color: "#E07BFF",
    context:
      "Uses Mermaid framework to generate flowcharts, live state matrices, and dynamic UML diagrams instantly.",
    link: "https://marmady.vercel.app/#code=Z3JhcGggVEQKICBTdGFydFsi8J+RiyBXZWxjb21lIHRvIE1hcm1hZHkgU3R1ZGlvIl0KICBJbnB1dFsi8J+TiyBQYXN0ZSBZb3VyIE1lcm1haWQgQ29kZSJdCiAgUmVuZGVyWyLimpnvuI8gTGl2ZSBEaWFncmFtIFJlbmRlcnMgSW5zdGFudGx5Il0KICBPdXRwdXRbIvCflrzvuI8gVmlldyBZb3VyIERpYWdyYW0iXQogIEV4cG9ydFsi8J+TpCBFeHBvcnQgU1ZHIC8gUE5HIC8gUERGIl0KICBEb25lWyLinIUgWW91J3JlIEFsbCBTZXQhIl0KICBDcmVkaXRbIvCfkpYgTWFkZSBieSBBamF5IOKAlCBtYXJtYWR5LnN0dWRpbyJdCgogIFN0YXJ0IC0tPiBJbnB1dAogIElucHV0IC0tPiBSZW5kZXIKICBSZW5kZXIgLS0+IE91dHB1dAogIE91dHB1dCAtLT4gRXhwb3J0CiAgRXhwb3J0IC0tPiBEb25lCiAgRG9uZSAtLT4gQ3JlZGl0CgogIHN0eWxlIFN0YXJ0IGZpbGw6IzFhMWEyZSxzdHJva2U6I2EzZmYzZixzdHJva2Utd2lkdGg6MnB4LGNvbG9yOiNmZmZmZmYKICBzdHlsZSBJbnB1dCBmaWxsOiMwZDFiMmEsc3Ryb2tlOiM0Mjg1RjQsc3Ryb2tlLXdpZHRoOjJweCxjb2xvcjojZmZmZmZmCiAgc3R5bGUgUmVuZGVyIGZpbGw6IzFhMGEyZSxzdHJva2U6I0U5MUU4QyxzdHJva2Utd2lkdGg6MnB4LGNvbG9yOiNmZmZmZmYKICBzdHlsZSBPdXRwdXQgZmlsbDojMGQyYTFiLHN0cm9rZTojMzRBODUzLHN0cm9rZS13aWR0aDoycHgsY29sb3I6I2ZmZmZmZgogIHN0eWxlIEV4cG9ydCBmaWxsOiMyYTFhMGQsc3Ryb2tlOiNGOUFCMDAsc3Ryb2tlLXdpZHRoOjJweCxjb2xvcjojZmZmZmZmCiAgc3R5bGUgRG9uZSBmaWxsOiMxYTBkMWIsc3Ryb2tlOiNFOTFFOEMsc3Ryb2tlLXdpZHRoOjJweCxjb2xvcjojZmZmZmZmCiAgc3R5bGUgQ3JlZGl0IGZpbGw6IzBkMGQwZSxzdHJva2U6I2EzZmYzZixzdHJva2Utd2lkdGg6MXB4LGNvbG9yOiNhYWFhYWE=&theme=neutral",
  },

  {
    title: "V2I — Vote 2 India",
    tag: "AI & Civic Tech",
    year: "[10 oct]",
    color: "#E9FF61",
    context:
      "Civic Intelligence platform leveraging Google Vertex AI (Gemini 1.5 Pro) for manifesto summarization and Trial EVM simulation.",
    link: "https://vote2india.vercel.app",
  },
];

function ParallelArchive() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const translate = useRef({ x: 0, y: 0 });
  const clickStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setScrollY(-rect.top * 0.16);

      // Detect if ParallelArchive is currently in the viewport
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setIsInView(inView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize visibility on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointerDown = (e: any) => {
    isDragging.current = true;
    start.current = {
      x: e.clientX - translate.current.x,
      y: e.clientY - translate.current.y,
    };
    clickStart.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current) return;
    const x = e.clientX - start.current.x;
    const y = e.clientY - start.current.y;
    translate.current = { x, y };

    if (dragRef.current) {
      dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handlePointerUp = (e: any) => {
    isDragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
    document.body.style.cursor = "default";

    // Detect click vs drag using coordinates delta
    const dx = e.clientX - clickStart.current.x;
    const dy = e.clientY - clickStart.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 5) {
      const projectLink = archiveProjects[active].link;
      if (projectLink) {
        window.open(projectLink, "_blank");
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: archiveProjects[active].color,
        transition: 'background-color 700ms ease-out',
        WebkitTransition: 'background-color 700ms ease-out',
      }}
      className="relative w-full min-h-screen py-14 md:py-20 pb-20 md:pb-28 overflow-hidden text-black font-['Google_Sans','sans-serif']"
    >
      {/* grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.08))]" />

      {/* toolbar — hidden on mobile to avoid crowding */}
      <div
        className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center gap-3 bg-black/85 text-white rounded-2xl px-4 py-3 backdrop-blur-xl transition-all duration-700 ease-out"
        style={{
          opacity: isInView ? 1 : 0,
          transform: `scale(${isInView ? 1 : 0.85})`,
          pointerEvents: isInView ? "auto" : "none",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white/60" />
        <Command className="w-4 h-4 opacity-70" />
        <ArrowUpRight className="w-4 h-4 opacity-70" />
      </div>

      {/* projects */}
      <div className="relative z-10 flex flex-col gap-1 pt-10 md:pt-16 px-5 md:px-14">
        {archiveProjects.map((project, index) => {
          const activeProject = active === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              onClick={() => {
                if (project.link) {
                  window.open(project.link, "_blank");
                }
              }}
              className={`relative flex items-center gap-5 transition-all duration-500 cursor-pointer ${activeProject ? "opacity-100" : "opacity-20 hover:opacity-40"
                }`}
            >
              {/* title */}
              <p className="text-[32px] sm:text-[44px] md:text-[78px] leading-none tracking-[-0.06em] md:tracking-[-0.08em] font-medium break-words">
                {project.title}
              </p>

              {/* meta */}
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-[10px] px-4 py-2 rounded-full transition-all ${activeProject ? "bg-black/10 backdrop-blur-md" : ""}`}>
                  {project.tag}
                </span>
                <span className="text-[10px] opacity-50">{project.year}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* floating project context — smaller and tucked in on mobile */}
      <div
        className="fixed right-3 bottom-3 z-40 transition-all duration-700 ease-out"
        style={{
          transform: `translateY(${scrollY}px) scale(${isInView ? 1 : 0.85})`,
          opacity: isInView ? 1 : 0,
          pointerEvents: isInView ? "auto" : "none",
        }}
      >
        <div
          ref={dragRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-[220px] h-[200px] sm:w-[300px] sm:h-[270px] rounded-[20px] sm:rounded-[28px] overflow-hidden cursor-grab active:cursor-grabbing bg-[#E9FF61] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
        >
          {/* texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* archive text */}
          <div className="absolute -top-2 left-0 text-[60px] sm:text-[84px] font-black tracking-[-0.1em] leading-[0.8] opacity-[0.06] uppercase pointer-events-none select-none">
            ARCHIVE
          </div>

          {/* content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6">
            {/* top */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] tracking-[0.25em] uppercase opacity-50">Project Context</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </div>
              <h2 className="text-[22px] sm:text-[34px] leading-[0.88] tracking-[-0.06em] sm:tracking-[-0.08em] font-bold mb-3 sm:mb-4">
                {archiveProjects[active].title}
              </h2>
              <p className="text-[11px] leading-relaxed max-w-[220px] opacity-70">
                {archiveProjects[active].context}
              </p>
            </div>

            {/* bottom */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/5 rounded-2xl p-3">
                  <p className="text-[9px] opacity-40 mb-1">SIGNAL</p>
                  <h3 className="text-lg tracking-[-0.06em] font-bold">98%</h3>
                </div>
                <div className="bg-black/5 rounded-2xl p-3">
                  <p className="text-[9px] opacity-40 mb-1">LATENCY</p>
                  <h3 className="text-lg tracking-[-0.06em] font-bold">04ms</h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] opacity-50">
                <span>Ajay Kumar Reddy K</span>
                <span>Archive Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
