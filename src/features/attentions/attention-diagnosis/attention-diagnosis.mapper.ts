import { AttentionDiagnosis } from '@prisma/client';
import { AttentionDiagnosisEntity } from './attention-diagnosis.entity';
import { AttentionDiagnosisResponse } from './dtos/attention-diagnosis.response';

export const attentionDiagnosisToEntity = (
  diagnosis: AttentionDiagnosis,
): AttentionDiagnosisEntity => ({
  attentionDiagnosisId: diagnosis.attentionDiagnosisId,
  attentionId: diagnosis.attentionId,
  diagnosisId: diagnosis.diagnosisId,
  type: diagnosis.type,
  specifications: diagnosis.specifications,
  createdAt: diagnosis.createdAt,
  updatedAt: diagnosis.updatedAt,
});

export const attentionDiagnosisToResponse = (
  entity: AttentionDiagnosisEntity,
): AttentionDiagnosisResponse => ({
  diagnosisId: entity.diagnosisId,
  type: entity.type,
  specifications: entity.specifications,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
