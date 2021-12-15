import express, { Router } from 'express'
import mainRouterApi from './routes/mainRouter'
const app =express();
import dotenv from 'dotenv';
import authRouter from './routes/authRouter'
import router from './routes/userRouter';
// import { authed } from './logic/auth.js';
import errorHandler from './middleware/errorHandler'
import authorize from './middleware/authorize'
import { ErrorHandlerType } from './middleware/errorHandler'

dotenv.config()
app.use(express.json());

app.use(authRouter)
app.use("/api",mainRouterApi)
app.use(function (req, res, next) {
  const errorObj:ErrorHandlerType={statusError:404,errorMap:errorHandler.errorMapToDoApp ,uniqueMessage:"the url dont found boomer"}
  return  next(errorObj);
});
app.use(errorHandler.errorHandlerMiddleWare)

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
