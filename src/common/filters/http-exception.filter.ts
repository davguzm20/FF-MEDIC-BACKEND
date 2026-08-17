import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

const PRISMA_ERROR_MAP: Record<string, { status: number; errorCode: string }> =
  {
    P2002: { status: 409, errorCode: 'UNIQUE_CONSTRAINT_VIOLATION' },
    P2025: { status: 404, errorCode: 'RESOURCE_NOT_FOUND' },
    P2003: { status: 400, errorCode: 'FOREIGN_KEY_VIOLATION' },
  };

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();

      if (typeof body === 'object' && body !== null) {
        const obj = body as Record<string, unknown>;
        response.status(status).json({
          title: (obj.title as string) ?? exception.message,
          status,
          detail:
            (obj.detail as string) ??
            (obj.message as string) ??
            exception.message,
          errorCode: (obj.errorCode as string) ?? 'ERROR',
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      response.status(status).json({
        title: 'Error',
        status,
        detail: typeof body === 'string' ? body : exception.message,
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

      response.status(status).json({
        title: 'Error',
        status,
        detail: exception.message,
        errorCode,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      title: 'Internal Server Error',
      status: 500,
      detail: 'Ocurrió un error interno del servidor',
      errorCode: 'INTERNAL_SERVER_ERROR',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
