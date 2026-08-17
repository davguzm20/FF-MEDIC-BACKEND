import { AppException } from './app.exception';

export class ConflictException extends AppException {
  constructor(detail: string) {
    super(409, 'Conflict', detail, 'RESOURCE_ALREADY_EXISTS');
  }
}
