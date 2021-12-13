import express, { Router } from 'express'
import mainRouterApi from './routes/mainRouter'
const app =express();
import dotenv from 'dotenv';
import authRouter from './routes/authRouter'
// import { authed } from './logic/auth.js';

dotenv.config()
app.use(express.json());

app.use(authRouter)
app.use("/api",mainRouterApi)

// לשים app.use לauthToken
const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
