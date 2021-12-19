// type Task ={
//     id:number,
//     taskName: string
//     startDate:string,
//     endTime: string,
//     isComplete:boolean,
//     isRelevent :boolean,
//   }

   type Task = {
    taskId?:number
    emailUserOfTask:User["email"]
    taskName: string,
    startDate:string,
    endTime: string
    isComplete:boolean,
    isRelevent :boolean
}
 type AddResult = "Added Succeeded" | "Failed to add "
 type UpdateResult = "update Succeeded" | "Failed to update"|"soory this task id dont exist in DB" |"sorry cant update without task ID"


 type GetAllTasks = () => Promise<Task[] >;
 type GetTasksOfUser = (userEmail: Task['emailUserOfTask']) => Promise<Task[]  |undefined> ;
 type GetTaskByTaskId = (idTask:Task["taskId"]) => Promise<Task |undefined> ;
 type AddTask = (task: Task) => Promise<string>;
 type updateTask = (task: Task) => Promise<UpdateResult | undefined>;
 type DeleteTask = (idTask: Task['taskId']) => Promise<void>;