export type User = {
    email: string
    password: string,
    fullName: string,
    isAdmin:boolean
}
export type AddResult = "Added Succeeded" | "Failed to add "
export type UpdateResult = "update Succeeded" | "Failed to update"|"sorry cant update without email"|"this user dont exist in db" 

export type GetUser = (userId: User["email"]) => Promise<User |undefined>;
export type GetUserWithFullName = (username: User["fullName"]) => Promise<User  |undefined>;
export type GetAllUsers = () => Promise<User[]  |undefined>;
export type AddUser = (user:User) => Promise<User  |undefined>;
export type updateUser = (user:User) => string;

export type DeleteUser = (userEmail: User["email"]) => Promise<string>;
export type SetAdmin = (userEmail: User["email"]) => Promise<User>;