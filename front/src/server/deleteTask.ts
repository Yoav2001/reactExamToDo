
import {baseAxios} from './axiosConfig' 


const deleteTaskByTaskIdAxios= async(taskId:number)=>{
    console.log("delete task with axios");
    console.log(taskId);
    
    const resopnse =await baseAxios({
        method:'DELETE',
        url:`api/task/${taskId}`
    }).then(res=> {return res})
    

    alert(resopnse)

}

export default deleteTaskByTaskIdAxios