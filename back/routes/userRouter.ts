import express from 'express'
import userService from '../service/userService';
import type taskModal = require('../modals/taskModal')
import type usersModel = require('../modals/userModal')
import errorHandler from '../middleware/errorHandler'
import { ErrorHandlerType } from '../middleware/errorHandler'
const router = express.Router();

router.route("/") 
  .get(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const data =await userService.getAllUsers();

    console.log(data)


    if(data)//אם לא נמצא זה לא שגיאה 
        res.json({ key: data });      
    else{
        res.json("no found users ")
        }

})

router.route("/:email")
    .get(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const email:string = <string>req.params.email;
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
        console.log(userToAdd);
        //לא מצליח להמיר לגסון
        res.json({ key: data });

    }) .put(async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        
        const email:string = <string>req.params.email;     
        const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;
        if(email===""||password===""||fullName===""||email===undefined||password===undefined||fullName===undefined||isAdmin===undefined){
            const errorObj:ErrorHandlerType={statusError:400,errorMap:errorHandler.errorMapToDoApp}
            return  next(errorObj);
        }
        const userToAdd :usersModel.User={email,password,fullName,isAdmin}
        const data = await userService.updateUserNameWithEmail(userToAdd)
      
        console.log("after upd");
        
        res.json({ key: data });
    });

    
// //api/user/
// router.post('/addUser',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

//     const { email, password, fullName,isAdmin} : {email : string, password : string, fullName : string,isAdmin:boolean} = req.body;
//     const userToAdd :usersModel.User={email,password,fullName,isAdmin}
//     const data = await userService.addUser(userToAdd)
//     console.log(data)
//     res.json({ key: data });
// })
// //need to be last
// router.get('/:email',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

//     const email:string = <string>req.params.email;
//     const data = await userService.getUserDataWithEmail(email);
//     console.log(data)
//     res.json({ key: data });
// })

// router.patch('/update/:email',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
//     //לשים לב את המייל מעביר כפרמס ואת המידע בבודי
//     const email:string = <string>req.params.email;     
//     const {  password, fullName,isAdmin} : { password : string, fullName : string,isAdmin:boolean} = req.body;
//     const userToAdd :usersModel.User={email,password,fullName,isAdmin}
//     const data = await userService.updateUserNameWithEmail(userToAdd)
//     console.log(data)
//     res.json({ key: data });
// })
// router.get('/getAllUsers',async (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    
//     const data = await userService.getAllUsers();
//     console.log(data)
//     res.json({ key: data });
// })



export default router

//הבדל בין פט לפצ
//put מחליף את כל האובייקט

//patch מחליף