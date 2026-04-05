import { ReactNode } from 'react';

/**
 * Universal Layout for all subpages.
 * Maintains consistency with the Home page background and navigation.
 */
const BACKGROUND_ASSET = "/桜Sakura Cherry Blossom Pixel.gif";

interface LayoutProps {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Layout({ children, currentPath, onNavigate }: LayoutProps) {
  const isVideo = BACKGROUND_ASSET.toLowerCase().endsWith('.mp4');

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-sans">
      {/* Shared Background and Overlay */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            src={BACKGROUND_ASSET}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={BACKGROUND_ASSET}
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      </div>

      {/* Synchronized Navigation */}
      <nav className="relative z-10 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div 
          className="text-3xl tracking-tight text-muted-foreground font-display cursor-pointer" 
          style={{ fontFamily: "'Instrument Serif', serif" }}
          onClick={() => onNavigate('/')}
        >
          AKR®
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', path: '/' },
            { label: 'Projects', path: '/projects' },
            { label: 'Docs', path: '/docs' },
            { label: 'Portfolio', path: '/portfolio' },
            { label: 'Reach me', path: '/reach-me' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`text-sm transition-colors cursor-pointer ${
                currentPath === item.path 
                ? 'text-muted-foreground font-medium' 
                : 'text-muted-foreground/70 hover:text-muted-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button 
          className="liquid-glass-dark rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] cursor-pointer"
          onClick={() => onNavigate('/projects')}
        >
          Explore →
        </button>
      </nav>

      {/* Content Area */}
      <main className="relative z-10 w-full px-8 py-12 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
        {children}
      </main>
    </div>
  );
}
