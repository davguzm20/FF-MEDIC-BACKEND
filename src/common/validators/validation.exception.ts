import { AppException } from '../exceptions/app.exception';

export interface ValidationErrorItem {
  field: string;
  message: string;
  code: string;
}

export class ValidationException extends AppException {
  public readonly errors: ValidationErrorItem[];

  constructor(errors: ValidationErrorItem[]) {
    const count = errors.length;
    const summary =
      count === 1
        ? 'La solicitud contiene 1 error de validación'
        : `La solicitud contiene ${count} errores de validación`;

    super(422, 'Error de validación', summary, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}
