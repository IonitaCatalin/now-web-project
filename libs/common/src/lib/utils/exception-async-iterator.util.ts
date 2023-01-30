
import { IExceptionResponse } from '../interfaces';
import { ExceptionUtil } from './exception.util';

export class ExceptionAsyncIterator implements AsyncIterator<unknown> {
  constructor(public readonly exception: unknown) {}

  public next(): Promise<IteratorResult<unknown, IExceptionResponse>> {
    return Promise.reject(ExceptionUtil.formatException(this.exception));
  }

  public return(): Promise<IteratorResult<IExceptionResponse>> {
    return Promise.reject(ExceptionUtil.formatException(this.exception));
  }

  public throw(error: unknown): Promise<IteratorResult<unknown, IExceptionResponse>> {
    return Promise.reject(ExceptionUtil.formatException(error));
  }
}
