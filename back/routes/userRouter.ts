import express from 'express'
import userService from '../service/userService';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')
const router = express.Router();



router.post('/addUser',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const { email, password, fullName,isAdmin} : {email : string, password : string, fullName : string,isAdmin:boolean} = req.body;
    const userToAdd :usersModel.User={email,password,fullName,isAdmin}
    const data = await userService.addUser(userToAdd)
    console.log(data)
    res.json({ key: data });
})

router.get('/getAllUsers',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    
    const data = await userService.getAllUsers();
    console.log(data)
    res.json({ key: data });
})

router.patch('/getAllUsers',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    //לשים לב את המייל מעביר כפרמס ואת המידע בבודי
    const email:string = <string>req.params.email;     
    const {  password, fullName,isAdmin} : {email : string, password : string, fullName : string,isAdmin:boolean} = req.body;
    const userToAdd :usersModel.User={email,password,fullName,isAdmin}
    const data = await userService.addUser(userToAdd)
    console.log(data)
    res.json({ key: data });
})
//need to be last
router.get('/:email',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const email:string = <string>req.params.email;     
    
    const data = await userService.getUserDataWithEmail(email);
    console.log(data)
    res.json({ key: data });
})
export default router

//put מחליף את כל האובייקט

//patch מחליף