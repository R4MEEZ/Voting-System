import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBz9oEnu4oNHU9ykZMno7e-M-Fk662kWfY",
  authDomain: "voting-system-be9b7.firebaseapp.com",
  projectId: "voting-system-be9b7",
  storageBucket: "voting-system-be9b7.appspot.com",
  messagingSenderId: "731407340480",
  appId: "1:731407340480:web:226f092e4efaea3db06e25"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


export {auth, app, googleProvider, db};