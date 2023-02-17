import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../firebase/firebase';
import '../hojas-de-estilo/LoginStyle.css'
import notesLogo from '../imagenes/notes-logo.png'




function Login() {
  const navigate = useNavigate();
    const signInWithGoogle = () => {
        loginWithGoogle().then((res) => {
            navigate("/notes");
          })
          .catch( console.error )
    };
 
  return (
    <div className="app-notes">
      <h1>My Notes</h1>
      <div className='notes-logo-conteiner'>
        <img
        src={ notesLogo }
        className= 'notes-logo'
        alt='notesLogo' />
      </div>
      <div className='buttons-conteiner'>
        <button className='button'>Entra con Tu Email</button>
        <button className='button' onClick={ signInWithGoogle }>Entra con Google</button>
      </div>
    </div>
  );
}

export default Login;
