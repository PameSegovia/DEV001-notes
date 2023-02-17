// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALBGajSuipcJNKay4aA9Tqj0SoHPyD688",
  authDomain: "lab-notes-ps.firebaseapp.com",
  projectId: "lab-notes-ps",
  storageBucket: "lab-notes-ps.appspot.com",
  messagingSenderId: "200114788216",
  appId: "1:200114788216:web:cd624987636b82cb22da8d",
  measurementId: "G-BQ3DTY2ZNL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider ();
export const googlePopUp = () => signInWithPopup (auth, provider);

// Función Login Con Google
export const loginWithGoogle = () => {
    const auth = getAuth();
    const user = auth.currentUser;
  if (user !== null) {
    const displayNameUser = user.displayName;
    const emailUser = user.email;
    //const photoURLUser = user.photoURL;
    //const emailVerifiedUser = user.emailVerified;
  
    const uid = user.uid;
    console.log("usuario ingresado: ", emailUser)
    console.log("usuario display: ", displayNameUser)
  }
    return googlePopUp();
  };
  
// Función Login Con Email y Contrase{a}
