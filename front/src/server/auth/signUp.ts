import {baseAxios} from '../axiosConfig' 

export  const signUpAxios=async(user:User)=>{
    const res  = await baseAxios({
        method:'POST',
        url:`signUp/${user.email}`,
        data: {
            password: user.password,
            fullName: user.fullName,
            isAdmin: user.isAdmin
          }
    }).then(res=>{return res})

    if(res.status === 204){
        return 
        // setLoggedState(true);
    }
    else{
        
        // setError(res.data)
    }
    return
}


