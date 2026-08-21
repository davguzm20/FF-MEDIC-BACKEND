import { AppException } from './app.exception';

const GENDER_ARTICLES: Record<string, string> = {
  atencion: 'la',
  'forma farmaceutica': 'la',
  interconsulta: 'la',
  receta: 'la',
};

const DEFAULT_ARTICLE = 'el';

const normalize = (resource: string): string =>
  resource
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const resolveArticle = (resource: string): string =>
  GENDER_ARTICLES[normalize(resource)] ?? DEFAULT_ARTICLE;

export class NotFoundException extends AppException {
  constructor(resource: string, id: number | string) {
    super(
      404,
      'No encontrado',
      `No se encontró ${resolveArticle(resource)} ${resource} con id ${id}`,
      'RESOURCE_NOT_FOUND',
    );
  }
}
