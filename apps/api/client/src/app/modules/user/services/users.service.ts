import { Inject } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IUser, IUserDTO, IUserModel, UserSchemaFactory } from '@now/users';
import * as bcrypt from 'bcrypt';

export class UsersService {

    public static modelName = 'User';
    private readonly model: IUserModel;

    constructor(
        @Inject('DatabaseConnection') private readonly connection: Connection,
        private readonly userSchemaFactory: UserSchemaFactory
    ) {
        this.model = this.connection.model(UsersService.modelName, this.userSchemaFactory.getSchema(), 'users') as IUserModel;
    }  

    async createUser(user: IUserDTO): Promise<IUser> {
        user.password = await bcrypt.hash(user.password, 10);
        return this.model.create(user)
    }

    async deleteUser(id: string): Promise<unknown> {
        return this.model.deleteOne({_id: new ObjectId(id)});
    }

    async getUser(id: string): Promise<IUser> {
        return this.getModel().findOne({_id: new ObjectId(id)});
    }

    async findByUsername(username: string): Promise<IUser> {
        return this.getModel().findOne({username: username});
    } 

    async findByEmail(email: string): Promise<IUser> {
        return this.getModel().findOne({email: email});
    }

    async findById(id: string): Promise<IUser> {
        return this.getModel().findOne({_id: new ObjectId(id)});
    } 

    async exists(user: IUserDTO): Promise<boolean> {
        return await this.getModel().findOne(user) === undefined;
    } 

    async updateUser(id: string, user: IUserDTO): Promise<unknown> {
        return this.getModel().updateOne({_id: new ObjectId(id)}, {$set: user});
    }

    public getModel(): IUserModel {
        return this.model;
    }
    
}