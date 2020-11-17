import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyB_iSlgdRl77JXEgUmAu3d1U4xubpni2xY",
  authDomain: "idom-81414.firebaseapp.com",
  databaseURL: "https://idom-81414.firebaseio.com",
  projectId: "idom-81414",
  storageBucket: "idom-81414.appspot.com",
  messagingSenderId: "68474817304",
  appId: "1:68474817304:web:fda8f2c2891fac39036c6d"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });