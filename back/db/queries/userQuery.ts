
import pool from '../connection'
import type taskModal = require('../../modals/taskModal')
import type usersModel = require('../../modals/userModal')




export async function getAllUsersFromDB ():Promise<usersModel.User[] | undefined> {
    const client = await pool.connect();
    const sqlAllUsers= `SELECT * FROM users`
  
    try {
      const { rows } = await client.query(sqlAllUsers)
      client.release();//משחרר את 
      return rows;
    } catch (err) {
      console.log('Database ' + err)
    }
  }
  

   const insertUser = async(userObj :usersModel.User)=> {
    const client = await pool.connect();
  
      const insertQuery = `INSERT INTO users (email,pass,fullName,isAdmin)
              VALUES ('${userObj.email}','${userObj.password}','${userObj.fullName}','${userObj.isAdmin}')`;
  
      try{
        const res =  client.query(insertQuery)
      } 
  
      catch (error) {
         throw error;
      }
  
  
  }
  
  
  
  
  
  
  //write select user with type and async and await
  export async function getUserByEmail(email : usersModel.User["email"]): Promise<usersModel.User | undefined>{
    const client = await pool.connect();
    const selectByEmail = `SELECT * FROM users WHERE email = '${email}'`
    const res =   (await client.query(selectByEmail)).rows[0]
    console.log('inside db');
    
    return res;
  }
   
  
  
  
  const deleteUserByEmail= async(email : usersModel.User["email"])=> {
    const client = await pool.connect();
  
    const deleteByEmail = `Delete FROM users WHERE email ='${email}'`
    try{
      await client.query(deleteByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }
  
  const updateUserByEmail=async(userObj:usersModel.User)=> {
    const client = await pool.connect();


    const updateByEmail = `update users set (pass,fullName,isAdmin)=('${userObj.password}', '${userObj.fullName}' , ${userObj.isAdmin}) where email = '${userObj.email}' `
    
    
    try{
      const res =  client.query(updateByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }
  
  
  
  
  
    export default {insertUser,getUserByEmail,getAllUsersFromDB,deleteUserByEmail,updateUserByEmail}
  
  
  
  //   export default {insertUser}