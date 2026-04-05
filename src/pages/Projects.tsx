import Layout from '../components/Layout';

/**
 * PROJECTS PAGE
 * Features a minimalist grid of cards with glassmorphic styling and hover glows.
 */
const PROJECTS = [
  {
    title: "NeuroSynthesis AI",
    description: "A generative neural network for creating high-fidelity textures from natural language descriptions.",
    tags: ["React", "Python", "TensorFlow"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Quantum Ledger",
    description: "Real-time, decentralized distributed ledger with post-quantum encryption protocols.",
    tags: ["Rust", "Solidity", "TypeScript"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Velorah Cloud",
    description: "Serverless edge compute platform optimized for low-latency futuristic web applications.",
    tags: ["Go", "Next.js", "Docker"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Flux Capacitor UI",
    description: "An experimental component library focused on high-motion interaction and fluid design.",
    tags: ["Motion", "React", "Tailwind"],
    links: { live: "#", github: "#" }
  }
];

export default function Projects({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <Layout currentPath="/projects" onNavigate={onNavigate}>
      <header className="mb-16 animate-fade-rise">
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Selected <em className="not-italic text-muted-foreground">Works.</em>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl font-medium">
          A curate archive of design-led engineering and experimental digital solutions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 animate-fade-rise-delay">
        {PROJECTS.map((project, idx) => (
          <div 
            key={idx} 
            className="group liquid-glass-dark rounded-2xl p-10 transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,0,0,0.05)] border border-transparent hover:border-foreground/20"
          >
            <h3 className="text-3xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-4 py-1.5 bg-foreground/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-foreground/70 font-bold border border-foreground/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-8">
              <a 
                href={project.links.live} 
                className="text-[10px] font-black text-foreground border-b border-foreground/30 hover:border-foreground transition-all duration-300 uppercase tracking-[0.25em]"
              >
                Launch App
              </a>
              <a 
                href={project.links.github} 
                className="text-[10px] font-black text-muted-foreground border-b border-muted-foreground/30 hover:border-muted-foreground transition-all duration-300 uppercase tracking-[0.25em]"
              >
                View Source
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
