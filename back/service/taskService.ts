import taskDb from '../db/queries/taskQuery'
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')



export const getAllTasks :taskModal.GetAllTasks = async () => {
    
    try{
        return await taskDb.getAlltaskFromDB();
 
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
    try{
        taskDb.updateTaskByEmail(task); 
     }
     catch(error)
     {
         throw error
        
        
    }
    const res :taskModal.UpdateResult="update Succeeded"
    return res;

}

export const getAllPostsOfUser :taskModal.GetTasksOfUser = async (email:usersModel.User["email"]) => {
    console.log("service");
    
    try{
        return await taskDb.getAllTaskByUserEmail(email);
 
     }
     catch(error)
     {
        throw 'Database ' + error
    }

}





export default {getAllTasks,addNewTask,updateTask,getAllPostsOfUser}