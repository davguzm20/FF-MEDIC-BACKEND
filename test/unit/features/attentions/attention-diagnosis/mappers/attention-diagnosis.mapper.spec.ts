import { AttentionDiagnosis } from '@prisma/client';
import { attentionDiagnosisToEntity } from '@attentions/attention-diagnosis/attention-diagnosis.mapper';
import { attentionDiagnosisToResponse } from '@attentions/attention-diagnosis/attention-diagnosis.mapper';

const mockDiagnosis = {
  attentionDiagnosisId: 1,
  attentionId: 1,
  diagnosisId: 1,
  type: 'PRINCIPAL',
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as AttentionDiagnosis;

describe('AttentionDiagnosisMapper', () => {
  describe('attentionDiagnosisToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = attentionDiagnosisToEntity(mockDiagnosis);

      expect(result).toHaveProperty('attentionDiagnosisId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('type', 'PRINCIPAL');
    });
  });

  describe('attentionDiagnosisToResponse', () => {
    it('debe mapear a response correctamente', () => {
      const entity = attentionDiagnosisToEntity(mockDiagnosis);
      const result = attentionDiagnosisToResponse(entity);

      expect(result).toHaveProperty('attentionDiagnosisId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('type', 'PRINCIPAL');
    });
  });
});
