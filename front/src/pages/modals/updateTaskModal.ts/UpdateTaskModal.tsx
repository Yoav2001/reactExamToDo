import React, { useEffect } from 'react';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './updateTaskModal.css'



type props = {
    updateTaskObj: Task
    isShowingUpdateTaskModal: boolean
    toggleUpdateTaskModal: () => void
    setUpdateTaskObj: (task: Task) => void
    saveUpdateChanges: (task: Task) => void
}




const UpdateTaskModal: React.FC<props> = ({ updateTaskObj, isShowingUpdateTaskModal, setUpdateTaskObj, toggleUpdateTaskModal, saveUpdateChanges }) => {
    const [taskUpdateInputs, setTaskUpdateInputs] = useState<Task>(updateTaskObj);

   
    
    useEffect(() => {
        console.log(taskUpdateInputs.endTime);
        
    },[])

    useEffect(() => {
        setTaskUpdateInputs({ ...updateTaskObj })
        console.log(taskUpdateInputs.endTime);

    }, [updateTaskObj])

    useEffect(() => {

    }, [taskUpdateInputs])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskUpdateInputs({
            ...taskUpdateInputs,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name)
    }


    const closeModal = () => {

        setTaskUpdateInputs(updateTaskObj);
        toggleUpdateTaskModal()

    }
    const saveChangesModal = () => {
        if (taskUpdateInputs.taskName === "" && taskUpdateInputs.taskName === "") {
            alert("soory you need to give values to update")
        }


        saveUpdateChanges(taskUpdateInputs)
        toggleUpdateTaskModal()
    }

    return (
        <div className="background">


            <Modal isOpen={isShowingUpdateTaskModal} toggle={toggleUpdateTaskModal} >
                <ModalFooter>
                    <h4 className='m-auto'>update task</h4>
                    <Button
                        color="secondary"
                        className='btn-close btn-close' onClick={() => closeModal()}>
                    </Button>

                </ModalFooter>

                <ModalBody className='modalBody'>


                    <p>name task:</p>
                    <input
                        value={taskUpdateInputs.taskName}
                        onChange={(e: any) => setTaskUpdateInputs({ ...taskUpdateInputs, taskName: e.target.value })}
                        name="fullName"
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="task Name"
                        aria-describedby="basic-addon1"
                    />

                    <p>date end task:</p>
                    <input
                        type="date"
                        onChange={handleChange}
                        name={"endTime"}
                        defaultValue={taskUpdateInputs.endTime}
                        className="form-control"
                        aria-label="Username"
                        aria-describedby="basic-addon1" />


                    <ModalFooter>
                        <Button
                            color="secondary" onClick={() => saveChangesModal()}>Save
                        </Button>
                    </ModalFooter>

                </ModalBody>
            </Modal>

        </div>
    )
}


export default UpdateTaskModal;