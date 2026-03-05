importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAaYwttldbrKcXIgQreZK2nKOClfQGhUgs",
    authDomain: "ai-weather-app-5c958.firebaseapp.com",
    projectId: "ai-weather-app-5c958",
    storageBucket: "ai-weather-app-5c958.firebasestorage.app",
    messagingSenderId: "446784317989",
    appId: "1:446784317989:web:eba5816f3879b717486dcc",
    measurementId: "G-EVTBKW86ZP",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    self.ServiceWorkerRegistration.showNotification(payload.notification.title, {
        body: payload.notification.body,
    });
});
