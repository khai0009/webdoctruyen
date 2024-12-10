// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import "firebase/auth"
import { getAuth,setPersistence, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQgyks7rKyD8eaRJcJlZvh_ajemdZrS4w",
  authDomain: "doctruyen-ee79c.firebaseapp.com",
  projectId: "doctruyen-ee79c",
  storageBucket: "doctruyen-ee79c.firebasestorage.app",
  messagingSenderId: "433397150161",
  appId: "1:433397150161:web:1a0bc89c24941604ca70f0",
  measurementId: "G-SYN77HBHE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export {db, auth}