// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm71sZ61Cj2u0rA4Bvp8EFGldd-yVy7kw",
  authDomain: "emed-01.firebaseapp.com",
  projectId: "emed-01",
  storageBucket: "emed-01.firebasestorage.app",
  messagingSenderId: "441832521646",
  appId: "1:441832521646:web:8d6df7f6fa02343a03923f",
  measurementId: "G-D1CJKQFFVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);