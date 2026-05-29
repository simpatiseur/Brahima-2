const CACHE_NAME = "dabou-metiers-v1";

const urlsToCache = [
  "/Brahima-2/",
  "/Brahima-2/index.html",
  "/Brahima-2/manifest.json",
  "/Brahima-2/icon-192.png",
  "/Brahima-2/icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH (mode hors ligne)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match("/Brahima-2/index.html");
      });
    })
  );
});
