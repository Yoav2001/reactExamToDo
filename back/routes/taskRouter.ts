import express from 'express'

import taskService from '../service/taskService';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')
const router = express.Router();


router.post('/addTask',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const { email, taskName, startDate,endTime,isComplete,isRelevent} : {email : string, taskName : string, startDate : string, endTime : string,isComplete:boolean,isRelevent:boolean} = req.body;
    const taskToAdd :taskModal.Task={emailUserOfTask:email,taskName:taskName,startDate:startDate,endTime:endTime,isComplete:isComplete,isRelevent:isRelevent}
    const data = await taskService.addNewTask(taskToAdd)
    console.log(data)
    res.json({ key: data });
})

router.get('/getAlltasks',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const data = await taskService.getAllTasks();
    console.log(data)
    res.json({ key: data });
})

router.patch('/updateTask/:taskId',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    //לשים לב את המייל מעביר כפרמס ואת המידע בבודי
    const taskId:string = <string>req.params.taskId;     
    const { email, taskName, startDate,endTime,isComplete,isRelevent} : {email : string, taskName : string, startDate : string, endTime : string,isComplete:boolean,isRelevent:boolean} = req.body;
    const taskToUpdate :taskModal.Task={emailUserOfTask:email,taskName:taskName,startDate:startDate,endTime:endTime,isComplete:isComplete,isRelevent:isRelevent}
    const data = await taskService.updateTask(taskToUpdate)
    console.log(data)
    res.json({ key: data });
})
//need to be last
router.get('/:emailUser',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const emailUser:string = <string>req.params.emailUser;     
    
    const data = await  taskService.getAllPostsOfUser(emailUser);
    console.log(data)
    res.json({ key: data });
})





// router.get('/:id',controlles.getTheFirstCard);
// router.post('/addTask',controlles.addNewClickToCard)
// router.get('/getAllTasks',controlles.getInchargeSelected);
// router.get('/getAllCompleteTasks',controlles.getCountInchargeSelected);
// router.get('/getAllInRelevent',controlles.getCountInchargeSelected);

export default router