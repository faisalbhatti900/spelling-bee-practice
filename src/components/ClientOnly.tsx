'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐝</div>
          <div className="w-12 h-12 border-4 border-[#CE82FF] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
