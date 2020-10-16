/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.routing.registerNavigationRoute("/index.html");
workbox.routing.registerRoute(
  /^https?.*/,
  workbox.strategies.networkFirst(),
  "GET"
);
// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
