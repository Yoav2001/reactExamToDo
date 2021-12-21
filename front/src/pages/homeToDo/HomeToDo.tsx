import  React, { useEffect } from 'react';
import  {useState} from 'react';
import ToDos from '../toDos/ToDos';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './homeToDo.css'
import Task from '../task/Task';
import dataTask from '../../data/dataTask';
import {getAllTaskOfUserByEmail} from '../../server/getTaskOfUser'
import addNewTaskAxios from '../../server/addNewTask';
import deleteTaskByTaskIdAxios from '../../server/deleteTask';
import { sessionStorageObjectNameEmail } from '../../server/login';
const userEmailSessionStorage=sessionStorage.getItem(sessionStorageObjectNameEmail);
const statesDisaplyTasks = new Map();

statesDisaplyTasks.set(1,'allTasks');
statesDisaplyTasks.set(2,'completedTasks');
statesDisaplyTasks.set(3,'releventTasks');

// export interface IStateTasks {
//     taskList: Task[]
    
//   }

 const HomeToDo=() =>{
    const [allTask,setAllTask] = useState<Task[]>([])
    const [displayListTask,setDisplayList ] = useState<Task[]>([])
    const [stateDispalyList,setStateDisplayList] =useState<number>(1);

    useEffect(()=>{
        getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
        console.log(res.data.key);
        console.log(res.data.key[1]);
        const todosOfUser:Task[]=res.data.key;
        setAllTask(todosOfUser)
        setDisplayList(todosOfUser)
        
    })},[])


     
    

    const [taskToAdd, setTask] = useState<Task>({
        taskId:1,
        emailUserOfTask:userEmailSessionStorage!,
        taskName:"",
        startDate:"12-19-2021",
        endTime: "12-22-2001",
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

    const addToDo =()=>{
        console.log("add task function");
        
        addNewTaskAxios(taskToAdd)
        
        getAllTaskOfUserByEmail(userEmailSessionStorage!).then((res) => {
            console.log(res.data.key);
            console.log(res.data.key[1]);
            const todosOfUser:Task[]=res.data.key;
            setAllTask(todosOfUser)
            setDisplayList(todosOfUser)
            
        })        // setAllTask([
        //     ...allTask,
        //     {      
        //         taskId:1,
        //         emailUserOfTask:taskToAdd.emailUserOfTask,
        //       taskName:taskToAdd.taskName,
        //       endTime:taskToAdd.endTime,
        //       startDate:taskToAdd.startDate,
        //       isComplete:taskToAdd.isComplete,
        //       isRelevent:taskToAdd.isRelevent

        //     }
        // ]);


    }


    const   changeDisplayList=(stateListNumber:number)=>{
        setStateDisplayList(stateListNumber)

        switch(statesDisaplyTasks.get(stateListNumber)){

            case 'allTasks': setDisplayList(allTask)
                  break;

            case 'completedTasks':setDisplayList(allTask.filter(task=>task.isComplete))
            break;


            case 'releventTasks' :setDisplayList(allTask.filter(task=>task.isRelevent))
                break
            
        }


    }

    const deleteTask = (taskId:number) =>{
        deleteTaskByTaskIdAxios(taskId)
        setAllTask(allTask.filter(task  => task.taskId!==taskId))
        
    }

    // const getCompleteTasks =()=>{
    //     setDisplayList(allTask.filter(task=>task.isComplete))
    // } 
    
    return(
        <div className="background">
            <div> to do app</div>

            <br></br>
            <div className="input-group mb-3 addToDoForm">
                <input value={taskToAdd.taskName} onChange={handleChange} name="taskName"  type="text" className="form-control" placeholder="task Name" aria-label="task Name" aria-describedby="basic-addon1"/> 
                <input  type="date" defaultValue={taskToAdd.endTime}  onChange={handleChange} name={"endTime"}  className="form-control" aria-label="Username" aria-describedby="basic-addon1"/> 
                <button className="btn btn-secondary" onClick={addToDo} >add task </button>

            </div>
            <div className="divBtnTask">
            <button className={stateDispalyList===1 ? "btn btn-primary" :"btn btn-light"}onClick={()=>changeDisplayList(1)}>All</button>
            <button className={stateDispalyList===2 ? "btn btn-primary" :"btn btn-light"} onClick={()=>changeDisplayList(2)}>completed</button>
              <button className={stateDispalyList===3 ? "btn btn-primary" :"btn btn-light"} onClick={()=>changeDisplayList(3)}> relvent</button>

            </div>

            <ToDos displayTaskList={displayListTask} deleteTask={deleteTask} ></ToDos>
            
        </div>
     )
}
    
    export default HomeToDo;