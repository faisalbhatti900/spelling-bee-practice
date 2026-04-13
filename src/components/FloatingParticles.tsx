'use client';

import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const emojis = ['🐝', '⭐', '🌸', '✨', '🍯', '🌟', '💫', '🦋', '🌈', '🎯'];
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.fontSize = `${16 + Math.random() * 20}px`;
      el.style.opacity = '0.2';
      el.style.pointerEvents = 'none';
      el.style.animation = `float-around ${15 + Math.random() * 20}s ${Math.random() * 10}s ease-in-out infinite`;
      el.textContent = emojis[i % emojis.length];
      container.appendChild(el);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
}
