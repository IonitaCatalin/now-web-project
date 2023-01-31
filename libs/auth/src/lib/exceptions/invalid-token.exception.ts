import { TranslatableUnauthorizedException,exceptions, ErrorCode } from "@now/common";

export class InvalidTokenException extends TranslatableUnauthorizedException {
    constructor() {
        super(exceptions[ErrorCode.INVALID_TOKEN].message, exceptions[ErrorCode.INVALID_TOKEN].code);
    }
}