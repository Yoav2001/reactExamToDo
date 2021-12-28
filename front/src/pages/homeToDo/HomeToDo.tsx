import  React, { useEffect } from 'react';
import  {useState} from 'react';

import ToDos from '../toDos/ToDos';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './homeToDo.css'
// import dataTask from '../../data/dataTask';
import {getAllTaskOfUserByEmail} from '../../server/getTaskOfUser'
import addNewTaskAxios from '../../server/addNewTask';
import deleteTaskByTaskIdAxios from '../../server/deleteTask';
import { sessionStorageObjectNameEmail } from '../../server/auth/login';
import { Modal, ModalBody } from 'reactstrap';
import Task from '../task/Task';
import UpdateTaskModal from '../modals/UpdateTaskModal';
const userEmailSessionStorage=sessionStorage.getItem(sessionStorageObjectNameEmail);
const statesDisaplyTasks = new Map();

statesDisaplyTasks.set(1,'allTasks');
statesDisaplyTasks.set(2,'completedTasks');
statesDisaplyTasks.set(3,'releventTasks');

// export interface IStateTasks {
//     taskList: Task[]
    
//   }



 const HomeToDo=() =>{
    const [isShowingModal, setIsShowingModal] = useState(true);
    // const toggleModal = () => setIsShowingModal(!isShowingModal);
    const [updateTaskObj,setUpdateTaskObj ] = useState<Task|undefined>({
    emailUserOfTask:"fdfsd",
      taskName: "",
    startDate: "",
    endTime: "",
    isComplete: false,
    isRelevent: true
  
    })

    const [allTask,setAllTask] = useState<Task[]>([])
    const [displayListTask,setDisplayList ] = useState<Task[]>([])
    const [stateDispalyList,setStateDisplayList] =useState<number>(1);

    const getAllTask = async () => {
        setTimeout(() => {
            getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
                console.log("getting all tasks for user: ", userEmailSessionStorage);
                    console.table("all tasks from server: ", res.data.key);
        
                
                const todosOfUser: Task[] = res.data.key;
                setAllTask(todosOfUser);
            })   
        }, 30);
    }

    useEffect(() => {
        console.log("first use effect");
        getAllTask();
        
        // getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
        // const todosOfUser:Task[]=res.data.key;
        // setAllTask(todosOfUser)
        // setStateDisplayList(1);
    }, []) 

    useEffect(() => {
        console.log(" second use effect -use effect display list");
        changeDisplayList(stateDispalyList)
    }, [allTask])

    const [taskToAdd, setTask] = useState<Task>({
        taskId:1,
        emailUserOfTask:userEmailSessionStorage!,
        taskName:"",
        startDate:"12-19-2021",
        endTime: "",
        isComplete:false,
        isRelevent:true
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setTask({
            ...taskToAdd,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name)
    }

    const addToDo = async () => {
      if(taskToAdd.taskName.length===0||taskToAdd.endTime.length===0){
          alert('soory you need to add task name and date ')
          return
      }

         addNewTaskAxios(taskToAdd)
            .then((res) => {
                console.log(res);
                console.log('adding new task: ', taskToAdd);
                getAllTask()
                console.log(1);
            })
            
            .catch(error => {
                console.log(2);
            })
    }

    const changeDisplayList = (stateListNumber:number) => {

        setStateDisplayList(stateListNumber)
        console.log(stateListNumber);
        console.log(statesDisaplyTasks.get(stateListNumber));
        
        
        switch(statesDisaplyTasks.get(stateListNumber)){

            case 'allTasks': setDisplayList(allTask)
                  break;

            case 'completedTasks':setDisplayList(allTask.filter(task=>task.isComplete))
            break;


            case 'releventTasks' :setDisplayList(allTask.filter(task=>task.isRelevent))
                break
            
        }


    }

    const deleteTask = async(taskId:number) =>{
        
          deleteTaskByTaskIdAxios(taskId).then(()=>{getAllTask()} )
        
      
        
    }

    const updateTaskOpenModal = (task:Task) =>{
        setUpdateTaskObj(task)
    }
    // const getCompleteTasks =()=>{
    //     setDisplayList(allTask.filter(task=>task.isComplete))
    // } 
    
    return(
        <div className="background">
            <div> to do app</div>

            <br></br>
            <div className="input-group mb-3 addToDoForm">
                <input  value={taskToAdd.taskName} onChange={handleChange} name="taskName"  type="text" className="form-control" placeholder="task Name" aria-label="task Name" aria-describedby="basic-addon1" /> 
                <input required type="date" defaultValue={taskToAdd.endTime}  onChange={handleChange} name={"endTime"}  className="form-control" aria-label="Username" aria-describedby="basic-addon1" /> 
                <button className="btn btn-secondary" onClick={addToDo} >add task </button>

            </div>
            <div className="divBtnTask">
            <button className={stateDispalyList===1 ? "btn btn-primary" :"btn btn-light"}onClick={()=>changeDisplayList(1)}>All</button>
            <button className={stateDispalyList===2 ? "btn btn-primary" :"btn btn-light"} onClick={()=>changeDisplayList(2)}>completed</button>
              <button className={stateDispalyList===3 ? "btn btn-primary" :"btn btn-light"} onClick={()=>changeDisplayList(3)}> relvent</button>

            </div>

            <ToDos displayTaskList={displayListTask} deleteTask={deleteTask} updateTask={updateTaskOpenModal} ></ToDos>
            {/* <Modal isOpen={isShowingModal} toggle={toggleModal} >
                <h1>update task</h1>
                <ModalBody>
                    שם פרטי
                    שם משפחה
                </ModalBody>
            </Modal> */}
            <UpdateTaskModal updateTaskObj={updateTaskObj!} setUpdateTask={setUpdateTaskObj} />
        </div>
     )
}
    
    export default HomeToDo;