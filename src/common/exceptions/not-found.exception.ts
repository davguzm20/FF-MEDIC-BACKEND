import { AppException } from './app.exception';

export class NotFoundException extends AppException {
  constructor(resource: string, id: number | string) {
    super(
      404,
      'Not Found',
      `No se encontró el recurso ${resource} con id ${id}`,
      'RESOURCE_NOT_FOUND',
    );
  }
}
