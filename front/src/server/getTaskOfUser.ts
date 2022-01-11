
import {baseAxios} from './axiosConfig' 
import interceptor from './middleware/interceptor';

export  const getAllTaskOfUserByEmail=async(userEmail:User["email"])=>{
    // return baseAxios({
    //     method:'GET',
    //     url:`api/task/${userEmail}`
    // })

    try {
        const res =await  baseAxios({
            method:'GET',
            url:`api/task/${userEmail}`
        })
        console.log(`res  get all`,res);
        
        return res

     }
     catch (error: any) {
         interceptor.errorInterceptor(error)
 
     }
}

