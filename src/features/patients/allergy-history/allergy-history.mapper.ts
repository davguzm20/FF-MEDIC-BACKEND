import { AllergyHistory } from '@prisma/client';
import { AllergyHistoryEntity } from './allergy-history.entity';
import { AllergyHistoryResponse } from './dtos/allergy-history.response';

export const allergyHistoryToEntity = (
  history: AllergyHistory,
): AllergyHistoryEntity => ({
  allergyHistoryId: history.allergyHistoryId,
  patientId: history.patientId,
  diagnosisId: history.diagnosisId,
  specifications: history.specifications,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});

export const allergyHistoryToResponse = (
  history: AllergyHistoryEntity & {
    diagnosis?: { cie10: string; description: string };
  },
): AllergyHistoryResponse => ({
  diagnosisId: history.diagnosisId,
  specifications: history.specifications,
  diagnosis: history.diagnosis,
});
