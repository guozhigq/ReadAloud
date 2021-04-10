<<<<<<< HEAD
importScripts("precache-manifest.fd84a32224a18a127fc36743e7bc167e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
=======
importScripts("precache-manifest.153b5f8c8010fb6653961251b0b60155.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
>>>>>>> 4b0130edcb07d53b27736480eb73e60191405c98

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');

    // event.waitUntil((async () => {
    //   const cache = await caches.open(CACHE_NAME);
    //   // Setting {cache: 'reload'} in the new request will ensure that the response
    //   // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    //   await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    // })());

    // self.skipWaiting();
});
  
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    // console.log('[ServiceWorker] Activate');
    // event.waitUntil((async () => {
    //   // Enable navigation preload if it's supported.
    //   // See https://developers.google.com/web/updates/2017/02/navigation-preload
    //   if ('navigationPreload' in self.registration) {
    //     await self.registration.navigationPreload.enable();
    //   }
    // })());

    // // Tell the active service worker to take control of the page immediately.
    // self.clients.claim();
});
  
self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker] Fetch');

    // console.log('[Service Worker] Fetch', event.request.url);
    // if (event.request.mode === 'navigate') {
    //   event.respondWith((async () => {
    //     try {
    //       const preloadResponse = await event.preloadResponse;
    //       if (preloadResponse) {
    //         return preloadResponse;
    //       }

    //       const networkResponse = await fetch(event.request);
    //       return networkResponse;
    //     } catch (error) {
    //       console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

    //       const cache = await caches.open(CACHE_NAME);
    //       const cachedResponse = await cache.match(OFFLINE_URL);
    //       return cachedResponse;
    //     }
    //   })());
    // }
});
