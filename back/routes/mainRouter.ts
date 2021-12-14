import express from 'express'
import userRouter from "./userRouter"
import taskRouter from "./taskRouter"

import errorHandler from '../middleware/errorHandler'


const router = express.Router();

//לבנות middale ware שבודק
// router.use(auth)

router.use("/user",userRouter)
router.use("/task",taskRouter)

//option to add user routes

export default router;