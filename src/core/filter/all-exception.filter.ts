import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

export enum ERROR_TYPE {
  SERVER = 'SERVER',
  VALIDATOR = 'VALIDATOR',
  SERVICE = 'SERVICE',
}

export class ErrorResponse {
  code: string;
  statusCode: HttpStatus;
  type: ERROR_TYPE;
  message: string;
  value?: object = {};
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const errorResponse: ErrorResponse = {
      code: exception.name,
      statusCode: exception.status
        ? exception.status
        : HttpStatus.INTERNAL_SERVER_ERROR,
      type: ERROR_TYPE.SERVER,
      message: `${exception.message}`,
    };

    res.status(errorResponse.statusCode).json({
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
    return null;
  }
}
