// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7z2r4ZMr05_b9C_r6fRX626klUsjVXVA",
  authDomain: "sunsetdata-24c50.firebaseapp.com",
  projectId: "sunsetdata-24c50",
  storageBucket: "sunsetdata-24c50.firebasestorage.app",
  messagingSenderId: "543250745751",
  appId: "1:543250745751:web:e097d582aa2f0781e35cd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)