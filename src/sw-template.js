if (typeof importScripts === "function") {
  // eslint-disable-next-line no-undef
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    workbox.core.skipWaiting();

    /* injection point for manifest files.  */
    // eslint-disable-next-line no-restricted-globals
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
    // workbox.routing.registerRoute(
    //   new workbox.routing.NavigationRoute(
    //     new workbox.strategies.NetworkFirst({
    //       cacheName: "PRODUCTION"
    //     })
    //   )
    // );
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        workbox.precaching.createHandlerBoundToURL("/index.html")
      )
    );

    workbox.routing.registerRoute(
      new RegExp(/^https?:\/\/www.themealdb.com\/api\/.*/),
      new workbox.strategies.StaleWhileRevalidate(),
      "GET"
    );
    workbox.routing.registerRoute(
      new RegExp(/^https?:\/\/www.themealdb.com\/images\/.*/),
      new workbox.strategies.StaleWhileRevalidate(),
      "GET"
    );

    workbox.routing.registerRoute(
      new RegExp(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/),
      new workbox.strategies.CacheFirst({
        cacheName: "google-fonts-cache",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
          })
        ]
      }),
      "GET"
    );

    workbox.routing.registerRoute(
      new RegExp("/^https?.*/"),
      new workbox.strategies.NetworkFirst(),
      "GET"
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
