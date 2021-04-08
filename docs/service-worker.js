importScripts("precache-manifest.102cf703852984c07f21d0ffe6affc76.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// set the prefix and suffix of our sw's name
workbox.core.setCacheNameDetails({
    prefix: 'browse-exp',
    suffix: 'v1.0.0',
  });
  // have our sw update and control a web page as soon as possible.
  workbox.skipWaiting();
  workbox.clientsClaim();
  
  // vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
  
  // cache our data, and use networkFirst strategy.
  workbox.routing.registerRoute(
    new RegExp('.*experiments\?.*'), 
    workbox.strategies.networkFirst()
  );
  workbox.routing.registerRoute(
    new RegExp('.*experiments/\\d'),
    workbox.strategies.networkFirst()  
  )
  workbox.routing.registerRoute(
    new RegExp('.*experiment_types.*'),
    workbox.strategies.networkFirst()
  )
  
