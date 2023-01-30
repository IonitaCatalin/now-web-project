import { ISchemaFactory } from "@now/common";
import { Schema} from "mongoose";

export class UserSchemaFactory implements ISchemaFactory {
    getSchema(): Schema {
        return new Schema({
            username: {
                type: Schema.Types.String,
                required: true,
            },
            password: {
                type: Schema.Types.String,
                required: true
            },
            email: {
                type: Schema.Types.String,
                required: true
            } 
        })
    }
}