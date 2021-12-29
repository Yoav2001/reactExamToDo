import  React from 'react';


// import 'bootstrap/dist/css/bootstrap.min.css';
import Task from '../task/Task';
import dataTask from '../../data/dataTask';
// export interface IStateTasks {
//     taskList: Task[]
    
//   }
type props = {
    displayTaskList: Task[],
    deleteTask :(idTask:number) => void,
    completeTask:(task:Task) => void,
    updateTask: (task:Task) => void,
    isShowCompleteTaskBtn: boolean

}
  

 const ToDos:React.FC<props> =({displayTaskList,deleteTask,completeTask,updateTask,isShowCompleteTaskBtn}) =>{

    // const dataTask:Task[]=[{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false},{taskName:"dsadas",endTime:"11.02.03",isComplete:true,isRelevent:false}]
    
    
    return(
            <div >
                {displayTaskList.map(taskItem=> {

                    return (
                        <Task task={taskItem} key={taskItem.taskId} deleteTask={deleteTask} completeTask={completeTask} isShowCompleteTaskBtn={isShowCompleteTaskBtn} updateTask={updateTask} ></Task>
                    )

                })}
            </div>
            )
}
    
    export default ToDos;