export type User = {
    email: string
    password: string,
    fullName: string,
    isAdmin:boolean
}

export type GetUser = (userId: User["email"]) => Promise<User>;
export type GetUserWithFullName = (username: User["fullName"]) => Promise<User>;
export type GetAllUsers = () => Promise<User[]>;
export type AddUser = (user:User) => Promise<User>;
export type DeleteUser = (userEmail: User["email"]) => Promise<string>;
export type SetAdmin = (userEmail: User["email"]) => Promise<User>;