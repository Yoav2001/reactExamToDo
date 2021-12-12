export interface Iuser{
    email:string,
    pass:string,
    fullname :string,
    isadmin:boolean
}




export type GetUser = (userEmail: Iuser["email"]) => Promise<Iuser |undefined>;
export type GetUserWithFullName = (username: Iuser["fullname"]) => Promise<Iuser  |undefined>;
export type GetAllUsers = () => Promise<Iuser[]  |undefined>;
export type AddUser = (user:Iuser) => Promise<Iuser |undefined>;
export type SetAdmin = (userEmail: Iuser["email"]) => Promise<Iuser>;