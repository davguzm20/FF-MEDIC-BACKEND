import { HttpException } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(resource: string, id: number | string) {
    super(
      {
        statusCode: 404,
        message: `${resource} con id ${id} no encontrado`,
        error: 'Not Found',
      },
      404,
    );
  }
}
