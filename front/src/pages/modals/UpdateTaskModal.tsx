import  React, { useEffect } from 'react';
import  {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import dataTask from '../../data/dataTask';
import { Modal, ModalBody } from 'reactstrap';
import Task from '../task/Task';


// export interface IStateTasks {
//     taskList: Task[]
    
//   }


type props = {
    updateTaskObj: Task
    setUpdateTask :(task:Task)=>void
  }


   

    const UpdateTaskModal:React.FC<props> =({updateTaskObj,setUpdateTask})=>{
        
        const [isShowingModal, setIsShowingModal] = useState(true);
        const toggleModal = () => setIsShowingModal(!isShowingModal);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdateTask({
                ...updateTaskObj,
                [e.target.name]: e.target.value
            });
            console.log(e.target.name)
          }
        
    return(
        <div className="background">
       

            <Modal isOpen={isShowingModal}  toggle={toggleModal} >
                <h1>update task</h1>
                <ModalBody>

                    <h3>name task:</h3>
                    <input value={updateTaskObj.taskName} onChange={handleChange} name="fullName"  type="text" className="form-control" placeholder="" aria-label="task Name" aria-describedby="basic-addon1"/> 

                    <h3>date end task:</h3>
                    <input  type="date" defaultValue={updateTaskObj.endTime}  onChange={handleChange} name={"endTime"}  className="form-control" aria-label="Username" aria-describedby="basic-addon1"/> 



                </ModalBody>
            </Modal>

        </div>
     )
}
 
    
    export default UpdateTaskModal;