'use client';

import { useEffect, useRef, useState } from 'react';

// Counts up from when the level starts (component mount). Call stop() once on
// completion to freeze the clock and read the final elapsed milliseconds.
export function useLevelTimer() {
  const startRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    startRef.current = Date.now();
    const id = setInterval(() => {
      if (!stoppedRef.current && startRef.current != null) {
        setElapsedMs(Date.now() - startRef.current);
      }
    }, 250);
    return () => clearInterval(id);
  }, []);

  const stop = (): number => {
    stoppedRef.current = true;
    const final = startRef.current != null ? Date.now() - startRef.current : 0;
    setElapsedMs(final);
    return final;
  };

  return { elapsedMs, stop };
}
