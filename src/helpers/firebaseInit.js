import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import router from '@/router/index'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKcrgZwwl9x_rB9q9uScvaXUd0-UFSJe0",
  authDomain: "insurance-toolkit-a02cd.firebaseapp.com",
  projectId: "insurance-toolkit-a02cd",
  storageBucket: "insurance-toolkit-a02cd.appspot.com",
  messagingSenderId: "183034574954",
  appId: "1:183034574954:web:01bf07eca8af6f2879b213",
  measurementId: "G-R0X6TXLZWG"
};


// INIT
export const app = initializeApp(firebaseConfig);
// CALLS
export const db = getFirestore(app);
export const auth = getAuth(app);

