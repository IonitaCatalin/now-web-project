import { exceptions, ErrorCode, TranslatableBadRequestException } from "@now/common";

export class UserWrongCredentialsException extends TranslatableBadRequestException {
    constructor() {
        super(exceptions[ErrorCode.USER_WRONG_CREDENTIALS].message, exceptions[ErrorCode.USER_WRONG_CREDENTIALS].code);
    } 
}