// config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔹 Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAhcSg0rD5FLpeJA-r3TqdlpBB04xcMMmM",
  authDomain: "resume-parser-b1144.firebaseapp.com",
  projectId: "resume-parser-b1144",
  storageBucket: "resume-parser-b1144.appspot.com",
  messagingSenderId: "1057700224825",
  appId: "1:1057700224825:web:71cb5c2e93b5eb1f5652e8",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, auth };