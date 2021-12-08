import userDb from '../db/queries/userQuery'
import type usersModel = require('../modals/userModal')



export const getAllUsers : usersModel.GetAllUsers = async () => {
    
    try{
        return await userDb.getAllUsersFromDB();
 
     }
     catch(error)
     {
        console.log('Database ' + error)
    }
}



export const addUser : usersModel.AddUser = async (userObj :usersModel.User) => {

    try{
        userDb.insertUser(userObj);
     }
     catch(error)
     {
        console.log('Database ' + error)
    }
    return await userDb.getUserByEmail(userObj.email)

}


export const getUserDataWithEmail: usersModel.GetUser = async (email?: string | undefined) => {
    if(email===undefined)
         return undefined;
    try{
        return await userDb.getUserByEmail(email)
    }
    catch(error)
    {
        throw error;
    }


    
}

export const getUserDataWithFullName: usersModel.GetUser = async (fullname?: usersModel.User["fullName"] | undefined) => {
    if(fullname===undefined)
         return undefined;
    try{
        return await userDb.getUserByEmail(fullname)
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








