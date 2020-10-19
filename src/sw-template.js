if (typeof importScripts === "function") {
  // eslint-disable-next-line no-undef
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    const { skipWaiting, clientsClaim } = workbox.core;
    const { precacheAndRoute, createHandlerBoundToURL } = workbox.precaching;
    const { registerRoute, NavigationRoute } = workbox.routing;
    const { ExpirationPlugin } = workbox.expiration;
    const { googleAnalytics } = workbox;
    const { CacheableResponsePlugin } = workbox.cacheableResponse;
    const {
      StaleWhileRevalidate,
      CacheFirst,
      NetworkFirst
    } = workbox.strategies;

    console.log("Workbox is loaded", workbox);
    skipWaiting();
    clientsClaim();

    /* injection point for manifest files.  */
    // eslint-disable-next-line no-restricted-globals
    precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules */
    // egisterRoute(
    //   new NavigationRoute(
    //     new NetworkFirst({
    //       cacheName: "PRODUCTION"
    //     })
    //   )
    // );
    registerRoute(new NavigationRoute(createHandlerBoundToURL("/index.html")));
    googleAnalytics.initialize();
    registerRoute(
      new RegExp(/^https?:\/\/www.themealdb.com\/api\/.*/),
      new StaleWhileRevalidate(),
      "GET"
    );

    registerRoute(
      ({ url }) =>
        url.origin === "https://www.themealdb.com" &&
        url.pathname.startsWith("/images/"),
      new CacheFirst({
        cacheName: "image-cache",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200]
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 7 * 24 * 60 * 60
          })
        ]
      }),
      "GET"
    );

    registerRoute(
      new RegExp(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/),
      new StaleWhileRevalidate(),
      // new CacheFirst({
      //   cacheName: "google-fonts-cache",
      //   plugins: [
      //     new CacheableResponsePlugin({
      //       statuses: [0, 200]
      //     }),
      //     new ExpirationPlugin({
      //       maxAgeSeconds: 30 * 24 * 60 * 60
      //     })
      //   ]
      // }),
      "GET"
    );

    registerRoute(new RegExp("/^https?.*/"), new NetworkFirst(), "GET");
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
