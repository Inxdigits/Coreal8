// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAWHn4iiVU0kusIeU0x7RAcdDfrRPBlazg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "coreal8-2c8a5.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "coreal8-2c8a5",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "coreal8-2c8a5.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "586321274716",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:586321274716:web:daffc21e2acbd9299a0399",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1XTKHB81QP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
