// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWHn4iiVU0kusIeU0x7RAcdDfrRPBlazg",
  authDomain: "coreal8-2c8a5.firebaseapp.com",
  projectId: "coreal8-2c8a5",
  storageBucket: "coreal8-2c8a5.firebasestorage.app",
  messagingSenderId: "586321274716",
  appId: "1:586321274716:web:daffc21e2acbd9299a0399",
  measurementId: "G-1XTKHB81QP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
