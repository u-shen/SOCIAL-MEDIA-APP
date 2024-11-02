// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSU8xo-M6jSATUC2lueWNXdU7qcOrmV7E",
  authDomain: "ush-chat.firebaseapp.com",
  projectId: "ush-chat",
  storageBucket: "ush-chat.firebasestorage.app",
  messagingSenderId: "467992969559",
  appId: "1:467992969559:web:2d0988b74adaa557413e12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
