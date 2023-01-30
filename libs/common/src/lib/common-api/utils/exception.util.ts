import { BadRequestException, ForbiddenException, HttpException, MethodNotAllowedException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IExceptionResponse } from "../../common/interfaces";
import { GlobalException, TranslatableBadRequestException, TranslatableException, TranslatableForbiddenException, TranslatableInternalServerErrorException, TranslatableNotAllowedException, TranslatableNotFoundException, TranslatableUnauthorizedException } from "../exceptions";

export class ExceptionUtil {
    public static formatException(exception: unknown): GlobalException {
        let error: IExceptionResponse = new TranslatableInternalServerErrorException().getResponse();

        if (exception instanceof TranslatableException) {
            error = exception.getResponse();
        } else if (exception instanceof HttpException) {
            return ExceptionUtil.formatHttpException(exception);
        }


        return new GlobalException(error.message as string, error.code, error.status);
    }   

    public static formatHttpException(exception: unknown): GlobalException {
        let error: IExceptionResponse = new TranslatableInternalServerErrorException().getResponse();

        if (exception instanceof NotFoundException) {
          error = new TranslatableNotFoundException().getResponse();
        } else if (exception instanceof ForbiddenException) {
          error = new TranslatableForbiddenException().getResponse();
        } else if (exception instanceof BadRequestException) {
          error = new TranslatableBadRequestException().getResponse();
        } else if (exception instanceof MethodNotAllowedException) {
          error = new TranslatableNotAllowedException().getResponse();
        } else if (exception instanceof UnauthorizedException) {
          error = new TranslatableUnauthorizedException().getResponse();
        }
    
        return new GlobalException(error.message as string, error.code, error.status);
    }

}