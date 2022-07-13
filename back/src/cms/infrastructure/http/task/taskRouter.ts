import express from "express";
import taskController  from './taskController'
import authorizationEmailOrAdmin from ".././../../../auth/infrastructure/http/authorization/authorize.middleware"

const router = express.Router();


router.post("/addTask",authMiddleware.authorizationEmailOrAdmin,taskController.addNewTask) 
router.get("/", authMiddleware.adminMiddleware,taskController.getAllTasksOfAllUsers) 

router.route("/:taskId")
.put(authMiddleware.authorizationEmailOrAdmin, taskController.updateTask) 
.delete(taskController.deleteTaskByTaskId)

router.get( "/:email",authMiddleware.authorizationEmailOrAdmin,taskController.getAlltasksOfUser)

export default router;
