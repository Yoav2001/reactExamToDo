import express from "express";
import userRouter from "./userRouter";
import taskRouter from "./taskRouter";
import auth from "../middleware/authorize";
const router = express.Router();

router.use(auth.authorize);
router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
