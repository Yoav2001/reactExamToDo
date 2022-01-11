import express from "express";
import userController  from '../controllers/userController'
import authMiddleware from "../middleware/authorize";

const router = express.Router();

router.route("/").get(authMiddleware.adminMiddleware,userController.getAllUsers)

router.route("/:email")
.get(authMiddleware.authorizationEmailOrAdmin,userController.getUserDataWithEmail) 
.post(userController.addUser)
.put(authMiddleware.authorizationEmailOrAdmin,userController.updateUserNameWithEmail) 

export default router;


