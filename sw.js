// Service Worker for MemoirFlow
const CACHE_NAME = 'memoir-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/css/style.css',
  // 媒體文件會動態添加到快取
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果快取中有，就回傳快取
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
