import { Diagnosis } from '@prisma/client';
import { DiagnosisEntity } from '@attentions/diagnosis/diagnosis.entity';
import {
  diagnosisToEntity,
  diagnosisToResponse,
} from '@attentions/diagnosis/diagnosis.mapper';
import { DiagnosisResponse } from '@attentions/diagnosis/dtos/diagnosis.response';

const mockDiagnosis: Diagnosis = {
  diagnosisId: 1,
  cie10: 'A00',
  description: 'Cólera',
  isActive: true,
};

describe('DiagnosisMapper', () => {
  describe('diagnosisToEntity', () => {
    it('debe mapear correctamente a DiagnosisEntity', () => {
      const result: DiagnosisEntity = diagnosisToEntity(mockDiagnosis);

      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('cie10', 'A00');
      expect(result).toHaveProperty('description', 'Cólera');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('diagnosisToResponse', () => {
    it('debe mapear correctamente a DiagnosisResponse', () => {
      const entity: DiagnosisEntity = {
        diagnosisId: 1,
        cie10: 'A00',
        description: 'Cólera',
        isActive: true,
      };
      const result: DiagnosisResponse = diagnosisToResponse(entity);

      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('cie10', 'A00');
      expect(result).toHaveProperty('description', 'Cólera');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
