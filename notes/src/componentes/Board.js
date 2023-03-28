import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from '../firebase/firebase';
import '../hojas-de-estilo/boardStyle.css'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import notaLogo from '../imagenes/notes-logo.png'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTrash, faPenToSquare, faFloppyDisk, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const auth = getAuth(app);
const db = getFirestore(app);
let título;

export const Board = ({ correoUsuario, completada }) => {
  const valorInicial = {
    título: '',
    descripción: '',
  }
  //Variables de Estado
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [user, setUser] = useState(valorInicial)
  const [lista, setLista] = useState([])
  const [subId, setSubId] = useState('')

  //Función para Obtener los valores del Input y Textarea
  const obtenerNotas = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  //Función para guardar Notas y también para actualizar
  const guardarNotas = async (e) => {
    e.preventDefault();
    if (subId === '') {
      try {
        await addDoc(collection(db, `notes${correoUsuario}`), {
          ...user
        })
        getLista()
        cambiarEstadoModal1(!estadoModal1)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      await setDoc(doc(db, `notes${correoUsuario}`, subId), {
        ...user
      })
      getLista()
      cambiarEstadoModal1(!estadoModal1)
    }
    setUser({ ...valorInicial })
    setSubId('')
  }
  //Función para renderizar la lista de Notas
  const getLista = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `notes${correoUsuario}`))
      const docs = []
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id })

      })
      setLista(docs)

    } catch (error) {
      console.log(error)
    }
  }

  //llamamos a la función para q el useEffects no cause inconvenientes
  useEffect(() => {
    getLista()
    console.log("a verr")
  }, [])

  //Función para Eliminar nota
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, `notes${correoUsuario}`, id))
    getLista()
  }

  //Función para Editar y Actualizar Nota
  const getOne = async (id) => {
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
    if (subId !== '') {
      getOne(subId)
    }
  }, [subId])

  return (
    <div className='container'>
      <div className='header'>
        <img src={notaLogo} className="img-header" alt="" />
        <p className='bienv'> ¡Hola  {correoUsuario} ! </p>
        <FontAwesomeIcon icon={faRightFromBracket} className="btnSalir" onClick={() => signOut(auth)} />
      </div>
      <hr />
      <div className='divCalendarioYnotas'>
        <div className='btnCalendario'>
          <FontAwesomeIcon icon={faCirclePlus} className="btnAgregar" onClick={() => {
            cambiarEstadoModal1(!estadoModal1)
            título = "Agregar Nota"
          }} />
          <Modal estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            título={título} >
            <div className='divForm'>
              <form>
                <input type="text" name="título" className='form-control mb-3' placeholder='Título' onChange={obtenerNotas} value={user.título} required="required" />
                <textarea type="text" name="descripción" className='nota' placeholder='Escribe tu Nota aquí' onChange={obtenerNotas} value={user.descripción} required="required" />
                <FontAwesomeIcon icon={faFloppyDisk} className='btnGuardar' onClick={guardarNotas} />
              </form>
            </div>
          </Modal>
        </div>
        

        <div class="col">
              {
                lista.map(list => (
                  <div className="todaslasnotas" key={list.id}>
                    <p className="titulo">{list.título}</p>
                    <hr />
                    <p className="texto">{list.descripción}</p>
                    <div className='iconosBtns'>
                      <FontAwesomeIcon className= "btn" icon={faTrash} onClick={() => cambiarEstadoModal2(!estadoModal2)}/>
                      <FontAwesomeIcon className= "btn" icon={faPenToSquare} onClick={() => {
                        setSubId(list.id)
                        título = "Editar Nota"
                        cambiarEstadoModal1(!estadoModal1)
                      }} />
                      
                      <Modal estado={estadoModal2}
                        cambiarEstado={cambiarEstadoModal2}
                        título="Eliminar Nota" >
                        <div className='divForm'>
                          <p>¿Estás seguro de eliminar esta Tarea?</p>
                          <div className='divBotones'>
                          <FontAwesomeIcon icon={faCircleCheck} className= "btn"onClick={() => deleteNote(list.id)}/>
                          <FontAwesomeIcon icon={faBan} className= "btn"   onClick={() => cambiarEstadoModal2(!estadoModal2)}/>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
     
  )
}
