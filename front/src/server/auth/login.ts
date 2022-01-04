import { baseAxios } from '../axiosConfig'
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
    catch(error:any) {
        console.log("error ");
        console.log(error);
        const statusError=error.response.status;
        const errorMassage=error.response.data.error;
        alert(errorMassage)
    }

}


export const setSessionStorageObject = (jwt: string, userEmail: User["email"]) => {
    sessionStorage.setItem(sessionStorageObjectNameToken, jwt);
    sessionStorage.setItem(sessionStorageObjectNameEmail, userEmail);

}
