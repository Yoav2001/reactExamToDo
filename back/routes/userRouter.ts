import express from 'express'
import userService from '../service/userService';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')
import errorHandler from '../middleware/errorHandler'
import { ErrorHandlerType } from '../middleware/errorHandler'
import { UpdateBundleProject } from 'typescript';
import auth from '../middleware/authorize'
const router = express.Router();

router.route("/") 
  .get(auth.adminMiddleware,async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const data =await userService.getAllUsers();
        // const user=res.locals.user as usersModel.User
        // if(!user.isAdmin){
        //     const errorObj:ErrorHandlerType={statusError:405,errorMap:errorHandler.errorMapToDoApp}
        //     return  next(errorObj);    
        // }
    if(data)//אם לא נמצא זה לא שגיאה 
        res.json({ key: data });      
    else{
        res.json("no found users ")
        }

})

router.route("/:email")
    .get(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const email:string = <string>req.params.email;
        const user=res.locals.user as usersModel.User

        if(user.email!==email&&!user.isAdmin){
            const errorObj:ErrorHandlerType={statusError:401,errorMap:errorHandler.errorMapToDoApp}
            return  next(errorObj); 
        }
        if(email===""||email===undefined){

            const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
          return  next(errorObj);
        }
        const data = await userService.getUserDataWithEmail(email);
        res.json({ key: data });        
        
    }) .post(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const email:string =""
        const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;

        if(email===""||password===""||fullName===""){
            console.log("pst new user-- one of body of params is udifend"
            );
            
            const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
         return  next(errorObj);
        }
        const userToAdd :usersModel.User={email,password,fullName,isAdmin}
        const data = await userService.addUser(userToAdd)
        //לא מצליח להמיר לגסון
        res.json({ key: data });

    }) .put(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        
        const email:string = <string>req.params.email;  
        const user=res.locals.user as usersModel.User

        if(user.email!==email&&!user.isAdmin){
            const errorObj:ErrorHandlerType={statusError:401,errorMap:errorHandler.errorMapToDoApp,uniqueMessage:"Non Authoritative Information- you try to update details of other user and you are not admin "}
            return  next(errorObj); 
        }   

        
        const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;
        if(email===""||password===""||fullName===""||email===undefined||password===undefined||fullName===undefined||isAdmin===undefined){
            const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
            return  next(errorObj);
        }
        const userToAdd :usersModel.User={email,password,fullName,isAdmin}
        const data = await userService.updateUserNameWithEmail(userToAdd)
      
        
        res.json({ key: data });
    });

 



export default router

//הבדל בין פט לפצ
//put מחליף את כל האובייקט

//patch מחליף