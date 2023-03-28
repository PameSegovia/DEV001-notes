import React, { useState } from "react";
import {Board} from "./componentes/Board";
import { Home } from "./componentes/Home";
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