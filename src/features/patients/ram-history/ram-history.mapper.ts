import { RamHistory } from '@prisma/client';
import { RamHistoryEntity } from './ram-history.entity';

export const ramHistoryToEntity = (history: RamHistory): RamHistoryEntity => ({
  ramHistoryId: history.ramHistoryId,
  patientId: history.patientId,
  activeIngredientId: history.activeIngredientId,
  diagnosisId: history.diagnosisId,
  specifications: history.specifications,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});
