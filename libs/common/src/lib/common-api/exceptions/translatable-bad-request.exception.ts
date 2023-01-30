import { HttpStatus } from '@nestjs/common';
import { TranslatableException } from './translatable.exception';
export class TranslatableBadRequestException extends TranslatableException {
  constructor(response: string | ((input: any) => string) = 'The request is not valid, and can not be processed.', code = 'ERROR_BAD_REQUEST') {
    super(response, code, HttpStatus.BAD_REQUEST);
  }
}
