import { Schema } from 'mongoose';

export interface ISchemaFactory {
    getSchema(): Schema
}