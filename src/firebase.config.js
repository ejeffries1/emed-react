// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRT3gRZQstpoW8latcvijq_sR5YwWP1po",
  authDomain: "emedfire-433701.firebaseapp.com",
  projectId: "emedfire-433701",
  storageBucket: "emedfire-433701.appspot.com",
  messagingSenderId: "517584196043",
  appId: "1:517584196043:web:9baa6571feae4d5a98a64e",
  measurementId: "G-X549EDKLDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);