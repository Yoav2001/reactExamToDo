import axios from 'axios'
import { sessionStorageObjectNameToken } from './auth/login'
import defaultError from './middleware/interceptor'

const baseAxios=axios.create({
    baseURL:`http://localhost:8080/`,
    headers: {
        'Authorization': `bearer ${sessionStorage.getItem(sessionStorageObjectNameToken)}`,
        'Content-Type': 'application/json',
        }
})

baseAxios.interceptors.response.use(response => response,defaultError)


    
export {baseAxios}



