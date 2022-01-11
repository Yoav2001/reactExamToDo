
import { baseAxios } from './axiosConfig'

import interceptor from './middleware/interceptor';

const deleteTaskByTaskIdAxios = async (taskId: number) => {
    // console.log("delete task with axios");
    // console.log(taskId);

    // const resopnse =await baseAxios({
    //     method:'DELETE',
    //     url:`api/task/${taskId}`
    // }).then(res=> {return res})

    // if(resopnse.status===200){


    // }




    try {
       await baseAxios({
            method: 'DELETE',
            url: `api/task/${taskId}`
        })

        console.log("axios add new task succed ");


    }
    catch (error: any) {
        interceptor.errorInterceptor(error)

    }



}   


export default deleteTaskByTaskIdAxios