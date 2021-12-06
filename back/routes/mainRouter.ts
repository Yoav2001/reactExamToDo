import express from 'express'
import userRouter from "./userRouter"
import taskRouter from "./taskRouter"



const router = express.Router();
router.use("/user",userRouter)
router.use("/task",taskRouter)

//option to add user routes

export default router;