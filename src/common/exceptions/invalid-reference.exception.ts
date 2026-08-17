import { AppException } from './app.exception';

export class InvalidReferenceException extends AppException {
  constructor(resource: string, id: number | string) {
    super(
      400,
      'Referencia inválida',
      `La referencia ${resource} con id ${id} no es válida`,
      'INVALID_REFERENCE',
    );
  }
}
