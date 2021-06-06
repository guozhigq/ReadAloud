importScripts("precache-manifest.bdc8435a64d56952713e5cd84f1c1815.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");



self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
});
  
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
});
  
self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker] Fetch');
});
