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
}
  

 const ToDos:React.FC<props> =({displayTaskList,deleteTask}) =>{

    // const dataTask:Task[]=[{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false}]
    
    
    return(
            <div >
                {displayTaskList.map(taskItem=> {

                    return (
                        <Task task={taskItem} key={taskItem.id} deleteTask={deleteTask} ></Task>
                    )

                })}
            </div>
            )
}
    
    export default ToDos;