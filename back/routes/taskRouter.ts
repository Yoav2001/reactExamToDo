import express from "express";
import taskService from "../service/taskService";
import type taskModal = require("../modals/taskModal");
import type usersModel = require("../modals/userModal");
import { Itask } from "../db/interfaceDB/interfaceTask";
import errorHandler from "../middleware/errorHandler";
import { ErrorHandlerType } from "../middleware/errorHandler";
import userService from "../service/userService";
import auth from "../middleware/authorize";

const router = express.Router();
//task/addTask
router.post("/addTask",async (req: express.Request,res: express.Response,next: express.NextFunction) => {
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
      emailUserOfTask === undefined ||
      taskName === undefined ||
      startDate === undefined ||
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
);

//task/
router.get("/", auth.adminMiddleware,async (  req: express.Request,  res: express.Response,  next: express.NextFunction ) => {
    const user = res.locals.user as usersModel.User;
    const arrAllTasks: taskModal.Task[] | undefined =
      await taskService.getAllTasks();
    res.json(arrAllTasks);
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
      }: {
        emailUserOfTask: string;
        taskName: string;
        startDate: string;
        endTime: string;
        isComplete: boolean;
        isRelevent: boolean;
      } = req.body;

      const localUser = res.locals.user as usersModel.User;

      if (emailUserOfTask !== localUser.email && !localUser.isAdmin) {
        const errorObj: ErrorHandlerType = {
          statusError: 401,
          errorMap: errorHandler.errorMapToDoApp,
        };
        return next(errorObj);
      }
      if (
        taskId === undefined ||
        emailUserOfTask === undefined ||
        taskName === undefined ||
        startDate === undefined ||
        isComplete === undefined ||
        isRelevent === undefined
      ) {
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
