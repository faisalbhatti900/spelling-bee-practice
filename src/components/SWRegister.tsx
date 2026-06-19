'use client';

// Registers the service worker (offline support). No UI.

import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    const register = () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); };
    // This component mounts after window 'load' has usually already fired
    // (ssr:false), so register immediately when the document is ready.
    if (document.readyState === 'complete') {
      register();
      return;
    }
    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
