import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";




const Modal = ({children, estado, cambiarEstado, título }) =>{
    return(
        <>
          {estado &&  
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h3>{título}</h3>                        
                    <FontAwesomeIcon icon={faXmark} onClick ={() => cambiarEstado(false)}/>
                    </EncabezadoModal>
                    {children}
                </ContenedorModal>
            </Overlay>
          }
         </>
    )
}; 

export default Modal;


const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorModal = styled.div`
    width: 300px;
    min-height: 100px ;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
    padding: 20px;
    border: 1px solid #fff;
`;

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3{
        font-weight: 500;
        font-size: 16px;
        color: #1766DC

    }
`;