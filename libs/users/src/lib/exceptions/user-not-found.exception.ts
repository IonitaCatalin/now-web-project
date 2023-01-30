import { exceptions, ErrorCode, TranslatableNotFoundException } from "@now/common";

export class UserNotFoundException extends TranslatableNotFoundException {
    constructor() {
        super(exceptions[ErrorCode.USER_NOT_FOUND].message, exceptions[ErrorCode.USER_NOT_FOUND].code);
    } 
}