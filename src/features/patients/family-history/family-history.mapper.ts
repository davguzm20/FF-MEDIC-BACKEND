import { FamilyHistory } from '@prisma/client';
import { FamilyHistoryEntity } from './family-history.entity';

export const familyHistoryToEntity = (
  history: FamilyHistory,
): FamilyHistoryEntity => ({
  familyHistoryId: history.familyHistoryId,
  patientId: history.patientId,
  type: history.type,
  other: history.other,
  status: history.status,
  specifications: history.specifications,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});
