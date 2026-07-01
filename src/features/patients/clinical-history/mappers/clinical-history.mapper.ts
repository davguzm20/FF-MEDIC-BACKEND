import { ClinicalHistory } from '@prisma/client';
import { ClinicalHistoryEntity } from '../entities/clinical-history.entity';

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
