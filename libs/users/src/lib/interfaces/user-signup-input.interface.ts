import { IUserDTO } from "./user.interface";

export interface IUserSignupInput extends IUserDTO {
    username: string,
    password: string
} 