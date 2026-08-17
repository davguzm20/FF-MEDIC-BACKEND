import { HttpException } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    status: number,
    title: string,
    detail: string,
    errorCode: string,
  ) {
    super({ title, status, detail, errorCode }, status);
  }
}
