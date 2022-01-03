import React, { useEffect } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import './acceptOrCancel.css'



type props = {
    headerModalText:string
    bodyModalText:string
    isShowingModal: boolean
    idTaskWhenAcceptModal :Task["taskId"]
    acceptModalFunction :(idTask:Task["taskId"]) =>void
    toggleModal: () => void


}




const AcceptOrCancelModal: React.FC<props> = ({ headerModalText, bodyModalText, isShowingModal,toggleModal,acceptModalFunction,idTaskWhenAcceptModal}) => {

    const closeModal = () =>{
        toggleModal()
    }
    const saveChangesModal = () =>{
        acceptModalFunction(idTaskWhenAcceptModal)
        toggleModal()
    }
    
    return (
        <div className="background">


            <Modal isOpen={isShowingModal} toggle={toggleModal} >

              
                <h4>{headerModalText}</h4>
                <hr></hr>
                <ModalBody className='modalBody'>
                    <h6>{bodyModalText}</h6>
                <ModalFooter>
                    <Button color="secondary" onClick={()=>closeModal()}>Cancel</Button>
                </ModalFooter>
                    <ModalFooter>
                    <Button color="secondary" onClick={()=>saveChangesModal()}>accept</Button>
                </ModalFooter>

                </ModalBody>
            </Modal>

        </div>
    )
}


export default AcceptOrCancelModal;