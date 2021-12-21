import express from 'express'
import userService from '../service/userService';
import type usersModel = require('../modals/userModal')
import jwt from 'jsonwebtoken'

const jwtSecret='bommer'

const router = express.Router();
router.route("/login") 
  .post(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const { email, password} : { email : string, password : string} = req.body;
    if(email||password !==undefined){
      const user:usersModel.User |undefined=await userService.getUserDataWithEmail(email)
      if(user!==undefined){ 
          if(user?.password!==password){
            console.log("the user is exist in the system but the password inccorect");
            res.json("your password inccorect")
          }
          else{
            const token = jwt.sign(user!, jwtSecret)
            console.log(token);
            if(token===undefined||token===null)
               res.status(403).json('this user dont have Permissions');
            
               console.log("token in  auth router ");
               
               console.log(token);
               
              res.json({token:token})
            // sessionStorage.setItem(token)
            
          }
    

        }
        else{
          res.json("the user doesnt exist in the system")
        }
}
     
})

router.route("/signUp/:email") 
  .post(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
     
    const email:string = <string>req.params.email;
    const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;
    const userToAdd :usersModel.User={email,password,fullName,isAdmin}
    const user:usersModel.User|undefined = await userService.addUser(userToAdd)
   
    
    if(user!==undefined){
      const token = jwt.sign(user, jwtSecret)
      if(token===undefined||token===null)
         res.status(403).json('this user dont have Permissions');
        console.log("fullname"+user.fullName);
        console.log("isadmin"+user.isAdmin);
        console.log("user"+user);
        
      res.json(JSON.stringify(token))
    }
    else{
      console.log("erorr");
      
    }
    
    
})


//להוסיף router .use  לerrohadeler
export default router