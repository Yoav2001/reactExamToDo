import express from "express";
import userService from "../service/userService";
import type usersModel = require("../modals/userModal");
import jwt from "jsonwebtoken";
import errorHandler, { ErrorHandlerType } from "../middleware/errorHandler";

const jwtSecret = "bommer";

const router = express.Router();
router
  .route("/login")
  .post(
    async (req: express.Request, res: express.Response,next: express.NextFunction) => {
      const { email, password }: { email: string; password: string } = req.body;

      if (email && password) {
        const user: usersModel.User | undefined =
          await userService.getUserDataWithEmail(email);

        if (user !== undefined) {
          if (user?.password !== password) {
            console.log("the user is exist in the system but the password inccorect");
            const errorObj: ErrorHandlerType = {
              statusError: 409,
              errorMap: errorHandler.errorMapToDoApp,
              uniqueMessage:"your password inccorect"
            };
            return next(errorObj);
          
          } else {
            const token = jwt.sign(user!, jwtSecret);
            if (token === undefined || token === null)
              res.status(403).json("this user dont have Permissions");
            res.json({ token: token });
          }
        } else {
          res.json("the user doesnt exist in the system");
        }
      }
    }
  );

router
  .route("/signUp/:email")
  .post( async (req: express.Request,res: express.Response,next: express.NextFunction) => {
      const email: string = <string>req.params.email;
      const {
        password,
        fullName,
        isAdmin,
      }: { password: string; fullName: string; isAdmin: boolean } = req.body;
      const userToAdd: usersModel.User = { email, password, fullName, isAdmin };
      const user: usersModel.User | undefined = await userService.addUser(
        userToAdd
      );

      if (!user) {
        const errorObj: ErrorHandlerType = {
          statusError: 500,
          errorMap: errorHandler.errorMapToDoApp,
          uniqueMessage: "there was problem with create the user try again",
        };
        return next(errorObj);
      } else {
        res.json(user);
      }
    }
  );

export default router;
