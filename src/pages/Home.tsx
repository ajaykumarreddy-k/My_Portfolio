import { useRef, useEffect } from 'react';

/**
 * -------------------------------------------------------------------------
 * CONFIGURATION: CHANGE THE BACKGROUND ASSET HERE
 * Just input the filename from the public/ folder (e.g., "bnbnbmnb.mp4" or "bnbnbmnb.gif")
 * -------------------------------------------------------------------------
 */
const BACKGROUND_ASSET = "public/桜Sakura Cherry Blossom Pixel.gif";

export default function Home({ onNavigate }: { onNavigate: (path: string) => void }) {
  // Path Sanitization: Automatically fix common path mistakes
  const cleanPath = BACKGROUND_ASSET.replace(/^public\//, '').replace(/^\/?/, '/');
  const isVideo = cleanPath.toLowerCase().endsWith('.mp4');

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-sans">
      {/* Universal Background Handler with Readability Overlay */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            src={cleanPath}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={cleanPath}
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="text-3xl tracking-tight text-muted-foreground font-display cursor-pointer" 
             style={{ fontFamily: "'Instrument Serif', serif" }}
             onClick={() => onNavigate('/')}>
          AKR®
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavigate('/')} className="text-sm text-muted-foreground font-medium transition-colors cursor-pointer">Home</button>
          <button onClick={() => onNavigate('/projects')} className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors cursor-pointer">Projects</button>
          <button onClick={() => onNavigate('/docs')} className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors cursor-pointer">Docs</button>
          <button onClick={() => onNavigate('/portfolio')} className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors cursor-pointer">Portfolio</button>
          <button onClick={() => onNavigate('/reach-me')} className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors cursor-pointer">Reach me</button>
        </div>
        <button 
          className="liquid-glass-dark rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] cursor-pointer"
          onClick={() => onNavigate('/projects')}>
          Explore →
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-[calc(100vh-100px)]">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal font-display text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built in <em className="not-italic text-muted-foreground">silence.</em> Designed to <em className="not-italic text-muted-foreground">resonate.</em>
        </h1>
        <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 font-medium">
          A personal archive of ideas, systems, and experiments.<br />
          Every project reflects thought, intention, and identity.<br />
          By Ajay Kumar Reddy KrishnareddyGari
        </p>
        <button className="animate-fade-rise-delay-2 liquid-glass-dark rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] cursor-pointer"
                onClick={() => onNavigate('/projects')}>
          Explore →
        </button>
      </main>
    </div>
  );
}
