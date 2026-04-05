import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Copy, Check, X, FileText } from 'lucide-react';
import LorenzoInteractivePortrait from './components/LorenzoInteractivePortrait';

/**
 * CONFIGURATION: Hero background asset
 */
const BACKGROUND_ASSET = "/桜Sakura Cherry Blossom Pixel.gif";

/**
 * REUSABLE SECTION WRAPPER (LAYERED OVERLAP LAYOUT)
 * Implements a wide layout (1400px) with overlapping rounded-top sections and inner depth.
 */
const Section = ({ id, title, subtitle, children, className = "bg-[#F8F7F5]" }: any) => (
  <section id={id} className={`relative z-10 w-full -mt-16 rounded-t-[3rem] py-28 px-4 md:px-5 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(0,0,0,0.04)] ${className}`}>
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

      {/* 🚀 FIXED NAVIGATION (Max-Width Synchronized) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <div className="flex flex-row items-center justify-between px-5 py-5 max-w-[1400px] mx-auto w-full">
          <div
            className="text-3xl tracking-tight text-muted-foreground font-display cursor-pointer"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            AKR®
          </div>
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Projects', id: 'projects' },
              { label: 'Docs', id: 'docs' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'Reach me', id: 'reach-me' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition-all duration-300 font-medium tracking-tight"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#projects"
            className="liquid-glass-dark rounded-full px-8 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform"
          >
            Explore →
          </a>
        </div>
      </nav>

      {/* 🌸 HERO SECTION (UNTOUCHABLE) */}
      <section className="relative h-screen min-h-[800px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {isVideo ? (
            <video src={BACKGROUND_ASSET} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={BACKGROUND_ASSET} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl sm:text-8xl md:text-[9rem] leading-[0.85] tracking-[-0.04em] font-normal font-display text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Built in <em className="not-italic text-muted-foreground">silence.</em> <br />
            Designed to <em className="not-italic text-muted-foreground">resonate.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mt-12 mx-auto font-medium leading-relaxed"
          >
            A personal archive of ideas, systems, and experiments.<br />
            Every project reflects thought, intention, and identity.<br />
            By Ajay Kumar Reddy KrishnareddyGari
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16"
          >
            <a
              href="#projects"
              className="liquid-glass-dark rounded-full px-16 py-6 text-xl text-white hover:scale-[1.05] cursor-pointer inline-block"
            >
              Explore →
            </a>
          </motion.div>
        </div>
      </section>

      {/* 🛠 PROJECTS SECTION (Featured Card Layout) */}
      <Section
        id="projects"
        title="Selected Works."
        subtitle="A curated archive of design-led engineering and experimental digital solutions."
        className="bg-[#F8F7F5]"
      >
        {/* DOMINANT FEATURED CARD */}
        <div className="w-full mb-8">
          <div className="rounded-[40px] overflow-hidden bg-white border border-black/[0.04] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-black/10 hover:shadow-2xl transition-all duration-700">
            {/* LEFT CONTENT */}
            <div className="max-w-xl flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground opacity-60">Featured Work</p>
              <h3 className="text-5xl md:text-7xl font-display text-foreground mt-6 mb-8 leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {featuredProject.title}
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed opacity-80 mb-10 font-medium">
                {featuredProject.desc}
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                {featuredProject.tags.map(tag => (
                  <span key={tag} className="px-5 py-2 bg-foreground/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-foreground/70 font-bold border border-foreground/10">{tag}</span>
                ))}
              </div>
              <a
                href={featuredProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-full border border-foreground/20 text-foreground font-black text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 inline-block"
              >
                Explore Project →
              </a>
            </div>

            {/* RIGHT VISUAL */}
            <div className={`w-full md:w-[45%] rounded-[3rem] aspect-[4/3] bg-gradient-to-br ${featuredProject.color} via-transparent to-transparent flex items-center justify-center border border-foreground/5 group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden relative`}>
              <img src={featuredProject.image} alt={featuredProject.label} className="absolute inset-0 w-full h-full object-contain opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 text-8xl text-foreground opacity-10 font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {featuredProject.label}
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingProjects.map((project, i) => (
            <div key={i} className="group overflow-hidden bg-white/80 backdrop-blur-md border border-black/[0.04] shadow-sm rounded-[2.5rem] hover:bg-white transition-all duration-700 hover:-translate-y-2 cursor-pointer hover:shadow-xl">
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} via-transparent to-transparent flex items-center justify-center p-10 transition-all duration-700 group-hover:scale-105 relative overflow-hidden`}>
                <img src={project.image} alt={project.label} className="absolute inset-0 w-full h-full object-contain opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 text-4xl text-foreground opacity-10 group-hover:opacity-40 transition-opacity font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {project.label}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium opacity-60 line-clamp-2">{project.desc}</p>
                <div className="pt-6 border-t border-foreground/5 flex items-center justify-between">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] hover:border-b border-foreground transition-all duration-300"
                  >
                    Launch App →
                  </a>
                </div>
              </div>
            </div>
          ))}
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
