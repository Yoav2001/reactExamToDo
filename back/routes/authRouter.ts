import express from 'express'
import userService from '../service/userService';
import type usersModel = require('../modals/userModal')
import jwt from 'jsonwebtoken'

const jwtSecret='bommer'

const router = express.Router();
router.route("/login") 
  .post(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const { email, password} : { email : string, password : string} = req.body;
    if(email||password ===undefined){
      const user:usersModel.User |undefined=await userService.getUserDataWithEmail(email)
      if(user!==undefined){
        console.log(user);
        console.log( " email "+user?.email);
        console.log("full" +user?.fullName);
        console.log("full" +user?.isAdmin);

        
        console.log(user?.password+" s  "+ password);
      }
   
      
      if(user?.password!==password){
        console.log("error passowrd to give doesnt correct");
        res.json("your password inccorect")
      }
      const token = jwt.sign(user!, jwtSecret)
      console.log(token);
      if(token===undefined||token===null)
        //  res.status(403).json('this user dont have Permissions');

      res.json(JSON.stringify(token))


}
     


})

router.route("/signUp/:email") 
  .post(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
     
    const email:string = <string>req.params.email;
    const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;
    const userToAdd :usersModel.User={email,password,fullName,isAdmin}
    const user = await userService.addUser(userToAdd)
    console.log(user?.fullName);
    console.log(user?.email);
    
    if(user!==undefined){
      const token = jwt.sign(user, jwtSecret)
      if(token===undefined||token===null)
         res.status(403).json('this user dont have Permissions');
  
      res.json(JSON.stringify(token))
    }
    else{
      console.log("erorr");
      
    }
    
    
})

export default router