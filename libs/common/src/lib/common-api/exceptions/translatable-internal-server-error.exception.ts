import { HttpStatus } from '@nestjs/common';
import { TranslatableException } from './translatable.exception';

export class TranslatableInternalServerErrorException extends TranslatableException {
  constructor(response = 'An error has occurred. Please try again later', code = 'ERROR_INTERNAL_SERVER_MESSAGE') {
    super(response, code, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
