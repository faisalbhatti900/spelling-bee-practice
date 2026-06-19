'use client';

// Pure-CSS confetti — coloured divs falling from the top using the
// `confetti-drop` keyframes already defined in globals.css.

const COLORS = ['#CE82FF', '#58CC02', '#FF9600', '#1CB0F6', '#FF4B4B', '#FFC800', '#FF86D0', '#00CD9C'];

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 60 }: ConfettiProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 37) % 100; // deterministic spread — no Math.random (SSR-safe)
        const delay = (i % 10) * 0.15;
        const duration = 2 + (i % 5) * 0.3;
        const size = 8 + (i % 4) * 3;
        const color = COLORS[i % COLORS.length];
        const rounded = i % 2 === 0;
        return (
          <div
            key={i}
            className="absolute top-0 animate-confetti-drop"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: rounded ? '50%' : '2px',
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
