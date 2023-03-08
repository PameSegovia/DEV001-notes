// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {   getAuth, GoogleAuthProvider,signInWithPopup} from "firebase/auth";


//App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhTIjpZUrrkM--js19j2jREwV2YPJoe0g",
  authDomain: "notes-react-54a31.firebaseapp.com",
  projectId: "notes-react-54a31",
  storageBucket: "notes-react-54a31.appspot.com",
  messagingSenderId: "729885784193",
  appId: "1:729885784193:web:78ec4a6b3f3e1c88187580"
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
  
    //const uid = user.uid;
    console.log("usuario ingresado: ", emailUser)
    console.log("usuario display: ", displayNameUser)
  }
    return googlePopUp();
  };





  

