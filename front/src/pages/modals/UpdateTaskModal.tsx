import React, { useEffect } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import dataTask from '../../data/dataTask';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import Task from '../task/Task';
import homeToDO from '../homeToDo/HomeToDo'
import './updateTaskModal.css'
import updateTaskAxios from '../../server/updateTask';
// export interface IStateTasks {
//     taskList: Task[]

//   }


type props = {
    updateTaskObj: Task
    isShowingUpdateTaskModal: boolean
    toggleUpdateTaskModal: () => void
    setUpdateTaskObj: (task:Task) => void
    saveUpdateChanges:(task:Task) => void
}




const UpdateTaskModal: React.FC<props> = ({ updateTaskObj, isShowingUpdateTaskModal, setUpdateTaskObj,toggleUpdateTaskModal,saveUpdateChanges}) => {
    const [taskUpdateInputs, setTaskUpdateInputs] = useState<Task>(updateTaskObj);
    
    useEffect(() => {
        setTaskUpdateInputs({...updateTaskObj})
        // console.log('original: ', updateTaskObj);
    }, [updateTaskObj])

    useEffect(() => {
        console.log("orignal second",updateTaskObj);

        // console.log('modified: ', taskUpdateInputs);
    }, [taskUpdateInputs])
  
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskUpdateInputs({
            ...taskUpdateInputs,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name)
    }


    const closeModal = () =>{

        setTaskUpdateInputs(updateTaskObj);
        toggleUpdateTaskModal()
           
    }
    const saveChangesModal = () =>{
        if(taskUpdateInputs.taskName===""&&taskUpdateInputs.taskName===""){
            alert("soory you need to give values to update")
        }
        console.log("save changes ---");
        
        console.log("orignal :",updateTaskObj);
        console.log("modifend",taskUpdateInputs);

        saveUpdateChanges(taskUpdateInputs)
        toggleUpdateTaskModal()
    }
    
    return (
        <div className="background">


            <Modal isOpen={isShowingUpdateTaskModal} toggle={toggleUpdateTaskModal} >

                <ModalFooter>
                    <Button color="secondary" onClick={()=>closeModal()}>Cancel</Button>
                </ModalFooter>
                <h4>update task</h4>
                <ModalBody className='modalBody'>

                    <p>name task:</p>
                    <input
                        value={taskUpdateInputs.taskName}
                        onChange={(e: any) => setTaskUpdateInputs({...taskUpdateInputs, taskName: e.target.value})}
                        name="fullName"
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="task Name"
                        aria-describedby="basic-addon1"
                    />
                    
                    <p>date end task:</p>
                    <input type="date" onChange={handleChange} name={"endTime"} defaultValue={new Date(taskUpdateInputs.endTime).toString()} className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
                    <ModalFooter>
                    <Button color="secondary" onClick={()=>saveChangesModal()}>Save</Button>
                </ModalFooter>

                </ModalBody>
            </Modal>

        </div>
    )
}


export default UpdateTaskModal;