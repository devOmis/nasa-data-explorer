import { useState } from "react";

export default function NotFound() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }).map(() => ({
      cx: Math.random() * 100 + "%",
      cy: Math.random() * 100 + "%",
      r: Math.random() * 1.2 + 0.2,
    }))
  );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-blue-900 px-4 py-12 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.18 }}>
          <defs>
            <radialGradient id="star" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="url(#star)"
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="text-[20vw] leading-none font-black text-white/10 tracking-tighter select-none mb-2">
          404
        </div>
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="text-2xl md:text-3xl font-bold text-white/90 drop-shadow-lg">
            Houston, we have a problem.
          </span>
          <span className="text-base md:text-lg text-blue-200/80 max-w-xl">
            The page you’re looking for is lost in space.<br />
            Maybe it’s orbiting another planet, or just never existed.
          </span>
        </div>
        {/* Astronaut illustration */}
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto animate-float">
            <circle cx="60" cy="60" r="56" fill="#0a192f" stroke="#1976d2" strokeWidth="4" />
            <ellipse cx="60" cy="60" rx="32" ry="32" fill="#fff" />
            <ellipse cx="60" cy="60" rx="22" ry="22" fill="#e3e9f6" />
            <ellipse cx="60" cy="60" rx="14" ry="14" fill="#b3c6e0" />
            <ellipse cx="60" cy="60" rx="7" ry="7" fill="#1976d2" />
            {/* Visor shine */}
            <ellipse cx="66" cy="54" rx="4" ry="2" fill="#fff" fillOpacity="0.7" />
            {/* Body */}
            <rect x="52" y="92" width="16" height="18" rx="8" fill="#fff" />
            {/* Arms */}
            <rect x="32" y="80" width="12" height="6" rx="3" fill="#e3e9f6" transform="rotate(-20 32 80)" />
            <rect x="76" y="80" width="12" height="6" rx="3" fill="#e3e9f6" transform="rotate(20 76 80)" />
            {/* Legs */}
            <rect x="54" y="110" width="4" height="10" rx="2" fill="#b3c6e0" />
            <rect x="62" y="110" width="4" height="10" rx="2" fill="#b3c6e0" />
          </svg>
        </div>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition text-base md:text-lg"
        >
          Return to Mission Control
        </a>
      </div>

      {/* Floating astronaut animation */}
      <style>{`
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  );
}
