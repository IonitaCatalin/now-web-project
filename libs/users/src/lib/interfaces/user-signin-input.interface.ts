import { IUserDTO } from "./user.interface";

export interface IUserSinginInput extends IUserDTO {
    username: string,
    password: string
}