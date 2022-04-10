const CACHE_NAME = "static_cache2"
const STATIC_ASSETS = [
    'BadBoy_pt1.html',
    'BadBoy_pt2.html',
    'BadBoy_pt3.html',
    'BadBoy_pt4.html',
    'BadBoy_pt5.html',
    'bts.html',
    'bts2.html',
    'CH2.html',
    'CH3.html',
    'Cold Husband.html',
    'got7.html',
    'hyunjin_mate.html',
    'idol_1.html',
    'idol_2.html',
    'idol_3.html',
    'idol_4.html',
    'index.html',
    'jeon.html',
    'Load.html',
    'oneNight.html',
    'oneNight2.html',
    'oneNight3.html',
    'Saved.html',
    'saved2.html',
    'saved3.html',
    'saved4.html',
    'saved5.html',
    'saved6.html',
    'SKZ.html',
    'bts.css',
    'got7.css',
    'idol.css',
    'libr.css',
]

async function preCache(){
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}
self.addEventListener('install', event =>{
    console.log("[SW] installed");
    self.skipWaiting()
    event.waitUntil(preCache())
})

async function cleanUpCache(){
    const keys = await caches.keys()
    const keysToDelete = keys.map(key => {
        if (key !== CACHE_NAME) {
            return caches.delete(key)
        }
    })
}
self.addEventListener('activate' , event => {
    console.log("[SW] activated");
    event.waitUntil(cleanUpCache())
})

async function fetchAssets(event){
    try {
        const response = fetch(event.response)
        return response
    } catch (err){
        const cache = await caches.open(CACHE_NAME)
        return cache.match(event.response)
    }
}
self.addEventListener("fetch" , event => {
    console.log("[SW] fetched");
    event.responseWith(fetchAssets(event))
})