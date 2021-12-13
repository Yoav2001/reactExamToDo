import userDb from '../db/queries/userQuery'
import type usersModel = require('../modals/userModal')
import { Iuser } from '../interfaceDB/interfaceUser';


export const getAllUsers : usersModel.GetAllUsers = async () => {
    
    try{
        const arrUserObjDb:Iuser[] |undefined= await userDb.getAllUsersFromDB();
        if(arrUserObjDb===undefined){
            console.log("error");
        return

        }

     const arrByModelUser:usersModel.User[]= arrUserObjDb.map(user =>{return {email:user.email,password:user.pass,fullName:user.fullname,isAdmin:user.isadmin}})
        
     return arrByModelUser;
     }
     catch(error)
     {
        console.log('Database ' + error)
    }
}



export const addUser : usersModel.AddUser = async (userObj :usersModel.User) => {

    try{
    
       await userDb.insertUser(userObj);
       const iuser=await userDb.getUserByEmail(userObj.email);
       if(iuser!==undefined){
           const userObjModel:usersModel.User={email:iuser.email,password:iuser.pass,fullName:iuser.fullname,isAdmin:iuser.isadmin}
           return userObjModel;
       }
     }
     catch(error)
     {
        console.log('Database ' + error)
    }
   
    
}


export const getUserDataWithEmail: usersModel.GetUser = async (email?: string | undefined) => {
    if(email===undefined)
         return undefined;
    try{
    
        const iuser=await userDb.getUserByEmail(email);
        if(iuser!==undefined){
            const userObjModel:usersModel.User={email:iuser.email,password:iuser.pass,fullName:iuser.fullname,isAdmin:iuser.isadmin}
            return userObjModel;
        }
    }
    catch(error)
    {
        throw error;
    }


    
}

export const getUserDataWithFullName: usersModel.GetUserWithFullName = async (name?: usersModel.User["fullName"] ) => {
    if(name===undefined)
         return undefined;
    try{
        const iuser=await userDb.getUserByFullName(name);
        if(iuser!==undefined){
            const userObjModel:usersModel.User={email:iuser.email,password:iuser.pass,fullName:iuser.fullname,isAdmin:iuser.isadmin}
            return userObjModel; 
           }

        }
    catch(error)
    {
        throw error;
    }


    
}


export const deleteUserWithEmail: usersModel.DeleteUser = async (email?: usersModel.User["email"]| undefined) => {
    if(email===undefined)
        return "the email is undefined cant delete";
        
    // if(userDb.getUserByEmail(email)===undefined)
    //     return "this email Not registered in the system"

    try{
         userDb.deleteUserByEmail(email)

    }   
    catch(error){
        throw error;
    }
    
    return "the user was deleted"
   


}


// דרך א

const updateUserNameWithEmail: usersModel.updateUser = async (userObj:usersModel.User) => {
    if (userObj?.email === undefined || "") return "sorry cant update without email";


    userDb.getUserByEmail(userObj.email).then((getUser) : usersModel.UpdateResult |undefined => {
        if(!getUser) return 'this user dont exist in db';
        userDb.updateUserByEmail(userObj).then(() : usersModel.UpdateResult => {
            return "update Succeeded"
        })
        .catch(() : usersModel.UpdateResult => {
            return "Failed to update"
        })
    })

}

//פתרון ב 

// const updateUserNameWithEmail: usersModel.updateUser = async (userObj:usersModel.User) => {
//     if (userObj?.email === undefined || "") return "sorry cant update without email";

//     const getUser = await userDb.getUserByEmail(userObj.email);
    
//     if(!getUser) return "this user dont exist in db";

//     try {
//         userDb.updateUserByEmail(userObj);
//         return "update Succeeded"
//     }
//     catch{
//         return "Failed to update"
//     }
// }











export default {addUser, getUserDataWithEmail,deleteUserWithEmail,updateUserNameWithEmail,getAllUsers};








