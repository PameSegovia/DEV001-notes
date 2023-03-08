import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from '../firebase/firebase';
import '../hojas-de-estilo/boardStyle.css'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import notaLogo from '../imagenes/notes-logo.png'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket,faTrash, faPenToSquare  } from '@fortawesome/free-solid-svg-icons';


const auth = getAuth(app);
const db = getFirestore(app);


export const Board = ({correoUsuario})=>{
  
 
   const valorInicial = {
    título : '',
    descripción: '', 
   }
   //Variables de Estado
   const [user, setUser] = useState(valorInicial)
   const [lista, setLista] = useState([])
   const [subId, setSubId] = useState('')

   //Función para Obtener los valores del Input y Textarea
   const obtenerNotas = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
   }
   
   //Función para guardar Notas y también para actualizar
   const guardarNotas = async(e) => {
    e.preventDefault();
    if(subId === ''){
      try{
        await addDoc(collection(db, `notes${correoUsuario}`),{
          ...user
        })
        getLista()
        }catch(error){
        console.log(error)
        }
    }
    else{
      await setDoc(doc(db, `notes${correoUsuario}`, subId),{
        ...user
      })
      getLista()
    }
    setUser({...valorInicial})
    setSubId('')
   }
//Función para renderizar la lista de Notas
const getLista = async() =>{
  try{
    const querySnapshot = await getDocs(collection(db, `notes${correoUsuario}`))
    const docs = []
    querySnapshot.forEach((doc)=>{
      docs.push({...doc.data(), id:doc.id})
      
    })
    setLista(docs)
    
  } catch(error){
    console.log(error)
  }
}
 
//llamamos a la función para q el useEffects no cause inconvenientes
   useEffect(() =>{
    getLista()
    console.log("a verr")   
   }, [])

   //Función para Eliminar nota
   const deleteNote = async(id)=>{
    await deleteDoc(doc(db, `notes${correoUsuario}`, id))
    getLista()
   }

   //Función para Editar y Actualizar Nota
   const getOne = async(id)=>{
      try {
        const docRef = doc(db, `notes${correoUsuario}`, id)
        const docSnap = await getDoc(docRef)
        setUser(docSnap.data())
        getLista()
      } catch (error) {
        console.log(error)
      }
   }
   useEffect(() => {
    if(subId !== ''){
      getOne(subId)
    }
   },[subId])

    return(
        <div className='container'>
          <div className='header'>
            <img src={notaLogo } className="img-header" alt=""/>
            <p className='bienv'> Hola  {correoUsuario}! </p> 
            
            <FontAwesomeIcon icon={faRightFromBracket} className="btnSalir"onClick={()=> signOut(auth)}/>
        
          </div>     
            <hr/>
            <div className='row'>              
                <div className='col-md-4'>
                    <form onSubmit={guardarNotas}>
                        <div className='card card-body'>
                            <div className='form-group' >
                                <input type="text" name="título" className='form-control mb-3' placeholder='Título'onChange={obtenerNotas} value={user.título}/>
                                
                                <textarea type="text" name="descripción" className='form-control mb-3' placeholder='Escribe tu Nota aquí' onChange={obtenerNotas} value={user.descripción}/>
            
                            </div>
                            <button className='btn btn-primary'>{subId === '' ? 'Guardar' : 'Actualizar'}</button>
                        </div>
                    </form>
                </div>

                <div class="col">   
                  <div class="p-3">
                    <div className='card-body-dos' >
                      {
                        lista.map(list => (
                          <div className= "todaslasnotas" key={list.id}>
                            <p className="titulo">{list.título}</p>
                            <p>{list.descripción}</p>
                            <div className='iconosBtns'>
                    
                            <FontAwesomeIcon icon={faTrash} onClick={()=> deleteNote(list.id)} />
                            <FontAwesomeIcon icon={faPenToSquare} onClick={()=> setSubId(list.id)}/>

                            </div>
                            
                            
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
    )
                    }
                  