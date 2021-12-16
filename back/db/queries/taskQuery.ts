
import pool from '../connection'
import type taskModal = require('../../modals/taskModal')
import type usersModel = require('../../modals/userModal')
import type taskModalDb = require('../interfaceDB/interfaceTask')
import { Iuser } from '../interfaceDB/interfaceUser'
//  async function getAlltaskFromDB () {
//     const client = await pool.connect();

//     const sqlAllUsers= `SELECT * FROM tasks`
  
//     try {
//       const { rows } = await client.query(sqlAllUsers)
//       console.log(rows);
      
//       client.release();//משחרר את 
//       return rows;
//     } catch (err) {
//       console.log('Database ' + err)
//     }
//   }

  const  getAlltaskFromDB:taskModalDb.GetAllTasks =async()=>{
    const client = await pool.connect();

    const sqlAllUsers= `SELECT * FROM tasks`
  
    try {
      const { rows } = await client.query(sqlAllUsers)
      console.log(rows);
      
      client.release();//משחרר את 
      return rows;
    } catch (err) {
      console.log('Database ' + err)
    }
  }

  const getTaskByTaskId:taskModalDb.GetTaskByTaskId=async(id:taskModalDb.Itask["id"])=> {

    const client = await pool.connect();
 

    const selectByTaskID = `select * from tasks where id = ${id}`
    console.log(selectByTaskID);
    
    try{
      const {rows}  = await client.query(selectByTaskID);
      const task : Promise<taskModalDb.Itask | undefined> = rows[0]
      client.release();
      return task;
    } 
  
    catch (error) {
      throw error;
    }
  }

   const insertNewTask = async(taskObj :taskModal.Task)=> {
    const client = await pool.connect();
  
      const insertQuery = `INSERT INTO tasks (userEmail,name,startDate,endTime,isComplete,isRelevent)
              VALUES ('${taskObj.emailUserOfTask}','${taskObj.taskName}','${taskObj.startDate}','${taskObj.endTime}','${taskObj.isComplete}','${taskObj.isRelevent}')`;
    console.log(insertQuery);
    
      try{
        const res =  client.query(insertQuery)
      } 
  
      catch (error) {
         throw error;
      }
  
  
  }
  

  const getAllTaskByUserEmail:taskModalDb.GetTasksOfUser = async(email : usersModel.User["email"]) =>{

    const client = await pool.connect();
    const selectByEmail = `SELECT * FROM tasks WHERE userEmail = '${email}'`
    const res =   (await client.query(selectByEmail)).rows
    return res;
  }

  // //write select user with type and async and await
  //  async function getAllTaskByUserEmail(email : usersModel.User["email"]): Promise<Itask[] | undefined>{
  //   const client = await pool.connect();
  //   const selectByEmail = `SELECT * FROM tasks WHERE userEmail = '${email}'`
  //   const res =   (await client.query(selectByEmail)).rows
  //   return res;
  // }

  const deleteTaskByTaskId= async(taskId : taskModal.Task["taskId"])=> {
    const client = await pool.connect();
  
    const deleteByEmail = `Delete FROM tasks WHERE id ='${taskId}'`
    try{
      await client.query(deleteByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }

  const updateTaskByTaskObject=async(taskObj:taskModal.Task)=> {
    const client = await pool.connect();


    const updateByEmail = `update tasks set name = '${taskObj.taskName}' , startDate = '${taskObj.startDate}' , endTime = '${taskObj.endTime}', isComplete = ${taskObj.isComplete} , isRelevent = ${taskObj.isRelevent}  where id = ${taskObj.taskId} `
    console.log(updateByEmail);
    
    try{
      const res =  client.query(updateByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }




  
  

    export default {getAlltaskFromDB,insertNewTask,getAllTaskByUserEmail,deleteTaskByTaskId,updateTaskByTaskObject,getTaskByTaskId}
  
  
  
  //   export default {insertUser}