import { IResponses } from "../interfaces";

export enum Operations {
    DELETE_USER = 'DELETE_USER',
    PATCH_USER = 'PATCH_USER',
    CREATE_USER = 'CREATE_USER',
    AUTHENTICATE_USER = 'AUTHENTICATE_USER'
}

export const responses: IResponses = {
    [Operations.DELETE_USER]: {
        message: 'User deleted successfully.'
    },
    [Operations.PATCH_USER]: {
        message: 'User updated successfully.'
    },
    [Operations.CREATE_USER]: {
        message: 'User registered successfully.'
    },
    [Operations.AUTHENTICATE_USER]: {
        message: 'User authenticated successfully.'
    }
}