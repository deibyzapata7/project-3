import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';


precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));
registerRoute(
  /https:\/\/alertes-montreal-backend\.onrender\.com\/avis-alertes/,

  new StaleWhileRevalidate({ cacheName: 'api-alertes' }),
  'GET'
);


// Affiche une notification push reçue du serveur
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Alerte Montréal', {
      body: data.body || '',
      icon: '/icons/web-app-manifest-192x192.png',
      data: { url: data.url || '/' }
    })
  );
});


// Gère le clic sur une notification : focus si la fenêtre existe, sinon ouvre une nouvelle
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find(c => c.url === url);
      if (existing) return existing.focus();
      return self.clients.openWindow(url);
    })
  );
});


// Intercepte les navigations et affiche offline.html si le réseau est indisponible
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  }
});
