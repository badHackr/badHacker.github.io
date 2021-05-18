const staticCacheName = 'site-static';
const assets = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
    "https://fonts.gstatic.com",
    "./style.css",
    "/index.html"



];


//Service worker install
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caches store');
            cache.addAll(assets);
        })
    );

});

//Activating Service worker

self.addEventListener('activate', evt => {
    console.log('service worker activated');
});

// fetch

self.addEventListener('fetch', evt => {
    console.log("fetch")
});