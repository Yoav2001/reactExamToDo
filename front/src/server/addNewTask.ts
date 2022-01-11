
import {baseAxios} from './axiosConfig' 

import interceptor from './middleware/interceptor';

  const addNewTaskAxios=async(task:Task)=>{
      console.log("add task axios function ");
      
    //  baseAxios({
    //     method:'POST',
    //     url:`api/task/addTask`,
    //     data: {
    //         emailUserOfTask: task.emailUserOfTask,
    //         taskName: task.taskName,
    //         startDate: task.startDate,
    //         endTime: task.endTime,
    //         isComplete: task.isComplete,
    //         isRelevent: task.isRelevent
    //     }
    // }).then((response) =>response.data)
    // .catch((error) => console.log(error.response))



    try {
        await   baseAxios({
            method:'POST',
            url:`api/task/addTask`,
            data: {
                email: task.emailUserOfTask,
                taskName: task.taskName,
                startDate: task.startDate,
                endTime: task.endTime,
                isComplete: task.isComplete,
                isRelevent: task.isRelevent
            }
        })

        console.log("axios add new task succed ");
        
     
    }
    catch (error: any) {
        interceptor.errorInterceptor(error)

    }


    
}



export default addNewTaskAxios