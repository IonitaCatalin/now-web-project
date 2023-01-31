import { IExceptions } from "../interfaces";

export enum ErrorCode {
    USER_EMAIL_ALREADY_EXISTS = 'USER_EMAIL_ALREADY_EXISTS',
    USER_NAME_ALREADY_EXISTS = 'USER_NAME_ALREADY_EXISTS',
    USER_WRONG_CREDENTIALS = 'USER_WRONG_CREDENTIALS',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_TOKEN = 'INVALID_TOKEN'
}

export const exceptions: IExceptions = {
    [ErrorCode.USER_EMAIL_ALREADY_EXISTS]: {
        code: ErrorCode.USER_EMAIL_ALREADY_EXISTS,
        message: 'The user email already exists.'
    },
    [ErrorCode.USER_NAME_ALREADY_EXISTS]: {
        code: ErrorCode.USER_NAME_ALREADY_EXISTS,
        message: 'The user name already exists.'
    },
    [ErrorCode.USER_WRONG_CREDENTIALS]: {
        code: ErrorCode.USER_WRONG_CREDENTIALS,
        message: 'The user credentials are wrong.'
    },
    [ErrorCode.USER_NOT_FOUND]: {
        code: ErrorCode.USER_NOT_FOUND,
        message: 'The user does not exist.'
    },
    [ErrorCode.INVALID_TOKEN]: {
        code: ErrorCode.INVALID_TOKEN,
        message: 'The token is either invalid or has expired.'
    }
}