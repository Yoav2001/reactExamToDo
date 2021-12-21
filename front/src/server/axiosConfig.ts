import axios from 'axios'
import { sessionStorageObjectNameToken } from './login'
const baseAxios=axios.create({
    baseURL:`http://localhost:8080/`,
    headers: {
        'Authorization': `bearer ${sessionStorage.getItem(sessionStorageObjectNameToken)}`,
        'Content-Type': 'application/json',
        }
})


    
export {baseAxios}



