self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//Web Push Notifications//
let url;

self.addEventListener('push', function(event) {
  let pushMessage = event.data.json();

  // push notification can send event.data.json() as well
  url = pushMessage.url;
  const options = {
    body: pushMessage.body,
    icon: pushMessage.icon,
    image: pushMessage.image,
    tag: 'alert'
  };
  event.waitUntil(self.registration.showNotification(pushMessage.title, options));
  navigator.serviceWorker.ready.then(swreg => swreg.showNotification('Notifications granted', {
    body: pushMessage.body,
    icon: pushMessage.icon,
    image: pushMessage.image,
    tag: 'alert',
    vibrate: [300, 200, 300],
    // actions: [
    //  { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
    //  { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
    // ],
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
