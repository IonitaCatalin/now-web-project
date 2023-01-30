import { HttpStatus } from '@nestjs/common';
import { TranslatableException } from './translatable.exception';

export class TranslatableUnauthorizedException extends TranslatableException {
  constructor(response = 'You are not authorized to execute this operation', code = 'ERROR_UNAUTHORIZED_MESSAGE') {
    super(response, code, HttpStatus.UNAUTHORIZED);
  }
}
