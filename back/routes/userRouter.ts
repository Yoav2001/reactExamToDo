import express from "express";
import auth from "../middleware/authorize";
import userController  from '../controllers/userController'

const router = express.Router();

router.route("/").get(auth.adminMiddleware,userController.getAllUsers)

router.route("/:email")
.get(userController.getUserDataWithEmail) 
.post(userController.addUser)
.put(userController.updateUserNameWithEmail) 

export default router;


