import taskDb from "../db/queries/taskQuery";
import { Itask } from "../db/interfaceDB/interfaceTask";
import type taskModal = require("../modals/taskModal");
import type usersModel = require("../modals/userModal");

export const getTaskByTaskId: taskModal.GetTaskByTaskId = async (taskId: taskModal.Task["taskId"]) => {
  try {
    const taskByDb: Itask | undefined = await taskDb.getTaskByTaskId(taskId);
    if (!taskByDb) return undefined;

    const taskByModalBack: taskModal.Task = {
      taskId: taskByDb?.id,
      emailUserOfTask: taskByDb.useremail,
      taskName: taskByDb.name,
      startDate: taskByDb.startdate,
      endTime: taskByDb.endtime,
      isComplete: taskByDb.iscomplete,
      isRelevent: taskByDb.isrelevent,
    };

    return taskByModalBack;
  } catch (error) {
    throw error;
  }
};
export const getAllTasks: taskModal.GetAllTasks = async () => {
  try {
    const arrTaskObjDb: Itask[] | undefined = await taskDb.getAlltaskFromDB();
    if (arrTaskObjDb === undefined) {
      return [];
    }

    const arrByModelUser: taskModal.Task[] = arrTaskObjDb.map((taskObjDb) => {
      return {
        taskId: taskObjDb.id,
        emailUserOfTask: taskObjDb.useremail,
        taskName: taskObjDb.name,
        startDate: taskObjDb.startdate,
        endTime: taskObjDb.endtime,
        isComplete: taskObjDb.iscomplete,
        isRelevent: taskObjDb.isrelevent,
      };
    });

    return arrByModelUser;
  } catch (error) {
    throw "Database " + error;
  }
};

export const addNewTask: taskModal.AddTask = async (task: taskModal.Task) => {
  try {
    await taskDb.insertNewTask(task);
  } catch (error) {
    throw error;
  }
  const res: taskModal.AddResult = "Added Succeeded";
  return res;
};

export const deleteTaskByTaskId: taskModal.DeleteTask = async (taskId: taskModal.Task["taskId"]) => {
  try {
    await taskDb.deleteTaskByTaskId(taskId);
  } catch (error) {
    throw error;
  }
};

export const updateTask: taskModal.updateTask = async (task: taskModal.Task) => {
  if (task?.taskId === undefined || "")
    return "sorry cant update without task ID";

  const getTask: Itask | undefined = await taskDb.getTaskByTaskId(task.taskId);

  if (!getTask) return "soory this task id dont exist in DB";
  try {
    taskDb.updateTaskByTaskObject(task);
    return "update Succeeded";
  } catch {
    return "Failed to update";
  }
};

export const getAlltasksOfUser: taskModal.GetTasksOfUser = async (email: usersModel.User["email"]) => {
  try {
    const arrTaskObjDb: Itask[] | undefined =
      await taskDb.getAllTaskByUserEmail(email);
    if (arrTaskObjDb === undefined) {
      return [];
    }
    if (arrTaskObjDb.length === 0) return [];

    const arrByModelUser: taskModal.Task[] = arrTaskObjDb.map((taskObjDb) => {
      return {
        taskId: taskObjDb.id,
        emailUserOfTask: taskObjDb.useremail,
        taskName: taskObjDb.name,
        startDate: taskObjDb.startdate,
        endTime: taskObjDb.endtime,
        isComplete: taskObjDb.iscomplete,
        isRelevent: taskObjDb.isrelevent,
      };
    });

    return arrByModelUser;
  } catch (error) {
    throw "Database " + error;
  }
};

export default {
  getAllTasks,
  addNewTask,
  updateTask,
  getAlltasksOfUser,
  deleteTaskByTaskId,
  getTaskByTaskId,
};
