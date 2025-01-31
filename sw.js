const CACHE_NAME = "v5";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/organisers.html",
  "/partners.html",
  "/schedule.html",
  "/updates.html",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
      console.log("Service Worker installed and assets cached.");
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (
    requestUrl.pathname.startsWith("/css/") ||
    requestUrl.pathname.startsWith("/fonts/") ||
    requestUrl.pathname.startsWith("/img/")
  ) {
    event.respondWith(cacheFirst(request));
  } else if (request.destination === "document") {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkWithFallback(request));
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
      console.log("Service Worker activated and old caches removed.");
    })()
  );
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      (async () => {
        console.log("Background sync executed.");
        self.registration.showNotification("Background Sync", {
          body: "Background sync completed.",
          icon: "/img/icon512_rounded.png",
          badge: "/img/icon512_rounded.png",
        });
      })()
    );
  }
});

self.addEventListener("push", (event) => {
  const options = {
    body: "Test Notification",
    icon: "/img/icon512_rounded.png",
    badge: "/img/icon512_rounded.png",
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  return cachedResponse || fetchAndCache(request);
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch(() => cachedResponse || caches.match(OFFLINE_PAGE));

  return cachedResponse || fetchPromise;
}

async function networkWithFallback(request) {
  try {
    const networkResponse = await fetch(request, { timeout: 5000 });
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.warn("Network request failed, serving cached content:", error);
    return caches.match(request) || caches.match(OFFLINE_PAGE);
  }
}

async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.warn("Fetch failed, serving cache:", error);
    return caches.match(request) || caches.match(OFFLINE_PAGE);
  }
}
