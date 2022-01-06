import express from "express";

export type ErrorHandlerType = {
  uniqueMessage?: string;
  statusError: number;
  errorMap: Map<number, string>;
};

export function errorHandlerMiddleWare(
  error: ErrorHandlerType,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("middlare error handler type");

  if (error.uniqueMessage)
    return res.status(error.statusError).json({ error: error.uniqueMessage });
    
  return res
    .status(error.statusError)
    .json({ error: error.errorMap.get(error.statusError) });
}

const errorMapToDoApp = new Map([
  [400, "BadRequest"],
  [409, "Conflict"],
  [403, "Forbidden"],
  [401, "NonAuthoritativeInformation"],
  [404, "NotFound"],
  [405, "MethodNotAllowed"],
  [500, "InternalServerError"],
]);

export default { errorHandlerMiddleWare, errorMapToDoApp };
