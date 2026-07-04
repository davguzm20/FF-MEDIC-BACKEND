import { HttpException } from '@nestjs/common';

export class DuplicateException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: 409,
        message,
        error: 'Conflict',
      },
      409,
    );
  }
}
