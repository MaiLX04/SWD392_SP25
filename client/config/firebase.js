// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ1UbCDO8RA1q1T9hu0yTyqp9MCENfgO8",
  authDomain: "java-424302.firebaseapp.com",
  projectId: "java-424302",
  storageBucket: "java-424302.appspot.com",
  messagingSenderId: "792757160936",
  appId: "1:792757160936:web:3e6556cd0f4bf11ac5b25d",
  measurementId: "G-GYE1RJNERG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);