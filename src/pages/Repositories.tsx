import Layout from '../components/Layout';
import { useState } from 'react';

/**
 * REPOSITORIES PAGE
 * Clean, developer-focused vertical list with search functionality.
 */
const REPOS = [
  { name: "ark-core", description: "Minimalistic core engine for high-fidelity 3D web experiences and real-time simulations.", lang: "TypeScript", stars: "1.2k", forks: 45 },
  { name: "neural-pipe", description: "Streamlined data pipeline architecture for real-time neural network telemetry and processing.", lang: "Python", stars: 842, forks: 12 },
  { name: "velorah-design", description: "Official design system tokens and components for the futuristic Velorah hero ecosystem.", lang: "React", stars: "2.4k", forks: 89 },
  { name: "ghost-shell", description: "Low-level system utility for secure, sandboxed container orchestration and management.", lang: "C++", stars: 312, forks: 8 },
  { name: "qubit-ledger", description: "Post-quantum distributed ledger implementation using sharding and custom consensus.", lang: "Rust", stars: 156, forks: 4 }
];

export default function Repositories({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [search, setSearch] = useState("");
  const filteredRepos = REPOS.filter(repo => 
    repo.name.toLowerCase().includes(search.toLowerCase()) || 
    repo.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout currentPath="/portfolio" onNavigate={onNavigate}>
      <header className="mb-12 animate-fade-rise">
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Digital <em className="not-italic text-muted-foreground">Archive.</em>
        </h2>
        
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center animate-fade-rise-delay">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Filter repositories..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-8 py-4 bg-foreground/5 border border-foreground/10 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 focus:shadow-[0_0_20px_rgba(255,0,0,0.05)] transition-all font-medium text-sm"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/50">
              <span className="text-[10px] font-bold tracking-widest uppercase">Search</span>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-4 animate-fade-rise-delay-2">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-foreground/[0.03] border border-foreground/[0.05] hover:border-foreground/20 rounded-2xl transition-all duration-300 hover:bg-foreground/[0.06] cursor-pointer"
            >
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="text-2xl font-display text-foreground mb-2 group-hover:text-foreground transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {repo.name}
                </span>
                <p className="text-muted-foreground text-sm font-medium max-w-xl leading-relaxed">
                  {repo.description}
                </p>
              </div>
              
              <div className="flex items-center gap-10 w-full md:w-auto justify-between border-t border-foreground/5 md:border-none pt-4 md:pt-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${repo.lang === 'TypeScript' ? 'bg-blue-400' : repo.lang === 'Rust' ? 'bg-orange-400' : 'bg-red-400'}`} />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none translate-y-[1px]">
                    {repo.lang}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">★</span>
                    <span className="text-xs font-black text-foreground/80 tracking-tight">{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-muted-foreground">↯</span>
                    <span className="text-xs font-black text-muted-foreground/60 tracking-tight">{repo.forks}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-foreground/[0.02] border border-dashed border-foreground/10 rounded-2xl">
            <p className="text-muted-foreground font-medium italic">No matches found in the archive.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
