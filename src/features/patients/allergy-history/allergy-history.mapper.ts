import { AllergyHistory } from '@prisma/client';
import { AllergyHistoryEntity } from './allergy-history.entity';

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
