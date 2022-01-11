import { baseAxios } from '../axiosConfig'
import interceptor from '../middleware/interceptor';

export const sessionStorageObjectNameToken = "JWT";
export const sessionStorageObjectNameEmail = "USER EMAIL"


export const loginAxios = async (userEmail: User["email"], pass: User["password"]) => {
    console.log("log in axios");

    // const res = baseAxios({
    //     method: 'POST',
    //     url: `login`,
    //     data: {
    //         email: userEmail,
    //         password: pass
    //     }
    // }).then(res => {
    //     console.log("then ");

    //     console.log(res);

    //     const token = res.data.token;
    //     setSessionStorageObject(token, userEmail);
    // })
    //     .catch(error => {
    //         console.log("error ");
    //         console.log(error);
    //         console.log("error status" + error.status);


    //     })

    try {
        const resAwait = await baseAxios({
            method: 'POST',
            url: `login`,
            data: {
                email: userEmail,
                password: pass
            }
        })
        const token = resAwait.data.token;
        setSessionStorageObject(token, userEmail);
    }
    catch (error: any) {


        interceptor.errorInterceptor(error)


    }

}


export const setSessionStorageObject = (jwt: string, userEmail: User["email"]) => {
    sessionStorage.setItem(sessionStorageObjectNameToken, jwt);
    sessionStorage.setItem(sessionStorageObjectNameEmail, userEmail);

}



        // if (!error.response) {
        //     alert(`there was a server problem `)   
        //     console.log("catch axios login function -error obj is undefined");
        // }

        // else {
        //     console.log("error ");
        //     console.log(error);
        //     const statusError = error.response.status;
        //     const errorMassage = error.response.data.error;
        //     alert(errorMassage)
        // }