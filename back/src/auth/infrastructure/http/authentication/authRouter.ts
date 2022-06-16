import express from "express";
import authController  from '../controllers/authController'
const router = express.Router();

router.route("/login").post((authController.login)) 
router.route("/signUp/:email").post(authController.signUp) 

export default router;
