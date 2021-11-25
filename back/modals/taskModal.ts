import { User } from "./userModal";

export type Task = {
    taskId:number
    emailUserOfTask:User["email"]
    taskName: string
    endTime: string
    isComplete:boolean,
    isRelevent :boolean,
    // isEdit?:boolean
}

export type GetTasksOfUser = (userEmail: Task['emailUserOfTask']) => Promise<Task[]>;
export type AddTask = (task: Task) => Promise<string>;
export type EditTask = (task: Task) => Promise<string>;
export type DeleteTask = (idTask: Task['taskId']) => Promise<string>;