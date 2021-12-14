import express, { Router } from 'express'
import mainRouterApi from './routes/mainRouter'
const app =express();
import dotenv from 'dotenv';
import authRouter from './routes/authRouter'
import router from './routes/userRouter';
// import { authed } from './logic/auth.js';
import errorHandler from './middleware/errorHandler'
import authorize from './middleware/authorize'
dotenv.config()
app.use(express.json());

// app.use(authorize)
app.use(authRouter)
app.use("/api",mainRouterApi)
app.use(errorHandler.errorHandlerMiddleWare)

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
