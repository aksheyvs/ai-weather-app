// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAaYwttldbrKcXIgQreZK2nKOClfQGhUgs",
    authDomain: "ai-weather-app-5c958.firebaseapp.com",
    projectId: "ai-weather-app-5c958",
    storageBucket: "ai-weather-app-5c958.firebasestorage.app",
    messagingSenderId: "446784317989",
    appId: "1:446784317989:web:eba5816f3879b717486dcc",
    measurementId: "G-EVTBKW86ZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getAnalytics(app);