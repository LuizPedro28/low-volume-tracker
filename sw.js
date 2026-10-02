// Bump this version string whenever you deploy new content,
// so users' browsers pick up the update instead of the old cache.
const CACHE_NAME = "lvt-cache-v10";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== "lvt-config").map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde rápido com o cache (funciona offline)
// e atualiza o cache em segundo plano quando há rede disponível.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // não intercepta chamadas a outros domínios (APIs de IA, fontes)
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok && event.request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// lembrete de treino em segundo plano (Chrome/Android com app instalado)
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "lvt-remind") event.waitUntil(remindFromSW());
});
async function remindFromSW() {
  const c = await caches.open("lvt-config");
  const r = await c.match("cfg");
  if (!r) return;
  const cfg = await r.json();
  const n = new Date();
  const key = n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate();
  const [h, m] = cfg.time.split(":").map(Number);
  if (!cfg.on || !cfg.days.includes(n.getDay()) || n.getHours() * 60 + n.getMinutes() < h * 60 + m) return;
  if (cfg.trained === key || cfg.notified === key) return;
  cfg.notified = key;
  await c.put("cfg", new Response(JSON.stringify(cfg)));
  await self.registration.showNotification("Hora de treinar 💪", { body: "Próximo: " + cfg.next, icon: "icons/icon-192.png", tag: "lvt-remind" });
}
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: "window" }).then((cs) => (cs.length ? cs[0].focus() : clients.openWindow("./"))));
});
