import jwt from 'jsonwebtoken';
import express from 'express';
import { User } from '../modals/userModal'

import errorHandler, { ErrorHandlerType } from '../middleware/errorHandler'
// import { ErrorHandler } from '../middleware/errorHandler';
require('dotenv').config();

//auth is sign up and login 

//authrozie  היוזר שעושה את הבקשה אם זה היוזר שבאמת מחובר 


const authorize = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try
    {

        const token : string|undefined =  req.headers.authorization && req.headers['authorization'].split(' ')[1];
        console.log("middaleware authorize - token of req ");
        console.log(token);
                
        if(!token)  {
            const error:ErrorHandlerType={statusError:401,errorMap:errorHandler.errorMapToDoApp}
            console.log("catch err token undifend")    
             return next(error)

        }  
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, (err : jwt.VerifyErrors | null, decodedToken : jwt.JwtPayload|undefined) => {
            console.log( process.env.ACCESS_TOKEN_SECRET);
            
            res.locals.user=decodedToken!;
            console.log("middalware of authr res ");
            console.log("middalware the decode token ");
            
            console.log(decodedToken);
            console.log("middalware res.locals");

            console.log(res.locals);
            
            
            if(err){
                const error:ErrorHandlerType={statusError:403,errorMap:errorHandler.errorMapToDoApp,uniqueMessage:err.message}
                return next(error)
            }

            // if(req.params.email && req.params.email != decodedToken.email)
            //     return next(401);
                
            return next();
        });
    }
    catch(err)
    {
        const error:ErrorHandlerType={statusError:401,errorMap:errorHandler.errorMapToDoApp}
        console.log("catch err in authrozin middalware")
            
         return next(error)
    }
}

const adminMiddleware = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try
    {
        const user =res.locals.user as User;
        if(!user.isAdmin){
            const error:ErrorHandlerType={statusError:405,errorMap:errorHandler.errorMapToDoApp,uniqueMessage:"MethodNotAllowed -only admins"}
            return next(error)        
           }       
           
           
           return next()
         }
    catch(err)
    {
        const error:ErrorHandlerType={statusError:401,errorMap:errorHandler.errorMapToDoApp}
        console.log("catch err in authrozin middalware")
            
         return next(error)
    }
}


// const setUserToView = (req : express.Request, res : express.Response, next : express.NextFunction) => {
//     try
//     {
//         const token : string = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.jwt;
//         jwt.verify(token, process.env.USER_SECRET as jwt.Secret, async (err : jwt.VerifyErrors | null, decodedToken : jwt.JwtPayload|undefined) => {
//             if(err)
//                 return next();
//             res.locals.user = (await User.isExists((decodedToken as jwt.JwtPayload).user))?.userName;
//             return next();
//         });
//     }
//     catch
//     {
//         return next();
//     }
// }

export default {authorize,adminMiddleware}