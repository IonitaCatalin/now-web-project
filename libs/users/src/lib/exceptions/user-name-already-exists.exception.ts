import { HttpStatus } from '@nestjs/common';
import { ErrorCode, exceptions, TranslatableBadRequestException, TranslatableException } from '@now/common';

export class UserNameAlreadyExistsException extends TranslatableBadRequestException {
    constructor() {
        super(exceptions[ErrorCode.USER_NAME_ALREADY_EXISTS].message, exceptions[ErrorCode.USER_NAME_ALREADY_EXISTS].code)
    } 
} 