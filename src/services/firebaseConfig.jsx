// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAFCvBPVaDMzOoUMJniyb0jSr3nbex9m0",
  authDomain: "twitter-clone-5e92e.firebaseapp.com",
  projectId: "twitter-clone-5e92e",
  storageBucket: "twitter-clone-5e92e.appspot.com",
  messagingSenderId: "280307198817",
  appId: "1:280307198817:web:0c0ff9b9166e5dc08af320",
  measurementId: "G-JWVZMV47V6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)
