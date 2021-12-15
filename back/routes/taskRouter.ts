import express from 'express'
import taskService from '../service/taskService';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')
import { Itask} from '../db/interfaceDB/interfaceTask';
import errorHandler from '../middleware/errorHandler'
import { ErrorHandlerType } from '../middleware/errorHandler'
const router = express.Router()
//task/addTask
router.post('/addTask',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const { emailUserOfTask, taskName, startDate,endTime,isComplete,isRelevent} : {emailUserOfTask : string, taskName : string, startDate : string, endTime : string,isComplete:boolean,isRelevent:boolean} = req.body;
    if(emailUserOfTask===undefined||taskName===undefined||startDate===undefined||isComplete===undefined||isRelevent===undefined){

        const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
        return  next(errorObj);
    }
    const taskToAdd :taskModal.Task={emailUserOfTask:emailUserOfTask,taskName:taskName,startDate:startDate,endTime:endTime,isComplete:isComplete,isRelevent:isRelevent}
    const data = await taskService.addNewTask(taskToAdd)
    console.log(data)
    res.json({ key: data });
})

//task/
router.get('/',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const arrAllTasks:taskModal.Task[] |undefined= await taskService.getAllTasks();
    res.json(arrAllTasks)
  
    
})

//task/:taskId

router.put('/:taskId',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    //לשים לב את המייל מעביר כפרמס ואת המידע בבודי
    const taskId:number =parseInt(req.params.taskId) ;     
    const { emailUserOfTask, taskName, startDate,endTime,isComplete,isRelevent} : {emailUserOfTask : string, taskName : string, startDate : string, endTime : string,isComplete:boolean,isRelevent:boolean} = req.body;
    if(taskId ===undefined|| emailUserOfTask===undefined||taskName===undefined||startDate===undefined||isComplete===undefined||isRelevent===undefined){

        const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
        return  next(errorObj);
    }
    const taskToUpdate :taskModal.Task={taskId:taskId,emailUserOfTask:emailUserOfTask,taskName:taskName,startDate:startDate,endTime:endTime,isComplete:isComplete,isRelevent:isRelevent}
    console.log(taskToUpdate);
    
    const data = await taskService.updateTask(taskToUpdate)
    console.log(data)
    
    res.json({ key: data });
})

//task/email
//need to be last
//userEmail
router.get('/:userEmail',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const userEmail:string = <string>req.params.userEmail;     
    if(userEmail===undefined||userEmail===""){
        const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
        return  next(errorObj);

    }
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