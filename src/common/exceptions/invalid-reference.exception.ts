import { HttpException } from '@nestjs/common';

export class InvalidReferenceException extends HttpException {
  constructor(resource: string, id: number | string) {
    super(
      {
        statusCode: 400,
        message: `${resource} con id ${id} no existe`,
        error: 'Bad Request',
      },
      400,
    );
  }
}
