import express from 'express'
import userService from '../service/userService';
import type usersModel = require('../modals/userModal')
import jwt from 'jsonwebtoken'

const jwtSecret='bommer'

const router = express.Router();
router.route("/login") 
  .post(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const { email, password} : { email : string, password : string} = req.body;
    if(email||password ===undefined)
      return //error 

      const user:usersModel.User |undefined=await userService.getUserDataWithEmail(email)
      
      const token = jwt.sign(user!, jwtSecret)
      if(token===undefined||token===null)
        //  res.status(403).json('this user dont have Permissions');

      res.json(JSON.stringify(token))



})

router.route("/signUp") 
  .get(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
     
    const email:string = <string>req.params.email;
    const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;
    const userToAdd :usersModel.User={email,password,fullName,isAdmin}
    const data = await userService.addUser(userToAdd)

    res.json({ key: data });     
    
})

export default router