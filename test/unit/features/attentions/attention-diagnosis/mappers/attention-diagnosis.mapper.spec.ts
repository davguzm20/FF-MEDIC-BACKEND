import { AttentionDiagnosis } from '@prisma/client';
import {
  attentionDiagnosisToEntity,
  attentionDiagnosisToResponse,
} from '@attentions/attention-diagnosis/attention-diagnosis.mapper';

const mockDiagnosis = {
  attentionDiagnosisId: 1,
  attentionId: 1,
  diagnosisId: 1,
  type: 'PRESUNTIVO',
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as AttentionDiagnosis;

describe('AttentionDiagnosisMapper', () => {
  it('debe mapear a entidad', () => {
    const result = attentionDiagnosisToEntity(mockDiagnosis);

    expect(result).toHaveProperty('attentionDiagnosisId', 1);
    expect(result).toHaveProperty('attentionId', 1);
    expect(result).toHaveProperty('diagnosisId', 1);
    expect(result).toHaveProperty('specifications', null);
  });

  it('debe mapear a respuesta', () => {
    const result = attentionDiagnosisToResponse(mockDiagnosis);

    expect(result).toHaveProperty('diagnosisId', 1);
    expect(result).toHaveProperty('type', 'PRESUNTIVO');
    expect(result).not.toHaveProperty('attentionDiagnosisId');
    expect(result).not.toHaveProperty('attentionId');
  });
});
