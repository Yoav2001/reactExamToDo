import pool from "../../../../core/database/connection";
import type userModalBack = require("cms/domain/user/userModal");
import type userModalDb = require("../../../../core/database/Entites/interfaceUser");

const getAllUsersFromDB: userModalDb.GetAllUsers = async () => {
  const client = await pool.connect();
  const sqlAllUsers = `SELECT * FROM users`;
  try {
    const { rows } = await client.query(sqlAllUsers);
    return rows;
  } catch (err) {
    console.log("Database " + err);
  } finally {
    client.release();
  }
};

const insertUser = async (userObj: userModalBack.User) => {
  const client = await pool.connect();
  const insertQuery = `INSERT INTO users (email,pass,fullName,isAdmin)
              VALUES ('${userObj.email}','${userObj.password}','${userObj.fullName}','${userObj.isAdmin}')`;

  try {
    const res = client.query(insertQuery);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};



const getUserByEmail: userModalDb.GetUser = async (
  email: userModalBack.User["email"]
) => {
  const client = await pool.connect();

  try {
    const selectByEmail = `SELECT * FROM users WHERE email = '${email}'`;

    const res = (await client.query(selectByEmail)).rows[0];
    return res;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
const getUserByFullName: userModalDb.GetUserWithFullName = async (
  fullName: userModalBack.User["fullName"]
) => {
  const client = await pool.connect();
  try {
    const selectByFullName = `SELECT * FROM users WHERE fullName = '${fullName}'`;
    const res = (await client.query(selectByFullName)).rows[0];

    return res;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};


const deleteUserByEmail = async (email: userModalBack.User["email"]) => {
  const client = await pool.connect();

  const deleteByEmail = `Delete FROM users WHERE email ='${email}'`;
  try {
    await client.query(deleteByEmail);
  } catch (error) {
    throw error;
  }
};

const updateUserByEmail = async (userObj: userModalBack.User) => {
  const client = await pool.connect();

  const updateByEmail = `update users set (pass,fullName,isAdmin)=('${userObj.password}', '${userObj.fullName}' , ${userObj.isAdmin}) where email = '${userObj.email}' `;

  try {
    const res = client.query(updateByEmail);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export default {
  insertUser,
  getUserByEmail,
  getAllUsersFromDB,
  deleteUserByEmail,
  updateUserByEmail,
  getUserByFullName,
};

