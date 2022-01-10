import express from "express";
import taskController  from '../controllers/taskController'
import authMiddleware from "../middleware/authorize";

const router = express.Router();


router.post("/addTask",authMiddleware.authenticationEmailOrAdmin,taskController.addNewTask) 
router.get("/", authMiddleware.adminMiddleware,taskController.getAllTasksOfAllUsers) 

router.route("/:taskId")
.put(authMiddleware.authenticationEmailOrAdmin, taskController.updateTask) 
.delete(taskController.deleteTaskByTaskId)

router.get( "/:email",authMiddleware.authenticationEmailOrAdmin,taskController.getAlltasksOfUser)

export default router;
