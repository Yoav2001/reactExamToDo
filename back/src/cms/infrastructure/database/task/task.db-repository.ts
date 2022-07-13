import pool from "../../../../core/database/connection";
import type taskModal = require("../../../domain/task/taskModal");
import type usersModel = require("../../../domain/user/userModal");
import type taskModalDb = require("../../../../core/database/Entites/interfaceTask");

const getAlltaskFromDB: taskModalDb.GetAllTasks = async () => {
  const client = await pool.connect();
  const sqlAllUsers= `SELECT *, to_char(date(endtime),'YYYY-MM-DD') AS endtimeasdateinput
  FROM tasks order by id desc`
  try {
    const { rows } = await client.query(sqlAllUsers);
    return rows;
  } catch (err) {
    console.log("Database " + err);
  } finally {
    client.release();
  }
};

const getTaskByTaskId: taskModalDb.GetTaskByTaskId = async (
  id: taskModalDb.Itask["id"]
) => {
  const client = await pool.connect();
  const selectByTaskID = `select * from tasks where id = ${id}`;
  try {
    const { rows } = await client.query(selectByTaskID);
    const task: Promise<taskModalDb.Itask | undefined> = rows[0];
    return task;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const insertNewTask = async (taskObj: taskModal.Task) => {
  const client = await pool.connect();
  const insertQuery = `INSERT INTO tasks (userEmail,name,startDate,endTime,isComplete,isRelevent)
              VALUES ('${taskObj.emailUserOfTask}','${taskObj.taskName}','${taskObj.startDate}','${taskObj.endTime}','${taskObj.isComplete}','${taskObj.isRelevent}')`;
  try {
    await client.query(insertQuery);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const getAllTaskByUserEmail: taskModalDb.GetTasksOfUser = async (email: usersModel.User["email"]) => {
  const client = await pool.connect();
  try {
    const selectByEmail = `SELECT *, to_char(date(endtime),'YYYY-MM-DD') AS endtimeasdateinput
    FROM tasks WHERE userEmail = '${email}' order by id desc`;
    const res = (await client.query(selectByEmail)).rows;
    return res;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const deleteTaskByTaskId = async (taskId: taskModal.Task["taskId"]) => {
  const client = await pool.connect();
  const deleteByEmail = `Delete FROM tasks WHERE id ='${taskId}'`;
  try {
    await client.query(deleteByEmail);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const updateTaskByTaskObject = async (taskObj: taskModal.Task) => {
  const client = await pool.connect();
  const updateByEmail = `update tasks set name = '${taskObj.taskName}' , startDate = '${taskObj.startDate}' , endTime = '${taskObj.endTime}', isComplete = ${taskObj.isComplete} , isRelevent = ${taskObj.isRelevent}  where id = ${taskObj.taskId} `;
  try {
    await client.query(updateByEmail);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
export default {
  getAlltaskFromDB,
  insertNewTask,
  getAllTaskByUserEmail,
  deleteTaskByTaskId,
  updateTaskByTaskObject,
  getTaskByTaskId,
};
