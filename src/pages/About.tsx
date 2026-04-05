import Layout from '../components/Layout';

/**
 * ABOUT ME PAGE
 * Minimal split layout with a focus on typography and high-end skill badges.
 */
const SKILLS = [
  "React / Next.js",
  "TypeScript / Node",
  "Rust / WebAssembly",
  "Python / AI",
  "Docker / Kubernetes",
  "Framer Motion",
  "Three.js / WebGL",
  "PostgreSQL / Redis"
];

export default function About({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <Layout currentPath="/portfolio" onNavigate={onNavigate}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 animate-fade-rise">
        {/* Story Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-display text-foreground leading-[1.05]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Design. <em className="not-italic text-muted-foreground">Code.</em> <br />
            Quiet <em className="not-italic text-muted-foreground">Precision.</em>
          </h2>
          <div className="mt-12 space-y-8 text-muted-foreground text-lg leading-relaxed font-normal max-w-xl">
            <p>
              I am a digital architect specialized in high-end frontend engineering and futuristic user interface design. My approach is rooted in the belief that depth and clarity are achieved through simplicity and intentionality.
            </p>
            <p>
              By bridging the gap between artistic vision and technical execution, I build systems that don't just function—they resonate. This portfolio serves as an archive of my journey through silence and experiments.
            </p>
          </div>
          
          <div className="mt-16 flex items-center gap-6">
            <div className="h-[2px] w-12 bg-foreground/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">AKR® / 2026 Archive</span>
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="flex flex-col justify-center space-y-16">
          <section>
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.25em] mb-10 border-b border-foreground/5 pb-4">
              Technical Stack
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.map(skill => (
                <div 
                  key={skill} 
                  className="group relative px-6 py-5 bg-foreground/[0.03] border border-foreground/[0.05] rounded-2xl transition-all duration-300 hover:bg-foreground/[0.06] hover:border-foreground/20"
                >
                  <span className="text-foreground font-black text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-foreground/[0.03] border border-foreground/10 p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-4xl text-foreground font-display opacity-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Mission
            </div>
            <h4 className="text-xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Built in <em className="not-italic text-muted-foreground">Silence</em>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Every project reflects a deep intention to solve complex problems with elegant, quiet solutions. We build for the future, one experiment at a time.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
