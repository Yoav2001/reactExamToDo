
import  React from 'react';

import  {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Task from '../task/Task';

// export interface IStateTasks {
//     taskList: Task[]
    
//   }

 const ToDos=() =>{

    const dataTask:Task[]=[{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false}]
    const [taskList,setTaskList] = useState<Task[]>(dataTask)
    
    return <div >
    {taskList.map(taskItem=> {

        return (
            <Task task={taskItem}></Task>
        )

    })}
    </div>
    
}
    
    export default ToDos;