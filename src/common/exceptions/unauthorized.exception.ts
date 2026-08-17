import { AppException } from './app.exception';

export class UnauthorizedException extends AppException {
  constructor(detail: string, errorCode = 'UNAUTHORIZED') {
    super(401, 'Unauthorized', detail, errorCode);
  }
}
