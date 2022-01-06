
import {baseAxios} from './axiosConfig' 

export  const getAllTaskOfUserByEmail=async(userEmail:User["email"])=>{
    return baseAxios({
        method:'GET',
        url:`api/task/${userEmail}`
    })
}

