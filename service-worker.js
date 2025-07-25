self.addEventListener('install', event => {
    console.log('[ServiceWorker] Instalado');
    event.waitUntil(
      caches.open('placar-cache-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/manifest.json',
          '/icon-192.png',
          '/icon-512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });