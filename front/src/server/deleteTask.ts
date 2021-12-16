
import { error } from 'jquery'
import {baseAxios} from './axiosConfig' 


const deleteTaskByTaskId=(taskId:number)=>{
    const resopnse =baseAxios({
        method:'delete',
        url:`api/task/${taskId}`
    }).then(


    )
    .catch((error))

}