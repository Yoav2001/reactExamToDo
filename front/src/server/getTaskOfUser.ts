
import {baseAxios} from './axiosConfig' 

// login("eran@gmai`l.com","nuni1234")
export  const getAllTaskOfUserByEmail=async(userEmail:User["email"])=>{
    return baseAxios({
        method:'GET',
        url:`api/task/${userEmail}`
    })
}

