self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let url;

self.addEventListener('push', function(event) {
  let pushMessage = event.data.json();

  const options = {
    body: pushMessage.body,
    icon: pushMessage.icon,
    image: pushMessage.image,
    tag: 'alert'
  };

  url = pushMessage.url;

  event.waitUntil(self.registration.showNotification(pushMessage.title, options));
  navigator.serviceWorker.ready.then(swreg => swreg.showNotification('Notifications granted', {
    body: pushMessage.body,
    icon: pushMessage.icon,
    image: pushMessage.image,
    tag: 'alert',
    vibrate: [300, 200, 300],
  }))
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;

  clickedNotification.close();

  if (url){
    const promiseChain = clients.openWindow(url);
    event.waitUntil(promiseChain);
  }
});
