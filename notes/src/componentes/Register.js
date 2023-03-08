import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from "../firebase/firebase";
const auth = getAuth(app);

export function Register(){
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function submitHandler(e){
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    const crearUsuario = await createUserWithEmailAndPassword(auth, correo, contraseña)
    .then((userCredential) => {
      alert("usuario Registrado con éxito");
      navigate("/")
      console.log(crearUsuario)

    })
    .catch((error) => {
      console.log(error.code);
            if (error.code === "auth/weak-password"){
             setError("La contraseña debería tener, al menos, 6 carácteres")}
            if (error.code === "auth/internal-error"){
            setError("Correo Inválido")}
            if (error.code === "auth/email-already-in-use"){
            setError("El correo ya se encuentra registrado")}
      
    })

  }
    
    return(
      
      <div className="app-notes">
      <h1>My Notes</h1>
      <p>hola desde el register</p>
      {error && <p>{error}</p>}
      
        <form className="app-notes"onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="ejemplo@email.com"></input>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="*********"></input>
          <button type="submit">Registrarse</button>
         </form>
         <Link className="link"    to="/">Volver al Home</Link>
        </div>
    )
    
    }

