import { ClinicalHistory } from '@prisma/client';
import { ClinicalHistoryEntity } from './clinical-history.entity';
import { ClinicalHistoryResponse } from './dtos/clinical-history.response';

export const clinicalHistoryToEntity = (
  history: ClinicalHistory,
): ClinicalHistoryEntity => ({
  clinicalHistoryId: history.clinicalHistoryId,
  patientId: history.patientId,
  diagnosisId: history.diagnosisId,
  type: history.type,
  specifications: history.specifications,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});

export const clinicalHistoryToResponse = (
  history: ClinicalHistoryEntity & {
    diagnosis?: { cie10: string; description: string } | null;
  },
): ClinicalHistoryResponse => ({
  diagnosisId: history.diagnosisId,
  type: history.type,
  specifications: history.specifications,
  diagnosis: history.diagnosis,
});
