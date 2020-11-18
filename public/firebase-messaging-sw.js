importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");

firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyB_iSlgdRl77JXEgUmAu3d1U4xubpni2xY",
  authDomain: "idom-81414.firebaseapp.com",
  databaseURL: "https://idom-81414.firebaseio.com",
  projectId: "idom-81414",
  storageBucket: "idom-81414.appspot.com",
  messagingSenderId: "68474817304",
  appId: "1:68474817304:web:fda8f2c2891fac39036c6d"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});
