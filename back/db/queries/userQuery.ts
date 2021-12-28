
import pool from '../connection'
import type taskModal = require('../../modals/taskModal')
import type userModalBack = require('../../modals/userModal')

// import { Iuser } from '../../interfaceDB/interfaceUser';
import type userModalDb = require('../interfaceDB/interfaceUser')


// export async function getAllUsersFromDB ():Promise<Iuser[] | undefined> {
//     const client = await pool.connect();
//     const sqlAllUsers= `SELECT * FROM users`
  
//     try {
//       const { rows } = await client.query(sqlAllUsers)
//       client.release();//משחרר את 
//       return rows;
//     } catch (err) {
//       console.log('Database ' + err)
//     }
//   }



  const getAllUsersFromDB:userModalDb.GetAllUsers = async() =>{

    const client = await pool.connect();
    const sqlAllUsers= `SELECT * FROM users`
  
    try {
      const { rows } = await client.query(sqlAllUsers)
      return rows;
    } catch (err) {
      console.log('Database ' + err)
    }
    finally{
      client.release()
    }
  }
  

   const insertUser = async(userObj :userModalBack.User)=> {
    const client = await pool.connect();
  
      const insertQuery = `INSERT INTO users (email,pass,fullName,isAdmin)
              VALUES ('${userObj.email}','${userObj.password}','${userObj.fullName}','${userObj.isAdmin}')`;
  
      try{
        const res =  client.query(insertQuery)
      } 
  
      catch (error) {
         throw error;
      }
      finally{
        client.release()
      }
  
  }
  
  
  
  
  
  
  //write select user with type and async and await
  // export async function getUserByEmail(email : userModalBack.User["email"]): Promise<Iuser | undefined>{
  //   const client = await pool.connect();
  //   const selectByEmail = `SELECT * FROM users WHERE email = '${email}'`
  //   const res =   (await client.query(selectByEmail)).rows[0]
  //   console.log('inside db');
    
  //   return res;
  // }

    const getUserByEmail:userModalDb.GetUser = async(email : userModalBack.User["email"]) =>{
      const client = await pool.connect();

      try{
        
        const selectByEmail = `SELECT * FROM users WHERE email = '${email}'`
        
        const res =   (await client.query(selectByEmail)).rows[0]
        return res
    

      }
      catch(error){
        throw error
      }

      finally{
        client.release()
      }
    

    }
  const getUserByFullName:userModalDb.GetUserWithFullName = async(fullName : userModalBack.User["fullName"]) =>{

    const client = await pool.connect();
    try{

      const selectByFullName = `SELECT * FROM users WHERE fullName = '${fullName}'`
      const res =   (await client.query(selectByFullName)).rows[0]
      
      return res;

    }
    catch(error){
      throw error
    }

    finally{
      client.release()
    }

  }
  // export async function getUserByFullName(fullName : userModalBack.User["fullName"]): Promise<Iuser | undefined>{
  //   const client = await pool.connect();
  //   const selectByEmail = `SELECT * FROM users WHERE fullName = '${fullName}'`
  //   const res =   (await client.query(selectByEmail)).rows[0]
  //   console.log('inside db');
    
  //   return res;
  // }
   
  
  
  const deleteUserByEmail= async(email : userModalBack.User["email"])=> {
    const client = await pool.connect();
  
    const deleteByEmail = `Delete FROM users WHERE email ='${email}'`
    try{
      await client.query(deleteByEmail)
    } 
  
    catch (error) {
      throw error;
    }
  }
  
  const updateUserByEmail=async(userObj:userModalBack.User)=> {
    const client = await pool.connect();


    const updateByEmail = `update users set (pass,fullName,isAdmin)=('${userObj.password}', '${userObj.fullName}' , ${userObj.isAdmin}) where email = '${userObj.email}' `
    
    
    try{
      const res =  client.query(updateByEmail)
    } 
  
    catch (error) {
      throw error;
    }
    finally{
      client.release()
    }
  }
  
  
  
  
  
    export default {insertUser,getUserByEmail,getAllUsersFromDB,deleteUserByEmail,updateUserByEmail,getUserByFullName}
  
  
  
  //   export default {insertUser}