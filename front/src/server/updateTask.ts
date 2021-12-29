
import {baseAxios} from './axiosConfig' 


const updateTaskAxios=async(task:Task)=>{
    console.log("add task axios function ");
    
   baseAxios({
      method:"PUT",
      url:`api/task/${task.taskId}`,
      data: {
          emailUserOfTask: task.emailUserOfTask,
          taskName: task.taskName,
          startDate: task.startDate,
          endTime: task.endTime,
          isComplete: task.isComplete,
          isRelevent: task.isRelevent
      }
  }).then((response) =>response.data)
  .catch((error) => console.log(error.response))
}



export default updateTaskAxios