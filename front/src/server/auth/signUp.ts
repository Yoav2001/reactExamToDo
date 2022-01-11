import { baseAxios } from '../axiosConfig'
import interceptor from '../middleware/interceptor';
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
        interceptor.errorInterceptor(error)
    }
}



