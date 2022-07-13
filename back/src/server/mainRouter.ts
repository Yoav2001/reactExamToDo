import express from "express";
import userRouter from "../cms/infrastructure/http/user/userRouter"
import taskRouter from "../cms/infrastructure/http/tasK/taskRouter"
import auth from "../auth/infrastructure/http/authorization/authorize.middleware";
const router = express.Router();

router.use(auth.authorize);
router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
