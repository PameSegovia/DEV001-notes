import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  app, loginWithGoogle } from '../firebase/firebase';
import '../hojas-de-estilo/homeStyle.css'
import notaLogo from '../imagenes/notes-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const auth = getAuth(app);

export function  Home() {
  const navigate = useNavigate();
  const[registro, setRegistro] = useState(false);

  
  const handlerSubmit = async(e) => {
    //Aquí se reinicia
    e.preventDefault();
    //Bentemos el valor de los inputs de email y password
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if(registro){
    //Función para Registrar Nuevo Usuario
      await createUserWithEmailAndPassword(auth, correo, contraseña)
     }
    //Función para Inciar Sesión con Correo y Contraeña
     else{
      await signInWithEmailAndPassword(auth, correo, contraseña)
     }
    };

    //Función para Inciar Sesión con Google
    const signInWithGoogle = () => {
          loginWithGoogle().then((res) => {
              navigate("/board");
            })
            .catch( console.error )
      };
   
  return(  
    /*Esta es la Sección del Slide */
    <div className='contenedorPpal'>
      <div className='contenedorHijo'>
          <img src={notaLogo } className="tamaño-img" alt=""/>
        <div className='contenedorPresentación'>
          <div>
            <h1> My Notes</h1>
            <p className='presentaciónApp'>Lo que antes anotabas en papel, ahora lo puedes anotar aquí.<br/>Una aplicación sencilla que te sirve para tomar apuntes o crear una lista de tareas.  </p>
            <button className='btn-btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
              {registro ? 'Ya tienes cuenta? Inicia Sesión' : 'No tienes cuenta? Regístrate'}
            </button><br/> 
          </div>
          <br/>
        <div>
           
          </div>
        </div>
      </div>

      {/*en esta sección será el formulario*/}
      <div className='contenedor'>
        <div className='contenedorForm'>
          
          <form onSubmit={handlerSubmit}>
            <div className='divCorreo'>
            
              <input type="email" className='form-control' id = "email" name="email" placeholder="tucorreo@ejemplo.com" required></input>
            </div>

            <div className='divCorreo'>
             
              <input type="password" className='form-control' id = "password" name="password" placeholder="Contraseña" required></input>
            </div>
            <br/>
            <button className='btn btn-primary form-control' type="submit">
              {registro ? 'Regístrate' : 'Inicia Sesión'}
            </button>
           
              
           
            
            
          </form>
          
          
          
        
          <FontAwesomeIcon icon={faGoogle}  onClick={signInWithGoogle}className="btnGoogle"/>
        </div>
      </div>

    </div>
    
    

  )
  
};

