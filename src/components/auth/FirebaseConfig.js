// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// configure firebase authentication
const firebaseConfig = {
  apiKey: "AIzaSyABSYnGlCXWI5xnnRpKgYhDnlGtBTGXviw",
  authDomain: "priceplus-530e4.firebaseapp.com",
  projectId: "priceplus-530e4",
  storageBucket: "priceplus-530e4.appspot.com",
  messagingSenderId: "658919437505",
  appId: "1:658919437505:web:bb32ffd4f04638a0345040",
  measurementId: "G-DBJCF0BK35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
