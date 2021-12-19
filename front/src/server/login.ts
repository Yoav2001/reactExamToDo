import {baseAxios} from './axiosConfig' 

export  const loginAxios=async(userEmail:User["email"],pass:User["password"])=>{
    return baseAxios({
        method:'POST',
        url:`login`,
        data: {
            email: userEmail,
            password: pass
          }
    })
}