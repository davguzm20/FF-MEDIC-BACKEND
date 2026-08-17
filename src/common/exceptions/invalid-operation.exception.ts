import { AppException } from './app.exception';

export class InvalidOperationException extends AppException {
  constructor(detail: string) {
    super(400, 'Operación inválida', detail, 'INVALID_OPERATION');
  }
}
