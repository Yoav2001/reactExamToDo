import express from "express";
import taskController  from '../controllers/taskController'
import authMiddleware from "../middleware/authorize";

const router = express.Router();


router.post("/addTask",authMiddleware.authenticationEmailOrAdmin,taskController.addNewTask) 
router.get("/", authMiddleware.adminMiddleware,taskController.getAllTasksOfAllUsers) 

router.route("/:taskId")
.put(taskController.updateTask ) 
.delete(taskController.deleteTaskByTaskId)

router.get( "/:email",taskController.getAlltasksOfUser)

export default router;
