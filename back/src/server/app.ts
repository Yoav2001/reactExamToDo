import express, { Router } from 'express'
import mainRouterApi from './mainRouter'
import cors from 'cors'
const app =express();
import dotenv from 'dotenv';
import authRouter from '../auth/infrastructure/http/authentication/authRouter'
import router from '../cms/infrastructure/http/user/userRouter';
// import { authed } from './logic/auth.js';
import errorHandler from '../core/http/http-errors'
import authorize from'../auth/infrastructure/http/authentication/authController'
import { ErrorHandlerType } from '../core/http/http-errors'

dotenv.config()
app.use(express.json());
app.use(cors())
app.use(authRouter)
app.use("/api",mainRouterApi)
app.use(function (req, res, next) {
  const errorObj:ErrorHandlerType={statusError:404,errorMap:errorHandler.errorMapToDoApp ,uniqueMessage:"the url dont found boomer"}
  return  next(errorObj);
});
app.use(errorHandler.errorHandlerMiddleWare)

const port = process.env.PORT||8080;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
