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

// In diesem Fall kann der alte Cache entfernt werden.

self.addEventListener('activate', (event) => {
    console.log("Activate")
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cache => {
                if (cache != cacheStorage) {
                    console.log("Service Worker löscht altes Cache")
                    return caches.delete(cache);
                }
            }))
        })
    )
});

self.addEventListener('fetch', (event) => {
    console.log('Es wird eine Anfrage an den Server gestellt');

    event.respondWith(
        caches.match(event.request).then((response) => {

            if (response) {
                console.log('[Service Worker]: returning ' + event.request.url + ' from cache')
                return response
            } else {
                console.log('[Service Worker]: returning ' + event.request.url + ' from net')
                return fetch(event.request)
            }

        })
    )

});