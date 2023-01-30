import { HttpStatus } from '@nestjs/common';
import { TranslatableException } from './translatable.exception';

export class TranslatableNotFoundException extends TranslatableException {
  constructor(response: string | ((input: any) => string) = 'The resources you are looking for was not found', code = 'ERROR_NOT_FOUND_MESSAGE') {
    super(response, code, HttpStatus.NOT_FOUND);
  }
}
