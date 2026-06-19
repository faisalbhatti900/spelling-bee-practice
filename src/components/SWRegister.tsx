'use client';

// Registers the service worker (offline support). No UI.

import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    // Ask the browser to keep our saved name + progress durable (storage can be
    // evicted, especially on iOS Safari between visits) — best-effort.
    navigator.storage?.persist?.().catch(() => {});

    if (!('serviceWorker' in navigator)) return;

    // In development, NEVER cache — a stale service worker would serve old code.
    // Actively remove any previously-registered worker and its caches.
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
      if (typeof caches !== 'undefined') {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
      return;
    }

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
