
import {baseAxios} from './axiosConfig' 


  const addNewTask=async(task:Task)=>{
      console.log("add task axios function ");
      
     baseAxios({
        method:'POST',
        url:`api/task/addTask`,
        data: {
            emailUserOfTask: task.emailUserOfTask,
            taskName: task.taskName,
            startDate: task.startDate,
            endTime: task.endTime,
            isComplete: task.isComplete,
            isRelevent: task.isRelevent
        }
    })
}



export default    addNewTask