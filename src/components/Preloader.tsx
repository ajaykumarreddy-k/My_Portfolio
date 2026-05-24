import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
  active: boolean;
  setActive: (active: boolean) => void;
}

const WORDS = [
  { text: 'Welcome', lang: 'EN' },
  { text: 'Bonjour', lang: 'FR' },
  { text: 'こんにちは', lang: 'JP' },
  { text: 'Hola', lang: 'ES' },
  { text: 'Ciao', lang: 'IT' },
  { text: '안녕하세요', lang: 'KO' },
  { text: 'Привет', lang: 'RU' },
  { text: 'مرحبا', lang: 'AR' },
  { text: 'नमस्ते', lang: 'HI' },
];

export default function Preloader({ onComplete, active, setActive }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [animating, setAnimating] = useState(false);
  const [slidUp, setSlidUp] = useState(false);

  // References for animation frames, intervals, and timeouts
  const animFrameIdRef = useRef<number | null>(null);
  const counterIntervalRef = useRef<number | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);

  const registerTimeout = (cb: () => void, delay: number) => {
    const id = window.setTimeout(cb, delay);
    timeoutIdsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutIdsRef.current.forEach(id => clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  // Helper Easing Functions
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const animateValue = (
    from: number,
    to: number,
    duration: number,
    onUpdate: (val: number, progress: number) => void,
    onDone?: () => void
  ) => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      onUpdate(from + (to - from) * ease(t), t);
      if (t < 1) {
        animFrameIdRef.current = requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }
    };
    animFrameIdRef.current = requestAnimationFrame(step);
  };

  // Ultra-fast word clips
  const showWord = (wordEl: HTMLDivElement): Promise<void> => {
    return new Promise(resolve => {
      wordEl.style.opacity = '1';
      wordEl.style.clipPath = 'inset(0 100% 0 0)';
      
      const dur = 140;      // Fast snappy transition
      const holdDur = 100;  // Dynamic quick hold

      animateValue(0, 1, dur, (val, t) => {
        const pct = Math.round((1 - easeOut(t)) * 100);
        wordEl.style.clipPath = `inset(0 ${pct}% 0 0)`;
      }, () => {
        registerTimeout(() => {
          animateValue(0, 1, dur, (val, t) => {
            const pct = Math.round(easeOut(t) * 100);
            wordEl.style.clipPath = `inset(0 0 0 ${pct}%)`;
          }, () => {
            wordEl.style.opacity = '0';
            resolve();
          });
        }, holdDur);
      });
    });
  };

  // Liquid black curve mask wipe-up
  const doCurveWipe = (): Promise<void> => {
    return new Promise(resolve => {
      const svg = svgRef.current;
      if (!svg) {
        resolve();
        return;
      }
      svg.innerHTML = '';
      
      const W = window.innerWidth;
      const H = window.innerHeight;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      // Make overlay container transparent, let SVG black mask do the work
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = 'transparent';
      }

      const totalDur = 600; // Snappy exit wipe
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min((now - start) / totalDur, 1);
        const p = easeOut(t);
        const fillH = H * p;
        
        // Fluid ripple effect shrinking up
        const bulgeAmplitude = Math.min(H * 0.12, 100);
        const bulge = bulgeAmplitude * Math.sin(Math.PI * p) * (p < 0.5 ? 1 : -1);
        const y = H - fillH;

        // Path covers the top portion of the screen in black and shrinks upward to y=0
        const pathD = `M0,0 L${W},0 L${W},${y + bulge} Q${W / 2},${y - bulge} 0,${y + bulge} Z`;
        svg.innerHTML = `<path d="${pathD}" fill="#0a0a0a" opacity="1"/>`;

        if (t < 1) {
          animFrameIdRef.current = requestAnimationFrame(step);
        } else {
          svg.innerHTML = '';
          resolve();
        }
      };

      animFrameIdRef.current = requestAnimationFrame(step);
    });
  };

  const updateCounter = (val: number) => {
    if (counterRef.current) {
      counterRef.current.textContent = String(Math.round(val)).padStart(3, '0');
    }
  };

  const startPreloader = async () => {
    if (animating) return;
    setAnimating(true);
    setSlidUp(false);

    // Reset initial background color and line fills
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = '#0a0a0a';
    }
    if (progressFillRef.current) progressFillRef.current.style.width = '0%';
    if (counterRef.current) counterRef.current.style.opacity = '0.35';

    // Build word elements
    const wc = wordContainerRef.current;
    if (!wc) return;
    wc.innerHTML = '';
    
    const wordEls: HTMLDivElement[] = [];
    WORDS.forEach(w => {
      const el = document.createElement('div');
      el.className = 'preloader-word';
      el.textContent = w.text;
      wc.appendChild(el);
      wordEls.push(el);
    });

    const totalTime = WORDS.length * 280; // Scaled to the faster showWord duration
    const startTime = performance.now();

    // Fast counter ticks
    if (counterIntervalRef.current) clearInterval(counterIntervalRef.current);
    counterIntervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / totalTime) * 85, 85);
      updateCounter(pct);
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${pct}%`;
      }
    }, 16);

    // Render greetings fast
    for (let i = 0; i < wordEls.length; i++) {
      if (wordEls[i]) {
        await showWord(wordEls[i]);
      }
    }

    if (counterIntervalRef.current) clearInterval(counterIntervalRef.current);

    // Ticks up to 100%
    animateValue(85, 100, 250, (v) => {
      updateCounter(v);
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${v}%`;
      }
    }, () => {
      registerTimeout(async () => {
        // Curve liquid mask wipe
        await doCurveWipe();
        
        if (counterRef.current) counterRef.current.style.opacity = '0';
        if (progressFillRef.current) progressFillRef.current.style.width = '100%';

        // Directly transition into the main site!
        setSlidUp(true);
        setAnimating(false);
        document.body.style.overflow = '';
        
        if (onComplete) onComplete();
        setActive(false);
      }, 100);
    });
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
      startPreloader();
    } else {
      setSlidUp(true);
      document.body.style.overflow = '';
    }

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (counterIntervalRef.current) clearInterval(counterIntervalRef.current);
      clearAllTimeouts();
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div
      id="preloader-overlay"
      ref={containerRef}
      className={`${slidUp ? 'slide-up' : 'active'}`}
    >
      <div id="preloader-word-container" ref={wordContainerRef} />
      
      <div id="preloader-curve-overlay">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
      </div>

      <div id="preloader-counter" ref={counterRef}>000</div>
      
      <div id="preloader-progress-line">
        <div id="preloader-progress-fill" ref={progressFillRef} />
      </div>
    </div>
  );
}
