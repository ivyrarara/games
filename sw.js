const V='chess-v65';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','algakki/index.html','algakki/guard.js','multiply/index.html','multiply/digits.json','connect4/index.html','spot/index.html','uno/index.html','chess/index.html','memory/index.html','fonts/fonts.css','fonts/lilita.woff2','fonts/bh108.woff','fonts/bh109.woff','fonts/bh112.woff','fonts/bh117.woff','fonts/bh118.woff','fonts/bh119.woff'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  /* 인터넷이 되면 항상 최신 파일을 받고, 안 될 때만 저장된 파일을 써요 */
  e.respondWith(fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){ const cp=res.clone(); caches.open(V).then(c=>c.put(e.request,cp)); }
    return res;
  }).catch(()=>caches.match(e.request).then(hit=>hit||caches.match('./'))));
});
