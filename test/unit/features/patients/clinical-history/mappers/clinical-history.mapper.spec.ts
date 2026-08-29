import { ClinicalHistory, HistoryType } from '@prisma/client';
import { clinicalHistoryToEntity } from '@patients/clinical-history/clinical-history.mapper';

const mockHistory = {
  clinicalHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  type: HistoryType.PATOLOGICO,
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
      expect(result).toHaveProperty('type', HistoryType.PATOLOGICO);
    });

    it('debe aceptar diagnosisId null (historia sin diagnóstico)', () => {
      const result = clinicalHistoryToEntity({
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.ALERGIA,
      });

      expect(result.diagnosisId).toBeNull();
      expect(result.type).toBe(HistoryType.ALERGIA);
    });
  });
});
