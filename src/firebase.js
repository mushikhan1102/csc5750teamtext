import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgDRzd4iw09izClhv8modybtT41bWa-kQ",
  authDomain: "csc5750teamtext.firebaseapp.com",
  projectId: "csc5750teamtext",
  storageBucket: "csc5750teamtext.appspot.com",
  messagingSenderId: "977866768360",
  appId: "1:977866768360:web:d7b6d15a98998ee409ee5d",
  measurementId: "G-319QZHZVKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };