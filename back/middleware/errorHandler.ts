import express from 'express';
import { map } from 'jquery';
export class ErrorHandler {
    private _messageStatus: string = '';
    
    constructor(private _status? : number, private _message? : string)
    {
        this._status = _status || 500;
        this._messageStatus = errorMap.get(this.status || 500)||"InternalServerError"
        // for (let enumMember in StatusCode) {
        //     if(parseInt(StatusCode[enumMember]) === this._status)
        //     {
        //         this._messageStatus = enumMember;
        //     }
        // }
    }
    get messageStatus(){
        return this._messageStatus;
    }
    set messageStatus(messageStatus){
        this._messageStatus = messageStatus;
    }
    get message(){
        return this._message;
    }
    set message(message){
        this._message = message;
    }
    get status(){
        return this._status;
    }
}
const errorMap=new Map([
  [400,"BadRequest"],
  [409,"Conflict"],
  [403,"Forbidden"],
  [401,"NonAuthoritativeInformation"],
  [404,"NotFound"],
  [405,"MethodNotAllowed"],
  [500,"InternalServerError"],



  ]);


export function errHandler(error : ErrorHandler, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(error.status as number);
    if(error.message)
        return res.json({ error : error.message });
    return res.json({ status : error.messageStatus });
}
module.exports = { ErrorHandler, errHandler}