import express from "express";
import auth from "../middleware/authorize";
import taskController  from '../controllers/taskController'
const router = express.Router();


router.post("/addTask",taskController.addNewTask) 
router.get("/", auth.adminMiddleware,taskController.getAllTasksOfAllUsers) 

router.route("/:taskId")
.put(taskController.updateTask ) 
.delete(taskController.deleteTaskByTaskId)

router.get( "/:userEmail",taskController.getAlltasksOfUser)

export default router;
