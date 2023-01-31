import { HttpException } from '@nestjs/common';

export interface IExceptionCallBackFormat extends HttpException {
  port?: number;
  errno?: string;
  error?: { error?: string };
}
