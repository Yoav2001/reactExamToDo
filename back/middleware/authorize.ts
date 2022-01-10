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
        uniqueMessage: "MethodNotAllowed",
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




const authenticationEmailOrAdmin = (req: express.Request,res: express.Response,next: express.NextFunction) =>{
  try {
    const email:string=req.body.email ? req.body.email : req.params.email;

    const user = res.locals.user as User;
    console.log(`authroize middaleare - is admin :` ,user.isAdmin);
    console.log(`authroize middaleare  - user email Locals : ${user.email} and user email Req : ${email}`);
    
    console.log(`conditional `,user.email===email&&user.isAdmin);
    
    if (user.isAdmin||user.email===email) return next();

    else{
      console.log("error catch midaalware");
      
      const error: ErrorHandlerType = {
        statusError: 401,
        errorMap: errorHandler.errorMapToDoApp,
        uniqueMessage: "MethodNotAllowed -the email of req is not equals to email of logged in ",
      };
      return next(error);

    }

  } catch (err) {
    const error: ErrorHandlerType = {
      statusError: 401,
      errorMap: errorHandler.errorMapToDoApp,
    };
    console.log("catch error-isReqEmailEqualsToLocalEmail middleware ")

    return next(error);
  }

}

export default { authorize, adminMiddleware,authenticationEmailOrAdmin };
