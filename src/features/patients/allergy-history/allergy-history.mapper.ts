import { AllergyHistory } from '@prisma/client';
import { AllergyHistoryEntity } from './allergy-history.entity';
import { AllergyHistoryResponse } from './dtos/allergy-history.response';

export const allergyHistoryToEntity = (
  history: AllergyHistory,
): AllergyHistoryEntity => ({
  allergyHistoryId: history.allergyHistoryId,
  patientId: history.patientId,
  specifications: history.specifications,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});

export const allergyHistoryToResponse = (
  history: AllergyHistoryEntity,
): AllergyHistoryResponse => ({
  specifications: history.specifications,
});
