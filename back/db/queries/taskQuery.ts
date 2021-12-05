
import pool from '../connection'
import type taskModal = require('../../modals/taskModal')
import type usersModel = require('../../modals/userModal')


 async function getAlltaskFromDB ():Promise<taskModal.Task[] | undefined> {
    const client = await pool.connect();
    const sqlAllUsers= `SELECT * FROM tasks`
  
    try {
      const { rows } = await client.query(sqlAllUsers)
      client.release();//משחרר את 
      return rows;
    } catch (err) {
      console.log('Database ' + err)
    }
  }

   const insertNewTask = async(taskObj :taskModal.Task)=> {
    const client = await pool.connect();
  
      const insertQuery = `INSERT INTO tasks (task_email_user,task_name,startDate,endTime,isComplete,isRelevent)
              VALUES ('${taskObj.emailUserOfTask}','${taskObj.taskName}','${taskObj.startDate}','${taskObj.endTime}','${taskObj.isComplete}','${taskObj.isRelevent}')`;
  
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
    const selectByEmail = `SELECT * FROM tasks WHERE task_email_user = '${email}'`
    const res =   (await client.query(selectByEmail)).rows[0]
    return res;
  }

  const deleteTaskByTaskId= async(taskId : taskModal.Task["taskId"])=> {
    const client = await pool.connect();
  
    const deleteByEmail = `Delete FROM tasks WHERE task_id ='${taskId}'`
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
    const updateByEmail = `update tasks set task_name=${taskObj.taskName} , startDate=${taskObj.startDate} , endTime=${taskObj.endTime} , isComplete=${taskObj.taskName} , isRelevent=${taskObj.isRelevent}, where email = ${taskObj.emailUserOfTask} `
    try{
      const res =  client.query(updateByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }
  
  
  
  
  
    export default {getAlltaskFromDB,insertNewTask,getAllTaskByUserEmail,deleteTaskByTaskId,updateTaskByEmail}
  
  
  
  //   export default {insertUser}