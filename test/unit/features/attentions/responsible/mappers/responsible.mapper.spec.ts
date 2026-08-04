import { Responsible, RelationshipType } from '@prisma/client';
import {
  responsibleToEntity,
  responsibleToResponse,
} from '@attentions/responsible/responsible.mapper';

const mockResponsible = {
  responsibleId: 1,
  attentionId: 1,
  name: 'Juan',
  paternalSurname: 'Pérez',
  maternalSurname: 'Gómez',
  relationship: RelationshipType.PADRE,
  relationshipOther: null,
  phone: '+51992112553',
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as Responsible;

describe('ResponsibleMapper', () => {
  describe('responsibleToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = responsibleToEntity(mockResponsible);

      expect(result).toHaveProperty('responsibleId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('relationship', RelationshipType.PADRE);
      expect(result).toHaveProperty('phone', '+51992112553');
    });
  });

  describe('responsibleToResponse', () => {
    it('debe mapear a response correctamente', () => {
      const entity = responsibleToEntity(mockResponsible);
      const result = responsibleToResponse(entity);

      expect(result).toHaveProperty('responsibleId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('relationship', RelationshipType.PADRE);
      expect(result).toHaveProperty('phone', '+51992112553');
    });
  });
});
