import { ClinicalHistory } from '@prisma/client';
import { clinicalHistoryToEntity } from '../../../../../../src/features/patients/clinical-history/mappers/clinical-history.mapper';

const mockHistory = {
  clinicalHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  type: 'PATOLOGICO',
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as ClinicalHistory;

describe('ClinicalHistoryMapper', () => {
  describe('clinicalHistoryToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = clinicalHistoryToEntity(mockHistory);

      expect(result).toHaveProperty('clinicalHistoryId', 1);
      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('type', 'PATOLOGICO');
    });
  });
});
