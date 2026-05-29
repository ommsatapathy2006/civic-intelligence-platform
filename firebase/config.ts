import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXi0Q29Bovj66K9h0NKuIsB64FltkinFA",
  authDomain: "ai-powered-civic-intelligence.firebaseapp.com",
  projectId: "ai-powered-civic-intelligence",
  storageBucket: "ai-powered-civic-intelligence.firebasestorage.app",
  messagingSenderId: "313740089959",
  appId: "1:313740089959:web:bfb0eea38816bb690692c2",
  measurementId: "G-JYF5Q42YNW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);