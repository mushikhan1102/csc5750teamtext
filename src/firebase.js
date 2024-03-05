// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import{getAuth} from "firebase/auth"

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
export{app, auth}