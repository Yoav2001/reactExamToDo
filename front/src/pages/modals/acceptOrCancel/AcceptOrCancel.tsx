import React, { useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import './acceptOrCancel.css'
import 'bootstrap/dist/css/bootstrap.min.css';



type props = {
    headerModalText: string
    bodyModalText: string
    isShowingModal: boolean
    idTaskWhenAcceptModal: Task["taskId"]
    acceptModalFunction: (idTask: Task["taskId"]) => void
    toggleModal: () => void


}




const AcceptOrCancelModal: React.FC<props> = ({ headerModalText, bodyModalText, isShowingModal, toggleModal, acceptModalFunction, idTaskWhenAcceptModal }) => {

    const closeModal = () => {
        toggleModal()
    }
    const saveChangesModal = () => {
        acceptModalFunction(idTaskWhenAcceptModal)
        toggleModal()
    }

    return (
        <div className="background">


            <Modal isOpen={isShowingModal} toggle={toggleModal} >


                <ModalBody className='modalBody'>
                    <h4>{headerModalText}</h4>
                    <h6>{bodyModalText}</h6>
                    <br></br>


                    <ModalFooter className='btnsOkAndCancel'>

                        <Button
                            color="secondary"
                            onClick={() => saveChangesModal()}>ok
                        </Button>
                        
                        <Button
                            color="secondary" onClick={() => closeModal()}>
                            Cancel
                        </Button>

                    </ModalFooter>


                </ModalBody>
            </Modal>

        </div>
    )
}


export default AcceptOrCancelModal;