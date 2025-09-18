import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPlqk_pf1Hnpb1fUjyYeoZABG2xPvb8qI",
  authDomain: "cellar-app-48ce7.firebaseapp.com",
  projectId: "cellar-app-48ce7",
  storageBucket: "cellar-app-48ce7.firebasestorage.app",
  messagingSenderId: "741035143731",
  appId: "1:741035143731:web:fc720269fcee351aa62946",
  measurementId: "G-LFCTM15G3J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
//export const messaging = getMessaging(app);
