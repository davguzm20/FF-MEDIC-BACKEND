import { ActiveIngredient, RamHistory } from '@prisma/client';
import { RamHistoryEntity } from './ram-history.entity';

type RamHistoryWithIngredient = RamHistory & {
  activeIngredient: ActiveIngredient;
};

export const ramHistoryToEntity = (history: RamHistory): RamHistoryEntity => ({
  ramHistoryId: history.ramHistoryId,
  patientId: history.patientId,
  activeIngredientId: history.activeIngredientId,
  diagnosisId: history.diagnosisId,
  specifications: history.specifications,
  activeIngredient: (history as RamHistoryWithIngredient).activeIngredient
    ? {
        activeIngredientId: (history as RamHistoryWithIngredient)
          .activeIngredient.activeIngredientId,
        name: (history as RamHistoryWithIngredient).activeIngredient.name,
      }
    : undefined,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});
