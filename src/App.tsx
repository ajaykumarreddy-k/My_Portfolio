import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Copy, Check, X, FileText } from 'lucide-react';
import LorenzoInteractivePortrait from './components/LorenzoInteractivePortrait';
import Preloader from './components/Preloader';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';

/**
 * CONFIGURATION: Hero background asset
 */
const BACKGROUND_ASSET = "/sakura.gif";

/**
 * REUSABLE SECTION WRAPPER (LAYERED OVERLAP LAYOUT)
 * Implements a wide layout (1400px) with overlapping rounded-top sections and inner depth.
 */
const Section = ({ id, title, subtitle, children, className = "bg-[#F8F7F5]", isFirst = false }: any) => (
  <section id={id} className={`relative z-10 w-full ${isFirst ? "mt-0" : "-mt-16"} rounded-t-[3rem] py-28 px-4 md:px-5 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(0,0,0,0.04)] ${className}`}>
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1400px] mx-auto"
    >
      <div className="max-w-[1400px] mx-auto px-4 mb-16">
        <h2 className="text-[8vw] md:text-[6vw] leading-none font-semibold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-4 text-xl font-medium max-w-4xl leading-relaxed opacity-70">
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
const Folder = ({ color, items, size = 1.4, onClick }: { color: string, items: any[], size?: number, onClick?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative cursor-pointer group"
        style={{ width: '120px', height: '90px', perspective: '1000px' }}
        onClick={handleClick}
        whileHover={{ y: -8, scale: 1.02 }}
        initial={{ scale: size }}
      >
        {/* BACK PLATE with TAB */}
        <div
          className="absolute inset-0 rounded-xl shadow-md border-b-4 border-black/10"
          style={{ backgroundColor: color }}
        >
          <div className="absolute -top-2 left-4 w-10 h-4 rounded-t-lg shadow-sm" style={{ backgroundColor: color }} />
        </div>

        {/* PAPERS (SLIDE UP) */}
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-2 bg-white rounded-lg shadow-sm p-3 border border-black/5 overflow-hidden"
            initial={false}
            animate={{
              y: isOpen ? -30 - (i * 20) : 0,
              rotate: isOpen ? (i - 1) * 6 : 0,
              scale: isOpen ? 1 : 0.9,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay: isOpen ? i * 0.05 : 0 }}
            style={{ zIndex: 10 + i, height: '80px' }}
          >
            <div className="font-mono text-[10px] leading-tight text-black/80 font-bold">
              {item}
            </div>
          </motion.div>
        ))}

        {/* FRONT COVER (TILT) */}
        <motion.div
          className="absolute inset-0 rounded-xl shadow-xl origin-bottom border-t-2 border-white/30 overflow-hidden"
          style={{ backgroundColor: color, zIndex: 30 }}
          animate={{ rotateX: isOpen ? -35 : 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 30 }}
        >
          {/* Subtle geometric accent on cover */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="w-[150%] h-[150%] -rotate-45 translate-x-[-20%] translate-y-[-20%] border-t-2 border-white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const isVideo = BACKGROUND_ASSET.toLowerCase().endsWith('.mp4');

  // Preloader State
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  // Toolkit Modal State
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const [toolCommands, setToolCommands] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showAllRepos, setShowAllRepos] = useState(false);

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

  const repos = [
    { name: "AI Face Transformation Suite (GAN)", lang: "Python", desc: "GAN-based system for emotion editing, face morphing, and high-fidelity sketch generation.", url: "https://github.com/ajaykumarreddy-k/PS-Style-GAN-Image-Generater-for-facial-entertainment-with-Features" },
    { name: "Medyphas AI", lang: "TypeScript", desc: "AI-powered patient triage system for symptom analysis, prioritization, and doctor queue optimization.", url: "https://github.com/ajaykumarreddy-k/Medyphas-AI-Intelligent-Patient-Triage-System" },
    { name: "AI UI Generation Pipeline (RAG)", lang: "Python", desc: "RAG-based pipeline for generating structured, pixel-consistent frontend layouts.", url: "https://github.com/ajaykumarreddy-k/Prompt-Machine-Ajayakr-prompter-" },
    { name: "Tempo — Weather Intelligence Interface", lang: "TypeScript", desc: "Context-aware weather interface delivering actionable insights from real-time forecast data.", url: "https://github.com/ajaykumarreddy-k/TEMPO-WEATHER" },
    { name: "Narrative Shield", lang: "Python", desc: "Real-time AI platform for detecting and explaining disinformation in text.", url: "https://github.com/ajaykumarreddy-k/-NARRATIVE-SHIELD" },
    { name: "Sentinal-X", lang: "TypeScript", desc: "Autonomous supply chain intelligence platform with BYOK architecture.", url: "https://github.com/ajaykumarreddy-k/Sentinal---X" },
    { name: "Swap Walls", lang: "Kotlin", desc: "Wallpaper application built using Kotlin with a focus on simple UI and media rendering.", url: "https://github.com/ajaykumarreddy-k/Swap-Walls" },
    { name: "Famshare", lang: "Kotlin", desc: "Personal streaming application that serves media from local folders with API-driven playback.", url: "https://github.com/ajaykumarreddy-k/Famshare" },
    { name: "BrainBuzzer", lang: "Python", desc: "Interactive quiz web application supporting multiple genres with a full-stack implementation.", url: "https://github.com/ajaykumarreddy-k/BrainBuzzer-A-quiz-app" },
    { name: "Certificate Generator", lang: "Python", desc: "Automated certificate generation system with customizable templates and batch processing.", url: "https://github.com/ajaykumarreddy-k/Certificate_Generater" },
  ];
  const featuredRepo = repos[0];
  const coreRepos = repos.slice(1, 6);
  const additionalRepos = repos.slice(6);
  const visibleRepos = showAllRepos ? [...coreRepos, ...additionalRepos] : coreRepos;


  return (
    <div className="relative min-h-screen w-full bg-background font-sans selection:bg-foreground/10 selection:text-foreground">

      {/* 🌀 High-Fidelity Greeting Preloader */}
      <Preloader active={isPreloaderActive} setActive={setIsPreloaderActive} />

      {/* ↺ Subtle Floating Replay Trigger */}
      {!isPreloaderActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.08 }}
          onClick={() => setIsPreloaderActive(true)}
          className="fixed bottom-6 left-6 z-[99] bg-[#f0ede6]/95 dark:bg-black/95 backdrop-blur-md border border-black/10 dark:border-white/10 w-11 h-11 rounded-full flex items-center justify-center text-[#0a0a0a] dark:text-[#f0ede6] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300"
          title="Replay Preloader Intro"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
        </motion.button>
      )}

      {/* 🚀 GIMAEV-INSPIRED EDITORIAL HOME PAGE & TITLE SCREEN */}
      <section className="relative min-h-screen bg-[#FDFCF7] text-[#0a0a0a] font-mori flex flex-col justify-start px-6 py-6 md:px-16 md:py-8 overflow-hidden">

        {/* Subtle cinematic physical grain texture overlay */}
        <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-[0.025]" />

        {/* Top Header Row */}
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-8 z-20">

          {/* Logo & Vol metadata (Left Column top) */}
          <div className="flex flex-col gap-2">
            <h1
              className="text-2xl font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontFamily: "'PP Mori', sans-serif" }}
            >
              AKR. Folio 🗿
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/50 font-bold leading-relaxed">
              Selected Engineering &amp; AI Works, vol. 2 <br />
              for 2022 — 2026
            </p>
          </div>

        </div>

        {/* Core 2-Column Content Layout */}
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-16 items-start z-20 mt-6 md:mt-12 transition-transform duration-500">

          {/* Left Column (Quiet taglines on desktop) */}
          <div className="w-full md:w-[25%] hidden md:flex flex-col justify-between h-[20vh]">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 font-bold leading-relaxed">
              Quiet confidence. <br />
              Built in silence, <br />
              designed to resonate.
            </div>
          </div>

          {/* Right Column (The primary content - shifted upwards to fit beautifully in the upper viewport) */}
          <div className="w-full md:w-[70%] max-w-4xl flex flex-col items-start gap-4 md:gap-6 md:-translate-y-[7vh] lg:-translate-y-[8vh]">

            {/* ABOUT ME label */}
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-black">
              ABOUT ME
            </div>

            {/* Huge, Elegant Editorial Biography */}
            <h2
              className="text-2xl sm:text-3xl md:text-[2.5rem] font-normal leading-[1.25] text-[#0a0a0a] tracking-[-0.02em] max-w-4xl font-mori"
              style={{ fontFamily: "'PP Mori', sans-serif" }}
            >
              Hello there! My name is <span className="font-bold">Ajay Kumar Reddy K.</span> <br />
              I’m a Creative Technologist and AI Engineer, currently building advanced machine learning suites and intelligent triage interfaces. Previously, I built Medyphas AI and led autonomous supply-chain models. <br />
              Beyond building AI pipelines, I enjoy tinkering with generative adversarial networks, exploring computer vision algorithms, and publishing open-source experiments.
            </h2>

            {/* Rounded Portrait Image with optimized aspect ratio for perfect viewport visibility */}
            <div className="w-full max-w-md rounded-[2rem] overflow-hidden border border-black/[0.04] aspect-[16/10] relative group shadow-sm bg-stone-100">
              <img
                src="/footerbackground.jpeg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/me.png";
                }}
                alt="Ajay Kumar Reddy K."
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>

          </div>

        </div>

        {/* Bottom Navigation & Metadata Footer Row (Pushed to the absolute bottom dynamically) */}
        <div className="w-full flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 z-20 mt-auto border-t border-black/[0.05] pt-6">

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
                  <div className="w-full h-full flex flex-col md:flex-row items-stretch min-h-[440px]">
                    
                    {/* LEFT PANEL: Rich Editorial Information */}
                    <div className="flex-[0.8] flex flex-col justify-between p-8 md:p-12 min-h-[300px] md:min-h-0">
                      <div>
                        {/* Top Row: Index & Category */}
                        <div className="flex justify-between items-center text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-5">
                          <span>0{i + 1} / {project.tags[0] || 'ENGINEERING'}</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full border border-white/5 text-[9px] tracking-widest font-bold text-white/60">ACTIVE PORT</span>
                        </div>

                        {/* Title */}
                        <h3 
                          className="text-2xl md:text-4xl font-normal tracking-tight text-white mb-4 leading-tight font-mori"
                          style={{ fontFamily: "'PP Mori', sans-serif" }}
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p 
                          className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl font-medium font-mori mb-6"
                          style={{ fontFamily: "'PP Mori', sans-serif" }}
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
                                className="px-3.5 py-1 bg-white/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-white/60 border border-white/5"
                                style={{ fontFamily: "'PP Mori', sans-serif" }}
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span 
                              className="px-3.5 py-1 bg-white/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-white/60 border border-white/5"
                              style={{ fontFamily: "'PP Mori', sans-serif" }}
                            >
                              Engineering &amp; AI
                            </span>
                          )}
                        </div>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
                          style={{ fontFamily: "'PP Mori', sans-serif" }}
                        >
                          {i === 0 ? 'Explore Project →' : 'Launch App →'}
                        </a>
                      </div>
                    </div>

                    {/* RIGHT PANEL: Extended Massive Visual Showcase (Fully seamless background) */}
                    <div className="flex-[1.2] min-h-[300px] md:min-h-0 relative overflow-hidden bg-transparent group flex items-center justify-center p-6 md:p-8">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-contain opacity-95 transition-transform duration-750 group-hover:scale-[1.02]"
                      />
                    </div>

                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </Section>

      {/* 🛠 DEVELOPER TOOLKIT (Interactive Folder Layout) */}
      <Section
        id="docs"
        title="Developer Toolkit."
        subtitle="Commands, workflows, and systems I use to build."
        className="bg-[#ECEAE6]"
      >
        {/* Folder Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-24 py-12">

          {/* Git Folder */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#FF6B6B"
              size={1.7}
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
            <p className="text-sm text-black/70">Git</p>
          </div>

          {/* Bun Folder */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#6BCB77"
              size={1.7}
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
            <p className="text-sm text-black/70">Bun</p>
          </div>

          {/* npm Folder */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#4D96FF"
              size={1.7}
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
            <p className="text-sm text-black/70">npm</p>
          </div>

          {/* Python Folder */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#FFD93D"
              size={1.7}
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
            <p className="text-sm text-black/70">Python</p>
          </div>

          {/* Cheatsheets */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#C77DFF"
              size={1.7}
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
            <p className="text-sm text-black/70">Cheatsheets</p>
          </div>

          {/* Docs Links */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#00C2A8"
              size={1.7}
              items={["React Docs", "Next.js", "Tailwind"]}
              onClick={() => {
                setActiveTool("External Documentation");
                setToolCommands([
                  "React Official Documentation",
                  "Next.js App Router Docs",
                  "Tailwind CSS Configuration Guide",
                  "FastAPI Technical Reference",
                  "Node.js Runtime Documentation"
                ]);
              }}
            />
            <p className="text-sm text-black/70">Docs</p>
          </div>

          {/* Roadmap */}
          <div className="flex flex-col items-center gap-3">
            <Folder
              color="#FF9F1C"
              size={1.7}
              items={["roadmap.sh", "Frontend", "Backend"]}
              onClick={() => {
                setActiveTool("Learning Roadmap");
                setToolCommands([
                  "Visit roadmap.sh for full paths",
                  "Frontend Developer Roadmap",
                  "Backend Developer Roadmap",
                  "System Design Interview Prep"
                ]);
              }}
            />
            <p className="text-sm text-black/70">Roadmap</p>
          </div>

        </div>
      </Section>

      {/* 🌑 DARK EMPHASIS SECTION */}
      <section className="relative z-10 -mt-16 rounded-t-[3rem] py-32 bg-[#0E0E0E] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4">
          <p className="text-sm uppercase tracking-widest text-white/50 mb-6">
            Archive Identity
          </p>
          <h2 className="text-[10vw] md:text-[8vw] leading-none font-semibold tracking-tight">
            AKR
          </h2>
        </div>
      </section>

      {/* 📦 PORTFOLIO SECTION (Featured Card Layout) */}
      <Section
        id="portfolio"
        title="Digital Archive."
        subtitle="Exploring the intersections of systems and intelligence through repository architecture."
        className="bg-[#ECEAE6]"
      >
        {/* DOMINANT FEATURED REPOSITORY */}
        <div className="w-full mb-8">
          <div className="rounded-[40px] overflow-hidden bg-white border border-black/[0.04] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-black/10 hover:shadow-2xl transition-all duration-700 relative">
            <div className="max-w-2xl relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-4 opacity-80">Core Repository</p>
              <h3 className="text-5xl md:text-7xl font-display text-foreground mb-6 leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {featuredRepo.name}
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed opacity-80 mb-10 font-medium">
                {featuredRepo.desc}
              </p>
              <div className="flex items-center gap-8">
                <a
                  href={featuredRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] border-b border-foreground/30 hover:border-foreground transition-all pb-1"
                >
                  View Source Code →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleRepos.map((repo, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={repo.name}
                className="group p-10 bg-white/80 backdrop-blur-md border border-black/[0.04] shadow-sm rounded-[2.5rem] hover:bg-white transition-all duration-700 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{repo.name}</span>
                </div>
                <p className="text-muted-foreground text-sm font-medium mb-10 opacity-60 line-clamp-2">{repo.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">{repo.lang}</span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View Git →
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More / Show Less Toggle Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAllRepos(!showAllRepos)}
            className="liquid-glass-dark rounded-full px-12 py-4 text-sm text-white hover:scale-[1.05] transition-all duration-300 font-bold tracking-tight"
          >
            {showAllRepos ? "Show Less ←" : "View More →"}
          </button>
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
          <div className="rounded-[40px] overflow-hidden bg-[#0a0a0a] border border-black/[0.04] p-2 md:p-4 flex flex-col items-center justify-center group hover:border-black/10 hover:shadow-2xl transition-all duration-700 relative aspect-[4/3] md:aspect-[21/9]">
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black">
              <LorenzoInteractivePortrait backgroundColor="#000000" colorBgVec3="0.0,0.0,0.0" />
            </div>
          </div>
        </div>
      </Section>

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
            <h1 className="text-[12vw] leading-none font-bold tracking-tight">
              AKR
            </h1>
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
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 md:p-14">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {activeTool}
                  </h3>
                  <button
                    onClick={() => setActiveTool(null)}
                    className="p-3 bg-foreground/5 rounded-full hover:bg-foreground/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                  {toolCommands.map((cmd, i) => (
                    <div
                      key={i}
                      className="group flex justify-between items-center bg-[#F4F2EF] border border-black/[0.04] px-6 py-5 rounded-2xl transition-all hover:bg-white hover:shadow-lg"
                    >
                      <span className="font-mono text-sm text-foreground/80 break-all pr-4">{cmd}</span>
                      <button
                        onClick={() => copyToClipboard(cmd, i)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${copiedIndex === i
                          ? 'bg-green-500 text-white'
                          : 'bg-foreground/10 text-foreground/40 hover:bg-foreground hover:text-white'
                          }`}
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check size={12} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            Copy
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
