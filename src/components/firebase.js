import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn20NxXjWQvO3gSTeukPcBJ0i5wFSBPb0",
  authDomain: "jarvis-1-2e079.firebaseapp.com",
  projectId: "jarvis-1-2e079",
  storageBucket: "jarvis-1-2e079.appspot.com",
  messagingSenderId: "259046439521",
  appId: "1:259046439521:web:82aa211eb82deb65d90820",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
