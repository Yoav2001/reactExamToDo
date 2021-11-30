import  React from 'react';

import  {useState} from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Task from '../task/Task';
import dataTask from '../../data/dataTask';
// export interface IStateTasks {
//     taskList: Task[]
    
//   }
type props = {
    dataTask: Task[]
  }
  

 const ToDos:React.FC<props> =({dataTask}) =>{

    // const dataTask:Task[]=[{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false}]
    
    
    return(
            <div >
                {dataTask.map(taskItem=> {

                    return (
                        <Task task={taskItem} ></Task>
                    )

                })}
            </div>
            )
}
    
    export default ToDos;