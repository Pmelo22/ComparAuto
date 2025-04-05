// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD07WmSJBpkb0l3jlgKUNSdW4V6elxGVYk",
  authDomain: "comparauto-c42df.firebaseapp.com",
  projectId: "comparauto-c42df",
  storageBucket: "comparauto-c42df.firebasestorage.app",
  messagingSenderId: "853940739620",
  appId: "1:853940739620:web:ac17ee083ff1b631c482b1",
  measurementId: "G-6RLZWSWGZQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);