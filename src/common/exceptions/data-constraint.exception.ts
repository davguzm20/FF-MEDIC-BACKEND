import { AppException } from './app.exception';

export class DataConstraintException extends AppException {
  constructor(detail: string) {
    super(400, 'Restricción de datos', detail, 'DATA_CONSTRAINT_VIOLATION');
  }
}
