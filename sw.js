const CACHE_NAME = "interview-battle-v1";
const APP_SHELL_FILES = [
  "/",
  "/manifest.webmanifest",
  "/sw.js",
];
const DATA_FILES = [
  "/data/actions.v1.json",
  "/data/scenarios.first-playable.v1.json",
  "/data/scenarios.v1.json",
  "/data/states.v1.json",
];
const PRECACHE_URLS = [...APP_SHELL_FILES, ...DATA_FILES];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  const isAppShellRequest =
    request.mode === "navigate" || APP_SHELL_FILES.includes(url.pathname);
  const isDataRequest = url.pathname.startsWith("/data/");

  if (!isAppShellRequest && !isDataRequest) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
