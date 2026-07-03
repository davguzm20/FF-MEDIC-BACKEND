import { BioFunction } from '@prisma/client';
import { bioFunctionToEntity } from '@attentions/bio-function/bio-function.mapper';
import { bioFunctionToResponse } from '@attentions/bio-function/bio-function.mapper';

const mockBioFunction = {
  bioFunctionId: 1,
  attentionId: 1,
  type: 'DIGESTIVO',
  status: 'NORMAL',
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as BioFunction;

describe('BioFunctionMapper', () => {
  describe('bioFunctionToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = bioFunctionToEntity(mockBioFunction);

      expect(result).toHaveProperty('bioFunctionId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('type', 'DIGESTIVO');
    });
  });

  describe('bioFunctionToResponse', () => {
    it('debe mapear a response correctamente', () => {
      const entity = bioFunctionToEntity(mockBioFunction);
      const result = bioFunctionToResponse(entity);

      expect(result).toHaveProperty('bioFunctionId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('type', 'DIGESTIVO');
    });
  });
});
