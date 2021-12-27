import  React from 'react';


// import 'bootstrap/dist/css/bootstrap.min.css';
import Task from '../task/Task';
import dataTask from '../../data/dataTask';
// export interface IStateTasks {
//     taskList: Task[]
    
//   }
type props = {
    displayTaskList: Task[],
    deleteTask :(idTask:number) => void
    updateTask: (task:Task) => void
}
  

 const ToDos:React.FC<props> =({displayTaskList,deleteTask,updateTask}) =>{

    // const dataTask:Task[]=[{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false}]
    
    
    return(
            <div >
                {displayTaskList.map(taskItem=> {

                    return (
                        <Task task={taskItem} key={taskItem.taskId} deleteTask={deleteTask} updateTask={updateTask} ></Task>
                    )

                })}
            </div>
            )
}
    
    export default ToDos;