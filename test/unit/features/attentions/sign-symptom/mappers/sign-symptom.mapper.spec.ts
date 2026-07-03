import { SignSymptom } from '@prisma/client';
import { signSymptomToEntity } from '@attentions/sign-symptom/sign-symptom.mapper';
import { signSymptomToResponse } from '@attentions/sign-symptom/sign-symptom.mapper';

const mockSignSymptom = {
  signSymptomId: 1,
  attentionId: 1,
  diagnosisId: 1,
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as SignSymptom;

describe('SignSymptomMapper', () => {
  describe('signSymptomToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = signSymptomToEntity(mockSignSymptom);

      expect(result).toHaveProperty('signSymptomId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('observations', null);
    });
  });

  describe('signSymptomToResponse', () => {
    it('debe mapear a response correctamente', () => {
      const entity = signSymptomToEntity(mockSignSymptom);
      const result = signSymptomToResponse(entity);

      expect(result).toHaveProperty('signSymptomId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('observations', null);
    });
  });
});
