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

const updateUserNameWithEmail:usersModel.updateUser = (userObj:usersModel.User) =>{
    let updateRespone : usersModel.UpdateResult="update Succeeded"
    if(userObj?.email === undefined)
        updateRespone="sorry cant update without email" 
    
    const userExist =JSON.stringify(userDb.getUserByEmail(userObj.email))
    console.log(userExist);
    
     if(userExist==="{}")
        updateRespone="this user dont exist in db"

        try{
            userDb.updateUserByEmail(userObj);
   
       }   
       catch(error){
           updateRespone="Failed to update"
           throw error;
           
       }

       return updateRespone;
}


// function isUserRegistered(email :string , password : string) :boolean{

    
// }



export default {addUser, getUserDataWithEmail,deleteUserWithEmail,updateUserNameWithEmail,getAllUsers};

// const addUser =async (email:string,password:string,name:string,gender:number)=>{
//     try{
//         await  userDb.insertUser(email,password,name,gender)
//         return "table create succ"
//     }

//     catch(error){
//         throw error;
//     }

// }




// export const getUserWithEmail = async (email?: string | undefined) => {
//     if(email !== undefined) return await getUserByEmail(email);
//     return await getAllUsers();
// }




