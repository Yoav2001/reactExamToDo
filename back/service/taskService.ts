import taskDb from '../db/queries/taskQuery'
import { Itask } from '../interfaceDB/interfaceTask';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')



export const getAllTasks :taskModal.GetAllTasks = async () => {
    
    try{
        const arrTaskObjDb:Itask[] |undefined= await taskDb.getAlltaskFromDB();
            if(arrTaskObjDb===undefined){
                console.log("error");
            return []

            }

        const arrByModelUser:taskModal.Task[]= arrTaskObjDb.map(taskObjDb =>{return {taskId:taskObjDb.id,emailUserOfTask:taskObjDb.useremail
            ,taskName:taskObjDb.name,startDate:taskObjDb.startdate,endTime:taskObjDb.endtime,isComplete:taskObjDb.iscomplete,isRelevent:taskObjDb.isrelevent}})
            
        return arrByModelUser; 
     }
     catch(error)
     {
        throw 'Database ' + error
    }

}

export const addNewTask: taskModal.AddTask = async (task:taskModal.Task) => {
    try{
        taskDb.insertNewTask(task); 
     }
     catch(error)
     {
         throw error
        
        
    }
    const res :taskModal.AddResult="Added Succeeded"
    return res;
}



export const updateTask: taskModal.updateTask= async (task:taskModal.Task) => {


    if (task?.taskId === undefined || "") return "sorry cant update without task ID"

    const getTask = await taskDb.getTaskByTaskId(task.taskId);
    
    if(!getTask) return "sorry cant update without task ID"
    try {
        taskDb.updateTaskByTaskObject(task);
        return "update Succeeded"
    }
    catch{
        return "Failed to update"
    }
   
}

export const getAllPostsOfUser :taskModal.GetTasksOfUser = async (email:usersModel.User["email"]) => {
    console.log("service");
    
    try{
        const arrTaskObjDb:Itask[] |undefined= await taskDb.getAllTaskByUserEmail(email);
        if(arrTaskObjDb===undefined){
            console.log("error");
        return

        }

     const arrByModelUser:taskModal.Task[]= arrTaskObjDb.map(taskObjDb =>{return {taskId:taskObjDb.id,emailUserOfTask:taskObjDb.useremail
        ,taskName:taskObjDb.name,startDate:taskObjDb.startdate,endTime:taskObjDb.endtime,isComplete:taskObjDb.iscomplete,isRelevent:taskObjDb.isrelevent}})
        
     return arrByModelUser; 
 
     }
     catch(error)
     {
        throw 'Database ' + error
    }

}





export default {getAllTasks,addNewTask,updateTask,getAllPostsOfUser}