import { ErrorCode, exceptions, TranslatableBadRequestException } from '@now/common';

export class UserEmailAlreadyExistsException extends TranslatableBadRequestException {
    constructor() {
        super(exceptions[ErrorCode.USER_EMAIL_ALREADY_EXISTS].message, exceptions[ErrorCode.USER_EMAIL_ALREADY_EXISTS].code)
    } 
} 