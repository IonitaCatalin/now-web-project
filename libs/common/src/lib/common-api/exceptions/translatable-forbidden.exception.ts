import { HttpStatus } from '@nestjs/common';
import { exceptions, ErrorCode } from '../../common';
import { TranslatableException } from './translatable.exception';

export class TranslatableForbiddenException extends TranslatableException {
    constructor(response: string | ((input: any) => string) = 'The request is forbidden.', code = 'ERROR_FORBIDDEN') {
        super(response, code, HttpStatus.FORBIDDEN);
      }
}
