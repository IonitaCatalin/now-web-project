import { Document, Model } from 'mongoose';

export interface IUserDTO {
    username?: string,
    email?: string,
    password?: string,
}

export interface IUser extends IUserDTO, Document {}
export type IUserModel = Model<IUser>