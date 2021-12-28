
import {baseAxios} from './axiosConfig' 


  const addNewTaskAxios=async(task:Task)=>{
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
    }).then((response) =>response.data)
    .catch((error) => console.log(error.response))
}



export default addNewTaskAxios