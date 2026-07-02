import { Diagnosis } from '@prisma/client';
import { DiagnosisEntity } from './diagnosis.entity';
import { DiagnosisResponse } from './dtos/diagnosis.response';

export const diagnosisToEntity = (diagnosis: Diagnosis): DiagnosisEntity => ({
  diagnosisId: diagnosis.diagnosisId,
  cie10: diagnosis.cie10,
  description: diagnosis.description,
  isActive: diagnosis.isActive,
});

export const diagnosisToResponse = (
  entity: DiagnosisEntity,
): DiagnosisResponse => ({
  diagnosisId: entity.diagnosisId,
  cie10: entity.cie10,
  description: entity.description,
  isActive: entity.isActive,
});
