import { IMailTemplate } from "../interfaces";

export enum EmailType {
    ACCOUNT_CREATION = 'ACCOUNT_CREATION'
}

export const templates: IMailTemplate = {
    [EmailType.ACCOUNT_CREATION]: {
        options: {
            subject: 'Account created successfully!',
            text: 'Your account was created successfully.',
            from: process.env.SEND_GRID_SENDER,
            to: ''
        } 
    }
} 