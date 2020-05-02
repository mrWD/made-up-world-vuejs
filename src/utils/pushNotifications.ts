
const publicVapidKey = 'BF8yGRH7Oz-7zHkprFcql09k9LKMCDcmFHGRafQP5mS1s68jgtADxb7Pooo9MVkNuqQClu_4wqtNSvA5N1lgfuw';
/*eslint-disable */
let hasSubscription = false;
let serviceWorkerRegistration: any = null;
let subscriptionData: any = null;

function urlB64ToUint8Array(base64String: any) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUser(token: string) {
  serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(publicVapidKey)
  })
  .then(function(subscription: any) {

    fetch('http://localhost:5000/api/push/subscribe',{
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
    .then(function(response) {
      return response;
    })
    .then(function(text) {
      console.log('User is subscribed.');
      hasSubscription = true;
    })
    .catch(function(error) {
      hasSubscription = false;
      console.error('error fetching subscribe', error);
    });
    
  })
  .catch(function(err: any) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function unsubscribeUser() {
  serviceWorkerRegistration.pushManager.getSubscription()
  .then(function(subscription: any) {
    if (subscription) {
      subscriptionData = {
        endpoint: subscription.endpoint
      };
      
      fetch('http://localhost:5000/api/push/unsubscribe',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
      })
      .then(function(response) {
        return response;
      })
      .then(function(text) {
        hasSubscription = false;
      })
      .catch(function(error) {
        hasSubscription = true;
        console.error('error fetching subscribe', error);
      });

      hasSubscription = false;

      return subscription.unsubscribe();
    }
  });
}

function initPush(token: string) {
  subscribeUser(token);

  serviceWorkerRegistration.pushManager.getSubscription()
  .then(function(subscription: any) {
    hasSubscription = !(subscription === null);
  });
}

const pushNotification = (token: string) => {
  navigator.serviceWorker.register('../service-worker.js')
  .then(function(sw) {
    serviceWorkerRegistration = sw;
    initPush(token);
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
}

export default pushNotification;
