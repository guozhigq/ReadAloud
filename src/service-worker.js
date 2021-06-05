import { workbox } from 'workbox-sw';
console.log(workbox)

self.addEventListener('install', function (e) {
  console.log(e)
})

workbox.core.setCacheNameDetails({
    prefix: 'browse-exp',
    suffix: 'v1.0.0',
  });
  
  workbox.skipWaiting();
  workbox.clientsClaim();
  
  
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
  

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
  