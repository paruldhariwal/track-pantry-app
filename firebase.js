// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjHURi0BPL2hhNBxJew522ux6hPS3xDpw",
  authDomain: "pantryapp-987ff.firebaseapp.com",
  projectId: "pantryapp-987ff",
  storageBucket: "pantryapp-987ff.appspot.com",
  messagingSenderId: "525771166914",
  appId: "1:525771166914:web:3c31d75886c37c328bd75b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { app, firestore, auth, provider };
