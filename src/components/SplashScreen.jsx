// SplashScreen.jsx - À créer dans src/components/
import { useEffect, useRef } from "react";

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.transform = "scale(1.05)";
        setTimeout(onComplete, 500);
      }
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1528] transition-all duration-700 ease-out"
    >
      <div className="relative flex flex-col items-center justify-center gap-8">
        {/* Ligne ECG principale */}
        <div className="relative w-72 h-32 md:w-96 md:h-40">
          <svg
            viewBox="0 0 400 160"
            className="w-full h-full overflow-visible"
            aria-label="Rythme cardiaque - Don de sang"
            role="img"
          >
            {/* Ligne de base */}
            <path
              d="M 0 80 L 100 80"
              className="heartbeat-line"
              stroke="#4A90D9"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Premier pic */}
            <path
              d="M 100 80 L 130 20 L 160 140 L 190 80"
              className="heartbeat-line"
              stroke="#F0696A"
              strokeWidth="4"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            
            {/* Deuxième pic plus petit */}
            <path
              d="M 190 80 L 220 40 L 250 120 L 280 80"
              className="heartbeat-line"
              stroke="#4A90D9"
              strokeWidth="4"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            
            {/* Ligne de continuation */}
            <path
              d="M 280 80 L 400 80"
              className="heartbeat-line"
              stroke="#4A90D9"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Point lumineux qui suit le tracé */}
            <circle
              r="6"
              fill="#F0696A"
              className="heartbeat-dot"
            />
          </svg>

          {/* Effet de glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-radial from-rose-500/10 via-transparent to-transparent opacity-0 animate-glow-pulse" />
        </div>

        {/* Texte avec effet de battement */}
        <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-white/60 text-sm font-light tracking-[0.3em] uppercase">
              Donner du sang
            </span>
          </div>
          <span className="text-white/40 text-xs font-light tracking-[0.5em] uppercase">
            C'est faire renaître
          </span>
        </div>

        {/* Goutte de sang qui tombe */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-drop-float">
          <svg width="16" height="20" viewBox="0 0 16 20">
            <path
              d="M8 1 C8 1, 2 8, 2 13 A6 6 0 0 0 14 13 C14 8, 8 1, 8 1 Z"
              fill="#C62828"
              className="animate-pulse-glow"
            />
          </svg>
        </div>

        {/* Logo LifeSave en petit */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
          <span className="text-white/30 text-xs font-bold tracking-widest">
            LIFESAVE
          </span>
        </div>
      </div>
    </div>
  );
}