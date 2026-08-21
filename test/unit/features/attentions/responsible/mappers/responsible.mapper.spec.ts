import { Responsible } from '@prisma/client';
import {
  responsibleToEntity,
  responsibleToResponse,
} from '@attentions/responsible/responsible.mapper';

const mockResponsible = {
  responsibleId: 1,
  attentionId: 1,
  name: 'Maria',
  paternalSurname: 'Garcia',
  maternalSurname: 'Torres',
  relationship: 'PADRE',
  relationshipOther: null,
  phone: '+51992112553',
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as Responsible;

describe('ResponsibleMapper', () => {
  describe('responsibleToEntity', () => {
    it('debe mapear a entidad', () => {
      const result = responsibleToEntity(mockResponsible);

      expect(result).toHaveProperty('responsibleId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('relationship', 'PADRE');
      expect(result).toHaveProperty('relationshipOther', null);
    });
  });

  describe('responsibleToResponse', () => {
    it('debe mapear a respuesta', () => {
      const result = responsibleToResponse(mockResponsible);

      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('name', 'Maria');
      expect(result).toHaveProperty('phone', '+51992112553');
      expect(result).not.toHaveProperty('responsibleId');
    });
  });
});
