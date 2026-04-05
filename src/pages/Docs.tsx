import Layout from '../components/Layout';
import { useState } from 'react';

/**
 * DOCUMENTATION PAGE
 * Responsive dual-column layout with a sticky sidebar and clean content panel.
 */
const DOCS_SECTIONS = [
  { 
    id: "overview", 
    title: "Project Overview", 
    content: "Velorah is a high-performance framework designed for building immersive, cinematic web applications. It emphasizes minimal aesthetics, fluid motion, and developer efficiency through a modular component-led approach."
  },
  { 
    id: "architecture", 
    title: "System Architecture", 
    content: "The system follows a reactive architecture with a focus on low-latency state mutations and hardware-accelerated rendering. Built on top of modern primitives like React 19 and Vite 6."
  },
  { 
    id: "styling", 
    title: "Design System", 
    content: "Our design system utilizes a restricted palette of Red and Black, emphasizing high-contrast typography and subtle glassmorphic depth. We avoid clutter by using semantic spacing and layered bloom effects."
  },
  { 
    id: "api", 
    title: "API Reference", 
    content: "Access the core toolkit via the `@velorah/core` package. All components support native server-side rendering and hydration-free partials for maximum performance."
  }
];

export default function Docs({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [activeSection, setActiveSection] = useState(DOCS_SECTIONS[0]);

  return (
    <Layout currentPath="/docs" onNavigate={onNavigate}>
      <div className="flex flex-col md:flex-row gap-16 animate-fade-rise">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-8">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.25em] mb-8 opacity-50">
              Documentation
            </h3>
            <nav className="space-y-1">
              {DOCS_SECTIONS.map(section => (
                <button 
                  key={section.id} 
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-5 py-3 rounded-xl text-sm transition-all duration-300 cursor-pointer ${
                    activeSection.id === section.id 
                    ? 'bg-foreground/10 text-foreground font-bold shadow-[0_0_20px_rgba(255,0,0,0.05)]' 
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <article className="flex-1 max-w-3xl pb-20">
          <header className="mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {activeSection.title}
            </h2>
          </header>
          
          <div className="space-y-12">
            <div className="text-muted-foreground text-lg leading-relaxed font-normal">
              {activeSection.content}
            </div>

            <div className="pt-8 border-t border-foreground/5">
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">
                Implementation Example
              </h4>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                <pre className="relative bg-foreground/[0.03] p-8 rounded-2xl border border-foreground/10 overflow-x-auto">
                  <code className="text-sm font-mono text-foreground/90 block leading-loose">
                    {`import { VelorahInstance } from '@velorah/core';\n\n// Create a new cinematic instance\nconst archive = new VelorahInstance({\n  theme: 'sakura-red',\n  motion: 'premium-calm',\n  performance: 'optimized'\n});\n\nawait archive.deploy();`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-red-500/[0.03] border border-red-500/10 p-8 rounded-2xl">
              <p className="text-sm text-foreground/80 font-medium italic">
                Note: Documentation is periodically updated to reflect the latest experiments in the archive.
              </p>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
