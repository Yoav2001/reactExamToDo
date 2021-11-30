import  React from 'react';
import  {useState} from 'react';
import ToDos from '../toDos/ToDos';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './homeToDo.css'
import Task from '../task/Task';
import dataTask from '../../data/dataTask';

// export interface IStateTasks {
//     taskList: Task[]
    
//   }

 const HomeToDo=() =>{
    const [taskList,setTaskList] = useState<Task[]>(dataTask)

    const [taskToAdd, setTask] = useState<Task>({
        taskName:"",
        startDate:"01.01.2001",
        endTime: "01/01/2001",
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
        dataTask.push(taskToAdd)
        
        setTaskList([
            ...taskList,
            {      
              taskName:taskToAdd.taskName,
              endTime:taskToAdd.endTime,
              startDate:taskToAdd.startDate,
              isComplete:taskToAdd.isComplete,
              isRelevent:taskToAdd.isRelevent

            }
        ]);


    }
    
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
                <button className="btn btn-light"> Active</button>
                <button className="btn btn-light">completed</button>
                <button className="btn btn-light">All</button>

            </div>

            <ToDos dataTask={dataTask}></ToDos>
        </div>
     )
}
    
    export default HomeToDo;