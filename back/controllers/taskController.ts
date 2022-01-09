import express from "express";
import taskService from "../service/taskService";
import type taskModal = require("../modals/taskModal");
import type usersModel = require("../modals/userModal");
import { Itask } from "../db/interfaceDB/interfaceTask";
import errorHandler from "../middleware/errorHandler";
import { ErrorHandlerType } from "../middleware/errorHandler";
import userService from "../service/userService";
import auth from "../middleware/authorize";

const addNewTask = async (req:express.Request,res:express.Response,next:express.NextFunction) =>{
  console.log("controller task ");
  

    const {
        emailUserOfTask,
        taskName,
        startDate,
        endTime,
        isComplete,
        isRelevent,
      }: taskModal.Task = req.body;
      const user = res.locals.user as usersModel.User;
  
      if (emailUserOfTask !== user.email && !user.isAdmin) {
        const errorObj: ErrorHandlerType = {
          statusError: 401,
          errorMap: errorHandler.errorMapToDoApp,
          uniqueMessage: "opps you try to add task to other user ",
        };
        return next(errorObj);
      }
      if (
        !emailUserOfTask||
        !taskName||
        !startDate ||
        isComplete === undefined ||
        isRelevent === undefined
      ) {
        const errorObj: ErrorHandlerType = {
          statusError: 400,
          errorMap: errorHandler.errorMapToDoApp,
        };
        return next(errorObj);
      }
      const taskToAdd: taskModal.Task = {
        emailUserOfTask: emailUserOfTask,
        taskName: taskName,
        startDate: startDate,
        endTime: endTime,
        isComplete: isComplete,
        isRelevent: isRelevent,
      };
      const data = await taskService.addNewTask(taskToAdd);
      res.status(200).json({ key: data });

}




export default {addNewTask};