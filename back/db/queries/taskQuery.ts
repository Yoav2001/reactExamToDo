
import pool from '../connection'
import type taskModal = require('../../modals/taskModal')
import type usersModel = require('../../modals/userModal')
 async function getAlltaskFromDB ():Promise<taskModal.Task[] | undefined> {
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
  

  //write select user with type and async and await
   async function getAllTaskByUserEmail(email : usersModel.User["email"]): Promise<taskModal.Task[] | undefined>{
    const client = await pool.connect();
    const selectByEmail = `SELECT * FROM tasks WHERE userEmail = '${email}'`
    const res =   (await client.query(selectByEmail)).rows
    return res;
  }

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

  const updateTaskByEmail=async(taskObj:taskModal.Task)=> {
    const client = await pool.connect();

``
    const updateByEmail = `update tasks set name=${taskObj.taskName} , startDate=${taskObj.startDate} , endTime=${taskObj.endTime} , isComplete=${taskObj.taskName} , isRelevent=${taskObj.isRelevent}, where id = ${taskObj.taskId} `
    try{
      const res =  client.query(updateByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }

  const getTaskByTaskId=async(id:taskModal.Task["taskId"])=> {

    const client = await pool.connect();
    const selectByTaskID = `select * from tasks where id = ${id}`
    console.log(selectByTaskID);
    
    try{
      const res = await client.query(selectByTaskID)
      client.release();
      return res;
    } 
  
    catch (error) {
      throw error;
    }
  }


  
  

    export default {getAlltaskFromDB,insertNewTask,getAllTaskByUserEmail,deleteTaskByTaskId,updateTaskByEmail,getTaskByTaskId}
  
  
  
  //   export default {insertUser}