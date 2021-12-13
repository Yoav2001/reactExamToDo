import express from 'express'
import taskService from '../service/taskService';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')
import { Itask} from '../interfaceDB/interfaceTask';
import authorize from '../middleware/authorize'
const router = express.Router()
router.use(authorize)
//task/addTask
router.post('/addTask',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const { email, taskName, startDate,endTime,isComplete,isRelevent} : {email : string, taskName : string, startDate : string, endTime : string,isComplete:boolean,isRelevent:boolean} = req.body;
    const taskToAdd :taskModal.Task={emailUserOfTask:email,taskName:taskName,startDate:startDate,endTime:endTime,isComplete:isComplete,isRelevent:isRelevent}
    const data = await taskService.addNewTask(taskToAdd)
    console.log(data)
    res.json({ key: data });
})

//task/
router.get('/',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const data = await taskService.getAllTasks();
    console.log("router");

    res.json({ key: data });
})

//task/:taskId

router.put('/:taskId',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    //לשים לב את המייל מעביר כפרמס ואת המידע בבודי
    const taskId:number =parseInt(req.params.taskId) ;     
    const { email, taskName, startDate,endTime,isComplete,isRelevent} : {email : string, taskName : string, startDate : string, endTime : string,isComplete:boolean,isRelevent:boolean} = req.body;
    const taskToUpdate :taskModal.Task={taskId:taskId,emailUserOfTask:email,taskName:taskName,startDate:startDate,endTime:endTime,isComplete:isComplete,isRelevent:isRelevent}
    const data = await taskService.updateTask(taskToUpdate)
    console.log(data)
    
    res.json({ key: data });
})

//task/email
//need to be last
//userEmail
router.get('/:userEmail',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const userEmail:string = <string>req.params.userEmail;     
    
    const data :taskModal.Task[] |undefined= await  taskService.getAllPostsOfUser(userEmail);
    console.log(data)
    res.json({ key: data });
})





// router.get('/:id',controlles.getTheFirstCard);
// router.post('/addTask',controlles.addNewClickToCard)
// router.get('/getAllTasks',controlles.getInchargeSelected);
// router.get('/getAllCompleteTasks',controlles.getCountInchargeSelected);
// router.get('/getAllInRelevent',controlles.getCountInchargeSelected);

export default router