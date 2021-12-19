import  React, { useEffect } from 'react';
import  {useState} from 'react';
import ToDos from '../toDos/ToDos';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './homeToDo.css'
import Task from '../task/Task';
import dataTask from '../../data/dataTask';
import {getAllTaskOfUserByEmail} from '../../server/getTaskOfUser'
import addNewTask from '../../server/addNewTask';
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


    useEffect(()=>{getAllTaskOfUserByEmail("eran@gmail.com").then((res) => {
        console.log(res.data.key);
        console.log(res.data.key[1]);
        
        setAllTask(res.data.key)
        
    })},[])

    const [taskToAdd, setTask] = useState<Task>({
        taskId:1,
        emailUserOfTask:"eran@gmail.com",
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
        
     addNewTask(taskToAdd)
        
        
        setAllTask([
            ...allTask,
            {      
                taskId:1,
                emailUserOfTask:taskToAdd.emailUserOfTask,
              taskName:taskToAdd.taskName,
              endTime:taskToAdd.endTime,
              startDate:taskToAdd.startDate,
              isComplete:taskToAdd.isComplete,
              isRelevent:taskToAdd.isRelevent

            }
        ]);


    }


    const   changeDisplayList=(stateListNumber:number)=>{
        switch(statesDisaplyTasks.get(stateListNumber)){

            case 'allTasks': setDisplayList(allTask)
                  break;

            case 'completedTasks':setDisplayList(allTask.filter(task=>task.isComplete))
            break;


            case 'releventTasks' :setDisplayList(allTask.filter(task=>task.isRelevent))
                break
            
        }


    }

    const deleteTask = (id:number) =>{

        setAllTask(allTask.filter(task  => task.taskId!==id))
        console.log("dsadas");
        
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
            <button className="btn btn-light" onClick={()=>changeDisplayList(1)}>All</button>
            <button className="btn btn-light" onClick={()=>changeDisplayList(2)}>completed</button>
              <button className="btn btn-light" onClick={()=>changeDisplayList(3)}> relvent</button>

            </div>

            <ToDos displayTaskList={displayListTask} deleteTask={deleteTask} ></ToDos>
            
        </div>
     )
}
    
    export default HomeToDo;