import { baseAxios } from '../axiosConfig'

export const signUpAxios = async (user: User) => {
    // const res = await baseAxios({
    //     method: 'POST',
    //     url: `signUp/${user.email}`,
    //     data: {
    //         password: user.password,
    //         fullName: user.fullName,
    //         isAdmin: user.isAdmin
    //     }
    // }).then(res => { return res })





    try {
         await baseAxios({
            method: 'POST',
            url: `signUp/${user.email}`,
            data: {
                password: user.password,
                fullName: user.fullName,
                isAdmin: user.isAdmin
            }
        })

        console.log("axios sign up : sign up succed ");
        
     
    }
    catch (error: any) {
        console.log("error ");
        console.log(error);
        const statusError = error.response.status;
        const errorMassage = error.response.data.error;
        
        console.log(`Error - status :${statusError} , ${errorMassage}` );
        alert(errorMassage)
    }

}



