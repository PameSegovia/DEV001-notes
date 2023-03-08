import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {Board} from "./componentes/Board";
import { Home } from "./componentes/Home";
import { Register } from "./componentes/Register";
import { app } from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);




function App() {
   const [usuario, setUsuario] = useState(null)

   onAuthStateChanged(auth, (usuarioF)=> {
    if(usuarioF){
      setUsuario(usuarioF)
    }
    else{
      setUsuario(null)
    }
   })

  return (
    <div className="">
      {usuario ? <Board correoUsuario ={usuario.email}/> : <Home/>}
    </div>

    
  )
 
}

export default App;