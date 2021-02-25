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

    // self.skipWaiting()
    console.log('Service Worker wurde instaliert');
    event.waitUntil(
        caches.open(cacheStorage).then((cache) => {
            console.log('Die Daten aus dem CacheArray werden in das Cache plaziert')
                // das Array "CacheArray" durchlaufen und alles in den Cache legen 
            return cache.addAll(CacheArray)
        })
    )
});


self.addEventListener('fetch', (e) => {
    console.log('Es wird eine Anfrage an den Server gestellt');

    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );


});