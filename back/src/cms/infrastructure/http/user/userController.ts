
import express from "express";
import type usersModel = require("../../..//domain/user/userModal");
import errorHandler from "../../../../core/http/http-errors";
import { ErrorHandlerType } from "../../../../core/http/http-errors";
import userService from "../../../../service/userService"
import auth from "../middleware/authorize";


const addUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const email: string = "";
    const {
      password,
      fullName,
      isAdmin,
    }: { password: string; fullName: string; isAdmin: boolean } = req.body;

    if (email === "" || password === "" || fullName === "") {
      console.log("user router- ERROR 400 - body invalid");
      
      const errorObj: ErrorHandlerType = {
        statusError: 400,
        errorMap: errorHandler.errorMapToDoApp,
      };
      return next(errorObj);
    }
    const userToAdd: usersModel.User = { email, password, fullName, isAdmin };
    const data = await userService.addUser(userToAdd);
    res.json(JSON.stringify(data));
    
  
  }
  const getUserDataWithEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const email: string = <string>req.params.email;
    // const user = res.locals.user as usersModel.User;

    // if (user.email !== email && !user.isAdmin) {
    //   const errorObj: ErrorHandlerType = {
    //     statusError: 401,
    //     errorMap: errorHandler.errorMapToDoApp,
    //   };
    //   return next(errorObj);
    // }
    if (email === "" || email === undefined) {
      const errorObj: ErrorHandlerType = {
        statusError: 400,
        errorMap: errorHandler.errorMapToDoApp,
      };
      return next(errorObj);
    }
    const data = await userService.getUserDataWithEmail(email);
    res.json({ key: data });
  
}

const updateUserNameWithEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const email: string = <string>req.params.email;
      // const user = res.locals.user as usersModel.User;

      // if (user.email !== email && !user.isAdmin) {
      //   const errorObj: ErrorHandlerType = {
      //     statusError: 401,
      //     errorMap: errorHandler.errorMapToDoApp,
      //     uniqueMessage:
      //       "Non Authoritative Information- you try to update details of other user and you are not admin ",
      //   };
      //   return next(errorObj);
      // }

      const {password,fullName, isAdmin,
      }: { password: string; fullName: string; isAdmin: boolean } = req.body;
      if (
        email === "" ||
        password === "" ||
        fullName === "" ||
        email === undefined ||
        password === undefined ||
        fullName === undefined ||
        isAdmin === undefined
      ) {
        const errorObj: ErrorHandlerType = {
          statusError: 400,
          errorMap: errorHandler.errorMapToDoApp,
        };
        return next(errorObj);
      }
      const userToAdd: usersModel.User = { email, password, fullName, isAdmin };
      const data = await userService.updateUserNameWithEmail(userToAdd);

      res.json({ key: data });
  
}
const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const allUser = await userService.getAllUsers();
    // const user=res.locals.user as usersModel.User
    // if(!user.isAdmin){
    //     const errorObj:ErrorHandlerType={statusError:405,errorMap:errorHandler.errorMapToDoApp}
    //     return  next(errorObj);
    // }
    if (allUser){
      res.json({ key: allUser });

    }
    else {
      res.json("no found users ");
    }
  
  
}






export default {addUser,getUserDataWithEmail,updateUserNameWithEmail,getAllUsers}
  