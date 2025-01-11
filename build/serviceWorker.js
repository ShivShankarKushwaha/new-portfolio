const CACHE_NAME = "shivshankar.vercel.app-version-4";
// const urltoCache = ["index.html",'../src/App.js'];
const urltoCache = [];
this.addEventListener("install", (e) =>
{
  console.log('installing');
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) =>
    {
      console.log("caches opened");
      // return await cache.addAll(urltoCache);
      try {
        ok = await cache.addAll(urltoCache);
      } catch (err) {
        console.error('sw: cache.addAll',err);
        for (let i of urltoCache) {
          try {
            ok = await cache.add(i);
          } catch (err) {
            console.warn('sw: cache.add', i,err);
          }
        }
      }
      return ok;
    }),
  );
});
this.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res; // Return the cached resource if it exists
      }
      return fetch(e.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache); // Cache the fetched response
          });

          return response;
        })
        .catch(() => caches.match("offline.html")); // Return the offline page if the network request fails
    }),
  );
});

this.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then((cachenames) =>
      Promise.all(
        cachenames.map((cachename) => {
          if (!cacheWhiteList.includes(cachename)) {
            return caches.delete(cachename);
          }
        }),
      ),
    ),
  );
});
