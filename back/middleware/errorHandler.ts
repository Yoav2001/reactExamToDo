import express from 'express';


 
    export type ErrorHandlerType= {
        uniqueMessage?: string,
        statusError:number,
        errorMap: Map<number, string>
        } 
    
        export function errorHandlerMiddleWare(error : ErrorHandlerType, req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(error.statusError);
            if(error.uniqueMessage)
                return res.json({ error : error.uniqueMessage });
            return res.json({ status : error.errorMap.get(error.statusError) });
        }

        const errorMapToDoApp= new Map([
            [400,"BadRequest"],
            [409,"Conflict"],
            [403,"Forbidden"],
            [401,"NonAuthoritativeInformation"],
            [404,"NotFound"],
            [405,"MethodNotAllowed"],
            [500,"InternalServerError"],
          
          
          
            ])

            //example to use 
            // const obj:ErrorHandlerType={uniqueMessage:"password inccorect ",statusError:404,errorMap:errorMapToDoApp}


      export default {errorHandlerMiddleWare,errorMapToDoApp}