// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMStseHVyRGWrRMz0Qwz_PVrC96PpkKC8",
  authDomain: "social-media-723e5.firebaseapp.com",
  projectId: "social-media-723e5",
  storageBucket: "social-media-723e5.appspot.com",
  messagingSenderId: "114430365133",
  appId: "1:114430365133:web:e60c1612f27399f2c1c884",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
