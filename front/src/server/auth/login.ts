import {baseAxios} from '../axiosConfig' 
export const sessionStorageObjectNameToken = "JWT";
export  const sessionStorageObjectNameEmail="USER EMAIL"
export  const loginAxios=async(userEmail:User["email"],pass:User["password"])=>{
    console.log("log in axios");
    
    const res  = await baseAxios({
        method:'POST',
        url:`login`,
        data: {
            email: userEmail,
            password: pass
          }
    }).then(res=>{return res})
    console.log(res);
    
    if(res.status === 200){
        const token=res.data.token;
  
        
        setSessionStorageObject(token,userEmail);
  
        
        // setLoggedState(true);
    }
    else{
        // setError(res.data)
    }
}


export const setSessionStorageObject = (jwt: string,userEmail: User["email"]) => {
    sessionStorage.setItem(sessionStorageObjectNameToken, jwt);
    sessionStorage.setItem(sessionStorageObjectNameEmail, userEmail);

}
