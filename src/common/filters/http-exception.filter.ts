import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../validators/validation.exception';

const PRISMA_ERROR_MAP: Record<
  string,
  { status: number; errorCode: string; detail: string }
> = {
  P2002: {
    status: 409,
    errorCode: 'UNIQUE_CONSTRAINT_VIOLATION',
    detail: 'Ya existe un registro con los mismos datos',
  },
  P2025: {
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND',
    detail: 'El registro no fue encontrado en la base de datos',
  },
  P2003: {
    status: 400,
    errorCode: 'FOREIGN_KEY_VIOLATION',
    detail: 'La referencia a otro registro no es válida',
  },
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof ValidationException) {
      const errors = exception.errors;
      const count = errors.length;
      const summary =
        count === 1
          ? 'La solicitud contiene 1 error de validación'
          : `La solicitud contiene ${count} errores de validación`;

      response.status(422).json({
        title: 'Error de validación',
        status: 422,
        detail: summary,
        errorCode: 'VALIDATION_ERROR',
        errors,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();

      if (typeof body === 'object' && body !== null) {
        const obj = body as Record<string, unknown>;
        response.status(status).json({
          title: (obj.title as string) ?? 'Error',
          status,
          detail: (obj.detail as string) ?? (obj.message as string) ?? 'Error',
          errorCode: (obj.errorCode as string) ?? 'ERROR',
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      response.status(status).json({
        title: 'Error',
        status,
        detail: typeof body === 'string' ? body : 'Error',
        errorCode: 'ERROR',
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (
      exception instanceof Error &&
      exception.name === 'PrismaClientKnownRequestError'
    ) {
      const prismaCode = (exception as { code?: string }).code;
      const mapped = prismaCode ? PRISMA_ERROR_MAP[prismaCode] : undefined;
      const status = mapped?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const errorCode = mapped?.errorCode ?? 'INTERNAL_SERVER_ERROR';
      const detail = mapped?.detail ?? 'Ocurrió un error en la base de datos';

      response.status(status).json({
        title: 'Error',
        status,
        detail,
        errorCode,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      title: 'Error interno del servidor',
      status: 500,
      detail: 'Ocurrió un error inesperado. Intente nuevamente.',
      errorCode: 'INTERNAL_SERVER_ERROR',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
