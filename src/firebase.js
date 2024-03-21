// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2BuAprCGBHDpjNJ0b4u_rueUzcxIhtAA",
  authDomain: "csc5750-timeslot-registr-19949.firebaseapp.com",
  projectId: "csc5750-timeslot-registr-19949",
  storageBucket: "csc5750-timeslot-registr-19949.appspot.com",
  messagingSenderId: "327692515006",
  appId: "1:327692515006:web:97d39254abf7e7314550ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };