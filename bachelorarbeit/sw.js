const cacheStorage = 'video_offline_store'

// Array von Daten, die wir in den Cache legen wollen.
const CacheArray = [
    '/bachelorarbeit/index.html',
    '/bachelorarbeit/main.js',
    '/bachelorarbeit/style.css',
    '/bachelorarbeit/fotos/1.jpeg',
    '/bachelorarbeit/fotos/2.jpeg',
    '/bachelorarbeit/fotos/3.jpeg',
    '/bachelorarbeit/fotos/4.jpeg',
]

self.addEventListener('install', (event) => {

    self.skipWaiting()
    console.log('Service Worker wurde instaliert');
    event.waitUntil(
        caches.open(cacheStorage).then((cache) => {
            console.log('Die Daten aus dem CacheArray werden in das Cache plaziert')
                // das Array "CacheArray" durchlaufen und alles in den Cache legen 
            return cache.addAll(CacheArray)
        })
    )
});

self.addEventListener('activate', event => {
    clients.claim();
    console.log('Now ready to handle fetches!');
});

addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response; // if valid response is found in cache return it
            } else {
                return fetch(event.request) //fetch from internet
                    .then(function(res) {
                        return caches.open(cacheStorage)
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone()); //save the response for future
                                return res; // return the fetched data
                            })
                    })
                    .catch(function(err) { // fallback mechanism
                        return caches.open(cacheStorage)
                            .then(function(cache) {
                                return cache.match(cacheStorage);
                            });
                    });
            }
        })
    );
});