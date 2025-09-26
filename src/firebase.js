// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Add this

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "street-pulse-ai.firebaseapp.com",
  projectId: "street-pulse-ai",
  storageBucket: "street-pulse-ai.appspot.com",  // ✅ already corrected
  messagingSenderId: "729560845682",
  appId: "1:729560845682:web:b584f81563af55c32f21eb",
  measurementId: "G-796FRDC5S0"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export everything needed
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Export storage
