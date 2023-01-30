import { IUserDTO } from "./user.interface";

export interface IUserPatchInput extends IUserDTO {
    username?: string,
    password?: string
}