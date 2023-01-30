import { HttpException } from '@nestjs/common';
import { IExceptionResponse } from '..';

export class TranslatableException extends HttpException {
  constructor(public readonly msg: string | ((input: any) => string), public readonly code: string, status?: number, public readonly stack?: string) {
    super('', status);
  }

  getResponse(): IExceptionResponse {
    return {
      code: this.code,
      message: this.msg,
      status: this.getStatus(),
    };
  }

  toString(): string {
    return JSON.stringify(this.getResponse());
  }
}
