import { HttpException } from '@nestjs/common';

export class InvalidOperationException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: 400,
        message,
        error: 'Bad Request',
      },
      400,
    );
  }
}
