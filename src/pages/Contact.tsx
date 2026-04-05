import Layout from '../components/Layout';
import { useState, FormEvent } from 'react';

/**
 * CONTACT PAGE
 * Centered, minimal form with high-end glassmorphic inputs and focus glows.
 */
export default function Contact({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout currentPath="/reach-me" onNavigate={onNavigate}>
      <div className="max-w-xl mx-auto py-20 animate-fade-rise">
        <header className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Reach <em className="not-italic text-muted-foreground">me.</em>
          </h2>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed font-normal max-w-sm mx-auto">
            Have an idea or project? Let's discuss it in silence.
          </p>
        </header>

        {submitted ? (
          <div className="text-center p-16 bg-foreground/[0.03] rounded-[3rem] border border-foreground/10 animate-fade-rise">
            <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-foreground/20">
              <span className="text-foreground text-2xl font-black">✓</span>
            </div>
            <h3 className="text-3xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Signal Received</h3>
            <p className="text-muted-foreground font-medium">I will reach out shortly once the noise settles.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-12 text-[10px] font-black text-foreground border-b border-foreground/30 uppercase tracking-[0.3em] hover:border-foreground"
            >
              Back to form
            </button>
          </div>
        ) : (
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-6">Your Identity</label>
              <input 
                type="text" 
                required
                className="w-full px-10 py-6 bg-foreground/[0.03] border border-foreground/[0.08] focus:border-foreground/30 rounded-[2.5rem] text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/20 font-medium text-base hover:bg-foreground/[0.05] focus:shadow-[0_0_50px_rgba(255,0,0,0.05)]" 
                placeholder="Full Name" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-6">Digital Address</label>
              <input 
                type="email" 
                required
                className="w-full px-10 py-6 bg-foreground/[0.03] border border-foreground/[0.08] focus:border-foreground/30 rounded-[2.5rem] text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/20 font-medium text-base hover:bg-foreground/[0.05] focus:shadow-[0_0_50px_rgba(255,0,0,0.05)]" 
                placeholder="example@archive.com" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-6">Message System</label>
              <textarea 
                rows={6} 
                required
                className="w-full px-10 py-8 bg-foreground/[0.03] border border-foreground/[0.08] focus:border-foreground/30 rounded-[2.5rem] text-foreground focus:outline-none transition-all placeholder:text-muted-foreground/20 font-medium resize-none text-base hover:bg-foreground/[0.05] focus:shadow-[0_0_50px_rgba(255,0,0,0.05)]" 
                placeholder="Share your thoughts..." 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full liquid-glass-dark px-14 py-8 rounded-[2.5rem] text-white font-black text-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer shadow-[0_0_60px_rgba(0,0,0,0.2)] tracking-[0.1em]"
            >
              Signal Transmission →
            </button>
          </form>
        )}

        <footer className="mt-24 flex flex-col items-center gap-12 opacity-60">
          <div className="h-[1px] w-20 bg-foreground/10" />
          <div className="flex gap-16">
            <a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] hover:text-foreground transition-all hover:tracking-[0.5em]">GitHub</a>
            <a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] hover:text-foreground transition-all hover:tracking-[0.5em]">LinkedIn</a>
            <a href="mailto:ajaykumarreddykrishnareddygari@gmail.com" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] hover:text-foreground transition-all hover:tracking-[0.5em]">Email</a>
            <a href="/Resume/KRISHNAREDDY GARI AJAY KUMAR REDDY_Doc.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] hover:text-foreground transition-all hover:tracking-[0.5em]">Resume</a>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
