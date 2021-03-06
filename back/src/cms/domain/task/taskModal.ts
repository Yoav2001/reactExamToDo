import { User } from "../user/userModal";

export type Task = {
    taskId?:number
    emailUserOfTask:User["email"]
    taskName: string,
    startDate:string,
    endTime: string
    isComplete:boolean,
    isRelevent :boolean
}

export type AddResult = "Added Succeeded" | "Failed to add "
export type UpdateResult = "update Succeeded" | "Failed to update"|"soory this task id dont exist in DB" |"sorry cant update without task ID"

export type GetAllTasks = () => Promise<Task[] >;
export type GetTasksOfUser = (userEmail: Task['emailUserOfTask']) => Promise<Task[] > ;
export type GetTaskByTaskId = (idTask:Task["taskId"]) => Promise<Task |undefined> ;
export type AddTask = (task: Task) => Promise<string>;
export type updateTask = (task: Task) => Promise<UpdateResult | undefined>;
export type DeleteTask = (idTask: Task['taskId']) => Promise<void>;