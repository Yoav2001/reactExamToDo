import express from "express";
import taskService from "../service/taskService";
import type taskModal = require("../modals/taskModal");
import type usersModel = require("../modals/userModal");
import { Itask } from "../db/interfaceDB/interfaceTask";
import errorHandler from "../middleware/errorHandler";
import { ErrorHandlerType } from "../middleware/errorHandler";
import userService from "../service/userService";
import auth from "../middleware/authorize";
import taskController  from '../controllers/taskController'
const router = express.Router();
//task/addTask
router.post("/addTask",taskController.addNewTask) 


//task/
router.get("/", auth.adminMiddleware,async (  req: express.Request,  res: express.Response,  next: express.NextFunction ) => {
    const user = res.locals.user as usersModel.User;
  
  
  }
);

//task/:taskId
router.route("/:taskId").put(async (  req: express.Request, res: express.Response, next: express.NextFunction ) => {
      const taskId: number = parseInt(req.params.taskId);
      const {
        emailUserOfTask,
        taskName,
        startDate,
        endTime,
        isComplete,
        isRelevent,
      }: taskModal.Task = req.body;

      const localUser = res.locals.user as usersModel.User;

      if (emailUserOfTask !== localUser.email && !localUser.isAdmin) {
        const errorObj: ErrorHandlerType = {
          statusError: 401,
          errorMap: errorHandler.errorMapToDoApp,
        };
        return next(errorObj);
      }
      
      if (!taskId  ||!emailUserOfTask || !taskName  || !startDate  || isComplete ===undefined||isRelevent === undefined) {
        const errorObj: ErrorHandlerType = {
          statusError: 400,
          errorMap: errorHandler.errorMapToDoApp,
        };
        return next(errorObj);
      }
      const taskToUpdate: taskModal.Task = {
        taskId: taskId,
        emailUserOfTask: emailUserOfTask,
        taskName: taskName,
        startDate: startDate,
        endTime: endTime,
        isComplete: isComplete,
        isRelevent: isRelevent,
      };
      const data = await taskService.updateTask(taskToUpdate).then(() => {
        res.status(200).json({ key: data });
      });
    }
  )

  .delete(async ( req: express.Request,res: express.Response,next: express.NextFunction) => {
      const taskId: number = parseInt(req.params.taskId);

      const task: taskModal.Task | undefined =
        await taskService.getTaskByTaskId(taskId);

        if(!task){
          const errorObj: ErrorHandlerType = {
            statusError: 409,
            errorMap: errorHandler.errorMapToDoApp,
            uniqueMessage:"error- you try to delete task that dont exist in db"
          };
          return next(errorObj);
        }

        
      const user: usersModel.User | undefined =
        await userService.getUserDataWithEmail(task?.emailUserOfTask!);

      const localUser = res.locals.user as usersModel.User;

      if (user?.email !== localUser.email && !localUser.isAdmin) {
        const errorObj: ErrorHandlerType = {
          statusError: 401,
          errorMap: errorHandler.errorMapToDoApp,
          uniqueMessage: "opps you try to delete task of other users",
        };
        return next(errorObj);
      }

      if (taskId === undefined) {
        const errorObj: ErrorHandlerType = {
          statusError: 400,
          errorMap: errorHandler.errorMapToDoApp,
        };
        return next(errorObj);
      }

      const data = await taskService.deleteTaskByTaskId(taskId);
      res.json(data);
    }
  );

router.get( "/:userEmail",async (req: express.Request,res: express.Response,next: express.NextFunction) => {
    const userEmail: string = <string>req.params.userEmail;
    const user: usersModel.User | undefined =
      await userService.getUserDataWithEmail(userEmail!);
    const localUser = res.locals.user as usersModel.User;

    if (userEmail !== localUser.email && !user?.isAdmin) {
      const errorObj: ErrorHandlerType = {
        statusError: 400,
        errorMap: errorHandler.errorMapToDoApp,
        uniqueMessage: "opps you try to watch task of other users",
      };
      return next(errorObj);
    }
    if (userEmail === undefined || userEmail === "") {
      const errorObj: ErrorHandlerType = {
        statusError: 400,
        errorMap: errorHandler.errorMapToDoApp,
      };
      return next(errorObj);
    }
    const data: taskModal.Task[] | undefined =
      await taskService.getAlltasksOfUser(userEmail);
    res.json({ key: data });
  }
);

export default router;
