// ===== Word Wizards service worker — offline support =====
// - App pages: network-first (fresh when online, cached copy when offline).
// - Static assets (_next, icons, etc.): cache-first (they are content-hashed).
// - Audio clips: cache-first, and ALL clips are pre-cached in the background
//   on activation so every word works fully offline after the first load.

// Bump SHELL_VERSION on each deploy you want users to pick up immediately.
const SHELL = 'wb-shell-v2';
const AUDIO = 'wb-audio-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Drop old shell caches from previous versions.
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k.startsWith('wb-shell-') && k !== SHELL).map((k) => caches.delete(k)),
    );
    await self.clients.claim();

    // Background pre-cache of every audio clip (best-effort, chunked).
    try {
      const res = await fetch('/audio-manifest.json', { cache: 'no-cache' });
      if (res.ok) {
        const list = await res.json();
        const cache = await caches.open(AUDIO);
        for (let i = 0; i < list.length; i += 60) {
          await cache.addAll(list.slice(i, i + 60)).catch(() => {});
        }
      }
    } catch {
      /* offline or manifest missing — clips still cache on demand */
    }
  })());
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    const hit = await cache.match(request);
    if (hit) return hit;
    // Fall back to the app's start page if we have it cached.
    const home = (await cache.match('/')) || (await cache.match('/index.html'));
    if (home) return home;
    return new Response('Offline', { status: 504, statusText: 'Offline' });
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith('/audio/')) {
    event.respondWith(cacheFirst(request, AUDIO));
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, SHELL));
    return;
  }
  event.respondWith(cacheFirst(request, SHELL));
});
