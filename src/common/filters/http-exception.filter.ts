import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from '../validators/validation.exception';
import {
  ConflictException,
  NotFoundException,
  InvalidReferenceException,
  DataConstraintException,
} from '../exceptions';

const PG_UNIQUE_VIOLATION = '23505';
const PG_FOREIGN_KEY_VIOLATION = '23503';
const PG_CHECK_VIOLATION = '23514';
const PG_NOT_NULL_VIOLATION = '23502';
const PG_STRING_LENGTH_EXCEEDED = '22001';

function isPrismaError(exception: unknown): boolean {
  if (!(exception instanceof Error)) return false;
  if (exception.name === 'PrismaClientKnownRequestError') return true;
  if (exception.name === 'DriverAdapterError') return true;
  return false;
}

function resolvePostgresCode(exception: unknown): string | undefined {
  if (!(exception instanceof Error)) return undefined;

  if (exception.name === 'PrismaClientKnownRequestError') {
    return (exception as { code?: string }).code;
  }

  if (exception.name === 'DriverAdapterError') {
    const cause = (exception as { cause?: Record<string, unknown> }).cause;
    if (!cause) return undefined;

    if (cause.kind === 'postgres' && typeof cause.code === 'string') {
      return cause.code;
    }

    if (
      typeof cause.kind === 'string' &&
      [
        'UniqueConstraintViolation',
        'ForeignKeyConstraintViolation',
        'NullConstraintViolation',
      ].includes(cause.kind)
    ) {
      return cause.kind;
    }
  }

  return undefined;
}

function mapPrismaError(exception: unknown): HttpException {
  const pgCode = resolvePostgresCode(exception);

  if (
    pgCode === 'P2002' ||
    pgCode === PG_UNIQUE_VIOLATION ||
    pgCode === 'UniqueConstraintViolation'
  ) {
    return new ConflictException('Ya existe un registro con los mismos datos');
  }
  if (pgCode === 'P2025') {
    return new NotFoundException('registro', 'el ID proporcionado');
  }
  if (
    pgCode === 'P2003' ||
    pgCode === PG_FOREIGN_KEY_VIOLATION ||
    pgCode === 'ForeignKeyConstraintViolation'
  ) {
    return new InvalidReferenceException(
      'registro relacionado',
      'el ID proporcionado',
    );
  }
  if (pgCode === PG_CHECK_VIOLATION) {
    return new DataConstraintException(
      'Los datos enviados no cumplen con las restricciones de validación',
    );
  }
  if (
    pgCode === PG_NOT_NULL_VIOLATION ||
    pgCode === 'P2011' ||
    pgCode === 'NullConstraintViolation'
  ) {
    return new DataConstraintException(
      'Faltan campos obligatorios en la solicitud',
    );
  }
  if (pgCode === PG_STRING_LENGTH_EXCEEDED || pgCode === 'P2000') {
    return new DataConstraintException(
      'Uno de los valores excede la longitud máxima permitida',
    );
  }

  const message = exception instanceof Error ? exception.message : '';

  if (message.includes('violates check constraint')) {
    return new DataConstraintException(
      'Los datos enviados no cumplen con las restricciones de validación',
    );
  }
  if (
    message.includes('foreign key constraint') ||
    message.includes('Foreign key constraint failed')
  ) {
    return new InvalidReferenceException(
      'registro relacionado',
      'el ID proporcionado',
    );
  }
  if (message.includes('Unique constraint failed')) {
    return new ConflictException('Ya existe un registro con los mismos datos');
  }
  if (message.includes('Null constraint violation')) {
    return new DataConstraintException(
      'Faltan campos obligatorios en la solicitud',
    );
  }
  if (message.includes('Value too long')) {
    return new DataConstraintException(
      'Uno de los valores excede la longitud máxima permitida',
    );
  }

  return new HttpException(
    {
      title: 'Error interno del servidor',
      status: 500,
      detail: 'Ocurrió un error inesperado en la base de datos',
      errorCode: 'INTERNAL_SERVER_ERROR',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

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

    if (isPrismaError(exception)) {
      const mapped = mapPrismaError(exception);
      const status = mapped.getStatus();
      const body = mapped.getResponse() as Record<string, unknown>;
      const debugMessage =
        exception instanceof Error ? exception.message : String(exception);

      response.status(status).json({
        title: (body.title as string) ?? 'Error',
        status,
        detail: (body.detail as string) ?? 'Error',
        errorCode: (body.errorCode as string) ?? 'ERROR',
        _debug: debugMessage,
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
