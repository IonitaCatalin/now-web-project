import { HttpException } from '@nestjs/common';
import { IExceptionResponse } from '../../common/interfaces';

export class GlobalException extends HttpException {
  constructor(public readonly message: string, public readonly code: string, status: number) {
    super(message, status);

    delete this.name;
  }

  /**
   * @inheritdoc
   */
  getResponse(): IExceptionResponse {
    return {
      code: this.code,
      message: this.message,
      status: this.getStatus(),
    };
  }
}
