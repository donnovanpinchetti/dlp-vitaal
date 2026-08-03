const CACHE = "dlp-vitaal-v0.8.3";
self.addEventListener("install", event => self.skipWaiting());
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request, {cache:"no-store"}).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(fetch(event.request, {cache:"no-store"}));
});
