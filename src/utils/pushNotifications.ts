import axios from 'axios';

const { VUE_APP_API_URL, VUE_APP_VAPID_KEY } = process.env;

const urlB64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const subscribeUser = async (token: string, sw: ServiceWorkerRegistration) => {
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(VUE_APP_VAPID_KEY),
  });

  await axios.post(`${VUE_APP_API_URL}/push/subscribe`, subscription, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  await sw.pushManager.getSubscription(); // ? For what?
};

const unsubscribeUser = async (sw: ServiceWorkerRegistration): Promise<void> => {
  const subscription = await sw.pushManager.getSubscription();

  if (!subscription) {
    throw Error('Error fetching subscribe!');
  }

  const subscriptionData = {
    endpoint: subscription.endpoint,
  };

  await axios.post(`${VUE_APP_API_URL}/push/unsubscribe`, subscriptionData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  subscription.unsubscribe();
};

const pushNotification = async (token: string, isUnsubscribe = true): Promise<void> => {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const sw = await navigator.serviceWorker.register('../service-worker.js');

    if (isUnsubscribe) {
      subscribeUser(token, sw);
    } else {
      unsubscribeUser(sw);
    }
  } catch (err) {
    console.error(err);
  }
};

export default pushNotification;
