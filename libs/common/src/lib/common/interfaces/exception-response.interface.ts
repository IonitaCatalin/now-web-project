export interface IExceptionResponse {
    code: string;
    message: string | ((input: any) => string);
    status: number
  }
  