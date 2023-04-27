// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {   getAuth, GoogleAuthProvider,signInWithPopup} from "firebase/auth";


//App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMVYM_jXMM5eFmHKElNUeZQoZeaGR8lC4",
  authDomain: "block-de-notas-con-react.firebaseapp.com",
  projectId: "block-de-notas-con-react",
  storageBucket: "block-de-notas-con-react.appspot.com",
  messagingSenderId: "661457495783",
  appId: "1:661457495783:web:92974a64e8e2b87aa2e442"
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





  

