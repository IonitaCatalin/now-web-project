import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { GlobalException } from "../exceptions";
import { ExceptionAsyncIterator, ExceptionUtil } from "../utils";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    private logger: Logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost): GlobalException | ExceptionAsyncIterator{
        this.logException(exception);
        
        return this.handleApi(exception,host);

    }

    protected logException(exception: unknown): void {
        if(exception instanceof HttpException) {
            this.logger.error(`${JSON.stringify(exception.getResponse())} (${JSON.stringify(exception.stack ? exception.stack.split('\n').map(item => item.trim()) : [])})`)
        } else if (exception instanceof Error) {
            this.logger.error(`${exception.message} (${JSON.stringify(exception.stack ? exception.stack.split('\n').map(item => item.trim()) : [])})`);
        } else {
            this.logger.error(JSON.stringify(exception));
        }

    }
    protected handleApi(exception: unknown, host: ArgumentsHost): GlobalException | ExceptionAsyncIterator {
        const response = host.switchToHttp().getResponse<Response>();


        if (response && response.status && response.json) {
            response
              .status(exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR)
              .json(ExceptionUtil.formatException(exception));
      
            return ExceptionUtil.formatException(exception);
          }
      
        return new ExceptionAsyncIterator(exception);
    } 
}