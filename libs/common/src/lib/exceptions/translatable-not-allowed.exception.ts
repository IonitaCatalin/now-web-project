import { HttpStatus } from '@nestjs/common';
import { TranslatableException } from './translatable.exception';

export class TranslatableNotAllowedException extends TranslatableException {
  constructor(response = 'You are not allowed to execute this operation', code = 'ERROR_NOT_ALLOWED_MESSAGE') {
    super(response, code, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
