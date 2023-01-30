import { ErrorCode } from '../constants';

export interface IExceptions {
  [key: string]: {
    code: ErrorCode;
    message: ((input: any) => string) | string | any;
  };
}
