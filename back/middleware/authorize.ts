import jwt from "jsonwebtoken";
import express from "express";
import { User } from "../modals/userModal";

import errorHandler, { ErrorHandlerType } from "../middleware/errorHandler";
require("dotenv").config();

const authorize = (req: express.Request, res: express.Response,next: express.NextFunction) => {
  try {
    const token: string | undefined =
     req.headers.authorization && req.headers["authorization"].split(" ")[1];

    if (!token) {
      const error: ErrorHandlerType = {
        statusError: 401,
        errorMap: errorHandler.errorMapToDoApp,
      };
      console.log("error- middleware authorize- token is undifiend");
      return next(error);
    }
    jwt.verify( token,process.env.ACCESS_TOKEN_SECRET as jwt.Secret,(
        err: jwt.VerifyErrors | null,
        decodedToken: jwt.JwtPayload | undefined
      ) => {
        res.locals.user = decodedToken!;

        if (err) {
          const error: ErrorHandlerType = {
            statusError: 403,
            errorMap: errorHandler.errorMapToDoApp,
            uniqueMessage: err.message,
          };
          return next(error);
        }

    
        return next();
      }
    );
  } catch (err) {
    const error: ErrorHandlerType = {
      statusError: 401,
      errorMap: errorHandler.errorMapToDoApp,
    };
    console.log("catch error- middleware authorize");

    return next(error);
  }
};

const adminMiddleware = (req: express.Request,res: express.Response,next: express.NextFunction) => {
  try {
    const user = res.locals.user as User;
    if (!user.isAdmin) {
      const error: ErrorHandlerType = {
        statusError: 405,
        errorMap: errorHandler.errorMapToDoApp,
        uniqueMessage: "MethodNotAllowed -only admins",
      };
      return next(error);
    }

    return next();
  } catch (err) {
    const error: ErrorHandlerType = {
      statusError: 401,
      errorMap: errorHandler.errorMapToDoApp,
    };
    console.log("catch error- check if is admin middleware ");

    return next(error);
  }
};

export default { authorize, adminMiddleware };
