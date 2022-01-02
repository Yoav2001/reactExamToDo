
import {Iuser} from './interfaceUser'
export interface Itask {
    id?:number
    useremail:Iuser["email"]
    name: string,
    startdate:string,
    endtime: string
    iscomplete:boolean,
    isrelevent :boolean
}

export type GetAllTasks = () => Promise<Itask[] |undefined>;
export type GetTasksOfUser = (userEmail: Itask['useremail']) => Promise<Itask[]  | undefined>;
export type GetTaskByTaskId = (idTask: Itask['id'] ) => Promise<Itask | undefined> ;
